import { CREATE_NEW_BYPASS } from '../../components/types'
import { DB } from '../../db'

export const createBypass = (userId, postId, weather, temperature) = async dispatch => {
    const id = await DB.createBypass(userId, postId, weather, temperature)
    dispatch({
        type: CREATE_NEW_BYPASS,
        payload: id
    })
}

export const bypassIsCleaner = (cleaner, bypassId) = async () => {
    await DB.isCleanerOnBypass(cleaner, bypassId)
}
export const updateBypass = (avgRank, id) = async ()=> {
    await DB.updateBypass(avgRank, id)
}