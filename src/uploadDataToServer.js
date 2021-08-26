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
    LOAD_BYPASS_STATUS_POSTS, GET_BYPASS_STATUS_USERS, LOAD_BYPASS_STATUS_USERS, GET_BYPASS_STATUS_USERS_DETAIL, LOAD_BYPASS_STATUS_USERS_DETAIL, UPDATE_EMPLOEE_PRIVILEG} from './components/types'
import { DB } from './db';
import { hideLoaderBypass, hideLoaderBypassIcon } from './store/actions/bypass';
import { hideLoaderComponent } from './store/actions/component';
import { hideLoaderPost } from './store/actions/post';
import { hideLoaderComponentRank } from './store/actions/componentRank';
import { msToTime } from './utils/msToTime'
import { updateUser } from './store/actions/empDouble';
import { hideLoaderBypassRank } from './store/actions/bypassRank';


let ws            = new WebSocket('ws://192.168.1.2:8760');
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
        dispatch(hideLoaderBypass())
        dispatch({
            type   : LOAD_OBJECT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_POSTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch(hideLoaderPost())
        dispatch({
            type   : LOAD_POST,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch(hideLoaderComponent())
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
        data[MESSAGE].map((el) => el['countTime'] = msToTime(el['countTime']))
        
        dispatch(hideLoaderBypass())
        dispatch({
            type   : LOAD_BYPASS_STATUS_OBJECT,
            payload: data[MESSAGE]
        })
    } else if(ACTION in data && data[ACTION] === 'GET_BYPASS_STATUS_OBJECT_DETAIL') {
        dispatch(hideLoaderBypassIcon())
        dispatch({
            type: 'LOAD_BYPASS_STATUS_OBJECT_DETAIL',
            payload: data[MESSAGE]
        })
    }
    else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_POSTS) {
        data[MESSAGE].map((el) => el['countTime'] = msToTime(el['countTime']))
        dispatch(hideLoaderBypass())
        dispatch({
            type: LOAD_BYPASS_STATUS_POSTS,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_USERS) {
        data[MESSAGE].map((el) => el['countTime'] = msToTime(el['countTime']))
        dispatch(hideLoaderBypassIcon())
        dispatch({
            type: LOAD_BYPASS_STATUS_USERS,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_USERS_DETAIL) {
        data[MESSAGE].map((el) => el['countTime'] = msToTime(el['end_time'] - el['start_time']))
        dispatch(hideLoaderBypassIcon())
        dispatch({
            type: LOAD_BYPASS_STATUS_USERS_DETAIL,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_OBJECTS_SYNCHRONIZE) {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getObjectById, DB.createObject, DB.removeObject)
        dispatch(hideLoaderBypass())
        dispatch({
            type   : LOAD_OBJECT,
            payload: await DB.getObjects()
        })
    } else if (ACTION in data && data[ACTION] === GET_POSTS_SYNCHRONIZE) {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getPostById, DB.createPost, DB.removePost)
        dispatch(hideLoaderPost())
        dispatch({
            type   : LOAD_POST,
            payload: await DB.getPosts(data['TARGET_ID'])  /* target id for elements with included  */
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENTS_SYNCHRONIZE) {
        await doCreateAndRemoveLocalStoreAndBase(data, DB.getCompoentById, DB.createComponent, DB.removeComponent)
        dispatch(hideLoaderComponent())
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
        dispatch(hideLoaderComponentRank())
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
        dispatch(updateUser({status: 0, email: data[MESSAGE]['email'], id: data[MESSAGE]['id'], isAccess: data[MESSAGE]['email'] ? 1 : -1}))
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
            myListBypassRankImage.push(filename)
        }
        dispatch(hideLoaderBypassRank())
        dispatch({
            type: 'GET_IMAGE_BYPASS_RANK',
            payload: myListBypassRankImage
        })
        
    } else if (ACTION in data && data[ACTION] === 'GET_BYPASS_RANK_IMAGE_COUNT') {
        dispatch({
            type: 'GET_BYPASS_RANK_IMAGE_COUNT',
            payload: data['LENGTH']
        })
    } else if (ACTION in data && data[ACTION] === 'GET_SINGLE_USER_STAT') {
        dispatch({
            type: 'GET_SINGLE_USER_STAT',
            payload: data[MESSAGE]
        })
    }
    // `data:image/jpeg;base64,${object.path}
    
}
//  разобраться с багом отображения на андройде
export async function doCreateAndRemoveLocalStoreAndBase(data, get, create, remove, edit, update) {
    if (data['CREATE_ELEMENTS'].length) {
        data['CREATE_ELEMENTS'].map((el, id) => el['path'] = data['CONTENT'][id])
        for (el of data['CREATE_ELEMENTS']) {
           const filename = FileSystem.documentDirectory + el['image'].match(/\d+.jpeg/g)
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
        for (el of data['REMOVE_ELEMENTS']) {
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
        for (el of data['UPDATE_ELEMENTS']) {
            const obj = await get(el['id'])
            if (obj.length) {
                const filename = FileSystem.documentDirectory + el['image'].match(/\d+.jpeg/g)
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
                    PATH       : base64data
                    // NOTIFICATION_TOKEN: ''
    
                }))
        }
        // const blob = await this.getBlob(path)
        // ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
        
    }
    static async addObject(path, payload) { 
        const blob   = await this.getBlob(path)
        let   reader = new FileReader()
        const testOb = await DB.getObjects()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION     : ADD_OBJECT,
                    ID         : payload.id,
                    NAME_FILE  : String(Date.now()),
                    NAME       : payload.name,
                    ADDRESS    : payload.address,
                    DESCRIPTION: payload.description,
                    IMG        : payload.img,
                    PATH       : base64data
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
                    PATH       : base64data
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
                    PATH       : base64data
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
                    PATH        : base64data
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
                        PATH             : base64data
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
    static async getPosts(building_id) {
        ws.send(JSON.stringify(
            {
                ACTION        : GET_POSTS,
                MESSAGE       : building_id,
                LOCAL_DATABASE: await DB.getPosts(building_id)
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
    static async getBypassUsersDetail(period, user_email, post_name) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_BYPASS_STATUS_USERS_DETAIL,
                PERIOD: period,
                USER_EMAIL: user_email,
                POST_NAME: post_name
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
            ACTION: 'ADD_ACTIVE_USER',
            ID: id
        }))
    }
    static async getActiveUsers() {
        ws.send(JSON.stringify({
            ACTION: 'GET_ACTIVE_USERS'
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
}
// Остановился на обновлении оценок при добавлении новых. Посмотреть , что за ошибка при перезагрузке, возможно, что дело в локальной бд
// изменить подход к хранению информации 