import * as FileSystem from 'expo-file-system'
import { CREATE_NEW_PHOTO_RANK_GALLERY, DELETE_PHOTO_RANK_GALLERY, SHOW_LOADER, HIDE_LOADER } from '../../components/types'
import { DB } from '../../db'

export const createPhotoRankGallery = ( imgRank) => async dispatch => {
    const fileImage = imgRank.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage

    try {
        FileSystem.moveAsync({
            to: newPath,
            from: imgRank.img
        })
    } catch(e) {
        console.log('Error: ', e)
    }
    
    const payload = {...imgRank, img: newPath}

    const id = await DB.createPhotoRankGallery(payload)

    payload.id = id

    dispatch({
        type: CREATE_NEW_PHOTO_RANK_GALLERY,
        payload
    })
}

export const deletePhotoRankGallery = id => async dispatch => {
    await DB.deletePhotoRankGallery(id)
    dispatch({
        type: DELETE_PHOTO_RANK_GALLERY,
        payload:id
    })
}

export const showLoaderPhotoRankGallery = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderPhotoRankGallery = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}