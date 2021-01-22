import { CREATE_NEW_BYPASS } from "../../components/types"

const initialState = {
    bypassNumber: []
}

export const bypassReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_BYPASS: return {
            ...state,
            bypassNumber: action.payload
        }
        default: return state
    }
}