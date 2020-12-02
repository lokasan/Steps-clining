import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.db')
 
    const initRequestEmploees = () => {
        return new Promise((resolve) => {
            db.transaction(tx => {
                let request = 'select * from user_local;'
                tx.executeSql(request, [], (_, { rows }) => {
                    resolve(JSON.parse(JSON.stringify(rows['_array'])))
                })
            })
        })
    }
export const getEmploeesList = async () => {
    const responseData = await initRequestEmploees()
    console.log(responseData);
    return responseData
    }
    
 