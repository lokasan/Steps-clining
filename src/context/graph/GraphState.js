import React, {useReducer} from 'react'
import { CLEAR_ERROR, FETCH_USERS, LOAD_EMPLOEE, SHOW_LOADER, UPDATE_EMPLOEE } from '../../components/types'
import {GraphContext} from './graphContext'
import { graphReducer } from './graphReducer'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.db')
export const GraphState = ({ children }) => {
    
    let initialState = {
        emploee: [],
        loading: false,
        error: null
    }
    const [state, dispatch] = useReducer(graphReducer, initialState)
    
    const showLoader = () => dispatch({type: SHOW_LOADER})
    const hideLoader = () => dispatch({type: HIDE_LOADER})
    const showError = error => dispatch({type: SHOW_ERROR, error})
    const clearError = () => dispatch({type: CLEAR_ERROR})
    const dataEmp = (period, person) => {
        return new Promise((resolve => {
            let response =  null
            let sql = null
            if (period !== null) {
                sql = `select user_local.id, name as userName, sum(step_time.count_step) as steps, key_auth, status from user_local left join step_time where user_local.id = step_time.user_id and key_auth=0 group by name`
            } else {
                sql = 'select user_local.id, name as userName, sum(step_time.count_step) as steps, key_auth, status from user_local left join step_time where user_local.id = step_time.user_id group by name'
            }
            db.transaction(tx => {
                tx.executeSql(sql, [], (_, { rows }) => {
               response = JSON.parse(JSON.stringify(rows['_array']))
               resolve(response)
           })
           
       })
        }))
    }

    const fetchEmploees = async (period = null, person = null) => {
       const emploee = await dataEmp(period, person)
       console.log(emploee, 'MY');
       dispatch({type: FETCH_USERS, emploee})
       // разобраться как передавать
    
      
        //    loadEmploee(key['name'], key['steps'], key['key_auth'], key['status'])
       
    }
    
    
    const updateEmploee = (key_auth, steps) => dispatch({type: UPDATE_EMPLOEE, key_auth, steps})
    const loadEmploee = (id, userName, steps, key_auth, status) => dispatch({type: LOAD_EMPLOEE, id, userName, steps, key_auth, status})
    return <GraphContext.Provider value={{
        emploee: state.emploee,
        loadEmploee,
        fetchEmploees,
        updateEmploee
    }}>{children}</GraphContext.Provider>
}
