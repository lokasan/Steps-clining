import { ADD_OBJECT, HIDE_LOADER, LOAD_OBJECT, REMOVE_OBJECT, SHOW_LOADER } from "../../components/types"
const initialState = {
    objAll: [],
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

export const objectReducer = (state = initialState, action) => {
    console.log(action.type, 'OBJECTS');
    switch (action.type) {
        case LOAD_OBJECT: return {...state, objAll: action.payload, loading: false}
        case REMOVE_OBJECT: return {...state, objAll: state.objAll.filter(e => e.id !== action.payload)

        }
        case ADD_OBJECT: return {
            ...state, 
            objAll: [{...action.payload}, ...state.objAll]
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