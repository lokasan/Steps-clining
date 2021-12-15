import * as FileSystem from 'expo-file-system'
import { ADD_OBJECT, LOAD_OBJECT, REMOVE_OBJECT, UPDATE_OBJECT, SHOW_LOADER, HIDE_LOADER, CLEAR_OBJECTS_STATE } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const loadObject = () => async dispatch => {
    dispatch(showLoaderObject())
    await UploadDataToServer.getObject()
}
export const loadObjectById = corpus_id => async dispatch => {
    dispatch(showLoaderObject())
    await UploadDataToServer.getObjectById(corpus_id)
}
export const removeObject = id => async dispatch => {
    await UploadDataToServer.removeObject(id)
    await DB.removeObject(id)
    dispatch({
        type   : REMOVE_OBJECT,
        payload: id
    })
}

export const addObject = object => async dispatch => {
    const fileImage = object.img.split('/').pop()
    const newPath   = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to  : newPath,
            from: object.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload    = {...object, img: newPath}
          payload.id = Date.now()
    await DB.createObject(payload)
    await UploadDataToServer.addObject(newPath, payload)
    

    dispatch({
        type: ADD_OBJECT,
        payload
    })
}

export const updateObject = object => async dispatch => {
    await DB.updateObject(object)
    dispatch({
        type   : UPDATE_OBJECT,
        payload: object.id
    })
}

export const showLoaderObject = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderObject = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}

export const clearObjectState = () => async dispatch => {
    dispatch({
        type: CLEAR_OBJECTS_STATE
    })
}