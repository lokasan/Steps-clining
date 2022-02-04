import * as firebase from 'firebase'
import * as FileSystem from 'expo-file-system'

import {StyleSheet, View, FlatList, Image, ScrollView, Text, TouchableOpacity, Button, Touchable, Alert} from 'react-native'
import { ADD_OBJECT, ACTION, CREATE, MESSAGE, NAME_FILE, NAME, ADDRESS, DESCRIPTION, IMG, 
    ADD_POST, QR_CODE_IMG, QR_CODE, EDIT_COMPONENT_RANK, BUILDING_ID, ADD_COMPONENT, ADD_COMPONENT_RANK, 
    REMOVE_COMPONENT_RANK, CREATE_COMPONENT_TO_POST_LINK, POST_ID, COMPONENT_ID, DELETE_COMPONENT_TO_POST_LINK, 
    REMOVE_COMPONENT, REMOVE_OBJECT, REMOVE_EMPLOEE, USER_ID, 
    CREATE_BYPASS, CREATE_BYPASS_RANK, BYPASS_ID, WEATHER, TEMPERATURE, END_TIME, UPDATE_BYPASS, AVG_RANK, 
    UPDATE_BYPASS_RANK, CREATE_USER, SURNAME, LASTNAME, POSITION, EMAIL, PRIVILEG, KEY_AUTH, STATUS, GET_OBJECTS, 
    LOAD_OBJECT, GET_POSTS_ALL, LOAD_POST, GET_POSTS, GET_COMPONENTS, LOAD_COMPONENT, GET_COMPONENT_RANKS, 
    LOAD_COMPONENT_RANK, UPDATE_COMPONENT_RANK, LOAD_COMPONENT_TO_POST_LINK, GET_COMPONENT_TO_POST_LINK, IMAGE,
    GET_BYPASS_STATUS_OBJECT, LOAD_BYPASS_STATUS_OBJECT, REMOVE_POST, GET_OBJECTS_SYNCHRONIZE, GET_POSTS_SYNCHRONIZE, 
    GET_COMPONENTS_SYNCHRONIZE, GET_COMPONENTS_RANKS_SYNCHRONIZE, FINISHED_BYPASS, GET_BYPASS_STATUS_POSTS, 
    LOAD_BYPASS_STATUS_POSTS, GET_BYPASS_STATUS_USERS, LOAD_BYPASS_STATUS_USERS, GET_BYPASS_STATUS_USERS_DETAIL, LOAD_BYPASS_STATUS_USERS_DETAIL, UPDATE_EMPLOEE_PRIVILEG, GET_LIST_USERS_AVERAGE_FOR_POST, GET_USERS_BASIC_STAT, GET_SINGLE_USER_STAT, GET_BYPASS_RANK_IMAGE_COUNT, ADD_ACTIVE_USER, GET_ACTIVE_USERS, HIDE_LOADER_BYPASS_RANK, HIDE_LOADER_COMPONENT_RANK, HIDE_LOADER, HIDE_LOADER_ICON, UPDATE_USER_AUTHORIZE} from './components/types'
import { DB } from './db';
import { msToTime, timeToFormat } from './utils/msToTime'


let ws            = new WebSocket('ws://192.168.1.11:8760');
    ws.binaryType = 'arraybuffer'
    ws.onmessage  = function(event) {
    socket_onmessage_callback(event.data)
    
}

ws.onclose = function(event) {
    if (event.wasClean) {
      alert('Соединение закрыто чисто');
    } else {
      alert('Обрыв соединения'); // например, "убит" процесс сервера
    }
    alert('Код: ' + event.code + ' причина: ' + event.reason);
  };

ws.onerror = function(error) {
    alert("Ошибка " + error.message);
};


async function socket_onmessage_callback(recv) {
    const data = JSON.parse(recv)
    //last click screen with elements
    if (ACTION in data && data[ACTION] === 'GET_USER_IN_LOCAL_BASE') {
        await DB.createUser(data[MESSAGE])
    }
    if (ACTION in data && data[ACTION] === GET_OBJECTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_OBJECT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_POSTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_POST,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_COMPONENT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENT_RANKS) {
        // dispatch(hideLoaderComponentRank())
        dispatch({
            type   : LOAD_COMPONENT_RANK,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENT_TO_POST_LINK) {
        for (let el of data[MESSAGE]) {
            let img = await DB.getComponentInfoById(el['id'])
            el['img'] = img[0]['img']
        }
        
        dispatch({
            type   : LOAD_COMPONENT_TO_POST_LINK,
            payload: data[MESSAGE]
        })

    } else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_OBJECT) {
        data[MESSAGE].map((el) => el['countTime'] = timeToFormat(msToTime(el['countTime'])))
        
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_BYPASS_STATUS_OBJECT,
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'GET_BYPASS_STATUS_OBJECT_DETAIL') {
        dispatch({
            type: HIDE_LOADER_ICON
        })
        dispatch({
            type: 'LOAD_BYPASS_STATUS_OBJECT_DETAIL',
            payload: data[MESSAGE]
        })
    }
    else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_POSTS) {
        data[MESSAGE].map((el) => el['countTime'] = timeToFormat(msToTime(el['countTime'])))
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type: LOAD_BYPASS_STATUS_POSTS,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_USERS) {
        data[MESSAGE].map((el) => el['countTime'] = timeToFormat(msToTime(el['countTime'])))
        dispatch({
            type: HIDE_LOADER_ICON
        })
        dispatch({
            type: LOAD_BYPASS_STATUS_USERS,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_USERS_DETAIL) {
        data[MESSAGE].map((el) => el['countTime'] = timeToFormat(msToTime(el['end_time'] - el['start_time'])))
        dispatch({
            type: HIDE_LOADER_ICON
        })
        dispatch({
            type: LOAD_BYPASS_STATUS_USERS_DETAIL,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_BYPASS_STATUS_USERS_DETAIL_FOR_DAY') {
        data[MESSAGE].map((el) => el['countTime'] = timeToFormat(msToTime(el['end_time'] - el['start_time'])))
        dispatch({
            type: HIDE_LOADER_ICON
        })
        dispatch({
            type: 'LOAD_BYPASS_STATUS_USERS_DETAIL_FOR_DAY',
            payload: data[MESSAGE]
        })
    }
    else if (ACTION in data && data[ACTION] === 'GET_CORPUS_SYNCHRONIZE') {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getCorpusById, DB.createCorpus, DB.removeCorpus)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type: 'LOAD_CORPUS',
            payload: await DB.getCorpuses()
        })
    }
    else if (ACTION in data && data[ACTION] === 'GET_OBJECTS_SYNCHRONIZE_ID') {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getObjectById, DB.createObject, DB.removeObject)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : 'LOAD_OBJECT_FOR_CORPUS',
            payload: await DB.getObjectsByCorpusId(data['TARGET_ID'])
        })
    }
    else if (ACTION in data && data[ACTION] === GET_OBJECTS_SYNCHRONIZE) {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getObjectById, DB.createObject, DB.removeObject)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_OBJECT,
            payload: await DB.getObjects()
        })
    } else if (ACTION in data && data[ACTION] === 'GET_ALL_POSTS_FROM_SERVER') {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getPostById, DB.createPost, DB.removePost)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : GET_POSTS_ALL,
            payload: await DB.getPostAll()
        })
    } else if (ACTION in data && data[ACTION] === GET_POSTS_SYNCHRONIZE) {
        console.log('NEW ELEMENTS OF POSTS')
        try {
            data['CREATE_ELEMENTS'].forEach((el) => {
                console.log('POST NAME OF OUTTER QUERY TO DATABASE: ', el.name)
            })
        } catch(err) {
            console.log(err)

        } finally {
            console.log('END ELEMENTS OF POSTS PARTITION')
        }
        // data['CREATE_ELEMENTS'].forEach((el) => console.log('POST NAME IS: ', el.name))
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getPostById, DB.createPost, DB.removePost)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_POST,
            payload: await DB.getPosts(data['TARGET_ID'])  /* target id for elements with included  */
        })
    } else if (ACTION in data && data[ACTION] === 'GET_POSTS_FOR_CORPUS_SYNCHRONIZE') {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getPostById, DB.createPost, DB.removePost)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_POST,
            payload: await DB.getPostsForCorpus(data['TARGET_ID'])  /* target id for elements with included  */
        })
    }
        else if (ACTION in data && data[ACTION] === GET_COMPONENTS_SYNCHRONIZE) {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getCompoentById, DB.createComponent, DB.removeComponent)
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type   : LOAD_COMPONENT,
            payload: await DB.getComponents()
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENTS_RANKS_SYNCHRONIZE) {
        await doCreateAndRemoveLocalStoreAndBase(
            data, 
            DB.getComponentRankPureId, 
            DB.createComponentRank, 
            DB.removeComponentRank, 
            DB.editComponentRank,
            DB.updateComponentRank)
        dispatch({
            type: HIDE_LOADER_COMPONENT_RANK
        })
        dispatch({
            type   : LOAD_COMPONENT_RANK,
            payload: await DB.getComponentRankId(data['TARGET_ID'])
        })
    } else if (ACTION in data && data[ACTION] === 'CHECK_EMAIL') {
        dispatch({
            type: 'EXISTS_EMAIL',
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'ADD_ACTIVE_USER') {
        dispatch({
            type: 'ADD_ACTIVE_USER',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'REMOVE_ACTIVE_USER') {
        dispatch({
            type: 'REMOVE_ACTIVE_USER',
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'GET_ACTIVE_USERS') {
        dispatch({
            type: 'GET_ACTIVE_USERS',
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'GET_USER_SHIFT') {
        dispatch({
            type: 'GET_USER_SHIFT',
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'USER_LOGOUT') {
        dispatch({
            type: 'REMOVE_ACTIVE_USER',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'CHECK_AUTHENTICATION') {
        console.log('CHECK_AUTHETICATION ', data['MESSAGE']['email'], data['MESSAGE']['id'])
        const user = {
                        status: 0, 
                        email: data[MESSAGE]['email'], 
                        id: data[MESSAGE]['id'], 
                        isAccess: data[MESSAGE]['email'] ? 1 : -1
                    }

        await DB.updateUserAuthorize(user.status === 0 ? 1 : 0, user.email)
        if (user.status) {
            await UploadDataToServer.userLogout(user)
        } else if (~user.isAccess) {
            await UploadDataToServer.addActiveUser(user.id)
        }
        dispatch({
            type   : UPDATE_USER_AUTHORIZE,
            payload: user
        })
    } else if (ACTION in data && data[ACTION] === 'UPDATE_EMPLOEE_PRIVILEG') {
        await DB.updateUserPrivileg(data[MESSAGE])
        dispatch({
            type: 'UPDATE_EMPLOEE_PRIVILEG',
            payload: data[MESSAGE]
        })
    }
    else if (ACTION in data && data[ACTION] === 'GET_USERS') {
        await doCreateAndRemoveLocalStoreAndBase(
            data,
            DB.getUserById,
            DB.createUser,
            DB.removeUser,
            DB.editUser)
        // data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch({
            type: 'GET_USERS',
            payload: (await DB.getUsers()).map((el) => ({...el, test_name: 'Roboto'}))
        })
    } else if (ACTION in data && data[ACTION] === 'GET_IMAGE_FOR_BYPASS') {
        const myListBypassRankImage = []
        for (var i=0; i < data['CONTENT'].length; i++) {
            const filename = FileSystem.cacheDirectory + data['BYPASS_RANK_ID'] + '_' + Date.now().toString() + i.toString() + + '.jpeg'
            await FileSystem.writeAsStringAsync(filename, data['CONTENT'][i], {
                encoding: FileSystem.EncodingType.Base64
            })
            const spreadDataIfExists = data['DATA'] ? data['DATA'][i] : Object.create(null)
            myListBypassRankImage.push({filename, ...spreadDataIfExists})
        }
        dispatch({
            type: HIDE_LOADER_BYPASS_RANK
        })
        dispatch({
            type: 'GET_IMAGE_BYPASS_RANK',
            payload: myListBypassRankImage
        })
        
    } else if (ACTION in data && data[ACTION] === GET_BYPASS_RANK_IMAGE_COUNT) {
        dispatch({
            type: GET_BYPASS_RANK_IMAGE_COUNT,
            payload: data['LENGTH']
        })
    } else if (ACTION in data && data[ACTION] === GET_SINGLE_USER_STAT) {
        dispatch({
            type: GET_SINGLE_USER_STAT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_USERS_BASIC_STAT) {
        dispatch({
            type: GET_USERS_BASIC_STAT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_LIST_USERS_AVERAGE_FOR_POST) {
        dispatch({
            type: HIDE_LOADER
        })
        dispatch({
            type: GET_LIST_USERS_AVERAGE_FOR_POST,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_STATUS_USER_WITH_TBR') {
        dispatch({
            type: 'GET_STATUS_USER_WITH_TBR',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_STATUS_USER_WITH_TBR_DETAIL') {
        dispatch({
            type: 'GET_STATUS_USER_WITH_TBR_DETAIL',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_STATUS_USER_WITH_TBR_CORPUS') {
        dispatch({
            type: 'GET_STATUS_USER_WITH_TBR_CORPUS',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_STATUS_USER_WITH_TBR_CORPUS_DETAIL') {
        dispatch({
            type: 'GET_STATUS_USER_WITH_TBR_CORPUS_DETAIL',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_IMAGE_BYPASS_USER_OF_POST_COUNT') {
        dispatch({
            type: GET_BYPASS_RANK_IMAGE_COUNT,
            payload: data['LENGTH']
        })
    } else if (ACTION in data && data[ACTION] === 'GET_STATUS_COMPONENT_FOR_BUILDING') {
        dispatch({
            type: 'GET_STATUS_COMPONENT_FOR_BUILDING',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_BYPASS_CORPUS_BASE') {
        dispatch({
            type: 'LOAD_CORPUS_ANALYTICS_BASE',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_CYCLES_LIST_FOR_BUILDING') {
        dispatch({
            type: 'GET_CYCLES_LIST_FOR_BUILDING',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_CYCLES_LIST_FOR_BUILDING_DETAIL') {
        dispatch({
            type: 'GET_CYCLES_LIST_FOR_BUILDING_DETAIL',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_BYPASS_LIST_OF_POST_IN_CYCLE') {
        dispatch({
            type: 'GET_BYPASS_LIST_OF_POST_IN_CYCLE',
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'GET_CYCLES_LIST_FOR_CORPUS_DETAIL') {
        dispatch({
            type: 'GET_CYCLES_LIST_FOR_CORPUS_DETAIL',
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === 'GET_BYPASS_MAP_COMPLETE_CYCLE') {
        dispatch({
            type: 'GET_BYPASS_MAP_COMPLETE_CYCLE',
            payload: data[MESSAGE]
        })
    }
    // `data:image/jpeg;base64,${object.path}
    
}
//  разобраться с багом отображения на андройде
export async function doCreateAndRemoveLocalStoreAndBase(data, get, create, remove, edit, update) {
    if (data['CREATE_ELEMENTS'].length) {
        // if (ACTION in data && data['ACTION'] === 'GET_USERS') {
        //     console.log(data['CONTENT'])
        // }

        await data['CREATE_ELEMENTS'].map((el, id) => el['path'] = data['CONTENT'][id])
        // data['CREATE_ELEMENTS'].forEach(async (el, id) => {
        //     const filename = FileSystem.documentDirectory + el['image'].match(/\d+.jpeg$|\d+.jpg$|\d+.gif$/g)
        //     await FileSystem.writeAsStringAsync(filename, el['path'], {
        //        encoding: FileSystem.EncodingType.Base64
        //     })
        //     const obj = await get(el['id'])
        //     if (!obj.length) {
        //         await create({...el, img: filename})
                
        //     }
        // })



        // 
        for (let el of data['CREATE_ELEMENTS']) {
           const filename = FileSystem.documentDirectory + el['image'].match(/\d+.jpeg$|\d+.jpg$|\d+.gif$/g)
           await FileSystem.writeAsStringAsync(filename, el['path'], {
               encoding: FileSystem.EncodingType.Base64
           })
           const obj = await get(el['id'])
           if (!obj.length) {
            await create({...el, img: filename})
                
           }
        }
    }
    if (data['REMOVE_ELEMENTS'].length) {
        for (let el of data['REMOVE_ELEMENTS']) {
            const obj = await get(el['id'])
            if (obj.length) {
                await remove(el['id'])
                const exists = await FileSystem.getInfoAsync(obj[0].img)
                if (exists.exists) {
                    await FileSystem.deleteAsync(obj[0].img)
                }
                
                
            }
            
        }
    }
    if (data['EDIT_ELEMENTS'].length) {
        // for (el of data['EDIT_ELEMENTS']) {
        //     if (el[''])
        // }
    }
    if (data['UPDATE_ELEMENTS'].length) {
        data['UPDATE_ELEMENTS'].map((el, id) => el['path'] = data['CONTENT_UPDATE'][id])
        for (let el of data['UPDATE_ELEMENTS']) {
            const obj = await get(el['id'])
            if (obj.length) {
                const filename = FileSystem.documentDirectory + el['image'].match(/\d+.jpeg$|\d+.jpg$|\d+.gif$/g)
                await FileSystem.writeAsStringAsync(filename, el['path'], {encoding: FileSystem.EncodingType.Base64})
                el.img = filename
                await edit(el)
            }
        }
    }
}

export class UploadDataToServer {
    static async getBlob(path) {
        const rps  = await fetch(path)
        const blob = await rps.blob()
        return blob
    }
    
    static async addUser(path, payload) {
        const blob = await this.getBlob(path)
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION     : CREATE_USER,
                    ID         : payload.id,
                    SURNAME    : payload.surname,
                    NAME       : payload.name,
                    LASTNAME   : payload.lastname,
                    POSITION   : payload.position,
                    EMAIL      : payload.email,
                    PRIVILEG   : payload.privileg,
                    KEY_AUTH   : payload.key_auth,
                    STATUS     : payload.status,
                    NAME_FILE  : String(Date.now()),
                    IMAGE      : payload.image,
                    PASSWD_HASH: payload.password,
                    START_SHIFT: payload.start_shift,
                    PATH       : base64data,
                    EXTENSIONS: payload.extensions
                    // NOTIFICATION_TOKEN: ''
    
                }))
        }
        // const blob = await this.getBlob(path)
        // ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
        
    }

    static async addCorpus(path, payload) {
        const blob = await this.getBlob(path)
        let reader = new FileReader()
        // console.log('Hello, i am here in addCorpus now!')
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            let base64data = reader.result
            ws.send(JSON.stringify({
                ACTION: 'ADD_CORPUS',
                ID: payload.id,
                NAME_FILE: String(Date.now()),
                NAME: payload.name,
                DESCRIPTION: payload.description,
                ADDRESS: payload.address,
                COORDS: payload.coords,
                IMG: payload.img,
                PATH: base64data,
                EXTENSIONS: payload.extensions
            }))
        }
    }

    static async addObject(path, payload) { 
        const blob   = await this.getBlob(path)
        let   reader = new FileReader()
        // const testOb = await DB.getObjects()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION     : ADD_OBJECT,
                    ID         : payload.id,
                    CORPUS_ID: payload.corpus_id,
                    NAME_FILE  : String(Date.now()),
                    NAME       : payload.name,
                    ADDRESS    : payload.address,
                    DESCRIPTION: payload.description,
                    IMG        : payload.img,
                    PATH       : base64data,
                    EXTENSIONS: payload.extensions
                }))
        }


        // const blob = await this.getBlob(path)

        // ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})

        
        // const imgNumber = Date.now()
        // const response = await fetch('https://brigadir-cc6a6-default-rtdb.firebaseio.com/objects.json', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({ ...payload, img: `images/object/${payload.name}/${String(imgNumber)}` })
        // })
        // const data = await response.json()
        // console.log(blob, 'blobs')
        // var ref = firebase.storage().ref().child(`images/object/${payload.name}/` + String(imgNumber))
        // ref.put(blob, {'Content-Type': 'image/jpeg'})
        
    }
    static async addPost(path, payload) {
        const blob   = await this.getBlob(path)
        let   reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION     : ADD_POST,
                    ID         : payload.id,
                    BUILDING_ID: payload.building_id,
                    NAME_FILE  : String(Date.now()),
                    NAME       : payload.name,
                    DESCRIPTION: payload.description,
                    IMG        : payload.img,
                    QRCODE     : payload.qrcode,
                    QRCODE_IMG : payload.qrcode_img,
                    PATH       : base64data,
                    EXTENSIONS: payload.extensions
                }))
        }
        

    }
    static async addComponent(path, payload) {
        const blob   = await this.getBlob(path)
        let   reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION     : ADD_COMPONENT,
                    ID         : payload.id,
                    NAME_FILE  : String(Date.now()),
                    NAME       : payload.name,
                    DESCRIPTION: payload.description,
                    IMG        : payload.img,
                    PATH       : base64data,
                    EXTENSIONS: payload.extensions
                }))
        }
        

        

        // ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
    }
    static async addComponentRank(path, payload) {
        const blob   = await this.getBlob(path)
        let   reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION      : ADD_COMPONENT_RANK,
                    ID          : payload.id,
                    COMPONENT_ID: payload.component_id,
                    NAME_FILE   : String(payload.id),
                    NAME        : payload.name,
                    RANK        : payload.rank,
                    IMAGE       : payload.img,
                    img         : payload.img,
                    PATH        : base64data,
                    EXTENSIONS: payload.extensions
                }
            ))
        }
    }
    static async editComponentRank(path, payload) {
        if (payload.flag) {
            const blob   = await this.getBlob(path)
            let   reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = function() {
                let base64data = reader.result
                ws.send(JSON.stringify(
                    {
                        ACTION           : EDIT_COMPONENT_RANK,
                        ID: payload.id,
                        COMPONENT_ID     : payload.component_id,
                        NAME_FILE        : payload.idAndFileName,
                        NAME             : payload.name,
                        IMAGE            : payload.img,
                        IMG              : payload.img,
                        PATH             : base64data,
                        EXTENSIONS: payload.extensions
                    }))
            }
        } else {
            ws.send(JSON.stringify(
                {
                    ACTION           : EDIT_COMPONENT_RANK,
                    ID: payload.id,
                    COMPONENT_ID     : payload.component_id,
                    NAME_FILE        : '',
                    NAME             : payload.name,
                    IMAGE            : payload.img,
                    IMG              : payload.img,
                    PATH             : ''
                }))
        }
        
    }
    static async removeComponentRank(id) {
        ws.send(JSON.stringify(
            {
                ACTION           : REMOVE_COMPONENT_RANK,
                ID: id
            }))
    }
    static async addLinkPostWithComponent(id, postId, componentId) {
        ws.send(JSON.stringify(
            {
                ACTION      : CREATE_COMPONENT_TO_POST_LINK,
                ID          : id,
                POST_ID     : postId,
                COMPONENT_ID: componentId
            }))
    }
    static async removeLinkPostWithComponent(postId, componentId) {
        ws.send(JSON.stringify(
            {
                ACTION      : DELETE_COMPONENT_TO_POST_LINK,
                POST_ID     : postId,
                COMPONENT_ID: componentId
            }))
    }
    static async removeComponent(id) {
        ws.send(JSON.stringify(
            {
                ACTION      : REMOVE_COMPONENT,
                COMPONENT_ID: id
            }))
    }
    static async removePost(id) {
        ws.send(JSON.stringify(
            {
                ACTION     : REMOVE_POST,
                POST_ID    : id
            }))
    }
    static async removeCorpus(id) {
        ws.send(JSON.stringify({
            ACTION: 'REMOVE_CORPUS',
            CORPUS_ID: id
        }))
    }
    static async removeObject(id) {
        ws.send(JSON.stringify(
            {
                ACTION     : REMOVE_OBJECT,
                BUILDING_ID: id
            }))
    }
    static async removeUser(id) {
        ws.send(JSON.stringify(
            {
                ACTION : REMOVE_EMPLOEE,
                USER_ID: id
            }))
    }
    static async addBypass(id, userId, postId, weather, temperature, icon) {
        ws.send(JSON.stringify(
            {
                ACTION     : CREATE_BYPASS,
                ID         : id,
                USER_ID    : userId,
                POST_ID    : postId,
                START_TIME : String(Date.now()),
                WEATHER    : weather,
                TEMPERATURE: temperature,
                ICON: icon
            }))
    }
    static async addBypassRank(id, bypassId, component_id, start_time) {
        ws.send(JSON.stringify(
            {
                ACTION      : CREATE_BYPASS_RANK,
                ID          : id,
                BYPASS_ID   : bypassId,
                COMPONENT_ID: component_id,
                START_TIME  : start_time
            }))
    }
    
    static async editBypassRankAndImage(image, componentRankId, bypassId, bypassRankId) {
        const imageArray = []
        for (const el of image) {
            const blob = await this.getBlob(el.image)
            let reader = new FileReader()
            reader.readAsDataURL(blob)
            reader.onloadend = async function() {
                imageArray.push({
                    id: el.id,
                    image: reader.result
                })
                if (imageArray.length === image.length) {
                    ws.send(JSON.stringify({
                        ACTION: 'EDIT_BYPASSRANK_AND_IMAGE',
                        COMPONENT_RANK_ID: componentRankId,
                        BYPASS_RANK_ID: bypassRankId,
                        BYPASS_ID: bypassId,
                        PATH: imageArray,
                        END_TIME: String(Date.now())
                    }))
                }
            }
        }
    }

    static async getBypassPhotoCount(bypass_rank_id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_IMAGE_FOR_BYPASS_COUNT',
            BYPASS_RANK_ID: bypass_rank_id
        }))
    }

    static async getBypassPhoto(bypass_rank_id, offset) {
        ws.send(JSON.stringify({
            ACTION: 'GET_IMAGE_FOR_BYPASS',
            BYPASS_RANK_ID: bypass_rank_id,
            LIMIT: 1,
            OFFSET: offset
        }))
    }

    static async editBypassRank(componentRankId, id) {
        ws.send(JSON.stringify(
            {
                ACTION           : UPDATE_BYPASS_RANK,
                COMPONENT_RANK_ID: componentRankId,
                BYPASS_RANK_ID   : id,
                END_TIME         : String(Date.now())
            }))
    }
    static async editBypass(avgRank, id) {
        ws.send(JSON.stringify(
            {
                ACTION   : UPDATE_BYPASS,
                BYPASS_ID: id,
                AVG_RANK : avgRank
            }))
    }
    static async endBypass(avgRank, id) {
        ws.send(JSON.stringify(
            {
                ACTION   : FINISHED_BYPASS,
                AVG_RANK : avgRank,
                BYPASS_ID: id,
                END_TIME : String(Date.now())
            }))
    }
    static async isCleanerOnBypass(cleaner, bypassId) {
        ws.send(JSON.stringify(
            {
                ACTION           : 'CLEANER_ON_BYPASS',
                CLEANER_ON_BYPASS: cleaner,
                BYPASS_ID        : bypassId
            }))
    }
    static async getUsers() {
        ws.send(JSON.stringify(
            {
                ACTION: 'GET_USERS',
                LOCAL_DATABASE: await DB.getUsers()
            }
        ))
    }

    static async getCorpus() {
        ws.send(JSON.stringify({
            ACTION: 'GET_CORPUS',
            LOCAL_DATABASE: await DB.getCorpuses()
        }))
    }
    static async getObjectById(corpus_id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_OBJECT_BY_ID',
            TARGET_ID: corpus_id,
            LOCAL_DATABASE: await DB.getObjectById(corpus_id)
        }))
    }
    static async getObject() {
        // const response = await fetch('https://brigadir-cc6a6-default-rtdb.firebaseio.com/objects.json', {
        //     headers: {'Content-Type': 'application.json'}
        // })
        // const data = await response.json()
        // console.log(data, 'SRF');
        // const object  = Object.keys(data).map((key) => ({id: key, ...data[key]}))
        ws.send(JSON.stringify({
            ACTION        : GET_OBJECTS,
            LOCAL_DATABASE: await DB.getObjects(),
            COUNT         : 10
        }))
        
        // for (el of object) {
        //     el.img = await firebase.storage().ref().child(el.img).getDownloadURL()
        // }
       
        // console.log(object, 'finish');
        // console.log(data, 'mydata');
        
    }
    static async getAllPostsFromServer() {
        ws.send(JSON.stringify(
            {
                ACTION: 'GET_ALL_POSTS_FROM_SERVER',
                LOCAL_DATABASE: await DB.getPostAll()
            }))
    }
    static async getPosts(building_id) {
        ws.send(JSON.stringify(
            {
                ACTION        : GET_POSTS,
                MESSAGE       : building_id,
                LOCAL_DATABASE: await DB.getPosts(building_id)
            }))
    }
    static async getPostsForCorpus(corpus_id) {
        ws.send(JSON.stringify({
            ACTION: "GET_POSTS_FOR_CORPUS",
            MESSAGE: corpus_id,
            LOCAL_DATABASE: await DB.getPostsForCorpus(corpus_id)
        }))
    }
    static async getComponents() {
        ws.send(JSON.stringify(
            {
                ACTION        : GET_COMPONENTS,
                LOCAL_DATABASE: await DB.getComponents(),
                COUNT         : 10
            }
        ))
    }
    static async getComponentRanks(component_id) {
        ws.send(JSON.stringify(
            {
                ACTION        : GET_COMPONENT_RANKS,
                MESSAGE       : component_id,
                LOCAL_DATABASE: await DB.getComponentRankId(component_id)
            }
        ))
    }
    static async updateComponentRank(componentRank, componentLength, count) {
        ws.send(JSON.stringify(
            {
                ACTION          : UPDATE_COMPONENT_RANK,
                COMPONENT_RANK  : componentRank,
                COMPONENT_LENGTH: componentLength,
                COUNT           : count
            }
        ))
    }
    static async getComponentToPostLinks(postId) {
        ws.send(JSON.stringify(
            {
                ACTION : GET_COMPONENT_TO_POST_LINK,
                MESSAGE: postId
            }))
    }
    static async getBypassCorpusBase(period, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_BYPASS_CORPUS_BASE',
            PERIOD: period,
            START_TIME: start_time,
            END_TIME: end_time
        }))
    }
    static async getBypassGetter(period) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_BYPASS_STATUS_OBJECT,
                PERIOD: period
            }
        ))
    }
    static async getBypassPosts(period, object_name) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_BYPASS_STATUS_POSTS,
                PERIOD: period,
                OBJECT_NAME: object_name
            }
        ))
    }
    static async getBypassUsers(period, post_name) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_BYPASS_STATUS_USERS,
                PERIOD: period,
                POST_NAME: post_name
            }
        ))
    }
    static async getBypassUsersDetail(period, user_email, post_name, start_time=null) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_BYPASS_STATUS_USERS_DETAIL,
                PERIOD: period,
                USER_EMAIL: user_email,
                POST_NAME: post_name,
                START_TIME: start_time
            }
        ))
    }
    static async checkUserEmail(text) {
        ws.send(JSON.stringify({
            ACTION: 'CHECK_EMAIL',
            EMAIL: text
        }))
    }

    static async addActiveUser(id) {
        ws.send(JSON.stringify({
            ACTION: ADD_ACTIVE_USER,
            ID: id
        }))
    }
    static async getActiveUsers() {
        ws.send(JSON.stringify({
            ACTION: GET_ACTIVE_USERS
        }))
    }
    static async updateUserPrivileg(emploee) {
        ws.send(JSON.stringify({
            ACTION: UPDATE_EMPLOEE_PRIVILEG,
            EMPLOEE: emploee
        }))
    }
    static async createUserShift(id, start_shift) {
        ws.send(JSON.stringify({
            ACTION: 'CREATE_USER_SHIFT',
            USER_ID: id,
            START_SHIFT: start_shift
        }))
    }
    static async getUserShift(id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_USER_SHIFT',
            USER_ID: id
        }))
    }
    static async userLogout(emploee) {
        ws.send(JSON.stringify({
            ACTION: 'USER_LOGOUT',
            EMAIL: emploee.email,
        }))
    }
    static async sendMessageToMail(data) {
        ws.send(JSON.stringify({
            ACTION: 'SEND_MESSAGE_TO_MAIL',
            SURNAME: data.surname,
            NAME: data.name,
            LASTNAME: data.lastname,
            EMAIL: data.email,
            PASSWORD: data.password,
            START_SHIFT: data.start_shift
        }))
    }
    static async checkAuthentication(email, password) {
        ws.send(JSON.stringify({
            ACTION: 'CHECK_AUTHENTICATION',
            EMAIL: email,
            PASSWORD: password
        }))
    }
    static async getBypassObjectDetail(period, object_name) {
        ws.send(JSON.stringify({
            ACTION: 'GET_BYPASS_STATUS_OBJECT_DETAIL',
            PERIOD: period,
            OBJECT_NAME: object_name
        }))
    }
    static async getSingleUserStat(user_id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_SINGLE_USER_STAT',
            USER_ID: user_id
        }))
    }
    static async getUsersBasicStat(start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_USERS_BASIC_STAT',
            START_TIME: start_time,
            END_TIME: end_time
        }))
    }
    static async getListUsersAverageForPost(period=null, start_time=null, end_time=null, post_name) {
        ws.send(JSON.stringify({
            ACTION: 'GET_LIST_USERS_AVERAGE_FOR_POST',
            START_TIME: start_time,
            END_TIME: end_time,
            POST_NAME: post_name,
            PERIOD: period
        }))
    }
    static async getStatusUserWithTbr(period=null, building_id=null, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_STATUS_USER_WITH_TBR',
            START_TIME: start_time,
            END_TIME: end_time,
            BUILDING_ID: building_id,
            PERIOD: period
        }))
    }
    static async getStatusUsersWithTbrDetail(period=null, building_id=null, user_id=null, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_STATUS_USER_WITH_TBR_DETAIL',
            START_TIME: start_time,
            END_TIME: end_time,
            USER_ID: user_id,
            BUILDING_ID: building_id,
            PERIOD: period
        }))
    }
    static async getStatusUsersWithTbrCorpus(period=null, corpus_id, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_STATUS_USER_WITH_TBR_CORPUS',
            START_TIME: start_time,
            END_TIME: end_time,
            CORPUS_ID: corpus_id,
            PERIOD: period
        }))
    }
    static async getStatusUsersWithTbrCorpusDetail(period=null, corpus_id=null, user_id=null, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_STATUS_USER_WITH_TBR_CORPUS_DETAIL',
            START_TIME: start_time,
            END_TIME: end_time,
            CORPUS_ID: corpus_id,
            USER_ID: user_id,
            PERIOD: period
        }))
    }
    static async getImageBypassUserOfPostCount(period, component_id, post_id, email, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_IMAGE_BYPASS_USER_OF_POST_COUNT',
            PERIOD: period,
            COMPONENT_ID: component_id,
            POST_ID: post_id,
            EMAIL: email,
            START_TIME: start_time,
            END_TIME: end_time
        }))
    }
    static async getImageBypassUserOfPost(period, component_id, post_id, email, offset, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_IMAGE_BYPASS_USER_OF_POST',
            PERIOD: period,
            COMPONENT_ID: component_id,
            POST_ID: post_id,
            EMAIL: email,
            START_TIME: start_time,
            END_TIME: end_time,
            LIMIT: 1,
            OFFSET: offset
        }))
    }
    static async getComponentForBuilding(period, building_id, start_time=null, end_time=null) {
        ws.send(JSON.stringify({
            ACTION: 'GET_STATUS_COMPONENT_FOR_BUILDING',
            PERIOD: period,
            BUILDING_ID: building_id,
            START_TIME: start_time,
            END_TIME: end_time,
        }))
    }
    static async getBypassBuildingCorpus(period, corpus_id, start_time, end_time) {
        ws.send(JSON.stringify({
            ACTION: 'GET_BYPASS_BUILDING_FOR_CORPUS',
            PERIOD: period,
            TARGET_ID: corpus_id,
            START_TIME: start_time,
            END_TIME: end_time
        }))
    }
    static async getCyclesListForUserInBuilding(user_id, building_id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_CYCLES_LIST_FOR_BUILDING',
            USER_ID: user_id,
            BUILDING_ID: building_id,
            START_TIME: 1640984400000,
            END_TIME: 1640984400000 + 86400000
        }))
    }
    static async getCyclesListForUserInBuildingDetail(offset, user_id, building_id, period, start_time, end_time) {
        ws.send(JSON.stringify({
            ACTION: 'GET_CYCLES_LIST_FOR_BUILDING_DETAIL',
            USER_ID: user_id,
            BUILDING_ID: building_id,
            PERIOD: period,
            START_TIME: start_time,
            END_TIME: end_time,
            LIMIT: 5,
            OFFSET: offset
        }))
    }
    static async getBypassListOfPostInCycle(cycle_id, post_id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_BYPASS_LIST_OF_POST_IN_CYCLE',
            CYCLE_ID: cycle_id,
            POST_ID: post_id
        }))
    }
    static async getCyclesListForUserInCorpusDetail(offset, user_id, corpus_id, period, start_time, end_time) {
        ws.send(JSON.stringify({
            ACTION: 'GET_CYCLES_LIST_FOR_CORPUS_DETAIL',
            USER_ID: user_id,
            CORPUS_ID: corpus_id,
            PERIOD: period,
            START_TIME: start_time,
            END_TIME: end_time,
            LIMIT: 5,
            OFFSET: offset
        }))
    }
    static async getBypassMapCompleteCycle(user_id, building_id) {
        ws.send(JSON.stringify({
            ACTION: 'GET_BYPASS_MAP_COMPLETE_CYCLE',
            USER_ID: user_id,
            BUILDING_ID: building_id
        }))
    }
}
// Остановился на обновлении оценок при добавлении новых. Посмотреть , что за ошибка при перезагрузке, возможно, что дело в локальной бд
// изменить подход к хранению информации 