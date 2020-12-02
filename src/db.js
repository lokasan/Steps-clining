import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')

export class DB {
    static init() {
        return new Promise ((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    '', 
                    )
            })
        })
        
    }
}