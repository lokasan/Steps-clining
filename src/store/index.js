import { createStore, combineReducers, applyMiddleware } from 'redux'
import { empListReducer } from './reducers/emp'
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    empList: empListReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
// 40 минута в ролике React + Redux