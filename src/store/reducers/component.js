import { LOAD_COMPONENT, ADD_COMPONENT, REMOVE_COMPONENT, UPDATE_COMPONENT } from "../../components/types"
const initialState = {
    componentAll: []
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

export const componentReducer = (state = initialState, action) => {
    console.log(action.type, 'POST');
    switch (action.type) {
        case LOAD_COMPONENT: return {...state, componentAll: action.payload}
        case REMOVE_COMPONENT: return {...state, componentAll: state.componentAll.filter(e => e.id !== action.payload)

        }
        case ADD_COMPONENT: return {
            ...state, 
            componentAll: [{...action.payload}, ...state.componentAll]
        }
        default: return state
    }
}