import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')

export const getPhoto = async () => {
    const result = await reqToBase()
    // console.log("Я выведу то, что ты хочешь: ", result[0].photo);
    return result[0].photo
}

const reqToBase= () => {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql('select photo from user_local where id=1;', [], (_, { rows }) => {
                // console.log(JSON.stringify(rows['_array']), 'resulttt');
                resolve(JSON.parse(JSON.stringify(rows['_array'])))
            })
        })
    })
} 