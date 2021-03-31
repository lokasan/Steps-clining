import { CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK, LOAD_FINISHED_COMPONENTS_FOR_BYPASS, LOAD_STARTED_BYPASS_RANK, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS_RANK_STATE  } from "../../components/types"

const initialState = {
    bypassRank: [],
    bypassRankId: [],
    bypassComponents: [],
    bypassRankIsStarted: [],
    loading: false,
    error: null
}

export const bypassRankReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_BYPASS_RANK: return {
            ...state,
            bypassRankId: action.payload.id,
            bypassRankIsStarted: [...state.bypassRankIsStarted, action.payload]
        }
        case UPDATE_BYPASS_RANK: return {
            ...state,
            // bypassRank: [...state.bypassRank, action.payload.rank],
            bypassComponents: [...state.bypassComponents, ...action.payload]
        }
        case LOAD_FINISHED_COMPONENTS_FOR_BYPASS: return {
            ...state,
            bypassComponents: [...action.payload]
        }
        case LOAD_STARTED_BYPASS_RANK: return {
            ...state,
            bypassRankIsStarted: action.payload
        }
        case SHOW_LOADER: return {
            ...state,
            loading: true
        }
        case HIDE_LOADER: return {
            ...state,
            loading: false
        }
        
        default: return state
    }
}