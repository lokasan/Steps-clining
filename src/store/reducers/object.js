import { ADD_OBJECT, LOAD_OBJECT, REMOVE_OBJECT } from "../../components/types"
const initialState = {
    objAll: []
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
        case LOAD_OBJECT: return {...state, objAll: action.payload}
        case REMOVE_OBJECT: return {...state, objAll: state.objAll.filter(e => e.id !== action.payload)

        }
        case ADD_OBJECT: return {
            ...state, 
            objAll: [{...action.payload}, ...state.objAll]
        }
        default: return state
    }
}