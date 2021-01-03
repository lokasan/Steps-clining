import * as FileSystem from 'expo-file-system'
import { ADD_EMPLOEE, LOAD_EMPLOEE, LOAD_EMPLOEES, REMOVE_EMPLOEE, UPDATE_EMPLOEE_PRIVILEG, UPDATE_USER_AUTHORIZE, LOAD_IF_EXISTS_USER } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'

export const loadEmploeeDouble = () => {
   
    return async dispatch => {

        const emploee = await DB.getUsers()

        dispatch({
            type: LOAD_EMPLOEES,
            payload: emploee 
        })
    }
}
export const removeEmploee = id => async dispatch=> {
    await DB.removeUser(id)
    dispatch({
        type: REMOVE_EMPLOEE,
        payload: id
    })
}

export const addEmploee = emploee => async dispatch => {
    const fileImage = emploee.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to: newPath,
            from: emploee.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload = {...emploee, img: newPath}

    const id = await DB.createUser(payload)

    payload.id = id

    dispatch({
        type: ADD_EMPLOEE,
        payload
    })
}

export const updateUserPrivileg = emploee => async dispatch => {
    await DB.updateUserPrivileg(emploee)
    dispatch({
        type: UPDATE_EMPLOEE_PRIVILEG,
        payload: emploee.id
    })
}
export const loadUserExists = email => {
    return async dispatch => {
        const activeUser = await DB.getUser(email)

        dispatch({
            type: LOAD_IF_EXISTS_USER,
            payload: activeUser
        })
    }
}

export const updateUser = (user) => async dispatch => {
    await DB.updateUserAuthorize(user.status === 0 ? 1 : 0, user.email)
    dispatch({
        type: UPDATE_USER_AUTHORIZE,
        payload: user
    })
}