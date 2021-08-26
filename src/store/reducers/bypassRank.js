import { CREATE_NEW_BYPASS_RANK, UPDATE_BYPASS_RANK, LOAD_FINISHED_COMPONENTS_FOR_BYPASS, LOAD_STARTED_BYPASS_RANK, SHOW_LOADER, HIDE_LOADER, UPDATE_BYPASS_RANK_STATE  } from "../../components/types"

const initialState = {
    bypassRank: [],
    bypassRankId: [],
    bypassComponents: [],
    bypassRankIsStarted: [],
    bypassRankImage: [],
    bypassRankImageCount: 0,
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
        case 'GET_IMAGE_BYPASS_RANK': return {
            ...state,
            bypassRankImage: [...state.bypassRankImage, ...action.payload]
        }
        case 'CLEAR_BYPASS_RANK_IMAGE': return {
            ...state,
            bypassRankImage: []
        }
        case 'GET_BYPASS_RANK_IMAGE_COUNT': return {
            ...state,
            bypassRankImageCount: action.payload
        }
        case 'CLEAR_BYPASS_RANK_IMAGE_COUNT': return {
            ...state,
            bypassRankImageCount: 0
        }
        case 'SHOW_LOADER_BYPASS_RANK': return {
            ...state,
            loading: true
        }
        case 'HIDE_LOADER_BYPASS_RANK': return {
            ...state,
            loading: false
        }
        
        default: return state
    }
}