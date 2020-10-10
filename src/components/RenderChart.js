import React, {useContext, useCallback, useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import PureChart from 'react-native-pure-chart'
import * as SQLite from 'expo-sqlite'
import {lastDayForMonth} from '../lastDayForMonth'
import { GraphContext } from '../context/graph/graphContext'
import { EmploeeList } from '../screens/EmploeeList'
export const RenderChart = ({ dataGraph, onSubmit}) => {
    let chartChoose = null
    let dataForChart = dataGraph[0].dataForChart
    const {loadEmploee, emploee, fetchEmploees} = useContext(GraphContext)
    const loadingEmp = useCallback(async () => await fetchEmploees(), [fetchEmploees])
    const [myIsCo, setMyIsCo] = useState(0)
    let myStatusPress = dataGraph.statMem
    
    let deactivateButton = true
    const db = SQLite.openDatabase('db.db')
    
  // if (chartChoose) {
  //   setMyIsCo(chartChoose.x) //Работа была в файлах emploeelist, renderEmploeeList
  // }

    const getChartYear = (userStatus, key_auth, countUser) => {
      
      return new Promise(resolve => {
        // fetchEmploees()
        // loadEmploee('Bor', 0, '45', 'adm') //ПОСМОТРЕТЬ
        db.transaction(tx => {
          let RDB = `select sum(count_step)/${countUser} as step, max(strftime('%d', date_time)) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time group by month, year order by year desc, month desc limit 12;`
          let requestDB = `select sum(count_step)/ as step, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time left join user_local where step_time.user_id = user_local.id and month=? and year=?`
          if (userStatus === 'null') {
            requestDB = `select sum(count_step) as step, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time left join user_local where step_time.user_id = user_local.id and month=? and year=? and key_auth=${key_auth}`
          }
          {/* добавить разделение на админа и простого юзера */}
          tx.executeSql(RDB, [], (_, { rows }) => {
            let yerObj = JSON.parse(JSON.stringify(rows['_array']))
            for (key of yerObj) {
              dataForChart.unshift({
                x: key['month'] + ' ' + key['year'],
                y: Math.floor(key['step']/key['day'])
              })
            }
            if (yerObj.length !== 12) {

              let month = parseInt(yerObj[yerObj.length - 1].month)
              let year = parseInt(yerObj[yerObj.length - 1].year)
              console.log(month, 'Месяц');
              for(let i=1; i<=12-yerObj.length; i++) {
                month = month - 1
                if (!month) {
                  month = 12
                  year -= 1
                }
                dataForChart.unshift({
                  x: month < 10 ? '0' + month + ' ' + year : month.toString() + ' ' + year,
                  y: 0
                })
              }
            }
            resolve(dataForChart)
          }
          )
        })
    })
    }
    
    const getMinAndCountYear = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql("select min(strftime('%Y', date_time)) as year from step_time", [], (_, { rows }) => { 
          let minYear = parseInt((JSON.stringify(rows['_array'])).replace(/\D+/g, ""))
          let arrYears = []
          for (let i = minYear; i <= new Date().getFullYear(); i ++) {
            arrYears.push(i)
          }
          resolve(arrYears) //нужен вывод стартового дня и месяца
      })
    })  
  })
  // Разобраться в функции дня!!!
    const getChartDay = (monthChoose, userStatus, key_auth, userCount) => {
      return new Promise(resolve => {
        console.log(monthChoose, 'Вывоооооод!!')
        {/* Вынести в отдельный промис */}
        db.transaction(tx => {
          let RDB = `select sum(count_step) as steps, strftime('%H', date_time) as hour, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and hour<='23' and day=? and month=? and year=? group by year, month, day, hour order by year desc, month desc, day desc, hour desc limit 24;`
          if (monthChoose.length === 2) {
            RDB = `select sum(count_step) as steps, strftime('%H', date_time) as hour, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and hour<='23' and day>='21' and month=? and year=? group by year, month, day, hour order by year desc, month desc, day desc, hour desc limit 24;`
          }
            tx.executeSql(RDB, [...monthChoose], (_, { rows }) => {
              let chartDayObj = JSON.parse(JSON.stringify(rows['_array']))
              for (let i=0; i<24; i++) {
                dataForChart.push({
                  x: typeof chartObj === 'object' && chartDayObj[0].hasOwnProperty('day') ? i.toString() + ' ' + chartDayObj[0]['day'] + ' ' + monthChoose.join(' ')  : i.toString()+ ' ' + monthChoose.join(' '),
                  y: 0,
                  }) 
                }
              if (chartDayObj.length) {
                for (const key of chartDayObj) {
                  dataForChart[+key['hour']] = {
                    x: key['hour'] + ' ' + key['day'] + ' ' + key['month'] + ' ' + key['year'],
                    y: parseInt(key['steps']/key['users_count']),
                  }
                }
              }
              resolve(dataForChart)
            }) 
        })
      })
    }

    const getUserStatus = new Promise((resolve, reject) => {
      let userStatus = null
      let countUsers = null
        db.transaction(tx => {
          tx.executeSql('select status, key_auth from user_local where id=1', [], (_, { rows }) => {

            userStatus = JSON.stringify(rows['_array'])
            .replace(/("status":|"key_auth"|[""[\],{}])/g, "")
            .split(':')
            
          })
          tx.executeSql('select count(id) as countUsers from user_local', [], (_, { rows }) => {
            countUsers = (JSON.stringify(rows['_array'])
            .replace(/("countUsers":|[""[\],{}])/g, "")
            .split(':'))
            userStatus.push(...countUsers)
            console.log(userStatus);
            resolve(userStatus)
          })
        })
    }) 
      
    const getChartMonthReserve = (month = null, year = null, ) => {
      return new Promise( (resolve) => {
        db.transaction(tx => {
          let reqDB = null
          if (month && year) {
            console.log(month, year);
            reqDB = `select sum(count_step) steps, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and month <='${month}' and year <='${year}' group by year, month, day order by year desc, month desc, day desc limit 31;`
          }
          else {
            reqDB = `select sum(count_step) steps, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id group by year, month, day order by year desc, month desc, day desc limit 31;`
          }
         
          tx.executeSql(reqDB, [], (_, { rows }) => {
            let monthObj = JSON.parse(JSON.stringify(rows['_array']))
            console.log(JSON.stringify(rows['_array']));
            for(let key of monthObj) {
              dataForChart.unshift({
                x: key['day'] + ' ' + key['month'] + ' ' + key['year'],
                y: parseInt(key['steps']/key['users_count'])
              })
            }
            resolve(dataForChart)
          })
        })
      })
    }

    async function printData(statMem, chartChoose = null) {
      // reservMonth = "select sum(count_step), strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time group by month;"
      dataForChart = []
      let dataArrayForChart = null
      let tmpArr = []
      let countUser = null
      const userStatus = await getUserStatus
      console.log(typeof(userStatus[0]))
      if (statMem === 'year') {
        // let countYear = await getMinAndCountYear
        dataArrayForChart = await getChartYear(...userStatus)
        onSubmit(dataArrayForChart, statMem)
      }
      
      // double refresh
      if (statMem === 'month') {
        
        if (chartChoose) {
          let monthChoose = chartChoose.x
            .replace(/"/)
            .split(' ')
            if (monthChoose.length === 4) {
              monthChoose = [monthChoose[2], monthChoose[3]]
            }
            dataArrayForChart = await getChartMonthReserve(...monthChoose)
            onSubmit(dataArrayForChart, statMem)

        } else {
          dataArrayForChart = await getChartMonthReserve()
            onSubmit(dataArrayForChart, statMem)
        }
      }
      if (statMem === 'day') {
        if (chartChoose) {
          const monthChoose = chartChoose.x
          .replace(/"/)
          .split(' ')
          dataArrayForChart = await getChartDay(monthChoose, ...userStatus)
        } else {
          dataArrayForChart = await getChartDay([new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate().toString(), 
          (new Date().getMonth()) + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1).toString(), new Date().getFullYear().toString()], ...userStatus)
        }
        // console.log(monthChoose);
        onSubmit(dataArrayForChart, statMem) 
      }
    } 
  
    let sampleDataMonth = [
        {
          seriesName: 'series1',
          data: dataForChart,
          color: '#3949ab'
        }, 
      ]
    try {
      if (dataGraph[0].dataForChart.length === 0 && dataGraph[0].statMem === 'day' ) {
        printData(dataGraph[0].statMem, chartChoose)
      }
    } catch(e) {
      console.log('Осуществлен переход по 0')
    }
    
  //   useEffect(() => {
  //     console.log('Если два запуска')
  //     loadingEmp()
  // }, [])
   return (
       <View>
    <View style={styles.container}>
    
    <TouchableOpacity disabled={dataGraph[0].statMem === 'day' ? true : false} style={dataGraph[0].statMem === 'day' ? styles.activeButton : styles.button} onPress={() => {
      myStatusPress = 'day'
      printData(myStatusPress, chartChoose)
      
    }}><Text>День</Text></TouchableOpacity>
    <TouchableOpacity  disabled={dataGraph[0].statMem === 'month' ? true : false} style={dataGraph[0].statMem === 'month' ? styles.activeButton : styles.button} onPress={() => {
      myStatusPress = 'month'
          
      printData(myStatusPress, chartChoose)

      }
      }
      >
        <Text>Месяц</Text>
        </TouchableOpacity>
    <TouchableOpacity disabled={dataGraph[0].statMem === 'year' ? true : false} style={dataGraph[0].statMem === 'year' ? styles.activeButton : styles.button} onPress={() => 
      {
        if (myStatusPress === 'year') {
          console.log('Ты уже в году')
        } else  {
          myStatusPress = 'year' 
          printData(myStatusPress)
        }
        }
        }>
      <Text>Год</Text>
      </TouchableOpacity>
    </View>
   <PureChart 
    data={sampleDataMonth} 
    type='bar' 
    width={'100%'} 
    height={250} 
    defaultColumnWidth={dataGraph[0].statMem === 'year' ? 22 : dataGraph[0].statMem === 'day' ? 11.7 : 8.6}
    defaultColumnMargin={dataGraph[0].statMem === 'year' ? 10 : dataGraph[0].statMem === 'day' ? 4 : 3.2}
    onPress={(a) => {
        chartChoose = sampleDataMonth[0]['data'][a]
        
        console.log('onPress', chartChoose.x.split(' '))
        // console.log(setMyIsCo(myIsCo + 1));
        }
    } 

    customValueRenderer={(index, point) => {
        if (index < 3) return null
        return (
            <Text style={{textAlign: 'center'}}>{point.y}</Text>
        )
    }
    }
    />
    <Text>{}</Text>
    <EmploeeList emploeeMy={myIsCo} onPress={(a) => console.log('ABraKaDaBrA', a)}/>
    
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
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
    },
    
    activeButton: {
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
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 1
      // width: '40%'
  },
})