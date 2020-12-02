import { createStore, combineReducers, applyMiddleware } from 'redux'
import { empListReducer } from './reducers/emp'
import thunk from 'redux-thunk'
import { empDoubleReducer } from '../store/reducers/empDouble'
const rootReducer = combineReducers({
    empList: empListReducer,
    empDouble: empDoubleReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
// 40 минута в ролике React + Redux