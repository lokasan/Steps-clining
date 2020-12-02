import React, {useContext, useCallback, useEffect} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {StyleSheet, View, FlatList, Image, ScrollView, Text, Alert} from 'react-native'
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

export const MainScreen = ({navigation}) => {
  const {addTodo, todos, removeTodo} = useContext(EmploeeContext)
  const {changeScreen} = useContext(ScreenContext)
  // navigationProfile = navigation
  const myKey = {
    key_auth: null
  }
  const db = SQLite.openDatabase('db.db')
  
  function buildQ ()  {
    
     return new Promise(resolve => {
       db.transaction((tx) => { 
        tx.executeSql('select * from user_local', [], (_, { rows }) => {
          myKey.key_auth = JSON.stringify(rows['_array'][0]['email'])
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
    console.log('hi')
    loadGetDB()
    
  }, [])
  async function getAsyncData() {
    console.log('start')
    await buildQ()
    if (myKey.key_auth) {
      navigation.navigate('AutentifGraph')
      
  
      
    }
  }
    return (
      <View style={{flex: 1}}>
      
      <View style={styles.container}>

        <View>
        <Authorization navigation={navigation} onSubmit={addTodo} onOpen={changeScreen}/>
        
        <FlatList style={styles.frame}
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo}/>
        }
        
        />
        
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
  container: {
  // paddingHorizontal: '18%',
  flex: 1,
  height: '89%'
},})