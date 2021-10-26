import { CREATE_COMPONENT_TO_POST_LINK, LOAD_COMPONENT_TO_POST_LINK, DELETE_COMPONENT_TO_POST_LINK, SHOW_LOADER, HIDE_LOADER, CLEAR_POST_WITH_COMPONENT } from "../../components/types"
const initialState = {
    postWithComponentAll: [],
    loading: false,
    error: null
}
// const handlers = {
//     [LOAD_EMPLOEE]: state => ({...state,
//         empAll: action.payload,
//         // readAndWriteUser: action.payload.filter(emp => emp.status === 2),
//         // readUser: action.payload.filter(emp => emp.status === 1),
//         // otherUser: action.payload.filter(emp => !emp.status)


//     }),
//     DEFAULT: state => state
// }

export const postWithComponentReducer = (state = initialState, action) => {
    console.log(action.type, 'POST');
    switch (action.type) {
        case LOAD_COMPONENT_TO_POST_LINK: return {
            ...state, 
            postWithComponentAll: action.payload}
        case DELETE_COMPONENT_TO_POST_LINK: return {
            ...state, 
            postWithComponentAll: state.postWithComponentAll.filter(e => e.id !== action.payload)

        }
        case CREATE_COMPONENT_TO_POST_LINK: return {
            ...state, 
            postWithComponentAll: [{...action.payload}, ...state.postWithComponentAll]
        }
        case SHOW_LOADER: return {
            ...state,
            loading: true
        }
        case HIDE_LOADER: return {
            ...state,
            loading: false
        }
        case CLEAR_POST_WITH_COMPONENT: return {
            ...state,
            postWithComponentAll: []
        }
        default: return state
    }
}