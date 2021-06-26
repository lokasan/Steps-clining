import * as FileSystem from 'expo-file-system'
import { LOAD_COMPONENT, ADD_COMPONENT, REMOVE_COMPONENT, UPDATE_COMPONENT, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const loadComponent = () => {
   
    return async dispatch => {
        dispatch(showLoaderComponent())
        await UploadDataToServer.getComponents()
        // const component = await DB.getComponents()

        // dispatch({
        //     type: LOAD_COMPONENT,
        //     payload: component 
        // })
    }
}
export const removeComponent = id => async dispatch=> {
    await UploadDataToServer.removeComponent(id)
    // await DB.removeComponent(id)
    dispatch({
        type   : REMOVE_COMPONENT,
        payload: id
    })
}

export const addComponent = component => async dispatch => {
    const fileImage = component.img.split('/').pop()
    const newPath   = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to  : newPath,
            from: component.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload    = {...component, img: newPath}
          payload.id = Date.now()
    await DB.createComponent(payload)
    await UploadDataToServer.addComponent(newPath, payload)
    dispatch({
        type: ADD_COMPONENT,
        payload
    })
}

export const updateComponent = component => async dispatch => {
    await DB.updateComponent(component)
    dispatch({
        type   : UPDATE_COMPONENT,
        payload: component.id
    })
}

export const showLoaderComponent = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderComponent = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}