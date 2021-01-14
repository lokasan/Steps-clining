import * as FileSystem from 'expo-file-system'
import { ADD_POST, LOAD_POST, REMOVE_POST, UPDATE_POST, GET_POSTS_ALL } from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'

export const loadPost = building_id => {
   
    return async dispatch => {

        const post = await DB.getPosts(building_id)

        dispatch({
            type: LOAD_POST,
            payload: post 
        })
    }
}
export const getPostAll = () => {
   
    return async dispatch => {

        const post = await DB.getPostAll()

        dispatch({
            type: GET_POSTS_ALL,
            payload: post 
        })
    }
}
export const removePost = id => async dispatch=> {
    await DB.removePost(id)
    dispatch({
        type: REMOVE_POST,
        payload: id
    })
}

export const addPost = post => async dispatch => {
    const fileImage = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to: newPath,
            from: post.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload = {...post, img: newPath}

    const id = await DB.createPost(payload)

    payload.id = id

    dispatch({
        type: ADD_POST,
        payload
    })
}

export const updatePost = post => async dispatch => {
    await DB.updatePost(post)
    dispatch({
        type: UPDATE_POST,
        payload: post.id
    })
}