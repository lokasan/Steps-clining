import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Image, ScrollView, Text, TouchableOpacity} from 'react-native'
import { MyPedometer }from './MyPedometer'
import GoogleFit, { Scopes } from 'react-native-google-fit'
import * as Google from 'expo-google-app-auth'
import * as SQLite from 'expo-sqlite'
import {lastDayForMonth} from '../lastDayForMonth'
import {RenderChart} from '../components/RenderChart'
import { EmploeeList } from '../screens/EmploeeList'

GoogleFit.checkIsAuthorized().then(() => {
  console.log(GoogleFit.isAuthorized, 'BOOOLEAN')
})
const db = SQLite.openDatabase('db.db')
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


export const GraphPed = () => {

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
      for (let i = 0; i < 8000; i++) {
        tempP = new Date(2020, 7, 1, 0, count+=10)
        tempP = tempP.getFullYear() + '-' + (tempP.getMonth() + 1) + '-' +tempP.getDate() + ' ' + tempP.getHours() + ':' + tempP.getMinutes()
        tmp = tempP.split(/\-|\ |\:/)
        console.log('tmp_first_cycle: ', tmp)
        for (let j = 1; j < tmp.length; j++) {
          if (tmp[j].length == 1) {
            tmp[j] = '0' + tmp[j]
            tempP = tmp[0] + '-' + tmp[1] + '-' + tmp[2] + ' ' + tmp[3] + ':' + tmp[4]
            console.log('tempP second Cycle: ', tempP)
          }
        }
        console.log('Out Cycle: ', tempP)
        saveDataReq.push(tempP)
        db.transaction(tx => {
        tx.executeSql("insert into step_time (user_id, count_step, date_time, current_time) values (?, ?, ?, ?);", [1, Math.floor(Math.random() * 500), saveDataReq[i], Date.now()])
        
        })
                
      }  

      db.transaction(tx => {
      tx.executeSql('select * from step_time', [], (_, { rows }) =>
      console.log(JSON.stringify(rows['_array']))
                                    )
              })
    } 
      return (
      <ScrollView style={{backgroundColor: 'black'}}>
        <View>
          
            <RenderChart dataGraph={dataGraph} onSubmit={addDataGraph}/>
          <View>
            {console.log(`GraphPed:====>>> , ${JSON.stringify(dataGraph)}`)}
          </View>
        {/* <reservChart/> */}
        
          <MyPedometer key_auth={dataGraph}/>
          {/* <View style={styles.container}>
            <TouchableOpacity style={styles.buttonD} onPress={setDataToBase}><Text>Загрузить тестовые данные</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonD} onPress={pragmaEdit}><Text>Год</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonD} onPress={sendDataToFireBase}><Text>Загрузить в firebase</Text></TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
      )
}
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
}
})