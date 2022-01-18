const initialState = {
    corpusAll: [],
    loading: false,
    error: null,
    corpusAnalyticsBase: []
}

export const corpusReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CORPUS': return {...state, corpusAll: action.payload, loading: false}
        case 'LOAD_CORPUS_ANALYTICS_BASE': return {...state, corpusAnalyticsBase: action.payload, loading: false}
        case 'REMOVE_CORPUS': return {...state, corpusAll: state.corpusAll.filter(e => e.id !== action.payload)}
        case 'ADD_CORPUS': return {...state, corpusAll: [{...action.payload}, ...state.corpusAll]}
        case 'SHOW_LOADER': return {...state, loading: true}
        case 'HIDE_LOADER': return {...state, loading: false}
        case 'CLEAR_CORPUS_STATE': return {...state, corpusAll: []}
        default: return state
    }
}