import { CREATE_NEW_PHOTO_RANK_GALLERY, DELETE_PHOTO_RANK_GALLERY } from "../../components/types"

const initialState = {
    photoRankGallery: []
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
        default: return state
    }
}