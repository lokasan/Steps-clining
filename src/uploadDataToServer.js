import * as firebase from 'firebase'
import {StyleSheet, View, FlatList, Image, ScrollView, Text, TouchableOpacity, Button, Touchable, Alert} from 'react-native'
export class UploadDataToServer {
    
    static async addUser(path, id, payload) {
        const response = await fetch('https://brigadir-cc6a6-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ payload })
        })
        
        const data = await response.json()
        const rps = await fetch(path)
        
        const blob = await rps.blob()

        var ref = firebase.storage().ref().child("images/userprofile/" + id)
        return ref.put(blob)
    }
    static async addObject(path, id, payload) {
        // var ws = new WebSocket('ws://192.168.1.4:6790')
        let ws = new WebSocket('ws://192.168.1.4:6790');
        ws.binaryType = 'arraybuffer'
        ws.onopen = function() {
            console.log("Соединение установлено")
            
            let my_json = {'action': 'message', 'message': 'hi'}
            
        }
        ws.onmessage = function(event) {
              Alert.alert(`Получены данные ${JSON.stringify(JSON.parse(event.data))}`);
              console.log(JSON.parse(event.data));
            }
        const imgNumber = Date.now()
        const response = await fetch('https://brigadir-cc6a6-default-rtdb.firebaseio.com/objects.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ...payload, img: `images/object/${payload.name}/${String(imgNumber)}` })
        })
        const data = await response.json()
        console.log(`${JSON.stringify(payload)} payloaddddds`)
        console.log(`${path} PATH`)
        const rps = await fetch(path)
        console.log(`${JSON.stringify(rps)} RPS`)
        const blob = await rps.blob()
        ws.send(blob)
        // console.log(blob, 'blobs')
        var ref = firebase.storage().ref().child(`images/object/${payload.name}/` + String(imgNumber))
        ref.put(blob, {'Content-Type': 'image/jpeg'})
        
    }
    static async addPost() {

    }
    static async addComponent() {

    }
    static async addComponentRank() {

    }
    static async editComponentRank() {

    }
    static async removeComponentRank() {

    }
    static async addLinkPostWithComponent() {

    }
    static async removeLinkPostWithComponent() {

    }
    static async removeComponent() {

    }
    static async removePost() {

    }
    static async removeObject() {

    }
    static async removeUser() {

    }
    static async addBypass() {

    }
    static async addBypassRank() {

    }
    static async editBypassRank() {

    }
    static async editBypass() {

    }
    static async endBypass() {

    }
    static async isCleanerOnBypass() {

    }
    static async getObject() {
        const response = await fetch('https://brigadir-cc6a6-default-rtdb.firebaseio.com/objects.json', {
            headers: {'Content-Type': 'application.json'}
        })
        const data = await response.json()
        console.log(data, 'SRF');
        const object  = Object.keys(data).map((key) => ({id: key, ...data[key]}))
       
        for (el of object) {
            el.img = await firebase.storage().ref().child(el.img).getDownloadURL()
        }
        
        
       
        console.log(object, 'finish');
        console.log(data, 'mydata');
        
        return object
    }
}