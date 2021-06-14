import * as FileSystem from 'expo-file-system'
import { ADD_POST, LOAD_POST, REMOVE_POST, UPDATE_POST, GET_POSTS_ALL, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const loadPost = building_id => {
   
    return async () => {
        dispatch(showLoaderPost())
        await UploadDataToServer.getPosts(building_id)

        // const post = await DB.getPosts(building_id)

        // dispatch({
        //     type: LOAD_POST,
        //     payload: post 
        // })
    }
}
export const getPostAll = () => {
   
    return async dispatch => {

        const post = await DB.getPostAll()

        dispatch({
            type   : GET_POSTS_ALL,
            payload: post
        })
    }
}
export const removePost = (id, building_id) => async dispatch=> {
    await UploadDataToServer.removePost(id, building_id)
    await DB.removePost(id)
    dispatch({
        type   : REMOVE_POST,
        payload: id
    })
}

export const addPost = post => async dispatch => {
    const fileImage = post.img.split('/').pop()
    const newPath   = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to  : newPath,
            from: post.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload    = {...post, img: newPath}
          payload.id = Date.now()
    await DB.createPost(payload)
    await UploadDataToServer.addPost(newPath, payload)

    

    dispatch({
        type: ADD_POST,
        payload
    })
}

export const updatePost = post => async dispatch => {
    await DB.updatePost(post)
    dispatch({
        type   : UPDATE_POST,
        payload: post.id
    })
}

export const showLoaderPost = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderPost = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}