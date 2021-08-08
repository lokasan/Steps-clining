import React, {useState, Fragment} from 'react'
import { View, StyleSheet, Modal, Pressable, Image, Text, Alert, TouchableOpacity, ScrollView, FlatList, SafeAreaView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as FileSystem from 'expo-file-system'
import { AddNewBypassRankPhoto, RemoveBypassRankPhoto } from './ui/imageSVG/circle'
import { UploadDataToServer } from '../uploadDataToServer'
import {updateBypassRankWithPhoto} from '../store/actions/bypassRank'
import { finishedBypass } from '../store/actions/bypass'
import { clearPostWithComponent, deleteComponentToPostLink } from '../store/actions/postWithComponent'

export const PhotoPickerBypass = ({target, componentsFinished, components, dispath, bypassId, bypassRankId, itemComponentRank, navigation, modalVisible, setModalVisible, image, setImage}) => {
    
    

    async function askForPermissions() {
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
        )
        if (status !== 'granted') {
            Alert.alert('Ошибка. Вы не дали прав на создание фото')
            return false
        }
        return true
    
    }
    const changePhoto = async (item) => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return 
        }
        const img = await ImagePicker.launchCameraAsync({
            qulity       : 0.7,
            allowsEditing: true,
            aspect       : [16, 9]
        })
        myId = String(Date.now())
        if (img.uri) {

            setImage(image.map(el => el.id === item.id ? ({id: item.id, image: img.uri}) : el))
            FileSystem.deleteAsync(item.image)
        }
        
        
    }
    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return 
        }
        const img = await ImagePicker.launchCameraAsync({
            qulity       : 0.1,
            allowsEditing: true,
            aspect       : [16, 9]
        })
        myId = String(Date.now())
        if (img.uri) {setImage([...image, {
            id   : myId,
            image: img.uri}])}
        
        
    }
    const removeHandler = async (item) => {
        Alert.alert(
            "Редактирование вложения",
            "Вы хотите удалить фото или заменить ?",
            [
              {
                text   : "Заменить",
                style  : "cancel",
                onPress: () => {
                    changePhoto(item)
                }
              },
              { text: "Удалить", style: 'destructive', onPress: () => {
                setImage(image.filter(el => {
                    if (el.id !== item.id) {
                        return el
                    } else {
                        FileSystem.deleteAsync(item.image)
                    }  
                }
                ))  
                }}
            ],
            { cancelable: false }
          )
    }

    const Item = ({ item }) => (
        <><TouchableOpacity>
            <View style = {{display: 'absolute', width: 74, height: 100, top: 10}}>
            
            <View             style   = {{zIndex: 1000, marginLeft: 'auto', marginTop: -5, marginRight: -5}}>
            <TouchableOpacity onPress = {() => removeHandler(item)}>
            <RemoveBypassRankPhoto />
            </TouchableOpacity>
            </View>
            
            <View  style = {{position: 'absolute', height: 74}}>
            <Image style = {{zIndex: 0, height: 64, width: 64, borderRadius: 15, marginLeft: 10}} source = {{uri: item.image}}/>
            </View>
            </View>
        </TouchableOpacity>
        {image[image.length - 1].id === item.id && <TouchableOpacity
        onPress={() => {
            takePhoto()
        }}
        >
            <View style = {{ marginTop: 10, marginLeft: 10}}>
            <AddNewBypassRankPhoto/>
            </View>
        </TouchableOpacity>}</>
        
    )
    const renderItem = ({ item }) => (
        <Item item = {item}/>
    )
    console.log(image, 'Image photo picker')
    return <Fragment>
        <Modal
              animationType = "fade"
              transparent   = {true}
              visible       = {modalVisible}>
        <View style         = {styles.centeredView}>
        <View style         = {styles.modalView}>
                    
                    <Text style = {styles.modalTitle}>Выбранная оценка: {JSON.stringify(itemComponentRank.name)}</Text>
                    <Text style = {styles.modalText}>Посмотрите содержимое и измените при необходимости</Text>
                    {image.length == 0 && <TouchableOpacity
                        onPress={() => {
                            takePhoto()
                        }}
                                            >
                    <View style = {{ marginTop: 10, marginLeft: 10}}>
                    <AddNewBypassRankPhoto/>
                    </View>
                </TouchableOpacity>}
                    <FlatList
                          horizontal                     = {true}
                          vertical                       = {false}
                          showsHorizontalScrollIndicator = {false}
                          data                           = {image}
                          renderItem                     = {renderItem}
                          keyExtractor                   = {item => item.id}/>
                    <View style                          = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <Pressable
                style   = {({ pressed }) => [styles.button, !image.length ? styles.buttonEmailSend : styles.buttonClose]}
                onPress = {() => {
                    setModalVisible(!modalVisible)
                    dispatch(updateBypassRankWithPhoto(image, itemComponentRank, bypassId, bypassRankId))
                    
                    if ((componentsFinished.length + 1) === components.length) {
                        dispatch(finishedBypass(1, bypassId))
                        target()
                        dispatch(clearPostWithComponent())
                        navigation.navigate('QRCode')
                    } else {
                        navigation.navigate('BypassScreen')
                    }
                }}
                      disabled = {!image.length}>
                <Text style    = {styles.textStyle}>Отправить</Text>
                </Pressable>
                </View>
                </View>
                
            </View>

        </Modal>
        </Fragment>
}
const styles = StyleSheet.create({
    modalView: {
      margin         : 20,
      backgroundColor: "white",
      borderRadius   : 20,
      padding        : 35,
      paddingBottom  : 10,
      height         : '40%',
      shadowColor    : '#000',
      shadowOffset   : {
        width : 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius : 4,
      elevation    : 5
    },
    button: {
      borderRadius: 20,
      padding     : 10,
      elevation   : 2
    },
    buttonClosePressed: {
      backgroundColor: '#000'
    },
    buttonClose: {
      backgroundColor: '#303f9f',
    },
    buttonDeletePressed: {
      backgroundColor: 'green',
    },
    buttonDelete: {
      backgroundColor: 'red',
    },
    textStyle: {
      color     : 'white',
      fontWeight: 'bold',
      textAlign : 'center'
    },
    modalText: {
      marginBottom: 15,
      textAlign   : 'center'
    },
    modalTitle: {
      marginBottom: 15,
      textAlign   : 'center',
      fontWeight  : 'bold'
    },
    centeredView: {
      flex          : 1,
      justifyContent: 'center',
      alignItems    : 'center',
      marginTop     : 22
    },
    buttonClose: {
        backgroundColor: '#303f9f',
      },
      buttonEmailSend: {
        backgroundColor: '#303f9f',
        opacity        : 0.4
      },
})