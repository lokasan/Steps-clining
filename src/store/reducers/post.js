import { ADD_POST, LOAD_POST, REMOVE_POST, GET_POSTS_ALL } from "../../components/types"
const initialState = {
    postAll: []
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
        case REMOVE_POST: return {...state, postAll: state.postAll.filter(e => e.id !== action.payload)

        }
        case ADD_POST: return {
            ...state, 
            postAll: [{...action.payload}, ...state.postAll]
        }
        default: return state
    }
}