import * as SQLite from 'expo-sqlite'
import { CREATE_NEW_USER } from '../txtRequests'

// const db = SQLite.openDatabase('db.db')
export const CreateUserInLocalBase = (value, privileg = 'null', photo = 'null') => {
    db.transaction(tx => { 
        // console.log('create table')
       
        // console.log('insert user')
        
        tx.executeSql(CREATE_NEW_USER, 
            [...value.toString().split(' '), 'Artemovich', 'system adm', 'log@bk.ru', '1', Date.now().toString(), '2', 'photo',  Date.now().toString()])
        tx.executeSql('select * from user_local', [], (_, { rows }) =>
        console.log(JSON.stringify(rows['_array']))
                            )
        
      })
}
