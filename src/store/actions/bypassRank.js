import { CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK } from '../../components/types'
import { DB } from '../../db'

export const createBypassRank = bypassId => async dispatch => {
    const id = await DB.createBypassRank(bypassId)
    dispatch({
        type: CREATE_NEW_BYPASS_RANK,
        payload: id
    })
}

export const updateBypassRank = (componentRankId, id) => async dispatch => {
    await DB.updateComponentRank(componentRankId, id)
    const componentRank = await DB.getComponentRankForId(componentRankId)
    dispatch({
        type: UPDATE_BYPASS_RANK,
        payload: componentRank.rank
    })
}

// Остановился на расчете avg rank для bypass // в редюсер включить суммирование ранка (оценок)