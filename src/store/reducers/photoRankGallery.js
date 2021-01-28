import { CREATE_NEW_PHOTO_RANK_GALLERY, DELETE_PHOTO_RANK_GALLERY, HIDE_LOADER, SHOW_LOADER } from "../../components/types"

const initialState = {
    photoRankGallery: [],
    loading: false,
    error: null
}
export const photoRankGalleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NEW_PHOTO_RANK_GALLERY: return {
            ...state,
            photoRankGallery: [{...action.payload}, ...state.photoRankGallery]
        }
        case DELETE_PHOTO_RANK_GALLERY: return {
            ...state,
            photoRankGallery: state.photoRankGallery.filter(e => e.id !== action.payload)
        }
        case SHOW_LOADER: return {
            ...state,
            loading: true
        }
        case HIDE_LOADER: return {
            ...state,
            loading: false
        }
        default: return state
    }
}