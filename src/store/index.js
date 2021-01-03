import { createStore, combineReducers, applyMiddleware } from 'redux'
import { empListReducer } from './reducers/emp'
import thunk from 'redux-thunk'
import { empDoubleReducer } from '../store/reducers/empDouble'
import { objectReducer } from './reducers/object'
import { postReducer } from './reducers/post'
import { componentReducer } from './reducers/component'
import { componentRankReducer } from './reducers/componentRank'
import { postWithComponentReducer } from './reducers/postWithComponent'
const rootReducer = combineReducers({
    empList: empListReducer,
    empDouble: empDoubleReducer,
    object: objectReducer,
    post: postReducer,
    component: componentReducer,
    componentRank: componentRankReducer,
    postWithComponent: postWithComponentReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
// 40 минута в ролике React + Redux