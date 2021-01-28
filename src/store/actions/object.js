import * as FileSystem from 'expo-file-system'
import { ADD_OBJECT, LOAD_OBJECT, REMOVE_OBJECT, UPDATE_OBJECT, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'

export const loadObject = () => {
   
    return async dispatch => {

        const object = await DB.getObjects()

        dispatch({
            type: LOAD_OBJECT,
            payload: object 
        })
    }
}
export const removeObject = id => async dispatch=> {
    await DB.removeObject(id)
    dispatch({
        type: REMOVE_OBJECT,
        payload: id
    })
}

export const addObject = object => async dispatch => {
    const fileImage = object.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to: newPath,
            from: object.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload = {...object, img: newPath}

    const id = await DB.createObject(payload)

    payload.id = id

    dispatch({
        type: ADD_OBJECT,
        payload
    })
}

export const updateObject = object => async dispatch => {
    await DB.updateObject(object)
    dispatch({
        type: UPDATE_OBJECT,
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