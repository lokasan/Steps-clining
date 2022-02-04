import React, {useEffect, Fragment, useCallback, useMemo, memo} from 'react'
import { Text, View, Share, Dimensions, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator, Animated, Alert, ScrollView, Modal, SafeAreaView, StatusBar, Platform, Pressable } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux'
import { getPostAll, loadPost, loadPostForCorpus } from '../store/actions/post';
import QRCode from 'react-native-qrcode-generator'
import {Cycle, Clock, Rank, QRIcon, StepsIcon, PeopleIcon, ArrowRight, TimeBetweenBypass} from '../components/ui/imageSVG/circle'
import { useState, useRef } from 'react';
import { clearBypassObjectDetail, clearBypassObjectDetailAll, clearBypassPosts, clearBypassUsers, clearBypassUsersAverage, clearBypassUsersAverageAll, clearBypassUsersDetail, clearBypassUsersDetailAll, clearBypassUsersDetailForDay, clearListUsersStaticTbr, clearListUsersStaticWithTbrDetailAll, getImageBypassUserOfPost, getImageBypassUserOfPostCount, getListUsersAverageForPost, getListUsersStaticTbr, getListUsersStaticWithTbrDetail, loadBypassGetter, loadBypassObjectDetail, loadBypassPosts, loadBypassUsers, loadBypassUsersDetail, getComponentForBuilding, clearComponentForBuilding, loadBypassBuildingForCorpus, clearBypassBuildingForCorpus, getListUsersStaticWithTbrCorpus, clearListUsersStaticWithTbrCorpus, clearListUsersStaticWithTbrCorpusDetail, clearListUsersStaticWithTbrCorpusDetailAll, clearCyclesListForUserInBuildingDetailAll, clearCyclesListForUserInCorpusDetailAll } from '../store/actions/bypass';
import { msToTime, timeToFormat, countFormat } from '../utils/msToTime';
import { UploadDataToServer } from '../uploadDataToServer';
import { clearBypassRankImage, clearBypassRankImageCount, showLoaderBypassRank } from '../store/actions/bypassRank';
import CarouselItem from '../components/ui/CarouselItem'
import { ArrowTrand } from '../components/toolkitComponents/ArrowTrand';
import { BasicStatEmploee } from '../components/BasicStatEmploee';
import { FilterStat } from '../components/FilterStat';
import { User } from './statistics/User';
import { Attribute } from './statistics/Attribute';
import { BarChart } from '../components/BarChart';
import { DateChanger } from '../components/Analytics/DateChanger';
import {ModalFilterForCorpusAndBuilding} from '../components/ui/ModalFilterForCorpusAndBuilding'
import { ModalPhotoOfBypass } from '../components/ui/ModalPhotoOfBypass';
import { PostInCorpus } from './statistics/PostInCorpus';
// import { Circle } from 'react-native-svg';
// import Shares from 'react-native-share'
const NORMAL_RANK = 3
const {width, height} = Dimensions.get("window")
export const StatusObject = ({route, navigation}) => {
  const {corpusId} = route.params
  
  // console.log()
  const [modalVisibleFilter, setModalVisibleFilter] = useState(false)
  const openFilter = () => setModalVisibleFilter(!modalVisibleFilter)
  const dispatch = useDispatch()
  const existsComponents = useRef([])
  useEffect(() => {
    dispatch(loadBypassBuildingForCorpus('today', corpusId))
    navigation.setParams({openModalFilter: openFilter})
  }, [])
  const bypassKeyByValueRef = useRef(null)
  const bypassPhotoPostIdRef = useRef(null)
  const bypassPhotoEmailRef = useRef(null)
  const DATA_OBJECTS_LIST                                           = useSelector(state => state.bypass.bypassGetter)
  const [period, setPeriod]                             = useState('today')
  const [flagArrayObjects, setFlagArrayObjects]         = useState([])
  const [flagArrayPosts, setFlagArrayPosts]             = useState([])
  const [flagArrayUsersDetail, setFlagArrayUsersDetail] = useState([])
  const [flagArrayObjectDetail, setFlagArrayObjectDetail] = useState([])
  const loading                                         = useSelector(state => state.bypass.loading)
  const loaderIcon = useSelector(state => state.bypass.loaderIcon)
  const loaderPhotos = useSelector(state => state.bypassRank.loading)
  const DATA_POSTS                                      = useSelector(state => state.bypass.bypassPostsList)
  const DATA_USERS                                      = useSelector(state => state.bypass.bypassUsersList)
  const DATA_USERS_DETAIL                               = useSelector(state => state.bypass.bypassUsersListDetail)
  const DATA_USERS_DETAIL_FOR_DAY = useSelector(state => state.bypass.bypassUSersListDetailForDay)
  const USERS_AVERAGE_STAT = useSelector(state => state.bypass.usersAverageStat)
  const DATA_OBJECT_DETAIL = useSelector(state => state.bypass.bypassObjectDetail)
  const DATA_IMAGE_BYPASS_RANK = useSelector(state => state.bypassRank.bypassRankImage)
  const COUNT_IMAGE_TO_BYPASS_RANK = useSelector(state => state.bypassRank.bypassRankImageCount)
  const DATA_USERS_TBR = useSelector(state => state.bypass.usersWithTbr)
  const DATA_USERS_TBR_CORPUS = useSelector(state => state.bypass.userWithTbrCorpus)
  const DATA_COMPONENT = useSelector(state => state.bypass.componentForBuilding)
  // const DATA_USERS_TBR_DETAIL = useSelector(state => state.bypass.userWithTbrDetail)
  const emploeeAll   = useSelector(state => state.empDouble.empAll)
  // console.log('Count of photos: ', COUNT_IMAGE_TO_BYPASS_RANK)
  // console.log(DATA_USERS_TBR, 'DATA_USER_TBR')
  // console.log(emploeeAll, 'EMP_ALL DATA')
  // console.log(emploeeAll.map(emp => console.log()))
  // console.log('I have corpus with tbr detail', DATA_USERS_TBR_CORPUS)
  let imageToBypassRankArray = []
  
  useEffect(()=> {
    imageToBypassRankArray = []
    for (let i; i < COUNT_IMAGE_TO_BYPASS_RANK; i++) {
      imageToBypassRankArray.push(0)
      // console.log('test ', i)
    }
  }, [COUNT_IMAGE_TO_BYPASS_RANK])
  // useEffect(() => {
  //   console.log(DATA_COMPONENT, 'DATA_COMPONENT')
  // }, [DATA_COMPONENT])
  const USERS_LIST = useSelector(state => state.empDouble.empServer)
  // console.log(DATA_POSTS)
  // console.log(DATA_USERS, 'data userss');
  // console.log(USERS_AVERAGE_STAT, 'users average')
  // console.log(DATA_USERS_DETAIL, 'DETAILS')
  // console.log(DATA_OBJECT_DETAIL, 'OBJECTS_TES')
  // console.log(USERS_LIST, 'USERS _ LIST')
  const choiseObject = useRef(null)
  const [choiseObjectS, setChoiseObjectS] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleDay, setModalVisibleDay] = useState(false)
  const [modalVisibleRank, setModalVisibleRank] = useState(false)
  let stateChart = useRef({
    posts: false,
    components: false,
    employee: false,
    buildings: true
  })
  let stateChartInnerRef = useRef({
    posts: true,
    components: false,
    employee: false,
  })
  
  const handler = {
    set(target, property, value) {
      if (property in target && typeof value === 'boolean') {
        for (let el in target) {
          if (target.hasOwnProperty(el)) {
            target[el] = false
          }
        }
        target[property] = true
        return true
      }
      return false
    }
  }
  
  stateChart = new Proxy(stateChart.current, handler)
  stateChartInnerRef = new Proxy(stateChartInnerRef.current, handler)

  const activeBuildingRef = useRef('')
      const Item = React.memo(({item, index}) => {
        
          return <TouchableOpacity onPress={() => {
            if (flagArrayObjects.indexOf(item.title) !== -1) {
              dispatch(loadBypassPosts(period, 'tropic'))
              dispatch(clearListUsersStaticTbr())
              dispatch(clearComponentForBuilding())
              dispatch(clearListUsersStaticWithTbrDetailAll())
              clearAnalyticScreen()
              setFlagArrayObjects(flagArrayObjects.filter(e => e !== item.title))
              
            }
            else {
              // console.log(item, 'item test id')
              
              // dispatch(getListUsersStaticTbr(period, item.building_id))
              // dispatch(getListUsersStaticWithTbrDetail(period, item.building_id, '1628444545542'))
              activeBuildingRef.current = item
              dispatch(loadPost(activeBuildingRef.current.building_id))
              if (stateChartInnerRef.posts) {

                dispatch(loadBypassPosts(period, item.title))
              }
              if (stateChartInnerRef.employee) {
                dispatch(getListUsersStaticTbr(period, activeBuildingRef.current.building_id))
                
              }
              if (stateChartInnerRef.components) {
                dispatch(getComponentForBuilding(period, activeBuildingRef.current.building_id))
              }
              
              setFlagArrayObjects([...flagArrayObjects, item.title])
              
            }
            
            }} onLongPress={() => {
              if (flagArrayObjectDetail.indexOf(item.title) !== -1) {
                // dispatch(loadBypassUsers(period, 'tropic'))
                dispatch(clearBypassObjectDetail(DATA_OBJECT_DETAIL, item.title))
                setFlagArrayObjectDetail(flagArrayObjectDetail.filter(e => e !== item.title))
                choiseObject.current = null
              }
              else {
                dispatch(loadBypassObjectDetail(period, item.title))
                setFlagArrayObjectDetail([...flagArrayObjectDetail, item.title])
                choiseObject.current = item.title
                setChoiseObjectS(choiseObject.current)
              }
            }}>
         
          <Animated.View style = {(flagArrayObjects.length && flagArrayObjects.indexOf(item.title) === -1) || 
            (flagArrayObjectDetail.length && 
            flagArrayObjectDetail.indexOf(item.title) !== -1  
            && !loaderIcon) ? {display: 'none'} : styles.item}>
           
              <View style = {{...styles.wrapperFirstLine}}>
                <View>
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <Text style = {styles.headTitle}>{item?.title?.substr(0, 19)}</Text>
                        </View>
                      
                    </View>
                    <View style = {styles.wrapperSecondLine}>
                      <View>
                          <Text style = {styles.beastAndBad}>Лучш. пост</Text>
                          <Text style = {styles.beastAndBad}>Худш. пост</Text>
                      </View>
                      <View>
                          <Text 
                          style = {styles.beastAndBadNames}>{item?.bestPost?.substr(0, 14)} {item.bestRank}</Text>
                          {period === 'today' ? <TouchableOpacity>
                          <Text 
                          style = {styles.beastAndBadNames}>{item?.badPost?.substr(0, 14)} {item.badRank}</Text>
                          </TouchableOpacity>: 
                          <Text 
                          style = {styles.beastAndBadNames}>{item?.badPost?.substr(0, 14)} {item.badRank}</Text>
                          }
                      </View>
                    </View>
                </View>
                <View 
                style = {{
                  position: 'relative',
                  justifyContent: 'flex-end', 
                  width: '50%', bottom: 0, 
                  right: 0, 
                  height: '100%'}}>
                <View 
                style = {{
                  ...styles.sticker, 
                  backgroundColor: '#303F9F', 
                  height: '50%', 
                  borderBottomLeftRadius: 0, 
                  borderBottomRightRadius: 15, 
                  borderTopRightRadius: 0}}>
              
              
                <View style = {styles.toolkitPad}>
                
                  <View style = {styles.alignElementsCenter}>
                  {Rank()}
                  <Text style = {styles.textStyleInToolkit}>{item.avgRanks.toFixed(1)}</Text>
                  </View>
                  <View style = { stateChartInnerRef.employee ? styles.alignElementsCenter : {display: 'none'}}>
                  {Cycle()}
                  <Text style = {styles.textStyleInToolkit}>{countFormat(item.cycle)}</Text>
                  </View>
                  <View style = {stateChartInnerRef.employee ? styles.alignElementsCenter : {display: 'none'}}>
                  {TimeBetweenBypass('#fff', 17, 16)}
                  <Text style = {styles.textStyleInToolkit}>{timeToFormat(msToTime(item.time_between_bypass))}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {QRIcon()}
                  <Text style = {styles.textStyleInToolkit}>{countFormat(item.countBypass)}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {Clock()}
                  <Text style = {styles.textStyleInToolkit}>{item.countTime}</Text>
                  </View>
                  {/* <View style = {styles.alignElementsCenter}>
                  {StepsIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.steps}</Text>
                  </View> */}
                  <View style = {{...styles.alignElementsCenter, paddingTop: 20}}>
                    <ArrowTrand item={item}/>
                  </View>
                </View>
              </View>
              </View>
              {  choiseObject.current === item.title && loaderIcon ? 
              <View 
              style={{
                position: 'absolute', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                height: 100, 
                opacity: 1}}>
              <ActivityIndicator color  = "#0000ff"/>
              </View> : null}
              </View>
          </Animated.View>
          </TouchableOpacity>
      })
      const choisePost = useRef(null)
      
      const createViewDataComponentObject = (item, index) => {
        let createViewData = []
        if (item?.data?.length !== 0) {
          
          for (let el in item.data) {
            const dateBypassEnd = new Date(+item.data[el].end_time)
            const dateBypassStart = new Date(+item.data[el].start_time)
            
            createViewData.push(<View>
              <Text 
                style={styles.beastAndBad}>
                  {`${dateBypassEnd.getDate() / 10 >= 1 ? dateBypassEnd.getDate() : '0' + dateBypassEnd.getDate()}.${(dateBypassEnd.getMonth() + 1) / 10 >= 1 ?  dateBypassEnd.getMonth() + 1 :  '0' + (dateBypassEnd.getMonth() + 1)}`}
              </Text>
              <TouchableOpacity 
                onLongPress={
                  () => alertStatus(item.data[el].weather)}>
                    <Image 
                      style = {{marginLeft: 20, height: 25, width: 20, top: 3}} 
                      source={item.data?.length !== 0 ? 
                      {uri: `http://openweathermap.org/img/wn/${item.data[el].icon}@2x.png`} : 
                      null}/>
              </TouchableOpacity>
              <Text style={styles.beastAndBad}>{item.data[el].temperature}</Text>
              <Text style={styles.beastAndBad}>{item.data[el].post_name.slice(0, 4)}</Text>
              <Image style={{width: 20, height: 20, marginLeft: 22, marginTop: 11, borderRadius: 50}} 
              source={{uri: USERS_LIST.map(els => {
                if (els.email === item?.data[el]?.email) {
                  return els.img
                }
                }).join('')}}/>
              <Text style={styles.beastAndBad}>{item.data[el].avg_rank.toFixed(2)}</Text>
              <Text style={styles.beastAndBad}>{
              dateBypassStart.getHours() / 10 >= 1 ? dateBypassStart.getHours() : '0' + dateBypassStart.getHours()}:{dateBypassStart.getMinutes() / 10 >= 1? dateBypassStart.getMinutes() : '0' + dateBypassStart.getMinutes()}
              </Text>
              <Text style={styles.beastAndBad}>{dateBypassEnd.getHours() / 10 >= 1? dateBypassEnd.getHours() : '0' + dateBypassEnd.getHours()}:{dateBypassEnd.getMinutes() / 10 >= 1 ? dateBypassEnd.getMinutes() : '0' + dateBypassEnd.getMinutes()}
              </Text>
              <Text style={styles.beastAndBad}>{timeToFormat(msToTime(dateBypassEnd - dateBypassStart))}</Text>
              </View>)
          }
        }
        return createViewData
      }
      const ItemObjectDetail = useCallback(({item, index}) => {
       
       
        // console.log(item, 'object_detail data item')
        // console.log(choiseObject.current)
        // const comparePosts = choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        const compareObject = choiseObjectS.current === item?.data[0]?.object_name
        // console.log(compareObject, 'compare_obj')
        // console.log(loaderIcon, 'loaderIcons')
        
        // choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        
          return <Animated.View style = {  compareObject && loaderIcon ? {display: 'none'} : styles.itemUD}>
           
              <View style = {{...styles.wrapperFirstLine}}>
                <View> 
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <TouchableOpacity onPress={() => {
                            choiseObject.current = null
                            setFlagArrayObjectDetail(flagArrayObjectDetail
                              .filter(el => !(el=== item?.data[0]?.object_name)))
                            dispatch(clearBypassObjectDetail(DATA_OBJECT_DETAIL, item?.data[0]?.object_name))}}>
                              <Text style = {styles.headTitle}>{item?.data[0]?.object_name}</Text>
                              </TouchableOpacity>
                        </View>
                      
                    </View>
                    <View style = {styles.wrapperSecondLine}>
                      <View>
                        <Text style={styles.beastAndBad}>Дата</Text>
                        <Text style={styles.beastAndBad}>Погода</Text>
                        <Text style={styles.beastAndBad}>Температура</Text>
                        <Text style={styles.beastAndBad}>Пост</Text>
                        <Text style={styles.beastAndBad}>Сотрудник</Text>
                        <Text style={styles.beastAndBad}>Рейтинг</Text>
                        <Text style={styles.beastAndBad}>Вр. нач. обх.</Text>
                        <Text style={styles.beastAndBad}>Вр. кон. обх.</Text>
                        <Text style={styles.beastAndBad}>Длит. обх.</Text>
                      </View>
                      <ScrollView 
                        vertical={false} 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                        style={{display: 'flex', flexDirection: 'row', width: '75%'}}>
                      {createViewDataComponentObject(item)}
                      </ScrollView>
                        {/* <Image style = {{...styles.beastAndBad, height: 32, width: 20}} source={item.data?.length !== 0 ? {uri: `http://openweathermap.org/img/wn/${item.data[0].icon}@2x.png`} : null}/> */}
                      
                     
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
              </View>
              
              </View>
              
          </Animated.View> 
      })

      const ItemPostsInner = ({item, index}) => {

        const updateElement = useCallback(() => {
          if (flagArrayPosts.indexOf(item.title) !== -1) {
            // dispatch(loadBypassUsers(period, 'tropic'))
            // dispatch(clearBypassUsers(DATA_USERS, item.title))
            dispatch(clearBypassUsersAverage(USERS_AVERAGE_STAT, item.title))
            setFlagArrayPosts(flagArrayPosts.filter(e => e !== item.title))
            choisePost.current = null
          }
          else {
            // dispatch(loadBypassUsers(period, item.title))
            dispatch(getListUsersAverageForPost(period, null, null, item.title))
            setFlagArrayPosts([...flagArrayPosts, item.title])
            choisePost.current = item.title
          }
          
          }, [])
        
          return <TouchableOpacity onPress={useCallback(updateElement, [])}>
              {/* {...styles.item, transform: [{scale}], opacity} */}
          <Animated.View style = { 
            choisePost.current === item.title && loaderIcon ? 
            {opacity: 0.2, ...styles.item,  height: 30} : 
            {...styles.item, height: 30}}>
              
              <View style = {{...styles.wrapperFirstLine}}>
                <View>
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <Text style = {styles.headTitle}>{item?.title?.substr(0, 19)}</Text>
                        </View>
                      
                    </View>
                    {/* <View style = {styles.wrapperSecondLine}>
                      <View>
                          <Text style = {styles.beastAndBad}>Лучш. комп.</Text>
                          <Text style = {styles.beastAndBad}>Худш. комп.</Text>
                      </View>
                      <View>
                      <Text style = {styles.beastAndBadNames}>
                            <Text>{item.bestComponent}</Text> <Text style={item.bestComponentRank > NORMAL_RANK ? {fontWeight: 'bold'} : {fontWeight: 'bold', color: 'red'}}>{item.bestComponentRank}</Text></Text>
                            <Text style = {styles.beastAndBadNames}>
                            <Text>{item.badComponent}</Text> <Text style={item.badComponentRank > NORMAL_RANK ? {fontWeight: 'bold'} : {fontWeight: 'bold', color: 'red'}}>{item.badComponentRank}</Text></Text>
                      </View>
                    </View> */}
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '50%'}}>
                <View 
                style = {{
                  ...styles.sticker, 
                  height: '100%', 
                  backgroundColor: 'black', 
                  borderBottomLeftRadius: 0, 
                  borderBottomRightRadius: 15, 
                  shadowOffset : 
                  {
                    width : 0,
                    height: 0,
                  }, 
                  shadowRadius: 0,
                  elevation: 0}}>
              
              
                <View style = {styles.toolkitPad}>
                
                  <View style = {styles.alignElementsCenter}>
                
                  <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.avgRanks.toFixed(1)}</Text>
                  </View>
                 
                  <View style = {styles.alignElementsCenter}>
                 
                  <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.countBypass}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  
                  <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.countTime}</Text>
                  </View>
                  {/* <View style = {styles.alignElementsCenter}>
                  
                  <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.steps}</Text>
                  </View> */}
                  <ArrowTrand item={item}/>
                  
                </View>
              </View>
              </View>
              {  choisePost.current === item.title &&  loaderIcon ? 
              <View 
              style={{
                position: 'absolute', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                height: 100,
                opacity: 1}}>
              <ActivityIndicator color  = "#0000ff"/>
              </View> : null}
              </View>
              
          </Animated.View>
          </TouchableOpacity>
      }
      const ItemPosts = memo(ItemPostsInner)
      const [choisePostS, setChoisePostS] = useState(null)
      const CreateTextComponentWithRatingUsers = ({item}) => {
        let createdElements = []
        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        }
        for (let cmp of existsComponents.current) {
          let keyByValue = getKeyByValue(item, cmp)
          if (keyByValue) {
            // console.log(item.is_image)
            createdElements.push(<TouchableOpacity onPress={() => {
              bypassKeyByValueRef.current = keyByValue
              bypassPhotoPostIdRef.current = item.post_id
              bypassPhotoEmailRef.current = item.email
              dispatch(showLoaderBypassRank())
              dispatch(getImageBypassUserOfPostCount(period, keyByValue, item.post_id, item.email))
              dispatch(getImageBypassUserOfPost(period, keyByValue, item.post_id, item.email, DATA_IMAGE_BYPASS_RANK.length))
              setModalVisibleRank(true)
              
            }} disabled={ +item[keyByValue + 'count_bad_rank'] ? false : true}>
              <Text style={+item[keyByValue + 'count_bad_rank'] ? {...styles.beastAndBad, color: '#e4a010'} : 
            {...styles.beastAndBad, color: "black"}}>{`${item[keyByValue + '_rank']}`}
              </Text></TouchableOpacity>)
          } else {
            createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
          }
        }  
        return createdElements;
      }

      const showUserDetailInfoOrUnshow = (el, item) => {
        if (flagArrayUsersDetail
          .map(
            elem => elem.email === item.data[el].email && elem.post === item.data[el].post_name)
            .indexOf(true) !== -1) {
          // dispatch(loadBypassUsersDetail(period, 'null', 'null'))
            // console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
            dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, item.data[el].email, item.data[el].post_name))
            choisePost.current = null
            
            setFlagArrayUsersDetail(
              [...flagArrayUsersDetail
                .filter(elem => !(elem.email === item.data[el].email && elem.post === item.data[el].post_name))])
            
        }
        else {
         
          dispatch(loadBypassUsersDetail(period, item.data[el].email, item.data[el].post_name))
          
          choisePost.current = {email: item.data[el].email, post: item.data[el].post_name}
          setChoisePostS(choisePost.current)
          
          setFlagArrayUsersDetail([...flagArrayUsersDetail, 
                                                          {
                                                            email: item.data[el].email,
                                                            post: item.data[el].post_name
                                                          }
                                  ])
        }
        if (period === 'today') {
          setModalVisibleDay(true)
        }
      }
      
      const CreateViewDataComponentUsers = React.memo(({item, index}) => {
        let createViewData = []
        if (item?.data?.length !== 0) {
          
          for (let el in item.data) {
            createViewData.push(<View>
              <TouchableOpacity onPress = {() => showUserDetailInfoOrUnshow(el, item)}>
              <Image 
              style={{
                width: 20, 
                height: 20, 
                marginLeft: 22, 
                marginTop: 11, 
                borderRadius: 50}} source={{uri: USERS_LIST.map(els => {
                if (els.email === item?.data[el]?.email) {
                  return els.img
                }
                }).join('')}}/>
              </TouchableOpacity>
              <Text style={styles.beastAndBad}>{item.data[el].avg_rank}</Text>
              <Text style={styles.beastAndBad}>{countFormat(item.data[el].count_bypass)}</Text>
              <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.data[el].time_bypass))}</Text>
              <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.data[el].time_bbb))}</Text>
              <Text style={styles.beastAndBad}>{item.data[el].cleaner}</Text>
              <CreateTextComponentWithRatingUsers item={item?.data[el]} />
              </View>)
          }
        }
        return createViewData
      })
      const ItemUsers = React.memo(({item, index}) => {
        
        // console.log('RENDER ITEMUSERS')
        // console.log('RENDER', item?.data[0]?.email)
        let textComponent = createTextComponent(item).textComponent
        const comparePosts = choisePostS?.email === item?.data[0]?.email && 
        choisePostS?.post === item?.data[0]?.post_name
          return (
          <Animated.View style = {flagArrayUsersDetail.length && flagArrayUsersDetail.map(el => item.data
            .map(elD => el.email === elD.email && el.post === elD.post_name))
          .map(res => res.indexOf(true) !== -1? true : false)
          .indexOf(true) !== -1 && !loaderIcon  && period !== 'today' ? {display: 'none'} : {...styles.itemUD}}>
           
           <View style = {{...styles.wrapperFirstLine}}>
             <View> 
                 <View style = {styles.wrapperFirstLine}>
                     <View>
                     </View>
                 </View>
                 <View style = {styles.wrapperSecondLine}>
                   <View>
                     <Text style={styles.beastAndBad}>Сотрудник</Text>
                     <Text style={styles.beastAndBad}>Средний балл</Text>
                     <Text style={styles.beastAndBad}>Кол-во обходов</Text>
                     <Text style={styles.beastAndBad}>Время обходов</Text>
                     <Text style={styles.beastAndBad}>Время между обх.</Text>
                     <Text style={styles.beastAndBad}>Уборщик</Text>
                     {textComponent}
                   </View>
                   <ScrollView 
                   vertical={false} 
                   horizontal={true} 
                   showsHorizontalScrollIndicator={false} 
                   style={{display: 'flex', flexDirection: 'row', width: '65%'}}>
                   <CreateViewDataComponentUsers item={item}/>
                   </ScrollView>
                 </View>
             </View>
             <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
           <ArrowTrand item={item}/>
           </View>
           </View>
       </Animated.View>)
      }, (prevProps, nextProps) => {
        // console.log(JSON.stringify(nextProps), '<<----next props')
        return nextProps.item.data[0].email === prevProps.item.data[0].email
      })
    
      const createTextComponent = (item, index) => {
        let createdComponent = []
        let uniqueComponent = {}
        let valueOfKeyComponent = []
        if (item?.data?.length !== 0) {
          item.data.map(el => {
            Object.keys(el).map(key => {
              if (!isNaN(Number(key))) {
                if (!uniqueComponent.hasOwnProperty(key)) {
                  uniqueComponent[key] = el[key]
                }
              }
            })
          })
      
          valueOfKeyComponent.push(...Object.values(uniqueComponent))
          valueOfKeyComponent.map(el => createdComponent.push(<Text style ={styles.beastAndBad}>{el}</Text>))
      
          existsComponents.current = valueOfKeyComponent
          valueOfKeyComponent = []
        }
        return {textComponent: createdComponent, existsComponents}
      }
      const alertStatus = (status) => {
        Alert.alert(status)
      }
      const createTextComponentWithRating = item => {
        let createdElements = []
        function getKeyByValue(object, value) {
          return Object.keys(object).find(key => object[key] === value);
        }
          for (let cmp of existsComponents.current) {
            let keyByValue = getKeyByValue(item, cmp)
            if (keyByValue) {
              // console.log(item.is_image)
              createdElements.push(<TouchableOpacity 
                style={item[keyByValue + '_is_image'] ? {...styles.beastAndBad} : styles.beastAndBad }
              onLongPress={() => alertStatus(item[keyByValue + '_name_c_r'])}
              onPress={() => {
                // console.log(keyByValue)
                if (item[keyByValue + '_is_image']) {
                  bypassKeyByValueRef.current = item[keyByValue + '_bypass_rank_id']
                  dispatch(showLoaderBypassRank())
                  UploadDataToServer.getBypassPhotoCount(item[keyByValue + '_bypass_rank_id'])

                  UploadDataToServer.getBypassPhoto(item[keyByValue + '_bypass_rank_id'], DATA_IMAGE_BYPASS_RANK.length)
                  setModalVisible(true)
                }
              }}>
                
                <Text 
                style={
                  item[keyByValue + '_is_image'] ? 
                  {fontSize: 10, fontFamily: 'open-bold', color: '#e4a010'} : 
                  {fontSize: 10, fontFamily: 'open-bold'}}>{item[keyByValue + '_rank']}
                </Text>
               
                </TouchableOpacity>)
            } else {
              createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
            }
          }  
        return createdElements;
      }
      
      const CreateViewDataComponentDay = React.memo(({item, index}) => {
        
        let createViewDataday = []

        if (item?.data?.length !== 0) {

          for (let el in item.data) {
            
            
            const dateBypassEnd = new Date(+item.data[el].end_time)
            const dateBypassStart = new Date(+item.data[el].start_time)

            createViewDataday.push(<View>
              <Text style={styles.beastAndBad}>{Number(el) + 1}</Text>
              <TouchableOpacity 
                onLongPress={() => alertStatus(item.data[el].weather)}>
                  <Image 
                    style = {{marginLeft: 20, height: 25, width: 20, top: 3}} 
                    source={item.data?.length !== 0 ? 
                    {uri: `http://openweathermap.org/img/wn/${item.data[el].icon}@2x.png`} :
                    null}/>
              </TouchableOpacity>
              <Text style={styles.beastAndBad}>{item.data[el].temperature}</Text>
              

              
              <Text style={styles.beastAndBad}>{
              dateBypassStart.getHours() / 10 >= 1? 
              dateBypassStart.getHours() : 
              '0' + dateBypassStart.getHours()}:{
              dateBypassStart.getMinutes() / 10 >= 1? 
              dateBypassStart.getMinutes() : 
              '0' + dateBypassStart.getMinutes()
              }
              
              </Text>
              <Text style={styles.beastAndBad}>{
              dateBypassEnd.getHours() / 10 >= 1? 
              dateBypassEnd.getHours() : 
              '0' + dateBypassEnd.getHours()
              }:{
                dateBypassEnd.getMinutes() / 10 >= 1? 
                dateBypassEnd.getMinutes() : 
                '0' + dateBypassEnd.getMinutes()
              }
              
              </Text>
              <Text style={styles.beastAndBad}>{timeToFormat(msToTime(dateBypassEnd - dateBypassStart))}</Text>
              <Text style={styles.beastAndBad}>{item.data[el].cleaner == 1 ? '+' : '-'}</Text>
              {createTextComponentWithRating(item?.data[el])}
              </View>)
            
          }
        }
        return createViewDataday
      })

      const [monthRange, setMonthRange] = useState('year')

      const choseDateCurrentRef = useRef([])

      const createViewDataComponent = (item, index) => {

        function getFilledArray (arr) {

          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < item.data.length; j++) {

                if (arr[i].date === item.data[j].date) {
                  arr[i] = item.data[j]
                    break
                }
            }
          }
          return JSON.parse(JSON.stringify(arr))
        }

        let createViewData = []

        if (item?.data?.length !== 0) {
          // console.log(item.data, 'FINAL RES')
          const fullFillArray = []
          if (period === 'week' || period === 'month') {
            for (let i = period === 'week' ? 7 : period === 'month' ? 31 : 0; i >= 0; i--) {
              currentDate = new Date(new Date().setDate(new Date().getDate() - i))
              fullFillArray.push({date: 
                currentDate.getFullYear() + '-' + 
                ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                (currentDate.getMonth() + 1) : 
                '0' + (currentDate.getMonth() + 1)) + '-' +
                (currentDate.getDate() / 10 >= 1 ? currentDate.getDate()  : '0' + currentDate.getDate() )
              })
            }
            
            item.data = getFilledArray(fullFillArray)
            // console.log(item.data, 'REKET')
          }
          if (monthRange === 'month_range') {

            for (let i = 31; i >= 0; i--) {
              currentDate = new Date(new Date(...choseDateCurrentRef.current)
                            .setDate(new Date(...choseDateCurrentRef.current).getDate() - i))
              fullFillArray.push({date: 
                currentDate.getFullYear() + '-' + 
                ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                (currentDate.getMonth() + 1) : 
                '0' + (currentDate.getMonth() + 1)) + '-' +
                (currentDate.getDate() / 10 >= 1 ? currentDate.getDate()  : '0' + currentDate.getDate() )
              })
            }
            
            item.data = getFilledArray(fullFillArray)
          }
          if (period === 'year' && monthRange === 'year') {
            for (let i = 12; i >= 0; i--) {
              let currentDate = new Date(new Date().getFullYear(), new Date().getMonth() - i)
              // console.log(currentDate, 'TEST My DATE', `[${i}]`)
              fullFillArray.push({date: String(currentDate.getFullYear()).slice(2) + '-' 
              + ((currentDate.getMonth() + 1) / 10 >= 1 ? 
              (currentDate.getMonth() + 1) : 
              '0' + (currentDate.getMonth() + 1))})
            }
            
            item.data = getFilledArray(fullFillArray)
          }
          // console.log(item.data, 'REKET')
          for (let el in item.data) {
            
              let [year, month, day] = item.data[el].date.split('-')

              createViewData.push(<View>
                <TouchableOpacity 
                  disabled={!item.data[el].email ? true : false}
                  onPress={() => {
                    if (period === 'year' && monthRange === 'year') {
                      choseDateCurrentRef.current = [year.length === 2 ? 20 + year : year, +month]
                      setMonthRange('month_range')
                      dispatch(loadBypassUsersDetail(
                        'month_range', item.data[el].email, item.data[el].post_name, 
                      new Date(year.length === 2 ? 20 + year : year, +month - 1).getTime()))
                    } else {
                      dispatch(loadBypassUsersDetail(period === 'year' && monthRange === 'year' ? 'month' : 'day', item.data[el].email, item.data[el].post_name, 
                      new Date(year.length === 2 ? 20 + year : year, +month - 1, day ? +day : 1).getTime()))
                    }
                    
                    if (period !== 'year' || monthRange === 'month_range') {
                      // if (monthRange === 'month_range') {

                      // }
                      setModalVisibleDay(true)
                    }
                    
                  }}
                >
                  <Text 
                    style={styles.beastAndBad}>
                      {item.data[el].date.split('-').reverse().join('.').slice(0, 5)}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.beastAndBad}>{item.data[el].temperature}</Text>
                <Text style={styles.beastAndBad}>{item.data[el].avg_rank}</Text>
                <Text style={styles.beastAndBad}>{countFormat(item.data[el].count_bypass)}</Text>
                <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.data[el].time_bypass))}</Text>
                <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.data[el].time_bbb))}</Text>
                <Text style={styles.beastAndBad}>{item.data[el].cleaner}</Text>
                {createTextComponentWithRating(item?.data[el])}
              </View>)
            
            
          }
        }
        return createViewData
      }
      
      const ItemUsersDetails = ({item, index}) => {
        // const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);
       
        let textComponent = createTextComponent(item).textComponent

        // console.log(item, 'users_detail data item')
        // console.log(choisePost.current)
        // const comparePosts = choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        const comparePosts = choisePostS.current?.email === item.data[0]?.email && 
        choisePostS.current?.post === item.data[0]?.post_name

        
        // choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        
          return (
            <Animated.View style = {  comparePosts && loaderIcon ? {display: 'none'} : {...styles.itemUD}}>
              <View style = {{...styles.wrapperFirstLine}}>
                <View> 
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <TouchableOpacity 
                            onPress={() => {
                              if (monthRange === 'month_range') {
                                dispatch(loadBypassUsersDetail('year', item?.data[0]?.email, 
                                item?.data[0]?.post_name))
                                setMonthRange('year')
                              } else {
                                setFlagArrayUsersDetail(flagArrayUsersDetail
                                  .filter(el => !(el.email === item?.data[0]?.email && 
                                    el.post === item?.data[0]?.post_name)))
                              }
                              
                              dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, 
                              item?.data[0]?.email, item?.data[0]?.post_name))}}>
                            <Text 
                              style = {styles.headTitle}>{period === 'today' ? 
                              item?.data[0]?.post_name : item?.data[0]?.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {styles.wrapperSecondLine}>
                      <View>
                      <Text style={styles.beastAndBad}>Дата</Text>
                      <Text style={styles.beastAndBad}>Температура</Text>
                      <Text style={styles.beastAndBad}>Средний балл</Text>
                      <Text style={styles.beastAndBad}>Кол-во обходов</Text>
                      <Text style={styles.beastAndBad}>Время обходов</Text>
                      <Text style={styles.beastAndBad}>Время между обх.</Text>
                      <Text style={styles.beastAndBad}>Уборщик</Text>
                        {textComponent}
                      </View>
                      <ScrollView 
                        vertical={false} 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                        style={{display: 'flex', flexDirection: 'row', width: '68%'}}>
                      {createViewDataComponent(JSON.parse(JSON.stringify(item)))}
                      </ScrollView>
                      <Image 
                        style = {{paddingLeft: 22, paddingTop : 11, height: 32, width: 20}} 
                        source={item.data?.length !== 0 ? 
                          {uri: `http://openweathermap.org/img/wn/${item.data[0].icon}@2x.png`} :
                          null}/>
                    </View>
                </View>
                <View 
                  style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}> 
                </View>
              </View>
            </Animated.View>
          ) 
          
      }
      const ItemUsersDetailsModal = React.memo(({item, index}) => {
        let textComponent = createTextComponent(item).textComponent
        // console.log("RENDER itemusersdetailsModal")

        return (
          <Animated.View style = {styles.itemUD}>
            <View style = {{...styles.wrapperFirstLine}}>
              <View> 
                  <View style = {styles.wrapperFirstLine}>
                      <View>
                       <Text style = {styles.headTitle}>{item?.data[0]?.post_name}</Text>
                        
                      </View>
                  </View>
                  <View style = {styles.wrapperSecondLine}>
                    <View>
                    <Text style={styles.beastAndBad}>Обход №</Text>
                    <Text style={styles.beastAndBad}>Погода</Text>
                    <Text style={styles.beastAndBad}>Температура</Text>
                    <Text style={styles.beastAndBad}>Вр. нач. обх.</Text>
                    <Text style={styles.beastAndBad}>Вр. кон. обх.</Text>
                    <Text style={styles.beastAndBad}>Длительность обх.</Text>
                    <Text style={styles.beastAndBad}>Уборщик</Text>
                      {textComponent}
                    </View>
                    <ScrollView 
                      vertical={false} 
                      horizontal={true} 
                      showsHorizontalScrollIndicator={false} 
                      style={{display: 'flex', flexDirection: 'row', width: '68%'}}>
                    <CreateViewDataComponentDay item ={JSON.parse(JSON.stringify(item))}/>
                    </ScrollView>
                  </View>
              </View>
              <View 
                style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}> 
              </View>
            </View>
          </Animated.View>
        ) 
      })

      const ITEM_SIZE  = 100
      const [isRefreshing, setIsRefreshing] = useState(false)
      const keyExtractors = useCallback(item => item.id)
      function onRefresh() {
        setIsRefreshing(true)
        dispatch(loadBypassBuildingForCorpus(period, corpusId))
        setIsRefreshing(false)
      }
      const renderItem = useCallback(({ item, index }) => {
          
          return <><Item item = {item} index = {index}/>
          {flagArrayObjectDetail.indexOf(item.title) !== -1 ? <Animated.FlatList 
          showsVerticalScrollIndicator = {false}
          data = {[{id: String(Date.now()), data: DATA_OBJECT_DETAIL.filter(el => el.object_name === item.title )}]} 
          renderItem={renderItemObjectDetails} 
          keyExtractor={item => item.id}/> : null}
          { flagArrayObjects.indexOf(item.title) !== -1 
          ? (stateChartInnerRef.posts ? 
          <PostInCorpus 
            flagArrayPosts={flagArrayPosts} 
            flagArrayUsersDetail={flagArrayUsersDetail}
            setFlagArrayUsersDetail={setFlagArrayUsersDetail}
            setFlagArrayPosts={setFlagArrayPosts} 
            choisePost={choisePost} 
            choisePostS={choisePostS}
            period={period} 
            corpusId={corpusId}
            showUserDetailInfoOrUnshow={showUserDetailInfoOrUnshow}
            setModalVisibleRank={setModalVisibleRank}
            setModalVisible={setModalVisible}
            monthRange={monthRange}
            setMonthRange={setMonthRange}
            setModalVisibleDay={setModalVisibleDay}
            bypassKeyByValueRef={bypassKeyByValueRef}
            bypassPhotoPostIdRef={bypassPhotoPostIdRef}
            bypassPhotoEmailRef={bypassPhotoEmailRef}
            DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK}
            choseDateCurrentRef={choseDateCurrentRef}
            /> : (stateChartInnerRef.employee 
            ? <User 
            period={period} 
            building_id={activeBuildingRef.current.building_id}
            monthRange={monthRange}
            showUserDetailInfoOrUnshow={showUserDetailInfoOrUnshow}
            setModalVisibleDay={setModalVisibleDay}
            flagArrayUsersDetail={flagArrayUsersDetail}
            setFlagArrayUsersDetail={setFlagArrayUsersDetail}
            setMonthRange={setMonthRange}
            choseDateCurrentRef={choseDateCurrentRef}
            setModalVisibleRank={setModalVisibleRank}
            bypassKeyByValueRef={bypassKeyByValueRef}
            bypassPhotoPostIdRef={bypassPhotoPostIdRef}
            bypassPhotoEmailRef={bypassPhotoEmailRef}
            DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK}
            /> : (stateChartInnerRef.components 
              ? <Attribute

                /> : null ))) 
          : null}</>
         
        })
    const renderItemPosts = useCallback(({ item, index }) => {
        // console.log(item, 'render item posts')
      return <><ItemPosts item = {item} index = {index}/>
      { flagArrayPosts.indexOf(item.title) !== -1 ? <Animated.FlatList 
      showsVerticalScrollIndicator = {false} 
      data = {[{id: String(Date.now()), data: USERS_AVERAGE_STAT.filter(el => el.post_name === item.title)}]} 
      renderItem={renderItemUsers} keyExtractor={keyExtractors} 
      listKey={String(Date.now())}/> : null}
      </>
        
    })
    const renderItemUsers = useCallback(({ item, index }) => {
      return <><ItemUsers item = {item} index = {index}/>
      { flagArrayUsersDetail.map(el => item.data
    .map(elD => el.email === elD.email && el.post === elD.post_name))
  .map(res => res.indexOf(true) !== -1 ? true : false)
  .indexOf(true) !== -1 && period !== 'today' ? <Animated.FlatList 
      showsVerticalScrollIndicator = {false} 
      data = {[{id: String(Date.now()), 
        data: DATA_USERS_DETAIL
        .filter(
          el => item.data
          .filter(elD => el.post_name === elD.post_name && el.email === elD.email).length ? true : false)}]}
      renderItem={renderItemUsersDetails} 
      keyExtractor={keyExtractors}/> : null}
      </>
    })

      const renderItemUsersDetails = useCallback(({ item, index }) => {
        return <ItemUsersDetails item = {item} index = {index}/>
      })
      const renderItemUsersDetailsModal = useCallback(({item, index}) => {
        return <ItemUsersDetailsModal item={item} index={index}/>
      }, [])
      const renderItemObjectDetails = useCallback(({ item, index }) => {
        return <ItemObjectDetail item = {item} index = {index}/>
      }, [])
      
      function clearAnalyticScreen() {
        dispatch(clearBypassUsersAverageAll())
        dispatch(clearComponentForBuilding())
        dispatch(clearListUsersStaticWithTbrDetailAll())
        dispatch(clearListUsersStaticWithTbrCorpusDetailAll())
        setFlagArrayPosts([])
        dispatch(clearBypassObjectDetailAll())
        setFlagArrayObjectDetail([])
        dispatch(clearBypassUsersDetailAll())
        setFlagArrayUsersDetail([])
        dispatch(clearBypassPosts())
        dispatch(clearCyclesListForUserInBuildingDetailAll())
        dispatch(clearCyclesListForUserInCorpusDetailAll())
        setFlagArrayObjects([])
        setMonthRange('year')
      }

      const listMenu = useCallback(() => (
      <View 
      style={{
        height: 30, 
        marginHorizontal: '5%', 
        marginTop: 15, 
        borderRadius: 5, 
        alignItems: 'center', 
        flexDirection: 'row', 
        borderWidth: 1, 
        borderColor: '#dedede'}}>
        <TouchableOpacity style={period === 'today' ? 
            {...styles.periodStatsActive, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}: 
            {...styles.periodStats, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}} disabled={period === 'today' ? true : false} 
            onPress={() => {
              clearAnalyticScreen()
              setPeriod('today')
              dispatch(loadBypassBuildingForCorpus('today', corpusId))
              dispatch(getListUsersStaticWithTbrCorpus('today', corpusId))
              }}>
          <View>
              
            <Text style = {period === 'today' ? {color: '#ffffff'} : {color: '#000000'}}>Сегодня</Text>
              
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={period === 'week' ? 
        styles.periodStatsActive : styles.periodStats} disabled={period === 'week' ? 
        true : false} 
        onPress={() => {
          clearAnalyticScreen()
          setPeriod('week')
          dispatch(loadBypassBuildingForCorpus('week', corpusId))
          dispatch(getListUsersStaticWithTbrCorpus('week', corpusId))
          }}>
          <View>
        
            <Text style = {period === 'week' ? {color: '#ffffff'} : {color: '#000000'}}>Неделя</Text>
          
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        style={period === 'month' ? 
        styles.periodStatsActive : styles.periodStats} 
        disabled={period === 'month' ? true : false} 
        onPress={() => {
          clearAnalyticScreen()
          setPeriod('month')
          dispatch(loadBypassBuildingForCorpus('month', corpusId))
          dispatch(getListUsersStaticWithTbrCorpus('month', corpusId))
          }}>
          <View >
          
            <Text style = {period === 'month' ? {color: '#ffffff'} : {color: '#000000'}}>Месяц</Text>
            
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
        style={period === 'year' ? 
        {...styles.periodStatsActive, borderTopRightRadius: 5, borderBottomRightRadius: 5}: 
        {...styles.periodStats, borderTopRightRadius: 5, borderBottomRightRadius: 5}} 
        disabled={period === 'year' ? true : false} 
        onPress={() => {
          clearAnalyticScreen()
          setPeriod('year')
          dispatch(loadBypassBuildingForCorpus('year', corpusId))
          dispatch(getListUsersStaticWithTbrCorpus('year', corpusId))
          }}>
          <View >
          
            <Text style = {period === 'year' ? {color: '#ffffff'} : {color: '#000000'}}>Год</Text>
            
          </View>
        </TouchableOpacity>
      </View>))

      const loader = <ActivityIndicator color  = "#0000ff"/>
       
      const scrollY = useRef(new Animated.Value(0)).current
      const scrollXGallery = new Animated.Value(0)
      let position = Animated.divide(scrollXGallery, width)
      function getDotesForImage() {
        const data = []
        for (let i = 0; i < COUNT_IMAGE_TO_BYPASS_RANK; i++) {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })
          data.push(<Animated.View
            key = {i}
            style = {{opacity, height: 10, width: 10, backgroundColor: '#4d5d53', margin: 8, borderRadius: 5}}
            >
            </Animated.View>)
        }
        return data
      }
     
      const onREachedEndForAvgRankComponent = useCallback(async() => {
        if (DATA_IMAGE_BYPASS_RANK.length !== COUNT_IMAGE_TO_BYPASS_RANK) {
          dispatch(getImageBypassUserOfPost(period, bypassKeyByValueRef.current,
            bypassPhotoPostIdRef.current, bypassPhotoEmailRef.current, DATA_IMAGE_BYPASS_RANK.length))
        }
      })
      const onEndReached = useCallback(async () => {
        if (DATA_IMAGE_BYPASS_RANK.length !== COUNT_IMAGE_TO_BYPASS_RANK) {
          await UploadDataToServer.getBypassPhoto(bypassKeyByValueRef.current, DATA_IMAGE_BYPASS_RANK.length)
          // dispatch(getImageBypassUserOfPost(period, bypassKeyByValueRef.current,
          //   bypassPhotoPostIdRef.current, bypassPhotoEmailRef.current, DATA_IMAGE_BYPASS_RANK.length))
        }
        
        // dispatch(getBypassPhoto())
      })
      
    return <SafeAreaView style={styles.modalContainer}>
      <ModalFilterForCorpusAndBuilding  
        activeBuildingRef={activeBuildingRef}
        DATA_POSTS={DATA_POSTS}
        DATA_USERS_TBR={DATA_USERS_TBR}
        DATA_COMPONENT={DATA_COMPONENT}
        modalVisibleFilter={modalVisibleFilter} 
        setModalVisibleFilter={setModalVisibleFilter} 
        stateChart={stateChart}
        stateChartInnerRef={stateChartInnerRef}
        setFlagArrayPosts={setFlagArrayPosts}
        choisePost={choisePost}
        period={period}
        corpusId={corpusId}
        />
      <ModalPhotoOfBypass
        modalVisible={modalVisibleRank} 
        setModalVisible={setModalVisibleRank}
        onEndReached={onREachedEndForAvgRankComponent}/>
    
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleDay}
        onRequestClose={() => { 
          Alert.alert('Modal has been closed.')
          setModalVisibleDay(!modalVisibleDay)
        }}
      >
        <ModalPhotoOfBypass
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible}
          onEndReached={onEndReached}/>
        
        <View style={styles.centeredView}>
          <View style={{alignItems: 'center', zIndex: 10, elevation: 50, shadowColor: '#545454', shadowOffset: { width: 0, height: 0 }, shadowRadius: 1, shadowOpacity: 0.5}}>
            
            <TouchableOpacity style={{zIndex: 11, elevation: 51,}}onPress={() => {
              setModalVisibleDay(!modalVisibleDay)
              if (period === 'today') {
                setFlagArrayUsersDetail(flagArrayUsersDetail
                  .filter(
                    el => !(el.email === DATA_USERS_DETAIL_FOR_DAY[0]?.email && 
                      el.post === DATA_USERS_DETAIL_FOR_DAY[0]?.post_name)))
                dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, 
                  DATA_USERS_DETAIL_FOR_DAY[0]?.email, DATA_USERS_DETAIL_FOR_DAY[0]?.post_name))
              }
              
              dispatch(clearBypassUsersDetailForDay())
              
              
            }}><Image 
            style={{height: 50, width: 50, backgroundColor: 'black', borderRadius: 50, top: 25, zIndex: 1000}}
            source={{uri: USERS_LIST.filter(els => els.email === DATA_USERS_DETAIL_FOR_DAY[0]?.email ? els.img : null)[0]?.img}} />
              </TouchableOpacity>
              
          </View>
          <View style={{...styles.modalView, height: '70%'}}>
              <Text style = {styles.headTitle}>{DATA_USERS_DETAIL_FOR_DAY[0]?.title}</Text>
              <Animated.FlatList 
          showsVerticalScrollIndicator = {false} 
          style={{width: '80%'}}
          data = {[{id: String(Date.now()), data: DATA_USERS_DETAIL_FOR_DAY}]}
          renderItem={renderItemUsersDetailsModal} 
          keyExtractor={keyExtractors}
          horizontal={false}/>
              </View>
        </View>
      </Modal>
        {/* <Image source = {{uri: 'https://www.alllessons.ru/wp-content/uploads/files/hello_html_m25c160ca.jpg'}} style = {StyleSheet.absoluteFillObject} blurRadius = {50}/> */}
        {listMenu()}
        {/* <View 
          style={styles.layerRank}
          onMoveShouldSetResponderCapture={(event) => {
            
            return true
          }} 
          onResponderMove={(event) => console.log(event.currentTarget._children[0]._children[0]._children[0].viewConfig.validAttributes.borderColor.process('red'))}>
          <DateChanger period={period} height={styles.layerRank.height}/>
        </View> */}
        {loading ? loader : stateChart.buildings ? <><Animated.FlatList showsVerticalScrollIndicator={false}
          style={{marginTop: 15}} data={DATA_OBJECTS_LIST} onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true}
          )} renderItem={renderItem} keyExtractor={item => item.id}/>
          </> : <User 
                  period={period}
                  corpus_id={corpusId}
                  monthRange={monthRange}
                  showUserDetailInfoOrUnshow={showUserDetailInfoOrUnshow}
                  setModalVisibleDay={setModalVisibleDay}
                  flagArrayUsersDetail={flagArrayUsersDetail}
                  setFlagArrayUsersDetail={setFlagArrayUsersDetail}
                  setMonthRange={setMonthRange}
                  choseDateCurrentRef={choseDateCurrentRef}
                  setModalVisibleRank={setModalVisibleRank}
                  bypassKeyByValueRef={bypassKeyByValueRef}
                  bypassPhotoPostIdRef={bypassPhotoPostIdRef}
                  bypassPhotoEmailRef={bypassPhotoEmailRef}
                  DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK} />
          }
          {DATA_OBJECTS_LIST.length || DATA_USERS_TBR_CORPUS.length ?  
          null : 
          <View 
          style={{
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center'}}>
              <Text 
              style={{fontSize: 18, textAlign: 'center'}}>Статистика по объекту за выбранный период пуста</Text>
          </View>}
        </SafeAreaView>
}
StatusObject.navigationOptions = ({route, navigation}) => ({
    headerTitle: route.params.corpusName,
    headerRight: () => <HeaderButtons HeaderButtonComponent = {AppHeaderIcon}>
      <Item
      title='Filter Object'
      iconName='ios-options'
      onPress={() =>  route.params.openModalFilter()}
      />
    </HeaderButtons> 
  })

  const styles = StyleSheet.create({
      centeredView: {
        flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25
      },
      modalView: {
        marginHorizontal: '12%',
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      center: {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
    },
      layerRank: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
        // flexGrow: 0,
        marginHorizontal: '5%',
        marginVertical  : 5,
        height          : 40,
        borderRadius    : 15,
        shadowColor     : "#000000",
        shadowOffset    : {
          width : 0,
          height: 6,
        },
         shadowOpacity: 0.30,
         shadowRadius : 4.65,

        //  elevation: 1,
        
        
      },
      item: {
          backgroundColor : 'rgba(220, 220, 220, .2)',
          // flexGrow: 0,
          marginHorizontal: '5%',
          marginVertical  : 5,
          height          : 100,
          borderRadius    : 15,
          shadowColor     : "#000000",
          shadowOffset    : {
            width : 0,
            height: 6,
          },
           shadowOpacity: 0.30,
           shadowRadius : 4.65,

          //  elevation: 1,
          
          
        },
        itemUD: {
          backgroundColor : 'rgba(220, 220, 220, .2)',
          // flexGrow: 0,
          marginHorizontal: '5%',
          marginVertical  : 5,
          borderRadius    : 15,
          shadowColor     : "#000000",
          shadowOffset    : {
            width : 0,
            height: 6,
          },
           shadowOpacity: 0.30,
           shadowRadius : 4.65,

          //  elevation: 1,
          
          
        },
        modalContainer: {
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        },
       textStyleInToolkit: {
         color     : '#ffffff',
         fontSize  : 10,
         paddingTop: 10,
         
       },
       alignElementsCenter: {
        alignItems: 'center',
        
       },
       periodStats: {
        // backgroundColor: '#C4C4C4', 
        width         : '25%',
        alignItems    : 'center',
        height        : '100%',
        justifyContent: 'center'
       },
       periodStatsActive: {
        backgroundColor: '#303F9F',
        width          : '25%',
        alignItems     : 'center',
        height         : '100%',
        justifyContent : 'center'
       },
       toolkitPad: {
         paddingTop    : 10,
         paddingLeft   : 10,
         paddingRight  : 10,
         flexDirection : 'row',
         justifyContent: 'space-between',
       },
       beastAndBad: {
           fontSize   : 10,
           paddingLeft: 22,
           paddingTop : 11,
        //    fontWeight: '500',
           fontFamily: 'open-bold'
       },
       beastAndBadNames: {
            fontSize   : 10,
            paddingLeft: 10,
            paddingTop : 11,
        //    fontWeight: '500',
            
       },
       wrapperFirstLine: {
           flexDirection : 'row',
           justifyContent: 'space-between',
       },
       wrapperSecondLine: {
            flexDirection: 'row',
            alignItems   : 'center'
       },
       headTitle: {
           fontSize   : 14,
           paddingLeft: 22,
           paddingTop : 11,
       },
       sticker: {
           backgroundColor       : '#000000',
           borderTopLeftRadius   : 0,
           borderTopRightRadius  : 15,
           borderBottomLeftRadius: 15,
           height                : '60%',
           shadowColor           : "#000000",
           shadowOffset          : {
            width : 0,
            height: 4,
          },
           shadowOpacity: 0.30,
           shadowRadius : 4.65,

           elevation: 5,
       }, 
       image: {
        width: '100%',
        height: 400
      },
      dotView: {
        flexDirection: 'row',
        justifyContent: 'center'
      }
      
  })