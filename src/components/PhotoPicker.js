import React, {useState} from 'react'
import {View, StyleSheet, Image, Button, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as firebase from 'firebase'
import ApiKeys from './ApiKeys'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'



async function askForPermissions () {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.MEDIA_LIBRARY
    )
    if (status !== 'granted') {
        Alert.alert('Ошибка, Вы не дали прав на доступ к камере или к фото')
        return false
    }
    return true
}

export const PhotoPicker = ({onPick}) => {
    const [image, setImage] = useState(null)
    const compressedImage = async (img) => {
        const manipResult = await manipulateAsync(
            img.uri,
            [
                {
                    resize: {height: 1024, width: 1024}
                }],
            {compress: 0.37, format: SaveFormat.JPEG}
        )
        console.log(manipResult)
        setImage(manipResult.uri)
        onPick(manipResult.uri)
    }
    
    const addPhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return
        } 
        const img = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [4, 3]

        })
        console.log(img)
        await compressedImage(img)
        // setImage(img.uri)
        // onPick(img.uri)
    }
    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return
        } 
        const img = await ImagePicker.launchCameraAsync({
            quality: 1,
            allowsEditing: true,
            aspect: [4, 3]

        })
        console.log(img)
        await compressedImage(img)
        // setImage(img.uri)
        // onPick(img.uri)
        
        
    }
    return <View style={styles.wrapper}> 
    <Button title='Сделать фото' onPress={takePhoto}/>
    <Button title='Добавить фото' onPress={addPhoto}/>
    {image && <Image style={styles.img} source={{uri: image}}/> }
    </View>
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    img: {
        width: '100%',
        height: 400,
        marginTop: 10
    }
})