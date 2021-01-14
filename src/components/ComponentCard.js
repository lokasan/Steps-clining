import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import { useDispatch } from 'react-redux'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { removeComponent } from '../store/actions/component'


export const ComponentCard = ({component, onOpen}) => {
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
    return <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(component)} onLongPress={() => removeHandler(component)}>
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