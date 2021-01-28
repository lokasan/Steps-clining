import { CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK, LOAD_FINISHED_COMPONENTS_FOR_BYPASS, LOAD_STARTED_BYPASS_RANK, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS_RANK_STATE } from '../../components/types'
import { DB } from '../../db'

export const createBypassRank = (bypassId, component_id) => async dispatch => {
    const id = await DB.createBypassRank(bypassId, component_id)
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



export const updateBypassRank = (componentRankId, id) => async dispatch => {
    await DB.updateBypassRank(componentRankId, id)
    const componentRank = await DB.getComponentRankForId(componentRankId)
    dispatch({
        type: UPDATE_BYPASS_RANK,
        payload: componentRank
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