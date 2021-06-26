
import { CLEAR_ERROR, FETCH_USERS, HIDE_LOADER, LOAD_EMPLOEE, SHOW_ERROR, SHOW_LOADER, UPDATE_EMPLOEE } from "../../components/types"
const initialState = {
    emploee: [],
    loading: false,
    error: null,
    existsEmail: 0
}
const handlers = {
    [LOAD_EMPLOEE]: (state, {id, userName, steps, key_auth, status}) => ({...state,
    emploee: [
        ...state.emploee,
        {
            id,
            userName,
            steps,
            key_auth,
            status
        }
    ]}),
    [FETCH_USERS]: (state, { emploee }) => ({ ...state, emploee }),
    [SHOW_LOADER]: state => ({ ...state, loading: true}),
    [HIDE_LOADER]: state => ({ ...state, loading: false}),
    [CLEAR_ERROR]: state => ({ ...state, error: null}),
    [SHOW_ERROR]: (state, {error}) => ({ ...state, error}),
    [UPDATE_EMPLOEE]: (state, {key_auth, steps}) => ({...state, 
    emploee: state.emploee.map(emploee => {
        if (emploee.key_auth === key_auth) {
            emploee.steps = steps
        }
        return emploee
    })
    }),
    ['EXISTS_EMAIL']: (state, action) => ({ ...state, existsEmail: action.payload}),
    DEFAULT: state => state
}
export const empListReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}