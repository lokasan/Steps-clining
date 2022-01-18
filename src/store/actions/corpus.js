import * as FileSystem from "expo-file-system";
import { HIDE_LOADER, SHOW_LOADER } from "../../components/types";
import { DB } from '../../db';
import { UploadDataToServer } from '../../uploadDataToServer';

export const loadCorpus = () => async dispatch => {
    dispatch(showLoaderCorpus())
    await UploadDataToServer.getCorpus()
}

export const loadCorpusBypassBase = (period, start_time=null, end_time=null) => async dispatch => {
    await UploadDataToServer.getBypassCorpusBase(period, start_time, end_time)
}

export const removeCorpus = id => async dispatch => {
    await UploadDataToServer.removeCorpus(id)
    await DB.removeCorpus(id)
    dispatch({
        type: 'REMOVE_CORPUS',
        payload: id
    })
}

export const addCorpus = corpus => async dispatch => {
    const fileImage = corpus.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileImage
    try {
        FileSystem.moveAsync({
            to: newPath,
            from: corpus.img
        })
    } catch(e) {
        console.log('Error:', e)
    }
    const payload = {...corpus, img: newPath}
    payload.id = Date.now()
    await DB.createCorpus(payload)
    await UploadDataToServer.addCorpus(newPath, payload)

    dispatch({
        type: 'ADD_CORPUS',
        payload
    })
}

export const updateCorpus = corpus => async dispatch => {
    await DB.updateCorpus(corpus)
    dispatch({
        type: 'UPDATE_CORPUS',
        payload: corpus.id
    })
}

export const showLoaderCorpus = () => async dispatch => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoaderCorpus = () => async dispatch => {
    dispatch({
        type: HIDE_LOADER
    })
}