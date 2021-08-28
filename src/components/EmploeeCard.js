import React, {Fragment, useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Modal, Pressable} from 'react-native'
import {ArrowRight, Clock, Cycle, QRIcon, Rank} from '../components/ui/imageSVG/circle'
import {useDispatch} from 'react-redux'
import { removeEmploee, updateUserPrivileg } from '../store/actions/empDouble'
import { ModalForRemove } from './ui/ModalForRemove'
import { msToTime } from '../utils/msToTime'


export const EmploeeCard = ({emploee, onOpen, isOnline}) => {
  const TEXT_TITLE = 'Удаление пользователя'
  const TEXT_ACTION = 'Вы уверены, что хотите удалить пользователя'
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const removeHandler = () => {
        Alert.alert(
            "Удаление пользователя",
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
    
    return <Fragment>
      <ModalForRemove TEXT_TITLE={TEXT_TITLE} TEXT_ACTION={TEXT_ACTION} remove={removeEmploee}  modalVisible={modalVisible} setModalVisible={setModalVisible} myObject={emploee} isOnline={isOnline}/>
      <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(emploee)} onLongPress={() => setModalVisible(true)}>
    <View style={styles.item}>
    
        {/* <Image style={styles.image} source={{uri: emploee.img}}/> */}
        <View>
<Text style={{marginStart: '2%'}}>{emploee.surname} {emploee.name} {emploee.lastname}</Text>

</View>
<View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
<View>
{Rank('#000', 25, 24)}
<Text style={{textAlign: 'center', paddingTop: 10}}>{emploee.avg_rank ? emploee.avg_rank : 0}</Text>
</View>
<View>
{Cycle('#000', 25, 24)}
<Text style={{textAlign: 'center', paddingTop: 10}}>{emploee.cycle ? emploee.cycle : 0}</Text>
</View>
<View>
{QRIcon('#000', 25, 24)}
<Text style={{textAlign: 'center', paddingTop: 10}}>{emploee.count_bypass ? emploee.count_bypass : 0}</Text>
</View>
<View style={{alignItems: 'center'}}>
{Clock('#000', 25, 25)}
<Text style={{textAlign: 'center', paddingTop: 10}}>{emploee.time_between_bypass ? msToTime(emploee.time_bypass).slice(0, 5) : 0}</Text>
</View>

        <Image source={{uri: emploee.img}} style={isOnline?.filter(el => el == emploee.id).length ? {borderRadius: 50, borderWidth: 1, width: 60, height: 60, borderColor: 'rgba(0, 255, 0, 1)'} : {borderRadius: 50, borderWidth: 1, width: 60, height: 60, borderColor: 'rgba(255, 0, 0, 1)'}}/>
        </View>
        {/* <ArrowRight/> */}
        
    </View>
    </TouchableOpacity>
    </Fragment>
}

const styles = StyleSheet.create({
    item: {
          backgroundColor: 'rgba(220, 220, 220, .2)',
          marginHorizontal: '5%',
          marginVertical: 5,
          height: 100,
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'space-evenly',
          shadowColor: "#000000",
           shadowOffset: {
            width: 0,
            height: 6,
          },
           shadowOpacity: 0.30,
           shadowRadius: 4.65,
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

    },
})