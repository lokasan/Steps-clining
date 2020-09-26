import { CLEAR_ERROR, FETCH_USERS, HIDE_LOADER, LOAD_EMPLOEE, SHOW_ERROR, SHOW_LOADER } from "../../components/types"
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
    DEFAULT: state => state
}
export const graphReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}