import React, {useState} from 'react'
import {View, StyleSheet, Image, Button, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'



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
        setImage(img.uri)
        onPick(img.uri)
    }
    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return
        } 
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [16, 9]

        })
        setImage(img.uri)
        onPick(img.uri)
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