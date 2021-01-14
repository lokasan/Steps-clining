import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import {useDispatch} from 'react-redux'
import { removeEmploee, updateUserPrivileg } from '../store/actions/empDouble'

export const EmploeeCard = ({emploee, onOpen}) => {
    const dispatch = useDispatch()
    const removeHandler = () => {
        Alert.alert(
            "Удаление польователя",
            "Вы уверены, что хотите удалить пользователя " + emploee.name + ' ?',
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress() {
                
                dispatch(removeEmploee(emploee.id))
              } 
            }
            ],
            { cancelable: false }
          )
          
    }
    return <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(emploee)} onLongPress={removeHandler}>
    <View style={styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: emploee.img}}/>
<Text style={{color: '#fff'}}>{emploee.surname} {emploee.name} {emploee.lastname}</Text>
        
        
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

    }
})