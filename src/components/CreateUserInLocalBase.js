import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')
export const CreateUserInLocalBase = (value, privileg = 'null', photo = 'null') => {
    db.transaction(tx => { 
        // console.log('create table')
       
        // console.log('insert user')
        
        tx.executeSql("insert into user_local (name, key_auth, status, photo) values (?, ?, ?, ?);", [value.toString(), Date.now().toString(), privileg, photo])
        tx.executeSql('select * from user_local', [], (_, { rows }) =>
        console.log(JSON.stringify(rows['_array']))
                            )
        
      })
}
