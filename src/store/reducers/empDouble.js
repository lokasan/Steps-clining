import { ADD_EMPLOEE, LOAD_EMPLOEES, REMOVE_EMPLOEE, UPDATE_USER_AUTHORIZE, LOAD_IF_EXISTS_USER } from "../../components/types"
const initialState = {
    empAll: [],
    readAndWriteUser: [],
    readUser: [],
    otherUser: [],
    existsUser: []
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

export const empDoubleReducer = (state = initialState, action) => {
    console.log(action.type, 'МММММММММММММММММММММММММММММММММММММ');
    switch (action.type) {
        case LOAD_EMPLOEES: return {...state, empAll: action.payload}
        case REMOVE_EMPLOEE: return {...state, empAll: state.empAll.filter(e => e.id !== action.payload)

        }
        case ADD_EMPLOEE: return {
            ...state, 
            empAll: [{...action.payload}, ...state.empAll]
        }
        // case LOAD_IF_EXISTS_USER: return {
        //     ...state,
        //     existsUser: action.payload
        // }
        // case UPDATE_USER_AUTHORIZE: return {
        //     ...state,
        //     existsUser: state.existsUser.map(e => {
        //         parseInt(e.status) === 0 ? e.status = 1 : e.status = 0
        //         return e
        //     })
        // }
        default: return state
    }
}