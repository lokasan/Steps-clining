import { CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK, LOAD_FINISHED_COMPONENTS_FOR_BYPASS, LOAD_STARTED_BYPASS_RANK, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS_RANK_STATE } from '../../components/types'
import { DB } from '../../db'
import { UploadDataToServer } from '../../uploadDataToServer'

export const createBypassRank = (bypassId, component_id) => async dispatch => {
    const id = String(Date.now())
    const start_time = id
    await DB.createBypassRank(id, bypassId, component_id, start_time)
    await UploadDataToServer.addBypassRank(id, bypassId, component_id, start_time)
    dispatch({
        type: CREATE_NEW_BYPASS_RANK,
        payload: {id, component_id}
    })
}

export const loadFinishedBypassComponents = bypassId => async dispatch => {
    const bypassFinishedRank = await DB.loadFinishedComponentsForBypass(bypassId)
    dispatch({
        type: LOAD_FINISHED_COMPONENTS_FOR_BYPASS,
        payload: bypassFinishedRank
    })
}

export const loadStartedBypassRank = bypassId => async dispatch => {
  
    const bypassRankIsStarted = await DB.loadStartedBypassRank(bypassId)
   
    dispatch({
        type: LOAD_STARTED_BYPASS_RANK,
        payload: bypassRankIsStarted
    })
   
}

export const updateBypassRankWithPhoto = (image, itemComponentRank, bypassId, bypassRankId) => async dispatch => {
    await UploadDataToServer.editBypassRankAndImage(image, itemComponentRank.id, bypassId, bypassRankId)
    await DB.updateBypassRank(itemComponentRank.id, bypassRankId)
    const componentRank = await DB.getComponentRankForId(itemComponentRank.id)

    dispatch({
        type: UPDATE_BYPASS_RANK,
        payload: componentRank
    })
}

export const updateBypassRank = (componentRankId, id) => async dispatch => {
    await UploadDataToServer.editBypassRank(componentRankId, id)
    await DB.updateBypassRank(componentRankId, id)
    const componentRank = await DB.getComponentRankForId(componentRankId)
    
    dispatch({
        type: UPDATE_BYPASS_RANK,
        payload: componentRank
    })
}
export const clearBypassRankImage = () => async dispatch => {
    dispatch({
        type: 'CLEAR_BYPASS_RANK_IMAGE'
    })
}

export const showLoaderBypassRank = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderBypassRank = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}
// Остановился на расчете avg rank для bypass // в редюсер включить суммирование ранка (оценок)