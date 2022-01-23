import { CREATE_NEW_BYPASS, LOAD_BYPASS, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS, FINISHED_BYPASS, HIDE_LOADER_ICON, SHOW_LOADER_ICON, CLEAR_BYPASS_POSTS, CLEAR_BYPASS_USERS, CLEAR_BYPASS_USERS_AVERAGE, CLEAR_BYPASS_USERS_AVERAGE_ALL, CLEAR_BYPASS_USERS_DETAIL, CLEAR_BYPASS_USERS_DETAIL_ALL, CLEAR_BYPASS_STATUS_USERS_DETAIL_FOR_DAY, CLEAR_BYPASS_OBJECT_DETAIL, CLEAR_BYPASS_OBJECT_DETAIL_ALL } from '../../components/types'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const createBypass = (id, userId, postId, weather, temperature, icon) => async dispatch => {
    
    // console.log(id, 'BYPASS_ID_CREATE')
    await DB.createBypass(id, userId, postId, weather, temperature, icon)
    await UploadDataToServer.addBypass(id, userId, postId, weather, temperature, icon)
    dispatch({
        type: CREATE_NEW_BYPASS,
        payload: id
    })
}

export const loadBypass = (userId, postId) => async dispatch => {
    const bypassId = await DB.loadBypass(userId, postId)
    // console.log(bypassId, 'Массив объектов');
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

export const loadBypassBuildingForCorpus = (period, corpus_id, start_time=null, end_time=null) => async() => {
    dispatch(showLoaderBypass())
    await UploadDataToServer.getBypassBuildingCorpus(period, corpus_id, start_time, end_time)
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
        type: CLEAR_BYPASS_POSTS
    })
}
export const loadBypassUsers = (period, post_name) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getBypassUsers(period, post_name)
}

export const clearBypassBuildingForCorpus = () => async () => {
    dispatch({
        type: 'CLEAR_BYPASS_STATUS_OBJECT'
    })
}
 
export const clearBypassUsers = (data, post_name) => async () => {
    dispatch({
        type: CLEAR_BYPASS_USERS,
        payload: {data, post: post_name}
    })
}
export const clearBypassUsersAverage = (data, post_name) => async () => {
    dispatch({
        type: CLEAR_BYPASS_USERS_AVERAGE,
        payload: {data, post: post_name}
    })
}
export const clearBypassUsersAverageAll = () => async () => {
    dispatch({
        type: CLEAR_BYPASS_USERS_AVERAGE_ALL
    })
}
export const clearBypassUsersDetail = (data, user_email, post_name) => async () => {
    dispatch({
        type: CLEAR_BYPASS_USERS_DETAIL,
        payload: {data, post: post_name, user: user_email}
    })
}
export const clearBypassUsersDetailAll = () => async () => {
    dispatch({
        type: CLEAR_BYPASS_USERS_DETAIL_ALL,
    })
}
export const clearBypassUsersDetailForDay = () => async () => {
    dispatch({
        type: CLEAR_BYPASS_STATUS_USERS_DETAIL_FOR_DAY
    })
}
export const loadBypassUsersDetail = (period, user_email, post_name, start_time=null) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getBypassUsersDetail(period, user_email, post_name, start_time)
}
export const loadBypassObjectDetail = (period, object_name) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getBypassObjectDetail(period, object_name)
}
export const clearBypassObjectDetail = (data, object_name) => async () => {
    // dispatch(showLoaderBypassIcon())
    dispatch({
        type: CLEAR_BYPASS_OBJECT_DETAIL,
        payload:  {data, object_name}
    })
}
export const clearBypassObjectDetailAll = () => async () => {
    dispatch({
        type: CLEAR_BYPASS_OBJECT_DETAIL_ALL
    })
}
export const getSingleUserStat = user_id => async () => {
    await UploadDataToServer.getSingleUserStat(user_id)
}

export const getUsersBasicStat = (start_time=null, end_time=null) => async () => {
    await UploadDataToServer.getUsersBasicStat(start_time, end_time)
}

export const getListUsersAverageForPost = (period=null, start_time=null, end_time=null, post_id) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getListUsersAverageForPost(period, start_time, end_time, post_id)
}
export const getListUsersStaticTbr = (period=null, building_id=null, start_time=null, end_time=null) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getStatusUserWithTbr(period, building_id, start_time, end_time)
}
export const getListUsersStaticWithTbrDetail = (period, building_id, user_id, start_time, end_time) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getStatusUsersWithTbrDetail(period, building_id, user_id, start_time, end_time)
}
export const getListUsersStaticWithTbrCorpus = (period, corpus_id, start_time=null, end_time=null) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getStatusUsersWithTbrCorpus(period, corpus_id, start_time, end_time)
}
export const getListUsersStaticWithTbrCorpusDetail = (period, corpus_id, user_id, start_time=null, end_time=null) => async () => {
    dispatch(showLoaderBypassIcon())
    await UploadDataToServer.getStatusUsersWithTbrCorpusDetail(period, corpus_id, user_id, start_time, end_time)
}

export const clearListUsersStaticWithTbrCorpus = () => async () => {
    dispatch({
        type: 'CLEAR_STATUS_USER_WITH_TBR_CORPUS'
    })
}

export const clearListUsersStaticWithTbrCorpusDetail = (data, user_id) => async () => {
    dispatch({
        type: 'CLEAR_STATUS_USER_WITH_TBR_CORPUS_DETAIL',
        payload: {data, user_id}
    })
}

export const clearListUsersStaticTbr = () => async() => {
    dispatch({
        type: 'CLEAR_STATUS_USER_WITH_TBR'
    })
}

export const clearListUsersStaticWithTbrDetail = (data, user_id) => async() => {
    dispatch({
        type: 'CLEAR_STATIC_WITH_TBR_DETAIL',
        payload: {data, user_id}
    })
}

export const clearListUsersStaticWithTbrDetailAll = () => async() => {
    dispatch({
        type: 'CLEAR_STATIC_WITH_TBR_DETAIL_ALL'
    })
}

export const clearListUsersStaticWithTbrCorpusDetailAll = () => async() => {
    dispatch({
        type: 'CLEAR_STATIC_WITH_TBR_CORPUS_DETAIL_ALL'
    })
}

export const getImageBypassUserOfPostCount = (period, component_id, post_id, email, start_time=null, end_time=null) => async() => {
    await UploadDataToServer.getImageBypassUserOfPostCount(period, component_id, post_id, email, start_time, end_time)
}

export const getImageBypassUserOfPost = (period, component_id, post_id, email, offset, start_time=null, end_time=null) => async() => {
    await UploadDataToServer.getImageBypassUserOfPost(period, component_id, post_id, email, offset,start_time, end_time)
}

export const getComponentForBuilding = (period, building_id, start_time, end_time) => async() => {
    await UploadDataToServer.getComponentForBuilding(period, building_id, start_time, end_time)
}

export const clearComponentForBuilding = () => async() => {
    dispatch({
        type: 'CLEAR_STATUS_COMPONENT_FOR_BUILDING'
    })
}

export const getCyclesListForUserInBuilding = (user_id, building_id) => async () => {
    await UploadDataToServer.getCyclesListForUserInBuilding(user_id, building_id)
}

export const clearCyclesListForUserInBuilding = (user_id) => async() => {
    console.log('Hello world')
}

export const getCyclesListForUserInBuildingDetail = (offset, user_id, building_id, period=null, start_time=null, end_time=null) => async() => {
    await UploadDataToServer.getCyclesListForUserInBuildingDetail(offset, user_id, building_id, period, start_time, end_time)
}

export const clearCyclesListForUserInBuildingDetail = (data, user_id) => async() => {
    dispatch({
        type: 'CLEAR_CYCLES_LIST_FOR_BUILDING_DETAIL',
        payload: {data, user_id}
    })
}
export const getCyclesListForUserInCorpusDetail = (offset, user_id, corpus_id, period=null, start_time=null, end_time=null) => async() => {
    await UploadDataToServer.getCyclesListForUserInCorpusDetail(offset, user_id, corpus_id, period, start_time, end_time)
}
export const clearCyclesListForUserInCorpusDetail = (data, user_id) => async() => {
    dispatch({
        type: 'CLEAR_CYCLES_LIST_FOR_CORPUS_DETAIL',
        payload: {data, user_id}
    })
}
export const clearCyclesListForUserInBuildingDetailAll = () => async () => {
    dispatch({
        type: 'CLEAR_CYCLES_LIST_FOR_BUILDING_DETAIL_ALL'
    })
}
export const clearCyclesListForUserInCorpusDetailAll = () => async () => {
    dispatch({
        type: 'CLEAR_CYCLES_LIST_FOR_CORPUS_DETAIL_ALL'
    })
}
export const getBypassListOfPostInCycle = (cycle_id, user_id) => async() => {
    await UploadDataToServer.getBypassListOfPostInCycle(cycle_id, user_id)
}
export const getBypassMapCompleteCycle = (user_id, building_id) => async() => {
    await UploadDataToServer.getBypassMapCompleteCycle(user_id, building_id)
} 
