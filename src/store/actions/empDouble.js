import { ADD_EMPLOEE, LOAD_EMPLOEE, LOAD_EMPLOEES, REMOVE_EMPLOEE } from "../../components/types"
import { DATA } from '../../testData'

export const loadEmploeeDouble = () => {
    return {
        type: LOAD_EMPLOEES,
        payload: DATA
    }
}
export const removeEmploee = id => {
    return {
        type: REMOVE_EMPLOEE,
        payload: id
    }
}

export const addEmploee = emploee => {
    emploee.id = Date.now().toString()

    return {
        type: ADD_EMPLOEE,
        payload: emploee
    }
}