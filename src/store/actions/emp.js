import { CLEAR_ERROR, FETCH_USERS, LOAD_EMPLOEE, SHOW_LOADER, UPDATE_EMPLOEE } from '../../components/types'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('dbas.db')
export const loadListEmp = () => {
    return {
        type: FETCH_USERS, 
        emploee: fetchEmp()
    }
}
const dataEmp = (period, person) => {
    return new Promise((resolve => {
        let response =  null
        let sql = null
        if (period !== null) {
            sql = `select user_local.id, name as userName, sum(step_time.count_step) as steps, key_auth, status, privileg from user_local left join step_time where user_local.id = step_time.user_id and key_auth=0 group by name`
        } else {
            sql = 'select user_local.id, name as userName, sum(step_time.count_step) as steps, key_auth, status, privileg from user_local left join step_time where user_local.id = step_time.user_id group by name'
        }
        db.transaction(tx => {
            tx.executeSql(sql, [], (_, { rows }) => {
           response = JSON.parse(JSON.stringify(rows['_array']))
        //    console.log("LoadListEmp", response);
           resolve(response)
       })
       
   })
    }))
}
const fetchEmp = async (period = null, person = null) => {
    const emploee = await dataEmp(period, person)
    return emploee
}

export const updateEmploeers = (key_auth, steps) => {
    return {
        type: UPDATE_EMPLOEE,
        key_auth,
        steps
    }
}