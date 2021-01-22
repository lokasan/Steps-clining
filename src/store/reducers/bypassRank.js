import { CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK } from "../../components/types"

const initialState = {
    bypassRank: [],
    bypassRankId: []
}

export const bypassRankReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_BYPASS_RANK: return {
            ...state,
            bypassRankId: action.payload
        }
        case UPDATE_BYPASS_RANK: return {
            ...state,
            bypassRank: [...state.bypassRank, action.payload]
        }
        default: return state
    }
}