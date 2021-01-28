import * as FileSystem from 'expo-file-system'
import { CREATE_COMPONENT_TO_POST_LINK, LOAD_COMPONENT_TO_POST_LINK, DELETE_COMPONENT_TO_POST_LINK, SHOW_LOADER, HIDE_LOADER} from "../../components/types"
import { DATA } from '../../testData'
import { DB } from '../../db'

export const loadPostWithComponent = postId => {
   
    return async dispatch => {

        const postToComponent = await DB.getComponentToPostLinks(postId)

        dispatch({
            type: LOAD_COMPONENT_TO_POST_LINK,
            payload: postToComponent 
        })
    }
}
export const deleteComponentToPostLink = (postId, component) => async dispatch => {
    await DB.deleteComponentToPostLink(postId, component.id)
    dispatch({
        type: DELETE_COMPONENT_TO_POST_LINK,
        payload: component.id
    })
}

export const createComponentToPostLink = (postId, component) => async dispatch => {
    await DB.createComponentToPostLink(postId, component.id)
    dispatch({
        type: CREATE_COMPONENT_TO_POST_LINK,
        payload: component
    })
}

export const removeComponent = id => async dispatch=> {
    
    dispatch({
        type: DELETE_COMPONENT_TO_POST_LINK,
        payload: id
    })
}

export const showLoaderPostWithComponent = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}


export const hideLoaderPostWithComponents = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}