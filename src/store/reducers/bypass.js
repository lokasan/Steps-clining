import { CREATE_NEW_BYPASS, LOAD_BYPASS, SHOW_LOADER, HIDE_LOADER } from "../../components/types"

const initialState = {
    bypassNumber: [],
    loading: false,
    error: null
}

export const bypassReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_BYPASS: return {
            ...state,
            bypassNumber: action.payload
        }
        case LOAD_BYPASS: return {
            ...state,
            bypassNumber: typeof action.payload === 'number' ? action.payload : -1
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