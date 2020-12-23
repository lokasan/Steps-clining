
import * as SQLite from 'expo-sqlite'
// const db = SQLite.openDatabase('db.db')
const fullDate = 4
const mediumDate = 3
const partDate = 2
let sql = ''
// export const changeEmploeeListParameters = (candle=null) => {
//     candleArr = candle.split(' ')
//     const result = responseOfBase(candleArr)
//     console.log(result);
// }

export const changeEmploeeListParameters = async (candle) => {
    // const allEmp = useSelector((state) => state)
    candleArr = candle.split(' ')
    const emploee = await reqDataBase(candleArr)
    // console.log(emploee, 'gfdghygfhghgfhghgf');
    return emploee
}

const reqDataBase = (candleArr) => {
    return new Promise((resolve) => {
        if (candleArr.length === fullDate) {
            sql = `select user_local.key_auth as key, sum(count_step) as step, strftime('%H', date_time) AS hour, strftime('%d', date_time) AS day, strftime('%m', date_time) AS month, strftime('%Y', date_time) AS year from step_time left join user_local where user_local.id = step_time.user_id and hour = ? and day = ? and month = ? and year = ? group by key;`
        } else if (candleArr.length === mediumDate) {
            
            sql = `select user_local.key_auth as key, sum(count_step) as step, strftime('%d', date_time) AS day, strftime('%m', date_time) AS month, strftime('%Y', date_time) AS year from step_time left join user_local where user_local.id = step_time.user_id and day = ? and month = ? and year = ? group by key order by key;`
        } else if (candleArr.length === partDate) {
            sql = `select user_local.key_auth as key, sum(count_step) as step, strftime('%H', date_time) AS hour, strftime('%m', date_time) AS month, strftime('%Y', date_time) AS year from step_time left join user_local where user_local.id = step_time.user_id and hour = ? and month = ? and year = ? group by key;`
        }
        db.transaction(tx => {
            tx.executeSql(sql, [...candleArr], (_, { rows }) => {
                response = JSON.parse(JSON.stringify(rows['_array']))
                // console.log(response);
                resolve(response)
            })
        })
    })
}

  
