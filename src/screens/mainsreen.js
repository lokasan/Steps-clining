import React, {useContext, useCallback, useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {StyleSheet, View, FlatList, Image, ScrollView, Text, Alert, ActivityIndicator, TouchableOpacity} from 'react-native'
import {Authorization} from '../components/Authorization'
import * as SQLite from 'expo-sqlite'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import { loadObject } from '../store/actions/object';
import { loadComponent } from '../store/actions/component';
import { useDispatch, useSelector } from 'react-redux';
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
          // console.log(JSON.stringify(rows),'напечатал из бд');
          myKey.isStatus = rows.length !== 0 ? JSON.stringify(rows._array[0]['status']) : 0
          myKey.id = rows.length !== 0 ? JSON.stringify(rows._array[0]['id']) : 0
          // console.log(rows['_array'])
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
    // -- load get db will be checking future 
    dispatch(loadObject())
    dispatch(loadComponent())
    
    // dispatch(loadAllPostsFromServer()) 
    
  }, [])
  // useEffect(() => {
  //   dispatch(loadObject())
  // }, [])

  // useEffect(() => {
  //   console.log('USEFFECT BUILDINGS!!', JSON.stringify(buildings))
  //   for (el of buildings) {
  //     dispatch(loadPost(el.id)) 
  //   }
  // }, [buildings])

  // useEffect(() => {
  //   console.log('USEFFECT COMPONENTS!!', JSON.stringify(components))
  //   for (el of components) {
  //     dispatch(loadComponentRank(el.id))
  //   }
  // }, [components])

  // useEffect(() => {
  //   console.log('USEFFECT POSTS!!', JSON.stringify(posts))
  //   for (el of posts) {
  //     dispatch(loadPostWithComponent(el.id))
  //   }
  // }, [buildings])
  
  async function getAsyncData() {
    await buildQ()
    if (myKey.isStatus) {
      await UploadDataToServer.addActiveUser(myKey.id)
      
      // navigation.navigate('App')
      
  
      
    }
    await UploadDataToServer.getActiveUsers()
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
// MainScreen.navigationOptions = {
//   headerTitle: 'Электронный бригадир',
//   headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
//     <Item 
//     title='Private Account'
//     iconName='ios-alert'
//     onPress={() => Alert.alert('Сведения о системе')}
//     />
//     </HeaderButtons>
// }
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