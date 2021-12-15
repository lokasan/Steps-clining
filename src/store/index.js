import { createStore, combineReducers, applyMiddleware } from 'redux'
import { empListReducer } from './reducers/emp'
import thunk from 'redux-thunk'
import { empDoubleReducer } from '../store/reducers/empDouble'
import { objectReducer } from './reducers/object'
import { corpusReducer } from './reducers/corpus'
import { postReducer } from './reducers/post'
import { componentReducer } from './reducers/component'
import { componentRankReducer } from './reducers/componentRank'
import { postWithComponentReducer } from './reducers/postWithComponent'
import { bypassReducer } from './reducers/bypass'
import { bypassRankReducer } from './reducers/bypassRank'
import { photoRankGalleryReducer } from './reducers/photoRankGallery'
const rootReducer = combineReducers({
    empList: empListReducer,
    empDouble: empDoubleReducer,
    object: objectReducer,
    corpus: corpusReducer,
    post: postReducer,
    component: componentReducer,
    componentRank: componentRankReducer,
    postWithComponent: postWithComponentReducer,
    bypass: bypassReducer,
    bypassRank: bypassRankReducer,
    photoRanGallery: photoRankGalleryReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))
// 40 минута в ролике React + Redux