import { CREATE_NEW_BYPASS, LOAD_BYPASS, SHOW_LOADER, HIDE_LOADER, LOAD_BYPASS_STATUS_OBJECT, LOAD_BYPASS_STATUS_POSTS, LOAD_BYPASS_STATUS_USERS, LOAD_BYPASS_STATUS_USERS_DETAIL, SHOW_LOADER_ICON, HIDE_LOADER_ICON } from "../../components/types"

const initialState = {
    bypassNumber: [],
    bypassGetter: [],
    bypassObjectDetail: [],
    bypassUsersList: [],
    loading: true,
    loaderIcon: false,
    bypassUsersListDetail: [],
    error: null
}

export const bypassReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_BYPASS: return {
            ...state,
            bypassNumber: {bypassId: action.payload, cleanerStatus: action.payload.cleanerStatus}
        }
        case LOAD_BYPASS: return {
            ...state,
            bypassNumber: {bypassId: action.payload.bypassId, cleanerStatus: action.payload.cleanerStatus}
        }
        case SHOW_LOADER: return {
            ...state,
            loading: true
        }
        case HIDE_LOADER: return {
            ...state,
            loading: false
        }
        case HIDE_LOADER_ICON: return {
            ...state,
            loaderIcon: false
        }
        case SHOW_LOADER_ICON: return {
            ...state,
            loaderIcon: true
        }
        case LOAD_BYPASS_STATUS_OBJECT: return {
            ...state,
            bypassGetter: action.payload,
            loading: false
        }
        case LOAD_BYPASS_STATUS_POSTS: return {
            ...state,
            bypassPostsList: action.payload,
            loading: false
        }
        case LOAD_BYPASS_STATUS_USERS: return {
            ...state,
            bypassUsersList: [...state.bypassUsersList, ...action.payload],
            loaderIcon: false
        }
        case LOAD_BYPASS_STATUS_USERS_DETAIL: return {
            ...state,
            bypassUsersListDetail: [...state.bypassUsersListDetail, ...action.payload],
            loading: false
        }
        case 'CLEAR_BYPASS_POSTS': return {
            ...state,
            bypassPostsList: [],
            loading: false
        }
        case 'CLEAR_BYPASS_USERS': return {
            ...state,
            bypassUsersList: [...action.payload.data.filter(el => el.post_name !== action.payload.post)],
            loading: false
        }
        case 'CLEAR_BYPASS_USERS_DETAIL': return {
            ...state,
            bypassUsersListDetail: [...action.payload.data.filter(el => !(el.post_name === action.payload.post && el.email === action.payload.user))],
            loading: false
        }
        case 'LOAD_BYPASS_STATUS_OBJECT_DETAIL': return {
            ...state,
            bypassObjectDetail: [...state.bypassObjectDetail, ...action.payload],
            loaderIcon: false
        }
        case 'CLEAR_BYPASS_OBJECT_DETAIL': return {
            ...state,
            bypassObjectDetail: [...action.payload.data.filter(el => !(el.object_name === action.payload.object_name))],
            loading: false
        }
        default: return state
    }
}