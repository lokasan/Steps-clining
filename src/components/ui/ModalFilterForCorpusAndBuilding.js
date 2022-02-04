import React from 'react';
import {View, Modal, Pressable, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux'
import i18n from '../../localization/modalFilterForBuildingLocale';
import {loadBypassPosts, clearBypassBuildingForCorpus, clearBypassUsersAverageAll, clearListUsersStaticTbr, clearListUsersStaticWithTbrCorpus, clearListUsersStaticWithTbrDetailAll, getListUsersStaticTbr, getListUsersStaticWithTbrCorpus, loadBypassBuildingForCorpus} from '../../store/actions/bypass'
import { loadPostForCorpus } from '../../store/actions/post';

export const ModalFilterForCorpusAndBuilding = ({activeBuildingRef, DATA_POSTS, DATA_USERS_TBR, DATA_COMPONENT, modalVisibleFilter, setModalVisibleFilter, stateChart, stateChartInnerRef, period, corpusId, choisePost, setFlagArrayPosts}) => {
    const dispatch = useDispatch()
    return <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisibleFilter}
    onRequestClose={() =>{
      Alert.alert('Modal has been closed.')
      setModalVisibleFilter(!modalVisibleFilter)
    }}
  >
     <View style={styles.centeredView}>
    
        
        <View style={DATA_POSTS.length === 0  && DATA_USERS_TBR.length === 0  && DATA_COMPONENT.length === 0 ? {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} : {display: 'none'}}>
        <Pressable
          onPress={() => {

            stateChart.employee = true
            // if (DATA_POSTS.length) {
            //   dispatch(getListUsersStaticTbr(period, activeBuildingRef.current.building_id))

            // }
            dispatch(clearBypassBuildingForCorpus())
            dispatch(getListUsersStaticWithTbrCorpus(period, corpusId))
            dispatch(loadPostForCorpus(corpusId))
            // console.log('period:' , period)
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChart.employee ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('employees')}</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            stateChart.posts = true
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChart.posts ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('posts')}</Text>
        </Pressable> */}
        <Pressable
          onPress={() => {
            stateChart.buildings = true
            dispatch(clearListUsersStaticWithTbrCorpus())
            dispatch(loadBypassBuildingForCorpus(period, corpusId))
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChart.buildings ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('building')}</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            stateChart.components = true
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChart.components ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('components')}</Text>
        </Pressable> */}
        </View>

        <View style={DATA_POSTS.length || DATA_USERS_TBR.length || DATA_COMPONENT.length ? {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'} : {display: 'none'}}>
        <Pressable
          onPress={() => {

            stateChartInnerRef.employee = true
            
            dispatch(getListUsersStaticTbr(period, activeBuildingRef.current.building_id))
            setFlagArrayPosts([])
            dispatch(clearBypassUsersAverageAll())

            // temporary solution for restore settings of loader status
            choisePost.current = null

            // dispatch(clearBypassPosts())
            
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChartInnerRef.employee ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('employees')}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            stateChartInnerRef.posts = true
            dispatch(loadBypassPosts(period, activeBuildingRef.current.title))
            dispatch(clearListUsersStaticTbr())
            dispatch(clearListUsersStaticWithTbrDetailAll())
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChartInnerRef.posts ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('posts')}</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            stateChartInnerRef.components = true
            dispatch(getComponentForBuilding(period, activeBuildingRef.current.building_id))
            dispatch(clearListUsersStaticTbr())
            dispatch(clearListUsersStaticWithTbrDetailAll())
            setFlagArrayPosts([])
            dispatch(clearBypassUsersAverageAll())
            setModalVisibleFilter(!modalVisibleFilter)
          }}
          style={{borderRadius: 20, padding: 10, elevation: 2}, stateChartInnerRef.components ? {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: "black"} : {borderRadius: 20, padding: 10, elevation: 2, backgroundColor: '#2196F3'}}
        >
          <Text style={{color: 'white'}}>{i18n.t('components')}</Text>
        </Pressable> */}
        </View>
        </View>
  </Modal>
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25
      },
})