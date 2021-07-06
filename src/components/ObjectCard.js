import React, {Fragment, useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { removeObject } from '../store/actions/object'
import { ModalForRemove } from './ui/ModalForRemove'

export const ObjectCard = ({object, onOpen}) => {
    const TEXT_TITLE = 'Удаление объекта'
    const TEXT_ACTION = 'Вы уверены, что хотите удалить объект'
    const [modalVisible, setModalVisible] = useState(false)
    const removeHandler = (object) => {
        Alert.alert(
            "Удаление объекта",
            "Вы уверены, что хотите удалить объект " + object.name + ' ?',
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress() {
                
                dispatch(removeObject(object.id))
              } 
            }
            ],
            { cancelable: false }
          )
          
    }
    return <Fragment>
    <ModalForRemove TEXT_TITLE={TEXT_TITLE} TEXT_ACTION={TEXT_ACTION} remove={removeObject}  modalVisible={modalVisible} setModalVisible={setModalVisible} myObject={object} />
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(object)} onLongPress={() => setModalVisible(true)}>
    <View style = {styles.actionMenu}>
        <Image style = {styles.image} source = {{uri: object.img}}/>
        <View  style = {styles.privateData}>
            <View>    
                <Text style = {{color: '#fff'}}>{object.name}</Text>
            </View>
            <View>
                <Text style = {{color: '#fff'}}>{object.address}</Text>
            </View>
        </View>
        <ArrowRight/>
    </View>
    </TouchableOpacity>
    </Fragment>
}

const styles = StyleSheet.create({
    emploee: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: 51,
        height: 51,
        borderRadius: 25
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    }, 
    title: {
        color: '#fff',
        fontFamily: 'open-regular'
    },
    actionMenu: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 0.3,
        
        
        borderColor: '#fff'

    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
})