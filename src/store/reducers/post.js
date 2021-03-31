import { ADD_POST, LOAD_POST, REMOVE_POST, GET_POSTS_ALL, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
// import * as firebase from 'firebase'
const initialState = {
    postAll: [],
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

export const postReducer = (state = initialState, action) => {
    console.log(action.type, 'POST');
    switch (action.type) {
        case LOAD_POST: return {...state, postAll: action.payload}
        case GET_POSTS_ALL: return {...state, postAlls: action.payload}
        case REMOVE_POST: return {
            ...state, 
            postAll: state.postAll.filter(e => e.id !== action.payload),
            postAlls: state.postAlls.filter(e => e.id !== action.payload)

        }
        case ADD_POST: return {
            ...state, 
            postAll: [{...action.payload}, ...state.postAll],
            postAlls: [{...action.payload}, ...state.postAlls]
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