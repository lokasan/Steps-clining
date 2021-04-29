import { CREATE_NEW_BYPASS, LOAD_BYPASS, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS } from '../../components/types'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const createBypass = (userId, postId, weather, temperature) => async dispatch => {
    const id = await DB.createBypass(userId, postId, weather, temperature)
    await UploadDataToServer.addBypass(id, userId, postId, weather, temperature)
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
        payload: bypassId.length ? bypassId[0].id : undefined
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