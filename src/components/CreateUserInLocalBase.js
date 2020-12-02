import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')
export const CreateUserInLocalBase = (value, privileg = 'null', photo = 'null') => {
    db.transaction(tx => { 
        // console.log('create table')
        tx.executeSql("create table if not exists user_local (id integer primary key autoincrement not null, name text not null, key_auth text not null unique, status text, photo text);")
        // tx.executeSql("drop table user_local;")
        // console.log('insert user')
        tx.executeSql("create table if not exists step_time (id integer primary key autoincrement not null, user_id integer not null, \
            count_step integer not null, date_time text not null, current_time text not null, foreign key (user_id) references user_local(id));")
        tx.executeSql("insert into user_local (name, key_auth, status, photo) values (?, ?, ?, ?);", [value.toString(), Date.now().toString(), privileg, photo])
        tx.executeSql('select * from user_local', [], (_, { rows }) =>
        console.log(JSON.stringify(rows['_array']))
                            )
        
      })
}
