import React, {useContext, useCallback, useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {StyleSheet, View, FlatList, Image, ScrollView, Text, Alert, ActivityIndicator} from 'react-native'
import {Authorization} from '../components/Authorization'
import {Svg} from 'react-native-svg'
import {Todo} from '../components/Todo'
import {GraphPed} from '../components/GraphPed'
import * as SQLite from 'expo-sqlite'
// import PureChart from 'react-native-pure-chart'
import {VictoryChart, VictoryGroup, VictoryBar, VictoryZoomContainer, VictoryScatter} from 'victory-native'
import { EmploeeContext } from '../context/emploee/authorizationContext';
import { ScreenContext } from '../context/screen/screenContext';
import { Footer } from '../components/ui/Footer'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import { loadObject } from '../store/actions/object';
import { loadComponent } from '../store/actions/component';
import { useDispatch, useSelector } from 'react-redux';
import { loadPost } from '../store/actions/post';
import { loadComponentRank } from '../store/actions/componentRank';
import { loadPostWithComponent } from '../store/actions/postWithComponent';
import { UploadDataToServer } from '../uploadDataToServer';
import { getUsersServer } from '../store/actions/empDouble';

export const MainScreen = ({navigation}) => {
  const dispatch = useDispatch()

  const loading                   = useSelector(state => state.post.loading)
  let   buildings                 = useSelector(state => state.object.objAll)
  let   components                = useSelector(state => state.component.componentAll)
  let   posts                     = useSelector(state => state.post.postAll)

  const myKey = {
    isStatus: null,
    id: null
  }
  
  const db = SQLite.openDatabase('dbas.db')
  async function buildQ ()  {
    
     return new Promise(resolve => {
       db.transaction((tx) => { 
        tx.executeSql('select * from user_local where status=1', [], (_, { rows }) => {
          console.log(JSON.stringify(rows),'напечатал из бд');
          myKey.isStatus = rows.length !== 0 ? JSON.stringify(rows._array[0]['status']) : 0
          myKey.id = rows.length !== 0 ? JSON.stringify(rows._array[0]['id']) : 0
          console.log(rows['_array'])
         resolve()                
       }                                
        )                               
      })
    })
    // console.log(abcd)
  }

  // getAsyncData()
  const loadGetDB = useCallback(async () => await getAsyncData(), [getAsyncData])
  
  useEffect(() => {
    dispatch(getUsersServer())
    loadGetDB()
    dispatch(loadObject())
    dispatch(loadComponent())

    
  }, [])

  useEffect(() => {
    for (el of buildings) {
      dispatch(loadPost(el.id)) 
    }
  }, [buildings])

  useEffect(() => {
    for (el of components) {
      dispatch(loadComponentRank(el.id))
    }
  }, [components])

  useEffect(() => {
    for (el of posts) {
      dispatch(loadPostWithComponent(el.id))
    }
  }, [posts])
  async function getAsyncData() {
    await buildQ()
    if (myKey.isStatus) {
      await UploadDataToServer.addActiveUser(myKey.id)
      await UploadDataToServer.getActiveUsers()
      navigation.navigate('App')
      
  
      
    }
  }
    return (
      <View style={{flex: 1}}>
      
      <View style={styles.container}>
      { loading ? 
        <View              style = {styles.center}>
        <ActivityIndicator size  = "small" color = "#0000ff"/>
        </View>: null }
        <View>
        <Authorization navigation={navigation}/>
      </View>
      </View>
      {/* <Footer/> */}
    </View>
      
      
    )
    
}
MainScreen.navigationOptions = {
  headerTitle: 'Электронный бригадир',
  headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='Private Account'
    iconName='ios-alert'
    onPress={() => Alert.alert('Сведения о системе')}
    />
    </HeaderButtons>
}
const styles = StyleSheet.create({
  center: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
    // backgroundColor: '#000'
},
  container: {
  // paddingHorizontal: '18%',
  flex: 1,
  height: '89%'
},})