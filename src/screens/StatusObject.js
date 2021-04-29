import React, {useEffect} from 'react'
import { Text, View, Share, TouchableOpacity, FlatList, StyleSheet, Image, ActivityIndicator, Animated } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux'
import { getPostAll } from '../store/actions/post';
import QRCode from 'react-native-qrcode-generator'
import {Cycle, Clock, Rank, QRIcon, StepsIcon} from '../components/ui/imageSVG/circle'
import { useState, useRef } from 'react';
import { loadBypassGetter } from '../store/actions/bypass';
// import { Circle } from 'react-native-svg';
// import Shares from 'react-native-share'


export const StatusObject = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadBypassGetter('today'))
  }, [])
  const DATA2 = useSelector(state => state.bypass.bypassGetter)
  const [period, setPeriod] = useState('today')
  const loading = useSelector(state => state.bypass.loading)
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Внешняя территория',
          bestPost: 'Мясной ряд',
          bestRank: 4.2,
          badPost: 'Рыбный ряд',
          badRank: 2.8,
          avgRanks: 3.3,
          countCircle: '1K',
          countBypass: '70K',
          countTime: '27:56',
          steps: '565K',
          trand: 1
        

        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Внутренняя территория',
          bestPost: 'Мясной ряд',
          bestRank: 4.2,
          badPost: 'Рыбный ряд',
          badRank: 2.8,
          avgRanks: 3.3,
          countCircle: 100,
          countBypass: 156,
          countTime: '27:56',
          steps: 7658,
          trand: 0
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Безысходность',
          bestPost: 'Мясной ряд',
          bestRank: 4.2,
          badPost: 'Рыбный ряд',
          badRank: 2.8,
          avgRanks: 3.3,
          countCircle: 100,
          countBypass: 156,
          countTime: '27:56',
          steps: 7658,
          trand: -1
        },
      ];

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
          inputRange: opacityInputRange,
          outputRange: [1, 1, 1, 0]
        })
          return <TouchableOpacity>
          <Animated.View style={{...styles.item, transform: [{scale}], opacity}}>
           
              <View style={{...styles.wrapperFirstLine}}>
                <View>
                    <View style={styles.wrapperFirstLine}>
                        <View>
                          <Text style={styles.headTitle}>{item.title}</Text>
                        </View>
                      
                    </View>
                    <View style={styles.wrapperSecondLine}>
                      <View>
                          <Text style={styles.beastAndBad}>Лучший пост</Text>
                          <Text style={styles.beastAndBad}>Худший пост</Text>
                      </View>
                      <View>
                          <Text style={styles.beastAndBadNames}>{item.bestPost} {item.bestRank}</Text>
                          <Text style={styles.beastAndBadNames}>{item.badPost} {item.badRank}</Text>
                      </View>
                    </View>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
              <View style={styles.sticker}>
              
              
                <View style={styles.toolkitPad}>
                
                  <View style={styles.alignElementsCenter}>
                  {Rank()}
                  <Text style={styles.textStyleInToolkit}>{item.avgRanks}</Text>
                  </View>
                  <View style={styles.alignElementsCenter}>
                  {Cycle()}
                  <Text style={styles.textStyleInToolkit}>{item.countCircle}</Text>
                  </View>
                  <View style={styles.alignElementsCenter}>
                  {QRIcon()}
                  <Text style={styles.textStyleInToolkit}>{item.countBypass}</Text>
                  </View>
                  <View style={styles.alignElementsCenter}>
                  {Clock()}
                  <Text style={styles.textStyleInToolkit}>{item.countTime}</Text>
                  </View>
                  <View style={styles.alignElementsCenter}>
                  {StepsIcon()}
                  <Text style={styles.textStyleInToolkit}>{item.steps}</Text>
                  </View>
                  
                </View>
                
              
              
              
              </View>
              {(() => {
                switch (item.trand) {
                  case 1: return (
                  <>
                    <View style={{alignItems: 'center'}}><Text style={{fontSize: 10}}>Линия тренда возрастает</Text></View>
                    <View style={{alignItems: 'center'}}>
                    <Image source={require('../images/ArrowUp.png')}/>
                    </View>
                  </>
                  )
                  case 0: return (
                    <>
                    <View style={{alignItems: 'center'}}><Text style={{fontSize: 10}}>Линия тренда без изменений</Text></View>
                    <View style={{alignItems: 'center'}}>
                    <Image source={require('../images/stability.jpg')}/>
                    </View>
                  </>
                  )
                  case -1: return (
                  <>
                    <View style={{alignItems: 'center'}}><Text style={{fontSize: 10}}>Линия тренда убывает</Text></View>
                    <View style={{alignItems: 'center'}}>
                    <Image source={require('../images/ArrowDown.png')}/>
                    </View>
                  </>
                  )
                }
              })()}
              
              </View>
              </View>
          </Animated.View>
          </TouchableOpacity>
      }
      const ITEM_SIZE = 100
      const renderItem = ({ item, index }) => {
          
          return <Item item={item} index={index}/>
        }
      
      const listMenu = () => (<View style={{height: 30, marginHorizontal: '5%', marginTop: 15, borderRadius: 5, alignItems: 'center', flexDirection: 'row', borderWidth: 1, borderColor: '#dedede'}}>
      <TouchableOpacity style={period === 'today' ? 
          {...styles.periodStatsActive, borderTopLeftRadius: 5, borderBottomLeftRadius: 5} :
          {...styles.periodStats, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}} disabled={period === 'today' ? true : false} onPress={() => {
            setPeriod('today')
            dispatch(loadBypassGetter('today'))
            }}>
          <View >
            
              <Text style={period === 'today' ? {color: '#ffffff'} : {color: '#000000'}}>Сегодня</Text>
            
            </View>
      </TouchableOpacity>
      <TouchableOpacity style={period === 'week' ? styles.periodStatsActive : styles.periodStats} disabled={period === 'week' ? true : false} onPress={() => {
        setPeriod('week')
        dispatch(loadBypassGetter('week'))
        }}>
            <View >
          
            <Text style={period === 'week' ? {color: '#ffffff'} : {color: '#000000'}}>Неделя</Text>
            
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={period === 'month' ? styles.periodStatsActive : styles.periodStats} disabled={period === 'month' ? true : false} onPress={() => {
            setPeriod('month')
            dispatch(loadBypassGetter('month'))
            }}>
          <View >
          
            <Text style={period === 'month' ? {color: '#ffffff'} : {color: '#000000'}}>Месяц</Text>
            
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={period === 'year' ? 
          {...styles.periodStatsActive, borderTopRightRadius: 5, borderBottomRightRadius: 5} :
          {...styles.periodStats, borderTopRightRadius: 5, borderBottomRightRadius: 5}} disabled={period === 'year' ? true : false} onPress={() => {
            setPeriod('year')
            dispatch(loadBypassGetter('year'))
            }}>
          <View >
          
            <Text style={period === 'year' ? {color: '#ffffff'} : {color: '#000000'}}>Год</Text>
            
          </View>
          </TouchableOpacity>
      </View>)

      const loader = <View style={styles.center}>
        <ActivityIndicator color="#0000ff"/>
        </View>
      const scrollY = React.useRef(new Animated.Value(0)).current
      
    return <>
        <Image source={{uri: 'https://www.alllessons.ru/wp-content/uploads/files/hello_html_m25c160ca.jpg'}} style={StyleSheet.absoluteFillObject} blurRadius={50}/>
        {listMenu()}
        
        {loading ? loader : <Animated.FlatList style={{marginTop: 15}} data={DATA2} onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true}
          )} renderItem={renderItem} keyExtractor={item => item.id}/>}
        </>
}
StatusObject.navigationOptions = ({navigation}) => ({
    headerTitle: 'Состояние объекта',
    
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='toogle'
    iconName='ios-menu'
    onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
    
    
  })

  const styles = StyleSheet.create({
      center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
       textStyleInToolkit: {
         color: '#ffffff', 
         fontSize: 10, 
         paddingTop: 10,
         
       },
       alignElementsCenter: {
        alignItems: 'center',
        
       },
       periodStats: {
        // backgroundColor: '#C4C4C4', 
        width: '25%', 
        alignItems: 'center', 
        height: '100%', 
        justifyContent: 'center'
       },
       periodStatsActive: {
        backgroundColor: '#303F9F',
        width: '25%', 
        alignItems: 'center', 
        height: '100%', 
        justifyContent: 'center'
       },
       toolkitPad: {
         paddingTop: 10,
         paddingLeft: 10,
         paddingRight: 10,
         flexDirection: 'row',
         justifyContent: 'space-between',
       },
       beastAndBad: {
           fontSize: 10,
           paddingLeft: 22,
           paddingTop: 11,
        //    fontWeight: '500',
           fontFamily: 'open-bold'
       },
       beastAndBadNames: {
            fontSize: 10,
            paddingLeft: 10,
            paddingTop: 11,
        //    fontWeight: '500',
            
       },
       wrapperFirstLine: {
           flexDirection: 'row',
           justifyContent: 'space-between',
       },
       wrapperSecondLine: {
            flexDirection: 'row',
            alignItems: 'center'
       },
       headTitle: {
           fontSize: 14,
           paddingLeft: 22,
           paddingTop: 11,
       },
       sticker: {
           backgroundColor: '#000000',
           borderTopLeftRadius: 0,
           borderTopRightRadius: 15,
           borderBottomLeftRadius: 15,
           height: '60%',
           shadowColor: "#000000",
           shadowOffset: {
            width: 0,
            height: 4,
          },
           shadowOpacity: 0.30,
           shadowRadius: 4.65,

           elevation: 5,
       }, 
      
  })