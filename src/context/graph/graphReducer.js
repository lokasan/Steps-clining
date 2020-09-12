import { LOAD_EMPLOEE } from "../../components/types"
const handlers = {
    [LOAD_EMPLOEE]: (state, {userName, steps, key_auth, status}) => ({...state,
    emploee: [
        ...state.emploee,
        {
            id: Date.now().toString(),
            userName,
            steps,
            key_auth,
            status
        }
    ]}),
    DEFAULT: state => state
}
export const graphReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}