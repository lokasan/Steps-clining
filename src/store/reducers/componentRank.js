import { ADD_POST, LOAD_COMPONENT_RANK, LOAD_POST, REMOVE_COMPONENT_RANK, REMOVE_POST, ADD_COMPONENT_RANK, UPDATE_COMPONENT, UPDATE_COMPONENT_RANK, EDIT_COMPONENT_RANK, SHOW_LOADER, HIDE_LOADER } from "../../components/types"
const initialState = {
    componentRankAll: [],
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

export const componentRankReducer = (state = initialState, action) => {
    // console.log(action.type, 'COMPONENT_RANK');
    let count = 1
    switch (action.type) {
        case LOAD_COMPONENT_RANK: return {...state, componentRankAll: action.payload.sort((prev, next) => prev.rank - next.rank)}
        case REMOVE_COMPONENT_RANK: return {...state, componentRankAll: state.componentRankAll.filter(e => e.id !== action.payload)

        }
        case ADD_COMPONENT_RANK: return {
            ...state, 
            componentRankAll: [{...action.payload}, ...state.componentRankAll]
        }
        case UPDATE_COMPONENT_RANK: return {componentRankAll: action.payload.componentRank.map(e => {
            const emptyComponentRank = (5 / (action.payload.componentLength)).toFixed(2)
            if (e.rank !== 5) {
                e.rank = emptyComponentRank * action.payload.count > 5 ? 5 : emptyComponentRank * action.payload.count
                action.payload.count += 1
            }
            return e
        })}
        case EDIT_COMPONENT_RANK: return {...state,
            componentRankAll: state.componentRankAll.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            })
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