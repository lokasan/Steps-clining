import * as FileSystem from 'expo-file-system'
import { LOAD_COMPONENT, ADD_COMPONENT, REMOVE_COMPONENT, UPDATE_COMPONENT } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'

export const loadComponent = () => {
   
    return async dispatch => {

        const component = await DB.getComponents()

        dispatch({
            type: LOAD_COMPONENT,
            payload: component 
        })
    }
}
export const removeComponent = id => async dispatch=> {
    await DB.removeComponent(id)
    dispatch({
        type: REMOVE_COMPONENT,
        payload: id
    })
}

export const addComponent = component => async dispatch => {
    const fileImage = component.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to: newPath,
            from: component.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload = {...component, img: newPath}

    const id = await DB.createComponent(payload)

    payload.id = id

    dispatch({
        type: ADD_COMPONENT,
        payload
    })
}

export const updateComponent = component => async dispatch => {
    await DB.updateComponent(component)
    dispatch({
        type: UPDATE_COMPONENT,
        payload: component.id
    })
}