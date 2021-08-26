import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'
import { ADD_EMPLOEE, LOAD_EMPLOEE, LOAD_EMPLOEES, REMOVE_EMPLOEE, UPDATE_EMPLOEE_PRIVILEG, 
    UPDATE_USER_AUTHORIZE, LOAD_IF_EXISTS_USER, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'

import ApiKeys from '../../components/ApiKeys'
import {UploadDataToServer} from '../../uploadDataToServer'

export const loadEmploeeDouble = () => {
   
    return async dispatch => {

        const emploee = await DB.getUsers()

        dispatch({
            type   : LOAD_EMPLOEES,
            payload: emploee
        })
    }
}

export const getUsersServer = () => async dispatch => {
    await UploadDataToServer.getUsers()
}
export const removeEmploee = id => async dispatch=> {
    await UploadDataToServer.removeUser(id)
    await DB.removeUser(id)
    dispatch({
        type   : REMOVE_EMPLOEE,
        payload: id
    })
}

export const addEmploee = emploee => async dispatch => {
    
    
    const fileImage = emploee.img.split('/').pop()
    const newPath   = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to  : newPath,
            from: emploee.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload    = {...emploee, img: newPath}
    const id         = Date.now()
          payload.id = id
    //
    await DB.createUser(payload)

    await UploadDataToServer.addUser(newPath, payload)
    console.log(payload, ' test payload')
    

    dispatch({
        type: ADD_EMPLOEE,
        payload
    })
}

export const updateUserPrivileg = emploee => async dispatch => {
    await UploadDataToServer.updateUserPrivileg(emploee)
    await DB.updateUserPrivileg(emploee)
    dispatch({
        type   : UPDATE_EMPLOEE_PRIVILEG,
        payload: emploee.id
    })
}
export const loadUserExists = email => {
    return async dispatch => {
        const activeUser = await DB.getUser(email)

        dispatch({
            type   : LOAD_IF_EXISTS_USER,
            payload: activeUser
        })
    }
}
export const clearIsAccess = () => async dispatch => {
    dispatch({
        type: 'CLEAR_IS_ACCESS',
        payload: 0
    })
}

export const updateUser = (user) => async dispatch => {
    await DB.updateUserAuthorize(user.status === 0 ? 1 : 0, user.email)
    if (user.status) {
        await UploadDataToServer.userLogout(user)
    } else {
        await UploadDataToServer.addActiveUser(user.id)
    }
    dispatch({
        type   : UPDATE_USER_AUTHORIZE,
        payload: user
    })
}
export const getUserShift = emploeeId => async () => {
    await UploadDataToServer.getUserShift(emploeeId)
}

export const updateUserShift = (emploee, newTimeShift, emploeeId) => async dispatch => {
    await UploadDataToServer.createUserShift(emploee.id, newTimeShift)
    await DB.updateUserShift(emploee.id, newTimeShift)
    dispatch({
        type: 'UPDATE_USER_SHIFT',
        payload: {...emploee, start_shift: newTimeShift}
    })
}

export const showLoaderEmpDouble = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}
export const hideLoaderEmpDouble = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}
export const sendMessageToMail = (data) => async dispatch => {
    await UploadDataToServer.sendMessageToMail(data)
}
export const getAccess = (email, password) => async dispatch => {
    await UploadDataToServer.checkAuthentication(email, password)
}