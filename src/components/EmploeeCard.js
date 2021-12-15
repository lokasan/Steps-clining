import React, {Fragment, useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Modal, Pressable} from 'react-native'
import {ArrowRight, Clock, Cycle, QRIcon, Rank, TimeBetweenBypass} from '../components/ui/imageSVG/circle'
import {useDispatch} from 'react-redux'
import { removeEmploee, updateUserPrivileg } from '../store/actions/empDouble'
import { ModalForRemove } from './ui/ModalForRemove'
import { msToTime } from '../utils/msToTime'
import { OPTIMAL_RANK } from './types'


export const EmploeeCard = ({emploee, onOpen, isOnline}) => {
  const TEXT_TITLE = 'Удаление пользователя'
  const TEXT_ACTION = 'Вы уверены, что хотите удалить пользователя'
  const [modalVisible, setModalVisible] = useState(false)
  
  const countBypass = ((emploee.hasOwnProperty('count_bypass') ? emploee.count_bypass : 0) - 
    (emploee.hasOwnProperty('prev_count_bypass') ? 
    emploee.prev_count_bypass : 0)) >= 0 ? 
    "+" + ((emploee.hasOwnProperty('count_bypass') ? 
    emploee.count_bypass : 0) - 
    (emploee.hasOwnProperty('prev_count_bypass') ? 
    emploee.prev_count_bypass : 0)) :
    ((emploee.hasOwnProperty('count_bypass') ? 
    emploee.count_bypass : 0) - 
    (emploee.hasOwnProperty('prev_count_bypass') ? 
    emploee.prev_count_bypass : 0))

  const colorForCountBypass = ((emploee.hasOwnProperty('count_bypass') ? 
    emploee.count_bypass : 0) - 
    (emploee.hasOwnProperty('prev_count_bypass') ? 
    emploee.prev_count_bypass : 0)) >= 0 ? 
    "green" : "red"

  const avgRankOfEmploee = ((emploee.hasOwnProperty('avg_rank') ? emploee.avg_rank : 0) - 
    (emploee.hasOwnProperty('prev_avg_rank') ? 
    emploee.prev_avg_rank : 0)) >= 0 ? 
    "+" + ((emploee.hasOwnProperty('avg_rank') ? 
    emploee.avg_rank : 0) - 
    (emploee.hasOwnProperty('prev_avg_rank') ? 
    emploee.prev_avg_rank : 0)).toFixed(1) :
    ((emploee.hasOwnProperty('avg_rank') ? 
    emploee.avg_rank : 0) - 
    (emploee.hasOwnProperty('prev_avg_rank') ? 
    emploee.prev_avg_rank : 0)).toFixed(1)
    const colorAvgRankOfEmploee = ((emploee.hasOwnProperty('avg_rank') ? emploee.avg_rank : 0) - 
    (emploee.hasOwnProperty('prev_avg_rank') ? 
    emploee.prev_avg_rank : 0)) >= 0 ? "green" : "red"

  const countOfCycle = ((emploee.hasOwnProperty('count_cycle') ? emploee.count_cycle : 0) - 
    (emploee.hasOwnProperty('prev_count_cycle') ? 
    emploee.prev_count_cycle : 0)) >= 0 ? 
    "+" + ((emploee.hasOwnProperty('count_cycle') ? 
    emploee.count_cycle : 0) - 
    (emploee.hasOwnProperty('prev_count_cycle') ? 
    emploee.prev_count_cycle : 0)) :
    ((emploee.hasOwnProperty('count_cycle') ? 
    emploee.count_cycle : 0) - 
    (emploee.hasOwnProperty('prev_count_cycle') ? 
    emploee.prev_count_cycle : 0))

  const colorCountOfCycle = ((emploee.hasOwnProperty('count_cycle') ? 
    emploee.count_cycle : 0) - 
    (emploee.hasOwnProperty('prev_count_cycle') ? 
    emploee.prev_count_cycle : 0)) >= 0 ? 
    "green" : "red"

  return <Fragment>

    <ModalForRemove 
      TEXT_TITLE={TEXT_TITLE} 
      TEXT_ACTION={TEXT_ACTION} 
      remove={removeEmploee}  
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible} 
      myObject={emploee} 
      isOnline={isOnline}/>
    <View style={styles.item}>

        <View>

          <Text style={{marginStart: '2%'}}>{emploee.surname} {emploee.name} {emploee.lastname}</Text>

        </View>
        <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>

          <View style={{alignItems: 'center'}}>
            {Rank('#000', 25, 24)}
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{color: emploee.avg_rank < OPTIMAL_RANK ? 
                'red' : 'black', textAlign: 'center', paddingTop: 10}}>
                  {emploee.avg_rank ? emploee.avg_rank : 0}
              </Text>
              <Text style={{color: colorAvgRankOfEmploee, textAlign: 'center', paddingTop: 10, paddingLeft: 2, fontSize: 10}}>
                  {avgRankOfEmploee}</Text>
              </View>
          </View>

          <View style={{alignItems: 'center'}}>
            {Cycle('#000', 25, 24)}
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{textAlign: 'center', paddingTop: 10}}>{emploee.cycle ? emploee.cycle : 0}</Text>
              <Text style={{color: colorCountOfCycle, textAlign: 'center', paddingTop: 10, paddingLeft: 2, fontSize: 10}}>
                  {countOfCycle}</Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {}}>
              {QRIcon('#000', 25, 24)}
            </TouchableOpacity>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <Text style={{textAlign: 'center', paddingTop: 10}}>{emploee.count_bypass ? emploee.count_bypass : 0}</Text>
              <Text style={{color: colorForCountBypass, textAlign: 'center', paddingTop: 10, paddingLeft: 2, fontSize: 10}}>
                  {countBypass}
                </Text>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            {Clock('#000', 25, 25)}
            <Text style={{textAlign: 'center', paddingTop: 10}}>
              {emploee.time_bypass && +msToTime(emploee.time_bypass).slice(0, -6) < 10 ? 
              msToTime(emploee.time_bypass).slice(0, -3) :
              (+msToTime(emploee.time_bypass).slice(0, -6) > 10) ? 
              msToTime(emploee.time_bypass).slice(0, -6) + 'Ч' : 0}
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>
            {TimeBetweenBypass('#000', 25, 24)}
            <Text style={{textAlign: 'center', paddingTop: 10}}>
              {emploee.time_between_bypass && +msToTime(emploee.time_between_bypass).slice(0, -6) < 10 ? 
              msToTime(emploee.time_between_bypass).slice(0, -3) :
              (+msToTime(emploee.time_between_bypass).slice(0, -6) > 10) ? 
              msToTime(emploee.time_between_bypass).slice(0, -6) + 'Ч' : 0}
            </Text>
          </View>

        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(emploee)} onLongPress={() => setModalVisible(true)}>
          <Image 
            source={{uri: emploee.img}} 
            style={isOnline?.filter(el => el == emploee.id).length ? 
              {borderRadius: 50, borderWidth: 1, width: 60, height: 60, borderColor: 'rgba(0, 255, 0, 1)'} : 
              {borderRadius: 50, borderWidth: 1, width: 60, height: 60, borderColor: 'rgba(255, 0, 0, 1)'}}/>
        </TouchableOpacity>
        </View>
        {/* <ArrowRight/> */}
        
    </View>
    
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