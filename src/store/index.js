import { createStore, combineReducers } from 'redux'
import { empListReducer } from './reducers/emp'
const rootReducer = combineReducers({
    empList: empListReducer
})

export default createStore(rootReducer)