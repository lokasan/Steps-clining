const initialState = {
    isLogin: false
}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_IN': return {
            ...state, 
            isLogin: true
        }
        case 'SIGN_OUT': return {
            ...state,
            isLogin: false
        }
        default: return state
    }
} 