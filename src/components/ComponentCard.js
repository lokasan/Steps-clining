import React, { Fragment, useState } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import { useDispatch } from 'react-redux'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { removeComponent } from '../store/actions/component'
import { ModalForRemove } from './ui/ModalForRemove'


export const ComponentCard = ({component, onOpen}) => {
    const TEXT_TITLE = 'Удаление компонента'
    const TEXT_ACTION = 'Вы уверены, что хотите удалить компонент'
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()
    const removeHandler = (component) => {
        Alert.alert(
            "Удаление компонента",
            "Вы уверены, что хотите удалить компонент " + component.name + ' ?',
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress() {
                dispatch(removeComponent(component.id))
              } 
            }
            ],
            { cancelable: false }
          )
          
    }
    return ( <Fragment>
        <ModalForRemove TEXT_TITLE={TEXT_TITLE} TEXT_ACTION={TEXT_ACTION} remove={removeComponent}  modalVisible={modalVisible} setModalVisible={setModalVisible} myObject={component} />
    <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(component)} onLongPress={() => setModalVisible(true)}>
    <View style={styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: component.img}}/>
        <View style={styles.privateData}>
        <View>    
<Text style={{color: '#fff'}}>{component.name}</Text>
</View>
</View>
        
        
        <ArrowRight/>
        
    </View>
    </TouchableOpacity>
    </Fragment>)
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