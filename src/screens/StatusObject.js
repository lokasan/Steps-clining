import React, {useEffect, Fragment} from 'react'
import { Text, View, Share, Dimensions, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator, Animated, Alert, ScrollView, Modal } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux'
import { getPostAll } from '../store/actions/post';
import QRCode from 'react-native-qrcode-generator'
import {Cycle, Clock, Rank, QRIcon, StepsIcon, PeopleIcon, ArrowRight} from '../components/ui/imageSVG/circle'
import { useState, useRef } from 'react';
import { clearBypassObjectDetail, clearBypassUsers, clearBypassUsersDetail, loadBypassGetter, loadBypassObjectDetail, loadBypassPosts, loadBypassUsers, loadBypassUsersDetail } from '../store/actions/bypass';
import { msToTime } from '../utils/msToTime';
import { UploadDataToServer } from '../uploadDataToServer';
import { clearBypassRankImage } from '../store/actions/bypassRank';
import CarouselItem from '../components/ui/CarouselItem'
// import { Circle } from 'react-native-svg';
// import Shares from 'react-native-share'
const NORMAL_RANK = 3
const {width, height} = Dimensions.get("window")
export const StatusObject = () => {
  const dispatch = useDispatch()
  const existsComponents = useRef([])
  useEffect(() => {
    dispatch(loadBypassGetter('today'))
  }, [])
  const DATA2                                           = useSelector(state => state.bypass.bypassGetter)
  const [period, setPeriod]                             = useState('today')
  const [flagArrayObjects, setFlagArrayObjects]         = useState([])
  const [flagArrayPosts, setFlagArrayPosts]             = useState([])
  const [flagArrayUsersDetail, setFlagArrayUsersDetail] = useState([])
  const [flagArrayObjectDetail, setFlagArrayObjectDetail] = useState([])
  const loading                                         = useSelector(state => state.bypass.loading)
  const loaderIcon = useSelector(state => state.bypass.loaderIcon)
  const DATA_POSTS                                      = useSelector(state => state.bypass.bypassPostsList)
  const DATA_USERS                                      = useSelector(state => state.bypass.bypassUsersList)
  const DATA_USERS_DETAIL                               = useSelector(state => state.bypass.bypassUsersListDetail)
  const DATA_OBJECT_DETAIL = useSelector(state => state.bypass.bypassObjectDetail)
  const DATA_IMAGE_BYPASS_RANK = useSelector(state => state.bypassRank.bypassRankImage)

  console.log(DATA_IMAGE_BYPASS_RANK, 'DATA_IMAGE_BYPASS_RANK')
  const USERS_LIST = useSelector(state => state.empDouble.empServer)
  console.log(DATA_POSTS)
  console.log(DATA_USERS, 'userss');
  console.log(DATA_USERS_DETAIL, 'DETAILS')
  console.log(DATA_OBJECT_DETAIL, 'OBJECTS_TES')
  console.log(USERS_LIST, 'USERS _ LIST')
  const choiseObject = useRef(null)
  const [choiseObjectS, setChoiseObjectS] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
      const Item = ({item, index}) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1)
        ]
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })
        const opacity = scrollY.interpolate({
          inputRange : opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
          return <TouchableOpacity onPress={() => {
            if (flagArrayObjects.indexOf(item.title) !== -1) {
              dispatch(loadBypassPosts(period, 'tropic'))
              
              setFlagArrayObjects(flagArrayObjects.filter(e => e !== item.title))
              
            }
            else {
              dispatch(loadBypassPosts(period, item.title))
              
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
            (flagArrayObjectDetail.length && flagArrayObjectDetail.indexOf(item.title) !== -1  && !loaderIcon) ? {display: 'none'} : styles.item}>
           
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
                          <Text style = {styles.beastAndBadNames}>{item?.bestPost?.substr(0, 14)} {item.bestRank}</Text>
                          {period === 'today' ? <TouchableOpacity>
                          <Text style = {styles.beastAndBadNames}>{item?.badPost?.substr(0, 14)} {item.badRank}</Text>
                          </TouchableOpacity>: 
                          <Text style = {styles.beastAndBadNames}>{item?.badPost?.substr(0, 14)} {item.badRank}</Text>
                          }
                      </View>
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
                <View style = {{...styles.sticker, backgroundColor: '#303F9F'}}>
              
              
                <View style = {styles.toolkitPad}>
                
                  <View style = {styles.alignElementsCenter}>
                  {Rank()}
                  <Text style = {styles.textStyleInToolkit}>{item.avgRanks}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {Cycle()}
                  <Text style = {styles.textStyleInToolkit}>{item.countCircle}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {QRIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.countBypass}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {Clock()}
                  <Text style = {styles.textStyleInToolkit}>{item.countTime}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {StepsIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.steps}</Text>
                  </View>
                  
                </View>
                
              
              
              
              </View>
              {(() => {
                switch (item.trand) {
                  case 1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда возрастает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowUp.png')}/>
                    </View>
                  </>
                  )
                  case 0: return (
                    <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда без изменений</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/stability.jpg')}/>
                    </View>
                  </>
                  )
                  case -1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда убывает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowDown.png')}/>
                    </View>
                  </>
                  )
                }
              })()}
              
              </View>
              {  choiseObject.current === item.title && loaderIcon ? <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: 100, opacity: 1}}>
              <ActivityIndicator color  = "#0000ff"/>
              </View> : null}
              </View>
          </Animated.View>
          </TouchableOpacity>
      }
      const choisePost = useRef(null)
      
      const createViewDataComponentObject = (item, index) => {
        let createViewData = []
        if (item?.data?.length !== 0) {
          
          for (let el in item.data) {
            const dateBypassEnd = new Date(+item.data[el].end_time)
            const dateBypassStart = new Date(+item.data[el].start_time)
            
            createViewData.push(<View>
              <Text style={styles.beastAndBad}>{`${dateBypassEnd.getDate() / 10 >= 1? dateBypassEnd.getDate(): '0' + dateBypassEnd.getDate()}.${(dateBypassEnd.getMonth() + 1) / 10 >= 1? dateBypassEnd.getMonth() + 1: '0' + (dateBypassEnd.getMonth() + 1)}`}</Text>
              <TouchableOpacity onLongPress={() => alertStatus(item.data[el].weather)}><Image style = {{marginLeft: 20, height: 25, width: 20, top: 3}} source={item.data?.length !== 0 ? {uri: `http://openweathermap.org/img/wn/${item.data[el].icon}@2x.png`} : null}/></TouchableOpacity>
              <Text style={styles.beastAndBad}>{item.data[el].temperature}</Text>
              <Text style={styles.beastAndBad}>{item.data[el].post_name.slice(0, 4)}</Text>
              <Image style={{width: 20, height: 20, marginLeft: 22, marginTop: 11, borderRadius: 50}} source={{uri: USERS_LIST.map(els => {
                if (els.email === item?.data[el]?.email) {
                  return els.img
                }
                }).join('')}}/>
              <Text style={styles.beastAndBad}>{item.data[el].avg_rank.toFixed(2)}</Text>

              
              <Text style={styles.beastAndBad}>{
              dateBypassStart.getHours() / 10 >= 1? 
              dateBypassStart.getHours() : 
              '0' + dateBypassStart.getHours()}:{
              dateBypassStart.getMinutes() / 10 >= 1? 
              dateBypassStart.getMinutes() : 
              '0' + dateBypassStart.getMinutes()
              }
              {/* :{
                dateBypassStart.getSeconds() / 10 > 1? 
                dateBypassStart.getSeconds() : 
                '0' + dateBypassStart.getSeconds()
              } */}
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
              {/* :{
                dateBypassEnd.getSeconds() / 10 > 1? 
                dateBypassEnd.getSeconds() : 
                '0' + dateBypassEnd.getSeconds()
              } */}
              </Text>
              <Text style={styles.beastAndBad}>{msToTime(dateBypassEnd - dateBypassStart).slice(0, 5)}</Text>
              {/* <Text></Text> */}
              </View>)
          }
        }
        return createViewData
      }
      const ItemObjectDetail = ({item, index}) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1)
        ]
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })
        console.log(JSON.stringify(item))
        const opacity = scrollY.interpolate({
          inputRange : opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
        // let textComponent = createTextComponent(item).textComponent
        let existsComponents
        console.log(item, 'object_detail data item')
        console.log(choiseObject.current)
        // const comparePosts = choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        const compareObject = choiseObjectS.current === item?.data[0]?.object_name
        console.log(compareObject, 'compare_obj')
        console.log(loaderIcon, 'loaderIcons')
        
        // choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        
          return         <Animated.View style = {  compareObject && loaderIcon ? {display: 'none'} : styles.itemUD}>
           
              <View style = {{...styles.wrapperFirstLine}}>
                <View> 
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <TouchableOpacity onPress={() => {
                            choiseObject.current = null
                            setFlagArrayObjectDetail(flagArrayObjectDetail.filter(el => !(el=== item?.data[0]?.object_name)))
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
                      <ScrollView vertical={false} horizontal={true} showsHorizontalScrollIndicator={false} style={{display: 'flex', flexDirection: 'row', width: '75%'}}>
                      {createViewDataComponentObject(item)}
                      </ScrollView>
                        {/* <Image style = {{...styles.beastAndBad, height: 32, width: 20}} source={item.data?.length !== 0 ? {uri: `http://openweathermap.org/img/wn/${item.data[0].icon}@2x.png`} : null}/> */}
                      
                     
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
                {/* <View style = {{...styles.sticker, backgroundColor: '#867A64'}}> */}
              
              
              {(() => {
                switch (item.trand) {
                  case 1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда возрастает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowUp.png')}/>
                    </View>
                  </>
                  )
                  case 0: return (
                    <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда без изменений</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/stability.jpg')}/>
                    </View>
                  </>
                  )
                  case -1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда убывает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowDown.png')}/>
                    </View>
                  </>
                  )
                }
              })()}
              
              </View>
              
              </View>
              
          </Animated.View> 
      }

      const ItemPosts = ({item, index}) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1)
        ]
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })
        const opacity = scrollY.interpolate({
          inputRange : opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
          return <TouchableOpacity onPress={() => {
            if (flagArrayPosts.indexOf(item.title) !== -1) {
              // dispatch(loadBypassUsers(period, 'tropic'))
              dispatch(clearBypassUsers(DATA_USERS, item.title))
              setFlagArrayPosts(flagArrayPosts.filter(e => e !== item.title))
              choisePost.current = null
            }
            else {
              dispatch(loadBypassUsers(period, item.title))
              setFlagArrayPosts([...flagArrayPosts, item.title])
              choisePost.current = item.title
            }
            
            }}>
              {/* {...styles.item, transform: [{scale}], opacity} */}
          <Animated.View style = { choisePost.current === item.title && loaderIcon? {opacity: 0.2, ...styles.item} : styles.item}>
              
              <View style = {{...styles.wrapperFirstLine}}>
                <View>
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <Text style = {styles.headTitle}>{item?.title?.substr(0, 19)}</Text>
                        </View>
                      
                    </View>
                    <View style = {styles.wrapperSecondLine}>
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
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
                <View style = {{...styles.sticker}}>
              
              
                <View style = {styles.toolkitPad}>
                
                  <View style = {styles.alignElementsCenter}>
                  {Rank()}
                  <Text style = {styles.textStyleInToolkit}>{item.avgRanks}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {PeopleIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.countUsers}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {QRIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.countBypass}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {Clock()}
                  <Text style = {styles.textStyleInToolkit}>{item.countTime}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {StepsIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.steps}</Text>
                  </View>
                  
                </View>
                
              
              
              
              </View>
              {(() => {
                switch (item.trand) {
                  case 1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда возрастает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowUp.png')}/>
                    </View>
                  </>
                  )
                  case 0: return (
                    <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда без изменений</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/stability.jpg')}/>
                    </View>
                  </>
                  )
                  case -1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда убывает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowDown.png')}/>
                    </View>
                  </>
                  )
                }
              })()}
              
              </View>
              {  choisePost.current === item.title &&  loaderIcon ? <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: 100, opacity: 1}}>
              <ActivityIndicator color  = "#0000ff"/>
              </View> : null}
              </View>
              
          </Animated.View>
          </TouchableOpacity>
      }
      const [choisePostS, setChoisePostS] = useState(null)
      
      const ItemUsers = ({item, index}) => {
        
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1)
        ]
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })
        const opacity = scrollY.interpolate({
          inputRange : opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
        const comparePosts = choisePostS?.email === item?.email && choisePostS?.post === item?.post_name
          return         <TouchableOpacity onPress = {() => {
            if (flagArrayUsersDetail.map(el => el.email === item.email && el.post === item.post_name).indexOf(true) !== -1) {
              // dispatch(loadBypassUsersDetail(period, 'null', 'null'))
                console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT')
                dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, item.email, item.post_name))
                choisePost.current = null
                
                setFlagArrayUsersDetail([...flagArrayUsersDetail.filter(el => !(el.email === item.email && el.post === item.post_name))])
                
            }
            else {
              dispatch(loadBypassUsersDetail(period, item.email, item.post_name))
              
              choisePost.current = {email: item.email, post: item.post_name}
              setChoisePostS(choisePost.current)
              
              setFlagArrayUsersDetail([...flagArrayUsersDetail, 
                                                              {
                                                                email: item.email,
                                                                post: item.post_name
                                                              }
                                      ])
            }
            
            }
            
          }>
            
            {/* flagArrayUsersDetail.length && flagArrayUsersDetail.map(el => el.email === item.email && el.post === item.post_name).indexOf(true) !== -1 && !loaderIcon */}
          <Animated.View style = {flagArrayUsersDetail.length && flagArrayUsersDetail.map(el => el.email === item.email && el.post === item.post_name).indexOf(true) !== -1   && !loaderIcon? {display: 'none'} : styles.item}>
           
              <View style = {{...styles.wrapperFirstLine}}>
                <View> 
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <Text style = {styles.headTitle}>{item?.title.split(' ').map((el, idx) => idx === 0? el : el.slice(0, 1) + '.').join(' ')}</Text>
                        </View>
                      
                    </View>
                    <View style = {styles.wrapperSecondLine}>
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
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
                <View style = {{...styles.sticker, backgroundColor: '#867A64'}}>
              
              
                <View style = {styles.toolkitPad}>
                
                  <View style = {styles.alignElementsCenter}>
                  {Rank()}
                  <Text style = {styles.textStyleInToolkit}>{item.avgRanks}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {QRIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.countBypass}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {Clock()}
                  <Text style = {styles.textStyleInToolkit}>{item.countTime}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {StepsIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.steps}</Text>
                  </View>
                  
                </View>
                
              
              
              
              </View>
              {(() => {
                switch (item.trand) {
                  case 1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда возрастает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowUp.png')}/>
                    </View>
                  </>
                  )
                  case 0: return (
                    <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда без изменений</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/stability.jpg')}/>
                    </View>
                  </>
                  )
                  case -1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда убывает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowDown.png')}/>
                    </View>
                  </>
                  )
                }
              })()}
              
              </View>
              {  choisePost.current?.email === item.email && choisePost.current?.post === item.post_name && loaderIcon ? 
              <View 
              style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: 100, opacity: 1}}>
              <ActivityIndicator color  = "#0000ff"/>
              </View> : null}
              </View>
          </Animated.View>
          </TouchableOpacity>
      }
      // let existsComponents = []gfhgh
      /// corrected / edited
      const createTextComponent = (item, index) => {
        let createdComponent = []
        let tempHelper = []
        if (item?.data?.length !== 0) {
          let temp = item.data.map((el, idx) => {const tmp = {}; tmp[idx] = Object.keys(el).length; return tmp})
          let maxKeysOfBypass = Math.max(...temp.map(el => Object.values(el)))
          let objectWithMaxKeysOfBypass = {}
          
          for (el of temp) {
            if (Object.values(el)[0] === maxKeysOfBypass) {
              objectWithMaxKeysOfBypass = item.data[Object.keys(el)[0]]
            }
          }
          for (let el in objectWithMaxKeysOfBypass) {
            if (!isNaN(Number(el))) {
              tempHelper.push(objectWithMaxKeysOfBypass[el])
              createdComponent.push(<Text style ={styles.beastAndBad}>{objectWithMaxKeysOfBypass[el]}</Text>)
              console.log(objectWithMaxKeysOfBypass[el])
            }
          }
          existsComponents.current = tempHelper
          tempHelper = []
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
              console.log(item.is_image)
              createdElements.push(<TouchableOpacity 
                style={item[keyByValue + '_is_image'] ? {...styles.beastAndBad} : styles.beastAndBad }
              onLongPress={() => alertStatus(item[keyByValue + '_name_c_r'])}
              onPress={() => {
                console.log(keyByValue)
                if (item[keyByValue + '_is_image']) {
                  UploadDataToServer.getBypassPhoto(keyByValue)
                  setModalVisible(true)
                }
              }}>
                
                <Text style={item[keyByValue + '_is_image'] ? {fontSize: 10, fontFamily: 'open-bold', color: '#e4a010'} : {fontSize: 10, fontFamily: 'open-bold'}}>{item[keyByValue + '_rank']}
                </Text>
               
                </TouchableOpacity>)
            } else {
              createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
            }
          }  
          
          
          // for (let el in item) {
          //  //** */
          //     if (!isNaN(Number(el))) {
          //       if (existsComponents.indexOf(item[el]) !== -1) {
          //         console.log(`components: ${existsComponents} = ${item[el]}`)
          //         createdElements.push(<TouchableOpacity onLongPress={() => alertStatus(item[el + '_name_c_r'])}><Text style = {styles.beastAndBad}>{item[el + '_rank']}</Text></TouchableOpacity>)
          //       } else {
          //         createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
          //       }
          //     }
            
          // }
          
        
        return createdElements;
      }
      
      const createViewDataComponent = (item, index) => {
        let createViewData = []
        if (item?.data?.length !== 0) {
          
          for (let el in item.data) {
            const dateBypassEnd = new Date(+item.data[el].end_time)
            const dateBypassStart = new Date(+item.data[el].start_time)
            createViewData.push(<View>
              <Text style={styles.beastAndBad}>{`${dateBypassEnd.getDate() / 10 >= 1? dateBypassEnd.getDate(): '0' + dateBypassEnd.getDate()}.${(dateBypassEnd.getMonth() + 1) / 10 >= 1? dateBypassEnd.getMonth() + 1: '0' + (dateBypassEnd.getMonth() + 1)}`}</Text>
              <TouchableOpacity onLongPress={() => alertStatus(item.data[el].weather)}><Image style = {{marginLeft: 20, height: 25, width: 20, top: 3}} source={item.data?.length !== 0 ? {uri: `http://openweathermap.org/img/wn/${item.data[el].icon}@2x.png`} : null}/></TouchableOpacity>
              <Text style={styles.beastAndBad}>{item.data[el].temperature}</Text>
              

              {createTextComponentWithRating(item?.data[el])}
              <Text style={styles.beastAndBad}>{
              dateBypassStart.getHours() / 10 >= 1? 
              dateBypassStart.getHours() : 
              '0' + dateBypassStart.getHours()}:{
              dateBypassStart.getMinutes() / 10 >= 1? 
              dateBypassStart.getMinutes() : 
              '0' + dateBypassStart.getMinutes()
              }
              {/* :{
                dateBypassStart.getSeconds() / 10 > 1? 
                dateBypassStart.getSeconds() : 
                '0' + dateBypassStart.getSeconds()
              } */}
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
              {/* :{
                dateBypassEnd.getSeconds() / 10 > 1? 
                dateBypassEnd.getSeconds() : 
                '0' + dateBypassEnd.getSeconds()
              } */}
              </Text>
              <Text style={styles.beastAndBad}>{msToTime(dateBypassEnd - dateBypassStart).slice(0, 5)}</Text>
              {/* <Text></Text> */}
              </View>)
          }
        }
        return createViewData
      }
      
      const ItemUsersDetails = ({item, index}) => {
       
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 1)
        ]
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0]
        })
        console.log(JSON.stringify(item))
        const opacity = scrollY.interpolate({
          inputRange : opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
        let textComponent = createTextComponent(item).textComponent
        let existsComponents
        console.log(item, 'users_detail data item')
        console.log(choisePost.current)
        // const comparePosts = choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        const comparePosts = choisePostS.current?.email === item.data[0]?.email && choisePostS.current?.post === item.data[0]?.post_name

        
        // choisePost.current?.email === item.data[0]?.email && choisePost.current?.post === item.data[0]?.post_name
        
          return         <Animated.View style = {  comparePosts && loaderIcon ? {display: 'none'} : styles.itemUD}>
           
              <View style = {{...styles.wrapperFirstLine}}>
                <View> 
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <TouchableOpacity onPress={() => {
                            setFlagArrayUsersDetail(flagArrayUsersDetail.filter(el => !(el.email === item?.data[0]?.email && el.post === item?.data[0]?.post_name)))
                            dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, item?.data[0]?.email, item?.data[0]?.post_name))}}><Text style = {styles.headTitle}>{item?.data[0]?.title}</Text></TouchableOpacity>
                        </View>
                      
                    </View>
                    <View style = {styles.wrapperSecondLine}>
                      <View>
                        <Text style={styles.beastAndBad}>Дата</Text>
                        <Text style={styles.beastAndBad}>Погода</Text>
                        <Text style={styles.beastAndBad}>Температура</Text>
                        

                        
                      {/* {Rank()} */}
                      {textComponent}
                      <Text style={styles.beastAndBad}>Вр. нач. обх.</Text>
                      <Text style={styles.beastAndBad}>Вр. кон. обх.</Text>
                      <Text style={styles.beastAndBad}>Длит. обх.</Text>
                      </View>
                      <ScrollView 
                      vertical={false} 
                      horizontal={true} 
                      showsHorizontalScrollIndicator={false} 
                      style={{display: 'flex', flexDirection: 'row', width: '75%'}}>
                      {createViewDataComponent(item)}
                      </ScrollView>
                        {/* <Image style = {{...styles.beastAndBad, height: 32, width: 20}} source={item.data?.length !== 0 ? {uri: `http://openweathermap.org/img/wn/${item.data[0].icon}@2x.png`} : null}/> */}
                      
                     
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
                {/* <View style = {{...styles.sticker, backgroundColor: '#867A64'}}> */}
              
              
                {/* <View style = {styles.toolkitPad}>
                
                  <View style = {styles.alignElementsCenter}>
                  {Rank()}
                  <Text style = {styles.textStyleInToolkit}>{item.avgRanks}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {QRIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.countBypass}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {Clock()}
                  <Text style = {styles.textStyleInToolkit}>{item.countTime}</Text>
                  </View>
                  <View style = {styles.alignElementsCenter}>
                  {StepsIcon()}
                  <Text style = {styles.textStyleInToolkit}>{item.steps}</Text>
                  </View>
                  
                </View> */}
                
              
              
              
              {/* </View> */}
              {(() => {
                switch (item.trand) {
                  case 1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда возрастает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowUp.png')}/>
                    </View>
                  </>
                  )
                  case 0: return (
                    <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда без изменений</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/stability.jpg')}/>
                    </View>
                  </>
                  )
                  case -1: return (
                  <>
                    <View  style  = {{alignItems: 'center'}}><Text style = {{fontSize: 10}}>Линия тренда убывает</Text></View>
                    <View  style  = {{alignItems: 'center'}}>
                    <Image source = {require('../images/ArrowDown.png')}/>
                    </View>
                  </>
                  )
                }
              })()}
              
              </View>
              </View>
          </Animated.View> 
          
      }
      const ITEM_SIZE  = 100
      const renderItem = ({ item, index }) => {
          
          return <><Item item = {item} index = {index}/>
          {flagArrayObjectDetail.indexOf(item.title) !== -1 ? <Animated.FlatList showsVerticalScrollIndicator = {false}
          data = {[{id: String(Date.now()), data: DATA_OBJECT_DETAIL.filter(el => el.object_name === item.title )}]} onScroll = {Animated.event(
[{nativeEvent: {contentOffset: {y: scrollY}}}],
{ useNativeDriver: true}
)} renderItem={renderItemObjectDetails} keyExtractor={item => item.id}/> : null}
          { flagArrayObjects.indexOf(item.title) !== -1 ? <Animated.FlatList showsVerticalScrollIndicator = {false}
          data = {DATA_POSTS} onScroll = {Animated.event(
[{nativeEvent: {contentOffset: {y: scrollY}}}],
{ useNativeDriver: true}
)} renderItem={renderItemPosts} keyExtractor={item => item.id} listKey={String(Date.now())}/> : null}</>
         
        }
      const renderItemPosts = ({ item, index }) => {
          
        return <><ItemPosts item = {item} index = {index}/>{ flagArrayPosts.indexOf(item.title) !== -1 ? <Animated.FlatList showsVerticalScrollIndicator = {false}
        data = {DATA_USERS.filter(el => el.post_name === item.title)} onScroll = {Animated.event(
[{nativeEvent: {contentOffset: {y: scrollY}}}],
{ useNativeDriver: true}
)} renderItem={renderItemUsers} keyExtractor={item => item.id} listKey={String(Date.now())}/> : null}</>
         
      }
      const renderItemUsers = ({ item, index }) => {
        return <><ItemUsers item = {item} index = {index}/>
        { flagArrayUsersDetail.map(el => el.email === item.email && el.post === item.post_name).indexOf(true) !== -1 ? <Animated.FlatList showsVerticalScrollIndicator = {false}
        data = {[{id: String(Date.now()), data: DATA_USERS_DETAIL.filter(el => el.post_name === item.post_name && el.email === item.email)}]} onScroll = {Animated.event(
        [{nativeEvent: {contentOffset: {y: scrollY}}}],
        { useNativeDriver: true}
        )} renderItem={renderItemUsersDetails} keyExtractor={item => item.id}/> : null}
        </>
      }

      const renderItemUsersDetails = ({ item, index }) => {
        return <ItemUsersDetails item = {item} index = {index}/>
      }
      const renderItemObjectDetails = ({ item, index }) => {
        return <ItemObjectDetail item = {item} index = {index}/>
      }
      
      const listMenu = () => (<View style={{height: 30, marginHorizontal: '5%', marginTop: 15, borderRadius: 5, alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#dedede'}}>
      <TouchableOpacity style={period === 'today' ? 
          {...styles.periodStatsActive, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}: 
          {...styles.periodStats, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}} disabled={period === 'today' ? true : false} onPress={() => {
            setPeriod('today')
            dispatch(loadBypassGetter('today'))
            for (el of flagArrayObjects) {
              dispatch(loadBypassPosts('today', el))
            }
            }}>
          <View >
            
              <Text style = {period === 'today' ? {color: '#ffffff'} : {color: '#000000'}}>Сегодня</Text>
            
            </View>
      </TouchableOpacity>
      <TouchableOpacity style={period === 'week' ? styles.periodStatsActive : styles.periodStats} disabled={period === 'week' ? true : false} onPress={() => {
        setPeriod('week')
        dispatch(loadBypassGetter('week'))
        for (el of flagArrayObjects) {
          dispatch(loadBypassPosts('week', el))
        }
        }}>
            <View >
          
            <Text style = {period === 'week' ? {color: '#ffffff'} : {color: '#000000'}}>Неделя</Text>
            
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={period === 'month' ? styles.periodStatsActive : styles.periodStats} disabled={period === 'month' ? true : false} onPress={() => {
            
            setPeriod('month')
            dispatch(loadBypassGetter('month'))
            for (el of flagArrayObjects) {
              dispatch(loadBypassPosts('month', el))
            }
            }}>
          <View >
          
            <Text style = {period === 'month' ? {color: '#ffffff'} : {color: '#000000'}}>Месяц</Text>
            
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={period === 'year' ? 
          {...styles.periodStatsActive, borderTopRightRadius: 5, borderBottomRightRadius: 5}: 
          {...styles.periodStats, borderTopRightRadius: 5, borderBottomRightRadius: 5}} disabled={period === 'year' ? true : false} onPress={() => {
            setPeriod('year')
            dispatch(loadBypassGetter('year'))
            for (el of flagArrayObjects) {
              dispatch(loadBypassPosts('year', el))
            }
            }}>
          <View >
          
            <Text style = {period === 'year' ? {color: '#ffffff'} : {color: '#000000'}}>Год</Text>
            
          </View>
          </TouchableOpacity>
      </View>)

      const              loader = <View style = {styles.center}>
      <ActivityIndicator color  = "#0000ff"/>
        </View>
      const scrollY = useRef(new Animated.Value(0)).current
      const scrollXGallery = new Animated.Value(0)
      let position = Animated.divide(scrollXGallery, width)
      const testData = [{id: 1, img: 'sdfds'}]
    return <Fragment>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}>
        <View style={{ backgroundColor: '#000', position: 'relative', paddingTop: 30, paddingLeft: '90%'}}>
  <TouchableOpacity onPress={() => {
    setModalVisible(false);
    dispatch(clearBypassRankImage())
    }}>
    <ArrowRight/>
  </TouchableOpacity>
  </View>
  
      <View style={{backgroundColor: '#000', flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
  
        <FlatList
          data={DATA_IMAGE_BYPASS_RANK}
          keyExtractor={(item, index) => 'key' + index}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
                              <CarouselItem item={item} />
                          )}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollXGallery}}}],
            { useNativeDriver: false}
          )}/>
    {/* <Image source={{uri: USERS_LIST[0]['img']}} style={styles.image}/> */}
        <View style={styles.dotView}>
          {DATA_IMAGE_BYPASS_RANK.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              }
            
              )
              return(
                <Animated.View
                key = {i}
                style = {{opacity, height: 10, width: 10, backgroundColor: '#4d5d53', margin: 8, borderRadius: 5}}
                >
                </Animated.View>
              )
          })}
          </View>
        </View>
      </Modal>
      
        {/* <Image source = {{uri: 'https://www.alllessons.ru/wp-content/uploads/files/hello_html_m25c160ca.jpg'}} style = {StyleSheet.absoluteFillObject} blurRadius = {50}/> */}
        {listMenu()}
        
        {loading ? loader : <><Animated.FlatList showsVerticalScrollIndicator={false}
          style={{marginTop: 15}} data={DATA2} onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true}
          )} renderItem={renderItem} keyExtractor={item => item.id}/>
          </>}
          {DATA2.length ?  null : <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}><Text style={{fontSize: 18, textAlign: 'center'}}>Статистика по объекту за выбранный период пуста</Text></View>}
        </Fragment>
}
StatusObject.navigationOptions = ({navigation}) => ({
    headerTitle: 'Состояние объекта',
    
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {AppHeaderIcon}>
    <Item
    title    = 'toogle'
    iconName = 'ios-menu'
    onPress  = {() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
    
    
  })

  const styles = StyleSheet.create({
      center: {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
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