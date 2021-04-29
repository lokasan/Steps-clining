import * as FileSystem from 'expo-file-system'
import { ADD_COMPONENT_RANK, ADD_POST, EDIT_COMPONENT_RANK, LOAD_COMPONENT_RANK, LOAD_POST, REMOVE_COMPONENT_RANK, REMOVE_POST, UPDATE_COMPONENT_RANK, UPDATE_POST, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const loadComponentRank = component_id => {
   
    return async () => {
        UploadDataToServer.getComponentRanks(component_id)
        // const componentRank = await DB.getComponentRankId(component_id)

        // dispatch({
        //     type: LOAD_COMPONENT_RANK,
        //     payload: componentRank 
        // })
    }
}
export const removeComponentRank = id => async dispatch=> {
    await UploadDataToServer.removeComponentRank(id)
    await DB.removeComponentRank(id)
    
    dispatch({
        type: REMOVE_COMPONENT_RANK,
        payload: id
    })
}

export const addComponentRank = componentRank => async dispatch => {
    const fileImage = componentRank.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to: newPath,
            from: componentRank.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }

    

    const payload = {...componentRank, img: newPath}
    
    const id = await DB.createComponentRank(payload)
    await UploadDataToServer.addComponentRank(newPath, {id, ...payload})

    payload.id = id

    dispatch({
        type: ADD_COMPONENT_RANK,
        payload
    })
}

export const updateComponentRank = (componentRank, componentLength, count) => async dispatch => {
    await UploadDataToServer.updateComponentRank(componentRank, componentLength, count)
    await DB.updateComponentRank(componentRank, componentLength, count)
    dispatch({
        type: UPDATE_COMPONENT_RANK,
        payload: {componentRank, componentLength, count}
    })
}

export const editComponentRank = (componentRank) => async dispatch => {
    const fileImage = componentRank.img.split('/').pop()
    console.log(fileImage);
    const newPath = FileSystem.documentDirectory + fileImage
    console.log(newPath);
    let flag = 0
    try {
        if (newPath !== componentRank.img)
        {   
            flag = 1
            FileSystem.moveAsync({
                to: newPath,
                from: componentRank.img
            })
        }
    } catch(e) {
        console.log('Error: ', e)
    }
    const payload = {...componentRank, img: newPath, flag: flag}
    await UploadDataToServer.editComponentRank(newPath, payload)
    await DB.editComponentRank(payload)
    dispatch({
        type: EDIT_COMPONENT_RANK,
        payload
    })
}

export const showLoaderComponentRank = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderComponentRank = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}