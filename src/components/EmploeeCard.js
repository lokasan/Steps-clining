import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated} from 'react-native'
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
    <View style={styles.item}>
    
        <Image style={styles.image} source={{uri: emploee.img}}/>
<Text>{emploee.surname} {emploee.name} {emploee.lastname}</Text>
        
        
        <ArrowRight/>
        
    </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    item: {
          backgroundColor: 'rgba(220, 220, 220, .2)',
          marginHorizontal: '5%',
          marginVertical: 5,
          height: 100,
          borderRadius: 15,
          shadowColor: "#000000",
           shadowOffset: {
            width: 0,
            height: 6,
          },
           shadowOpacity: 0.30,
           shadowRadius: 4.65,

          //  elevation: 1,
          
          
        },
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