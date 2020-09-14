import React, {useReducer} from 'react'
import { LOAD_EMPLOEE } from '../../components/types'
import {GraphContext} from './graphContext'
import { graphReducer } from './graphReducer'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.db')
export const GraphState = ({ children }) => {
    const initialState = {
        emploee: [{
            id: 1, userName: 'Oleg', steps: 0, key_auth: '32145', status: 'null'

        }, {
            id: 2, userName: 'Boris', steps: 20, key_auth: '1234', status: 'admin'
        }]
    }
    const [state, dispatch] = useReducer(graphReducer, initialState)
    const fetchEmploees = () => {
       const response = db.transaction(tx => {
                 tx.executeSql('select name, sum(step_time.count_step) as steps, key_auth, status from user_local left join step_time where user_local.id = step_time.user_id group by name', [], (_, { rows }) => {
                console.log(JSON.stringify(rows['_array']))
            })
        })
        const data = response
        console.log('My dtata:', data);
    }
    const loadEmploee = (userName, steps, key_auth, status) => dispatch({type: LOAD_EMPLOEE, userName, steps, key_auth, status})
    return <GraphContext.Provider value={{
        emploee: state.emploee,
        loadEmploee,
        fetchEmploees 
    }}>{children}</GraphContext.Provider>
}
