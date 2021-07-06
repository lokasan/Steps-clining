import React, { useEffect } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { Footer } from '../components/ui/Footer'
import {View, Text, StyleSheet, FlatList, Alert, Platform, Image, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { getEmploeesList } from '../dataBaseRequests/dataBaseRequests'
import { EmploeeCard } from '../components/EmploeeCard'
import { DATA } from '../testData'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import { MyPedometer }from '../components/MyPedometer'
import { getPostAll, loadPost } from '../store/actions/post'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants';
import { useState } from 'react'
import { loadComponentRank } from '../store/actions/componentRank'
import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { loadObject } from '../store/actions/object'
import { loadComponent } from '../store/actions/component'
import { getUsersServer } from '../store/actions/empDouble'
// import {loadEmploeeDouble} from '../../store/actions/empDouble'



export const MainEmploeeListScreen = ( {navigation}) => {
    const loading                   = useSelector(state => state.post.loading)
    let   buildings                 = useSelector(state => state.object.objAll)
    let   components                = useSelector(state => state.component.componentAll)
    let   posts                     = useSelector(state => state.post.postAll)
    const isOnline = useSelector(state => state.empDouble.isOnlineEmp)
    console.log('MYOF', isOnline)
    const [pushToken, setPushToken] = useState()
    console.log('buildings', buildings)
    useEffect(() => {
        registerForPushNotificationsAsync()
        for (el of buildings) {
            dispatch(loadPost(el.id)) 
          }
          for (el of components) {
            dispatch(loadComponentRank(el.id))
          }
          for (el of posts) {

            dispatch(loadPostWithComponent(el.id))
          }
    }, [])
    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let   finalStatus                = existingStatus;
          if (existingStatus !== 'granted') {
            const { status }  = await Notifications.requestPermissionsAsync();
                  finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token, ' TOKEN');
          setPushToken(token)
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name            : 'default',
            importance      : Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor      : '#FF231F7C',
          });
        }
        };
    const openEmploeeHandler = emploee => {
        navigation.navigate('EmploeeInfo', {emploeeId: emploee.id, emploeeName: emploee.name})
    }
    // let result = getEmploeesList().then()
    
    // получаю пустой промис исправить ошибку
    // console.log(result, 'раскрыл');
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadEmploeeDouble())
    // }, [dispatch])
    useEffect(() => {
        dispatch(getPostAll())
        // dispatch(loadObject()),
        // dispatch(loadComponent())
    }, [dispatch])
    useEffect(() => {
      dispatch(getUsersServer())
  }, [dispatch])
  const emplServer = useSelector(state => state.empDouble.empServer)
  console.log(emplServer, 'emplServer')
    const emploeeAll   = useSelector(state => state.empDouble.empAll)
    let   tempPrivileg = false
    console.log(emploeeAll, 'Алл сотрудники');
    for (let i of emploeeAll) {
        if (i.status && i.privileg) {
            tempPrivileg = true
        }
    }
    return <View style = {{flex: 1}}>
    <Image source      = {{uri: 'https://www.alllessons.ru/wp-content/uploads/files/hello_html_m25c160ca.jpg'}} style = {StyleSheet.absoluteFillObject} blurRadius = {15}/>
    { loading ? 
        <View              style = {styles.center}>
        <ActivityIndicator size  = "small" color = "#0000ff"/>
        </View>: null }
    {tempPrivileg && 
        <FlatList 
        data         = {emplServer}
        keyExtractor = {emploee => emploee.id.toString()}
        renderItem   = {({item}) => <EmploeeCard emploee={item} onOpen={openEmploeeHandler} isOnline={isOnline}/>}
                />}
    
    
    {/* <Footer/> */}
    <MyPedometer/>
    
    </View>
}

MainEmploeeListScreen.navigationOptions = ({navigation}) => {

    return {headerTitle: '',
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {AppHeaderIcon}>
    <Item 
    title    = 'toogle'
    iconName = 'ios-menu'
    onPress  = {() => navigation.toggleDrawer()}
    />
    </HeaderButtons>}
}

const styles = StyleSheet.create({
    center: {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
        // backgroundColor: '#000'
    },
    centers: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        padding: 10
    },
    container: {
        flex: 1
    },
    menuCard: {
        // padding: 4,
        // marginTop: 50,
        // borderBottomWidth: 0.3,
        // borderTopWidth: 0,
        borderColor: '#fff',
        width      : '100%',
        // backgroundColor: '#1C1B1B'
    },
})