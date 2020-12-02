import { ADD_EMPLOEE, LOAD_EMPLOEES, REMOVE_EMPLOEE } from "../../components/types"
const initialState = {
    empAll: [],
    readAndWriteUser: [],
    readUser: [],
    otherUser: []
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
        default: return state
    }
}