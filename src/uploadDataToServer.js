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
    GET_BYPASS_STATUS_OBJECT, LOAD_BYPASS_STATUS_OBJECT, REMOVE_POST, GET_OBJECTS_SYNCHRONIZE} from './components/types'
import { DB } from './db';
import { hideLoaderBypass } from './store/actions/bypass';
import { hideLoaderComponent } from './store/actions/component';
import { hideLoaderPost } from './store/actions/post';



let ws = new WebSocket('ws://192.168.1.4:8765');
ws.binaryType = 'arraybuffer'
ws.onmessage = function(event) {
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
    if (ACTION in data && data[ACTION] === GET_OBJECTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch(hideLoaderBypass())
        console.log(data, 'DATA GET_OBJ');
        dispatch({
            type: LOAD_OBJECT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_POSTS) {
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch(hideLoaderPost())
        dispatch({
            type: LOAD_POST,
            payload: data[MESSAGE] 
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENTS) {
        // console.log(data['CONTENT'].length)
        data[MESSAGE].map((el, id) => el['path'] = data['CONTENT'][id])
        dispatch(hideLoaderComponent())
        dispatch({
            type: LOAD_COMPONENT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENT_RANKS) {
        dispatch({
            type: LOAD_COMPONENT_RANK,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_COMPONENT_TO_POST_LINK) {
        dispatch({
            type: LOAD_COMPONENT_TO_POST_LINK,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_BYPASS_STATUS_OBJECT) {
        console.log(data);
        dispatch(hideLoaderBypass())
        dispatch({
            type: LOAD_BYPASS_STATUS_OBJECT,
            payload: data[MESSAGE]
        })
    } else if (ACTION in data && data[ACTION] === GET_OBJECTS_SYNCHRONIZE) {
        console.log('RTTYG');
        console.log(data['CREATE_ELEMENTS'], 'Нужно создать')
        console.log(data['REMOVE_ELEMENTS'], 'Нужно удалить')
        console.log(data['CONTENT'])
        // if (!(data['CREATE_ELEMENTS'].length || data['REMOVE_ELEMENTS'].length)) {
        //     console.log('Внутри асинк')
        //     dispatch({
        //         type: LOAD_OBJECT,
        //         payload: await DB.getObjects()
        //     })
        // }
        if (data['CREATE_ELEMENTS'].length) {
            data['CREATE_ELEMENTS'].map((el, id) => el['path'] = data['CONTENT'][id])
            for (el of data['CREATE_ELEMENTS']) {
               const filename = FileSystem.documentDirectory + el['image'].match(/\d+.jpeg/g)
               console.log(`${filename} filename`)
               await FileSystem.writeAsStringAsync(filename, el['path'], {
                   encoding: FileSystem.EncodingType.Base64,
               })
               const obj = await DB.getObjectById(el['id'])
               if (!obj.length) {
                await DB.createObject({
                    id: el['id'], 
                    name: el['name'], 
                    address: el['address'], 
                    description: el['description'], 
                    img: filename})
               }
               
            }
        }
        if (data['REMOVE_ELEMENTS'].length) {
            for (el of data['REMOVE_ELEMENTS']) {
                console.log(data, 'data-transfer-of-server')
                const obj = await DB.getObjectById(el['id'])
                if (obj.length) {
                    await DB.removeObject(el['id'])
                    console.log(obj, 'data-uri');
                    await FileSystem.deleteAsync(obj[0].img)
                    
                }
                
            }
        }
        dispatch(hideLoaderBypass())
        dispatch({
            type: LOAD_OBJECT,
            payload: await DB.getObjects()
        })
    }
    // `data:image/jpeg;base64,${object.path}
    // last create-edit action for elements

        // else if (ACTION in data && data[ACTION] == GET_PATH_OBJECT) {
        //     data[MESSAGE][0]
        //     data[MESSAGE][1]
        // }
}
export class UploadDataToServer {
    static async getBlob(path) {
        const rps = await fetch(path)
        const blob = await rps.blob()
        return blob
    }
    
    static async addUser(path, payload) {
        ws.send(JSON.stringify(
            {
                ACTION: CREATE_USER, 
                ID: payload.id,
                SURNAME: payload.surname,
                NAME: payload.name,
                LASTNAME: payload.lastname,
                POSITION: payload.position,
                EMAIL: payload.email,
                PRIVILEG: payload.privileg,
                KEY_AUTH: payload.key_auth,
                STATUS: payload.status,
                NAME_FILE: String(Date.now()),
                IMAGE: payload.image,
                PASSWD_HASH: '12151'

            }))
        
        
        const blob = await this.getBlob(path)
        ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
        
    }
    static async addObject(path, payload) { 
        const blob = await this.getBlob(path)
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION: ADD_OBJECT, 
                    ID: payload.id,
                    NAME_FILE: String(Date.now()),
                    NAME: payload.name,
                    ADDRESS: payload.address,
                    DESCRIPTION: payload.description,
                    IMG: payload.img,
                    'PATH': base64data
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
        const blob = await this.getBlob(path)
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION: ADD_POST,
                    ID: payload.id,
                    BUILDING_ID: payload.building_id,
                    NAME_FILE: String(Date.now()),
                    NAME: payload.name,
                    DESCRIPTION: payload.description,
                    IMG: payload.img,
                    QR_CODE: payload.qrcode,
                    QR_CODE_IMG: payload.qrcode_img,
                    'PATH': base64data
                }))
        }
        

    }
    static async addComponent(path, payload) {
        const blob = await this.getBlob(path)
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = function() {
            let base64data = reader.result
            ws.send(JSON.stringify(
                {
                    ACTION: ADD_COMPONENT,
                    ID: payload.id,
                    NAME_FILE: String(Date.now()),
                    NAME: payload.name,
                    DESCRIPTION: payload.description,
                    IMG: payload.img,
                    'PATH': base64data
                }))
        }
        

        

        // ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
    }
    static async addComponentRank(path, payload) {
        ws.send(JSON.stringify(
            {
                ACTION: ADD_COMPONENT_RANK,
                ID: payload.id,
                COMPONENT_ID: payload.component_id,
                NAME_FILE: String(Date.now()),
                NAME: payload.name,
                RANK: payload.rank,
                IMAGE: payload.img
            }))

        const blob = await this.getBlob(path)

        ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
    }
    static async editComponentRank(path, payload) {
        ws.send(JSON.stringify(
            {
                ACTION: EDIT_COMPONENT_RANK,
                COMPONENT_RANK_ID: payload.id,
                NAME_FILE: payload.flag ? String(Date.now()) : '',
                NAME: payload.name,
                IMAGE: payload.img,
                'flag': payload.flag
            }))
        if (payload.flag) {
            const blob = await this.getBlob(path)

            ws.send(blob, {'Content-Type': 'images/jpeg', 'headers': 'Robo'})
        }
    }
    static async removeComponentRank(id) {
        ws.send(JSON.stringify(
            {
                ACTION: REMOVE_COMPONENT_RANK,
                COMPONENT_RANK_ID: id,
            }))
    }
    static async addLinkPostWithComponent(id, postId, componentId) {
        ws.send(JSON.stringify(
            {
                ACTION: CREATE_COMPONENT_TO_POST_LINK,
                ID: id,
                POST_ID: postId,
                COMPONENT_ID: componentId
            }))
    }
    static async removeLinkPostWithComponent(postId, componentId) {
        ws.send(JSON.stringify(
            {
                ACTION: DELETE_COMPONENT_TO_POST_LINK,
                POST_ID: postId,
                COMPONENT_ID: componentId
            }))
    }
    static async removeComponent(id) {
        ws.send(JSON.stringify(
            {
                ACTION: REMOVE_COMPONENT,
                COMPONENT_ID: id
            }))
    }
    static async removePost(id, building_id) {
        ws.send(JSON.stringify(
            {
                ACTION: REMOVE_POST,
                POST_ID: id,
                BUILDING_ID: building_id
            }))
    }
    static async removeObject(id) {
        ws.send(JSON.stringify(
            {
                ACTION: REMOVE_OBJECT,
                BUILDING_ID: id
            }))
    }
    static async removeUser(id) {
        ws.send(JSON.stringify(
            {
                ACTION: REMOVE_EMPLOEE,
                USER_ID: id
            }))
    }
    static async addBypass(id, userId, postId, weather, temperature) {
        ws.send(JSON.stringify(
            {
                ACTION: CREATE_BYPASS,
                ID: id,
                USER_ID: userId,
                POST_ID: postId,
                START_TIME: String(Date.now()),
                WEATHER: weather,
                TEMPERATURE: temperature
            }))
    }
    static async addBypassRank(id, bypassId, component_id) {
        ws.send(JSON.stringify(
            {
                ACTION: CREATE_BYPASS_RANK,
                ID: id,
                BYPASS_ID: bypassId,
                COMPONENT_ID: component_id,
                START_TIME: String(Date.now())
            }))
    }
    static async editBypassRank(componentRankId, id) {
        ws.send(JSON.stringify(
            {
                ACTION: UPDATE_BYPASS_RANK,
                COMPONENT_RANK_ID: componentRankId,
                BYPASS_RANK_ID: id,
                END_TIME: String(Date.now())
            }))
    }
    static async editBypass(avgRank, id) {
        ws.send(JSON.stringify(
            {
                ACTION: UPDATE_BYPASS,
                BYPASS_ID: id,
                AVG_RANK: avgRank
            }))
    }
    static async endBypass(avgRank, id) {
        ws.send(JSON.stringify(
            {
                ACTION: UPDATE_BYPASS,
                AVG_RANK: avgRank,
                BYPASS_ID: id,
                END_TIME: String(Date.now())
            }))
    }
    static async isCleanerOnBypass(cleaner, bypassId) {
        ws.send(JSON.stringify(
            {
                ACTION: CLEANER_ON_BYPASS,
                CLEANER_ON_BYPASS: cleaner,
                BYPASS_ID: bypassId
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
            ACTION: GET_OBJECTS,
            LOCAL_DATABASE: await DB.getObjects(),
            COUNT: 10
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
                ACTION: GET_POSTS,
                MESSAGE: building_id
            }))
    }
    static async getComponents() {
        ws.send(JSON.stringify(
            {
                ACTION: GET_COMPONENTS,
                COUNT: 10
            }
        ))
    }
    static async getComponentRanks(component_id) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_COMPONENT_RANKS,
                MESSAGE: component_id
            }
        ))
    }
    static async updateComponentRank(componentRank, componentLength, count) {
        ws.send(JSON.stringify(
            {
                ACTION: UPDATE_COMPONENT_RANK,
                COMPONENT_RANK: componentRank,
                COMPONENT_LENGTH: componentLength,
                COUNT: count
            }
        ))
    }
    static async getComponentToPostLinks(postId) {
        ws.send(JSON.stringify(
            {
                ACTION: GET_COMPONENT_TO_POST_LINK,
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
}
// Остановился на обновлении оценок при добавлении новых. Посмотреть , что за ошибка при перезагрузке, возможно, что дело в локальной бд
// изменить подход к хранению информации 