import { CHANGE_SCREEN } from '../../components/types'
const handlers = {
    [CHANGE_SCREEN]: (state, payload) => payload,
    DEFAULT: state => state
}

export const screenReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action.payload)
}