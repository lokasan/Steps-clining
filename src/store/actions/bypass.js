import { CREATE_NEW_BYPASS, LOAD_BYPASS, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS, FINISHED_BYPASS, HIDE_LOADER_ICON, SHOW_LOADER_ICON } from '../../components/types'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const createBypass = (id, userId, postId, weather, temperature, icon) => async dispatch => {
    
    console.log(id, 'BYPASS_ID_CREATE')
    await DB.createBypass(id, userId, postId, weather, temperature, icon)
    await UploadDataToServer.addBypass(id, userId, postId, weather, temperature, icon)
    dispatch({
        type: CREATE_NEW_BYPASS,
        payload: id
    })
}

export const loadBypass = (userId, postId) => async dispatch => {
    const bypassId = await DB.loadBypass(userId, postId)
    console.log(bypassId, 'Массив объектов');
    dispatch({
        type: LOAD_BYPASS,
        payload: bypassId.length ? 
        {bypassId: bypassId[0].id, cleanerStatus: bypassId[0].cleaner } : 
        {bypassId: -1, cleanerStatus: undefined } 
    })

}

export const bypassIsCleaner = (cleaner, bypassId) => async () => {
    await UploadDataToServer.isCleanerOnBypass(cleaner, bypassId)
    await DB.isCleanerOnBypass(cleaner, bypassId)
}
export const updateBypass = (avgRank, id) => async dispatch => {
    await UploadDataToServer.editBypass(avgRank, id)
    await DB.updateBypass(avgRank, id)
    dispatch({
        type: UPDATE_BYPASS,
        payload: id
    })
}

export const finishedBypass = (avgRank, id) => async dispatch => {
    await UploadDataToServer.endBypass(avgRank, id)
    await DB.finishedBypass(avgRank, id)
    dispatch({
        type: FINISHED_BYPASS,
        payload: id
    })
}

export const showLoaderBypassIcon = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER_ICON
    })
}

export const hideLoaderBypassIcon = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER_ICON
    })
}

export const showLoaderBypass = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderBypass = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}

export const loadBypassGetter = period => async () => {
    dispatch(showLoaderBypass())
    await UploadDataToServer.getBypassGetter(period)
    // dispatch(hideLoaderBypass())
    
}
export const loadBypassPosts = (period, object_name) => async () => {
    dispatch(showLoaderBypass())
    await UploadDataToServer.getBypassPosts(period, object_name)
}
export const clearBypassPosts = () => async () => {
    dispatch({
        type: 'CLEAR_BYPASS_POSTS'
    })
}
export const loadBypassUsers = (period, post_name) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getBypassUsers(period, post_name)
}
export const clearBypassUsers = (data, post_name) => async () => {
    dispatch({
        type: 'CLEAR_BYPASS_USERS',
        payload: {data, post: post_name}
    })
}
export const clearBypassUsersDetail = (data, user_email, post_name) => async () => {
    dispatch({
        type: 'CLEAR_BYPASS_USERS_DETAIL',
        payload: {data, post: post_name, user: user_email}
    })
}
export const loadBypassUsersDetail = (period, user_email, post_name) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getBypassUsersDetail(period, user_email, post_name)
}
export const loadBypassObjectDetail = (period, object_name) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getBypassObjectDetail(period, object_name)
}
export const clearBypassObjectDetail = (data, object_name) => async () => {
    // dispatch(showLoaderBypassIcon())
    dispatch({
        type: 'CLEAR_BYPASS_OBJECT_DETAIL',
        payload:  {data, object_name}
    })
}