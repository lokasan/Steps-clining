import { CREATE_NEW_BYPASS, LOAD_BYPASS, SHOW_LOADER, HIDE_LOADER, LOAD_BYPASS_STATUS_OBJECT, LOAD_BYPASS_STATUS_POSTS, LOAD_BYPASS_STATUS_USERS, LOAD_BYPASS_STATUS_USERS_DETAIL, SHOW_LOADER_ICON, HIDE_LOADER_ICON, LOAD_BYPASS_STATUS_USERS_DETAIL_FOR_DAY, CLEAR_BYPASS_STATUS_USERS_DETAIL_FOR_DAY, CLEAR_BYPASS_POSTS, CLEAR_BYPASS_USERS, CLEAR_BYPASS_USERS_DETAIL_ALL, CLEAR_BYPASS_USERS_DETAIL, LOAD_BYPASS_STATUS_OBJECT_DETAIL, CLEAR_BYPASS_OBJECT_DETAIL, CLEAR_BYPASS_OBJECT_DETAIL_ALL, GET_SINGLE_USER_STAT, GET_USERS_BASIC_STAT, GET_LIST_USERS_AVERAGE_FOR_POST, CLEAR_BYPASS_USERS_AVERAGE, CLEAR_BYPASS_USERS_AVERAGE_ALL } from "../../components/types"

const initialState = {
    bypassNumber: [],
    bypassGetter: [],
    bypassObjectDetail: [],
    bypassUsersList: [],
    loading: true,
    loaderIcon: false,
    bypassUsersListDetail: [],
    bypassUSersListDetailForDay: [],
    userSingleStat: [],
    usersBasicStat: [],
    usersAverageStat: [],
    bypassPostsList: [],
    usersWithTbr: [],
    userWithTbrDetail: [],
    userWithTbrCorpus: [],
    userWithTbrCorpusDetail: [],
    componentForBuilding: [],
    listUsersInBuilding: [],
    listUsersInBuildingDetail: [],
    listUsersInCorpusDetail: [],
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
        case LOAD_BYPASS_STATUS_USERS_DETAIL_FOR_DAY: return {
            ...state,
            bypassUSersListDetailForDay: action.payload,
            loading: false
        }
        case CLEAR_BYPASS_STATUS_USERS_DETAIL_FOR_DAY: return {
            ...state,
            bypassUSersListDetailForDay: []
        }
        case "CLEAR_BYPASS_STATUS_OBJECT": return {
            ...state,
            bypassGetter: []
        }
        case CLEAR_BYPASS_POSTS: return {
            ...state,
            bypassPostsList: [],
            loading: false
        }
        case CLEAR_BYPASS_USERS: return {
            ...state,
            bypassUsersList: [...action.payload.data.filter(el => el.post_name !== action.payload.post)],
            loading: false
        }
        case CLEAR_BYPASS_USERS_DETAIL: return {
            ...state,
            bypassUsersListDetail: [...action.payload.data.filter(el => !(el.post_name === action.payload.post && el.email === action.payload.user))],
            loading: false
        }
        case CLEAR_BYPASS_USERS_DETAIL_ALL: return {
            ...state,
            bypassUsersListDetail: [],
            loading: false
        }
        case LOAD_BYPASS_STATUS_OBJECT_DETAIL: return {
            ...state,
            bypassObjectDetail: [...state.bypassObjectDetail, ...action.payload],
            loaderIcon: false
        }
        case CLEAR_BYPASS_OBJECT_DETAIL: return {
            ...state,
            bypassObjectDetail: [...action.payload.data.filter(el => !(el.object_name === action.payload.object_name))],
            loading: false
        }
        case CLEAR_BYPASS_OBJECT_DETAIL_ALL: return {
            ...state,
            bypassObjectDetail: [],
            loading: false
        }
        case GET_SINGLE_USER_STAT: return {
            ...state,
            userSingleStat: action.payload

        }
        case GET_USERS_BASIC_STAT: return {
            ...state,
            usersBasicStat: action.payload
        }
        case GET_LIST_USERS_AVERAGE_FOR_POST: return {
            ...state,
            usersAverageStat: [...state.usersAverageStat, ...action.payload],
            loaderIcon: false
        }
        case CLEAR_BYPASS_USERS_AVERAGE: return {
            ...state,
            usersAverageStat: [...action.payload.data.filter(el => el.post_name !== action.payload.post)],
            loading: false
        }
        case CLEAR_BYPASS_USERS_AVERAGE_ALL: return {
            ...state,
            usersAverageStat: [],
            loading: false
        }
        case 'GET_STATUS_USER_WITH_TBR': return {
            ...state,
            usersWithTbr: action.payload,
            loading: false
        }
        case 'CLEAR_STATUS_USER_WITH_TBR': return {
            ...state,
            usersWithTbr: [],
            loading: false
        }
        case 'GET_STATUS_COMPONENT_FOR_BUILDING': return {
            ...state,
            componentForBuilding: action.payload,
            loading: false
        }
        case 'CLEAR_STATUS_COMPONENT_FOR_BUILDING': return {
            ...state,
            componentForBuilding: [],
        }
        case 'GET_STATUS_USER_WITH_TBR_DETAIL': return {
            ...state,
            userWithTbrDetail: [...state.userWithTbrDetail, ...action.payload],
            loading: false
        }
        case 'GET_STATUS_USER_WITH_TBR_CORPUS': return {
            ...state,
            userWithTbrCorpus: action.payload, 
            loading: false
        }
        case 'CLEAR_STATUS_USER_WITH_TBR_CORPUS': return {
            ...state,
            userWithTbrCorpus: [],
            loading: false
        }
        case 'GET_STATUS_USER_WITH_TBR_CORPUS_DETAIL': return {
            ...state,
            userWithTbrCorpusDetail: [...state.userWithTbrCorpusDetail, ...action.payload],
            loading: false
        }
        case 'CLEAR_STATUS_USER_WITH_TBR_CORPUS_DETAIL': return {
            ...state,
            userWithTbrCorpusDetail: [...action.payload.data.filter(el => !(el.user_id === action.payload.user_id))]
        }
        case 'CLEAR_STATUS_USER_WITH_TBR_DETAIL': return {
            ...state,
            userWithTbrDetail: [...action.payload.data.filter(el => !(el.building_id === action.payload.building_id))],
            loading: false
        }
        case 'CLEAR_STATIC_WITH_TBR_DETAIL': return {
            ...state,
            userWithTbrDetail: [...action.payload.data.filter(el => el.user_id !== action.payload.user_id)],
            loading: false
        }
        case 'CLEAR_STATIC_WITH_TBR_DETAIL_ALL': return {
            ...state,
            userWithTbrDetail: []
        }
        case 'CLEAR_STATIC_WITH_TBR_CORPUS_DETAIL_ALL': return {
            ...state,
            userWithTbrCorpusDetail: []
        }
        case 'GET_CYCLES_LIST_FOR_BUILDING': return {
            ...state,
            listUsersInBuilding: [...state.listUsersInBuilding, ...action.payload]
        }
        case 'GET_CYCLES_LIST_FOR_BUILDING_DETAIL': return {
            ...state,
            listUsersInBuildingDetail: [...state.listUsersInBuildingDetail, ...action.payload]
        }
        case 'CLEAR_CYCLES_LIST_FOR_BUILDING_DETAIL': return {
            ...state,
            listUsersInBuildingDetail: [...action.payload.data.filter(el => el.user_id !== action.payload.user_id)]
        }
        case 'GET_CYCLES_LIST_FOR_CORPUS_DETAIL': return {
            ...state,
            listUsersInCorpusDetail: [...state.listUsersInCorpusDetail, ...action.payload]
        }
        case 'CLEAR_CYCLES_LIST_FOR_CORPUS_DETAIL': return {
            ...state,
            listUsersInCorpusDetail: [...action.payload.data.filter(el => el.user_id !== action.payload.user_id)]
        }
        case 'CLEAR_CYCLES_LIST_FOR_BUILDING_DETAIL_ALL': return {
            ...state,
            listUsersInBuildingDetail: []
        }
        default: return state
    }
}