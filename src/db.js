import * as SQLite from 'expo-sqlite'
import { CREATE_BUILDING_TABLE, CREATE_BYPASS_RANK_TABLE, CREATE_BYPASS_TABLE, CREATE_COMPONENT_RANK_TABLE, CREATE_COMPONENT_TABLE, CREATE_POST_TABLE, CREATE_STEP_TIME_TABLE, CREATE_USER_LOCAL_TABLE } from './txtRequests'
const db = SQLite.openDatabase('db.db')

export class DB {
    static init() {
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
            console.log('Foreign keys turned on')
        )
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(CREATE_USER_LOCAL_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_STEP_TIME_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_BYPASS_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_BUILDING_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_POST_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_COMPONENT_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_COMPONENT_RANK_TABLE, [], resolve, (_, error) => reject(error))
                tx.executeSql(CREATE_BYPASS_RANK_TABLE, [], resolve, (_, error) => reject(error))
            })
        })
        
    }
    static getUsers() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM user_local",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static createUser({surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date}) {
        console.log(surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date)
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO user_local (surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [surname, name, lastname, position, email, privileg, key_auth, status, img, create_user_date],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }
    static updateUser(emploee) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE user_local SET privileg = ? WHERE id = ?",
                    [emploee.privileg, emploee.id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
    static removeUser(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "DELETE FROM user_local WHERE id = ?",
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            })
        })
    }
}
let a = "CREATE TABLE IF NOT EXISTS user_local (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
    surname TEXT NOT NULL, name TEXT NOT NULL, lastname TEXT NOT NULL, position TEXT NOT NULL, \
    email TEXT NOT NULL, privileg INTEGER NOT NULL, key_auth TEXT NOT NULL UNIQUE, status TEXT, img TEXT);"