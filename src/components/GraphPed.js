import React, {useState} from 'react';
import {StyleSheet, View, FlatList, Image, ScrollView, Text, TouchableOpacity} from 'react-native'
import PureChart from 'react-native-pure-chart'
import { MyPedometer }from './MyPedometer'
import GoogleFit, { Scopes } from 'react-native-google-fit'
import * as SQLite from 'expo-sqlite'
import {lastDayForMonth} from '../lastDayForMonth'
import { RenderChart } from '../components/RenderChart'
GoogleFit.checkIsAuthorized()

// function sayHi() {
//   alert('Привет');
// }
// GoogleFit.checkIsAuthorized()
// setInterval(sayHi, 10000);
let dataForChart = [
  {x: '2018-02-01', y: 3000},
  {x: '2018-02-02', y: 4203},
  {x: '2018-02-03', y: 3706},
  {x: '2018-02-04', y: 188},
  {x: '2018-02-05', y: 5003},
  {x: '2018-02-06', y: 22478},
  {x: '2018-02-07', y: 11217},
  {x: '2018-02-08', y: 13546},
  {x: '2018-02-09', y: 7852},
  {x: '2018-02-10', y: 500},
  {x: '2018-02-11', y: 3000},
  {x: '2018-02-12', y: 4203},
  {x: '2018-02-13', y: 3706},
  {x: '2018-02-14', y: 188},
  {x: '2018-02-15', y: 5003},
  {x: '2018-02-16', y: 22478},
  {x: '2018-02-17', y: 11217},
  {x: '2018-02-18', y: 13546},
  {x: '2018-02-19', y: 7852},
  {x: '2018-02-20', y: 500},
  {x: '2018-02-21', y: 3000},
  {x: '2018-02-22', y: 4203},
  {x: '2018-02-23', y: 3706},
  {x: '2018-02-24', y: 188},
  {x: '2018-02-25', y: 5003},
  {x: '2018-02-26', y: 22478},
  {x: '2018-02-27', y: 11217},
  {x: '2018-02-28', y: 13546},
  {x: '2018-02-29', y: 7852},
  {x: '2018-02-30', y: 500},
  {x: '2018-02-11', y: 3000},
  {x: '2018-02-12', y: 4203},
  {x: '2018-02-13', y: 3706},
  {x: '2018-02-14', y: 188},
  {x: '2018-02-15', y: 5003},
  {x: '2018-02-16', y: 22478},
  {x: '2018-02-17', y: 11217},
  {x: '2018-02-18', y: 13546},
  {x: '2018-02-19', y: 7852},
  {x: '2018-02-20', y: 500},
  {x: '2018-02-21', y: 3000},
  {x: '2018-02-22', y: 4203},
  {x: '2018-02-23', y: 3706},
  {x: '2018-02-24', y: 188},
  {x: '2018-02-25', y: 5003},
  {x: '2018-02-26', y: 22478},
  {x: '2018-02-27', y: 11217},
  {x: '2018-02-28', y: 13546},
  {x: '2018-02-29', y: 7852},
  {x: '2018-02-30', y: 500},
  {x: '2018-02-11', y: 3000},
  {x: '2018-02-12', y: 4203},
  {x: '2018-02-13', y: 3706},
  {x: '2018-02-14', y: 188},
  {x: '2018-02-15', y: 5003},
  {x: '2018-02-16', y: 22478},
  {x: '2018-02-17', y: 11217},
  {x: '2018-02-18', y: 13546},
  {x: '2018-02-19', y: 7852},
  {x: '2018-02-20', y: 500},
  {x: '2018-02-21', y: 3000},
  {x: '2018-02-22', y: 4203},
  {x: '2018-02-23', y: 3706},
  {x: '2018-02-24', y: 188},
  {x: '2018-02-25', y: 5003},
  {x: '2018-02-26', y: 22478},
  {x: '2018-02-27', y: 11217},
  {x: '2018-02-28', y: 13546},
  {x: '2018-02-29', y: 7852},
  {x: '2018-02-30', y: 500},
]
const db = SQLite.openDatabase('db.db')
export const GraphPed = () => {
    const [dataGraph, setDataGraph] = useState(dataForChart)
    const addDataGraph = (dataForChart, statMem) => {
      const newDataGraph = {
        dataForChart,
        statMem
      }
      setDataGraph(() => [{
          dataForChart,
          statMem
      }]
      )
    }
    
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
    
    
    const setDataToBase = () => {
      let tmp 
      let tempP
      let saveDataReq = []
      let count = 0
      for (let i = 0; i < 6000; i++) {
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
          <MyPedometer/>
          <View style={styles.container}>
            <TouchableOpacity style={styles.buttonD} onPress={setDataToBase}><Text>Загрузить тестовые данные</Text></TouchableOpacity>
            <TouchableOpacity style={styles.buttonD}><Text>Год</Text></TouchableOpacity>
          </View>
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