import React, {useState} from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {StyleSheet, View, FlatList, Image, ScrollView, Text, TouchableOpacity, Button, Touchable, Alert} from 'react-native'
import { MyPedometer }from './MyPedometer'
// import GoogleFit, { Scopes } from 'react-native-google-fit'
import * as SQLite from 'expo-sqlite'
import {lastDayForMonth} from '../lastDayForMonth'
import {RenderChart} from '../components/RenderChart'
import { EmploeeList } from '../screens/EmploeeList'
import { signInWithGoogleAsync } from './GoogleAuth';
import { Footer } from '../components/ui/Footer'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import { StatusObject } from '../screens/StatusObject';
import {useSelector} from 'react-redux'
import { AnalyticsCorpus } from './AnalyticsCorpus';
// GoogleFit.checkIsAuthorized().then(() => {
//   console.log(GoogleFit.isAuthorized, 'BOOOLEAN')
// })
const db = SQLite.openDatabase('dbas.db')
// const db = 1
// function sayHi() {
//   alert('Привет');
// }
// GoogleFit.checkIsAuthorized()
// setInterval(sayHi, 10000);
let sampleDataYear = [
  {x: 'Январь', y: 4520},
  {x: 'Февраль', y: 4520},
  {x: 'Март', y: 4520},
  {x: 'Апрель', y: 4520},
  {x: 'Май', y: 4520},
  {x: 'Июнь', y: 4520},
  {x: 'Июль', y: 4520},
  {x: 'Август', y: 4520},
]
// var ws = new WebSocket('ws://192.168.1.4:6790')
// ws.binaryType = 'arraybuffer'

// ws.onopen = function() {
//   console.log("Соединение установлено")
  
//   let my_json = {'action': 'message', 'message': 'hi'}
//   ws.send(JSON.stringify(my_json))}


// ws.onmessage = function(event) {

//   Alert.alert(`Получены данные ${JSON.stringify(JSON.parse(event.data))}`);
//   console.log(JSON.parse(event.data));
// }
// // ws.onclose = function() {
// //   let disconneted = {'action': 'disconnected', 'message': 'Борис отключился'}
// //   ws.send(JSON.stringify(disconneted))
// //   console.log('Я нахожусь на закрытии');
// //   // ws.close()

// // }
// var minus = function (event) {
//   ws.send(JSON.stringify({action: 'minus'}))
// }
// // ws.onmessage = function (event) {
// //   data = JSON.parse(event.data);
// //   console.log(data)
// // };


export const GraphPed = ( {navigation} ) => {
  let dataForChart = [{ 'dataForChart': [], 
                        'statMem': 'day'}]
    const initialState = {
      dataFirstLoad: [],
      loading: false,
      error: null
    }
    
        
        
    const [dataGraph, setDataGraph] = useState(dataForChart)
    const addDataGraph = (dataForChart, statMem, key_auth) => {
      const newDataGraph = {
        dataForChart,
        statMem,
        key_auth
      }
      setDataGraph(() => [{
          dataForChart,
          statMem,
          key_auth
      }]
      )
    }
   
  
    
    
    const sendDataToFireBase = () => {
      db.transaction(tx => {
        tx.executeSql("select * from step_time left join user_local", [], (_, { rows }) => {
          console.log(JSON.stringify(rows['_array']))
        })
      })
    }
    const pragmaEdit = () => {
      db.exec([{ sql: 'insert into user_local (name, key_auth) values (?, ?);', args: ['Boris', Date.now().toString()] }], false, () =>
      console.log('Journal_Mode and synchronous off')
      // db.exec([{ sql: 'PRAGMA journal_mode = OFF; PRAGMA synchronous = OFF;', args: [] }], false, () =>
      // console.log('Journal_Mode and synchronous off')
);
    } 
    const setDataToBase = () => {
      let tmp 
      let tempP
      let saveDataReq = []
      let count = 0
      for (let i = 0; i < 500; i++) {
        tempP = new Date(2020, 0, 1, 0, count+=1439)
        tempP = tempP.getFullYear() + '-' + (tempP.getMonth() + 1) + '-' +tempP.getDate() + ' ' + tempP.getHours() + ':' + tempP.getMinutes()
        tmp = tempP.split(/\-|\ |\:/)
        // console.log('tmp_first_cycle: ', tmp)
        for (let j = 1; j < tmp.length; j++) {
          if (tmp[j].length == 1) {
            tmp[j] = '0' + tmp[j]
            tempP = tmp[0] + '-' + tmp[1] + '-' + tmp[2] + ' ' + tmp[3] + ':' + tmp[4]
            // console.log('tempP second Cycle: ', tempP)
          }
        }
        // console.log('Out Cycle: ', tempP)
        saveDataReq.push(tempP)
        db.transaction(tx => {
        tx.executeSql("insert into step_time (user_id, count_step, date_time, current_time) values (?, ?, ?, ?);", [6, Math.floor(Math.random() * 4 + 1), saveDataReq[i], Date.now()])
        
        })
                
      }  

      db.transaction(tx => {
      tx.executeSql('select * from step_time', [], (_, { rows }) =>
      console.log(JSON.stringify(rows['_array']))
                                    )
              })
    } 
    const emploeeAll   = useSelector(state => state.empDouble.empAll)
    let   tempPrivileg = false
    let serfIdUser = 0
    // console.log(emploeeAll, 'Алл сотрудники');
    for (let i of emploeeAll) {
        if (i.status && i.privileg) {
            tempPrivileg = true
            
        }
        if (i.status) {
          serfIdUser = i.id
        }
    }
      return (
        tempPrivileg ? <AnalyticsCorpus navigation={navigation}/> : <View></View>)
}
GraphPed.navigationOptions = ({navigation}) => ({
  headerTitle: 'Состояние объекта',
  headerRight: () => <View style={{display: 'flex', flexDirection: 'row'}}><HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='Private Account'
    iconName='ios-person'
    onPress={() => navigation.navigate('MainProfile')}
    />
  </HeaderButtons>
  <HeaderButtons HeaderButtonComponent = {AppHeaderIcon}>
      <Item
      title='Filter Object'
      iconName='ios-options'
      onPress={() => navigation.getParam('openModalFilter')()}
      />
    </HeaderButtons>
  </View>,
  headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
  <Item 
  title='toogle'
  iconName='ios-menu'
  onPress={() => navigation.toggleDrawer()}
  />
</HeaderButtons>
  
  
})
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    top:5,
    height:40,
    marginBottom: 10,
    width: '25%',
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowRadius: 1,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 1 },
    backgroundColor: '#ccc',
    borderRadius: 10,
    elevation: 1
    // width: '40%'
}, container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  
  
}, buttonD: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ccc',
    alignItems: 'center',
    height: 40,
    width: '50%',
    alignContent: 'center',
    justifyContent: 'center'
},
containerMain: {
  // paddingHorizontal: '18%',
  flex: 1,
  height: '89%'
},
})