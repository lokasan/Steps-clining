import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import PureChart from 'react-native-pure-chart'
import * as SQLite from 'expo-sqlite'
import {lastDayForMonth} from '../lastDayForMonth'
export const RenderChart = ({ dataGraph, onSubmit, statusPress, subButton }) => {
    let chartChoose = null
    let dataForChart = dataGraph[0].dataForChart ? dataGraph[0].dataForChart : dataGraph
    
    let myStatusPress = dataGraph.statMem
    
    let deactivateButton = true
    const db = SQLite.openDatabase('db.db')
    
    const getChartYear = (days, month, year) => {
      
      return new Promise(resolve => {
        db.transaction(tx => {
          tx.executeSql("select sum(count_step)/? as step, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time where month=? and year=?", [days, month, year.toString()], (_, { rows }) => {
              // console.log(parseInt(JSON.stringify(rows['_array']).replace(/(^.*?:|[a-z""[\],{}])/g, "").split(':')[0]))
            if (!isNaN(parseInt(JSON
              .stringify(rows['_array'])
              .replace(/(^.*?:|[a-z""[\],{}])/g, "")
              .split(':')[0]))) {
                dataForChart.push({
                  x: JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[2] + '-' + JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[1],
                  y: parseInt(
                    JSON
                    .stringify(rows['_array'])
                    .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                    .split(':')[0]),
                })
              
            } else {
                dataForChart.push({
                x: JSON
                .stringify(rows['_array'])
                .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                .split(':')[2] + '-' + 
                JSON
                .stringify(rows['_array'])
                .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                .split(':')[1],
                y: 0,
                })
            }
          
          }
          )
          // console.log(dataForChart)
          
          resolve(dataForChart)
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

    const getYearArray = (countYear) => {
      return new Promise(resolve => {
        let dataArrayForChart = []
        for (let i = countYear[0]; i <= countYear[countYear.length - 1]; i++) {
          console.log(`Проход по году ${i}`)
          for (let key of lastDayForMonth.monthList) {
            if (Object.keys(key)[0] === '02') {
              // console.log(`${lastDayForMonth.monthList[1][Object.keys(key)[0]](i)} ${Object.keys(key)[0]} ${i}`)
              // console.log(`[Month: ${Object.keys(key)[0] } Days: ${lastDayForMonth.monthList[1][Object.keys(key)[0]](i)}]`)
              dataArrayForChart = getChartYear(lastDayForMonth.monthList[1][Object.keys(key)[0]](i), Object.keys(key)[0], i)
              
                // console.log('Внутри цикла:', dataArrayForChart)
              
            }
            else {
              dataArrayForChart = getChartYear(Object.values(key)[0], Object.keys(key)[0], i)
              
              // {console.log(`[Month: ${Object.keys(key)[0]} Days: ${Object.values(key)}]`)}
           } // найти способ вывода номера месяца по порядку [найден]
           // перенести в отдельные функции все циклы
        }
       
      }
      
        // console.log('buuuugs', dataArrayForChart)
      
      
      resolve(dataArrayForChart)
      })
    }
    const maxDays = 31
    const getChartMonth = (days, month, year) => {
      return new Promise(resolve => {
        
        db.transaction(tx => {
          tx.executeSql("select sum(count_step) as step, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time where day=? and month=? and year=?", [days, month, year], (_, { rows }) => {
            if (!isNaN(parseInt(JSON
              .stringify(rows['_array'])
              .replace(/(^.*?:|[a-z""[\],{}])/g, "")
              .split(':')[0]))) {
                dataForChart.push({
                  x: JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[1] + ' ' + JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[2] + '-' + JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[3],
                  y: parseInt(
                    JSON
                    .stringify(rows['_array'])
                    .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                    .split(':')[0]),
                })
              
            } else {
                dataForChart.push({
                x: JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[1] + '' + JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[2] + '-' + JSON
                  .stringify(rows['_array'])
                  .replace(/(^.*?:|[a-z""[\],{}])/g, "")
                  .split(':')[3],
                y: 0,
                })
            }
          
          
           
           
          })
          
          resolve(dataForChart)
        })
      })
    }
    const constructHalfsMonthArray = (startDay, lastDay, month, year) => {
      let halfArray = []
      for (let i = startDay; i <= lastDay; i++) {
        if (i < 10) {
          halfArray.push({day: '0' + i, month: month, year: year.toString()})
        } else {
          halfArray.push({day: i.toString(), month: month, year: year})
        }
      }
      return halfArray
    }

    const getMonthArray = (data) => {
      return new Promise(resolve => {
        let lastRDay = 0
        let prevMonth = 0
        let startDayPrevMonth = 0
        let dataArrayForChart = []
        let arrayMonth = []
        db.transaction(tx => {
          tx.executeSql("select max(strftime('%d', date_time)) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time where month=? and year=?", [data[data.length - 1], data[0]], (_, { rows }) => {
            lastRDay = JSON.stringify(rows['_array'])
            .replace(/(^.*?:|[a-z""[\],{}])/g, "")
            .split(':')
            const currentDay = lastRDay[0]
            const currentMonth = lastRDay[1]
            const currentYear = lastRDay[2]
            let lastDayPrevMonth = null
            const residue = maxDays - parseInt(lastRDay[0])
            if (residue) {
              if (data[data.length - 1] === '01') {
                let prevYear = (parseInt(currentYear) - 1).toString()
                prevMonth = '12'
                startDayPrevMonth = Object.values(lastDayForMonth.monthList[parseInt(prevMonth) -1])[0] - residue
                lastDayPrevMonth = Object.values(lastDayForMonth.monthList[parseInt(prevMonth) -1])[0]

                arrayMonth = constructHalfsMonthArray(startDayPrevMonth, lastDayPrevMonth, prevMonth, prevYear)
                arrayMonth.concat(constructHalfsMonthArray(1, parseInt(currentDay), currentMonth, currentYear))
                
              } else {
                if (currentMonth - 1 < 10) {
                  prevMonth = '0' + (currentMonth - 1)
                } else {
                  prevMonth = (currentMonth - 1).toString()
                }
                startDayPrevMonth = Object.values(lastDayForMonth.monthList[parseInt(prevMonth) -1])[0] - residue
                lastDayPrevMonth = Object.values(lastDayForMonth.monthList[parseInt(prevMonth) -1])[0]

                arrayMonth = constructHalfsMonthArray(startDayPrevMonth, lastDayPrevMonth, prevMonth, currentYear)
                arrayMonth = arrayMonth.concat(constructHalfsMonthArray(1, parseInt(currentDay), currentMonth, currentYear))
                
                
              }
              
            }
            

            

            for (let key of arrayMonth) {
              dataArrayForChart = getChartMonth(key['day'], key['month'], key['year'])
            }
            
            resolve(dataArrayForChart)
          })
          
        })
        
        
        
        // for (let i = )
      })
    }
    // getYearArray.then((dataArrayForChart) => {
    //   console.log(dataArrayForChart)
    // })
    async function printData(statMem, chartChoose = null) {
      dataForChart = []
      let dataArrayForChart = null
      if (statMem === 'year') {
        let countYear = await getMinAndCountYear
        dataArrayForChart = await getYearArray(countYear)
        onSubmit(dataArrayForChart, statMem)
      }

      if (statMem === 'month') {

        if (chartChoose) {
          const monthChoose = chartChoose.x
            .replace(/"/)
            .split('-')
          dataArrayForChart = await getMonthArray(monthChoose)
          onSubmit(dataArrayForChart, statMem)
          
        }
      }
      if (statMem === 'day') {
        // onSubmit(dataArrayForChart, statMem)
      }
      
      
     
      
      
      
    }
    
    // printData().then(() => onSubmit(dataForChart))
    
    let sampleDataMonth = [
        {
          seriesName: 'series1',
          data: dataForChart,
          color: '#3949ab'
        }, 
      ]
   return (
       <View>
    <View style={styles.container}>
    
    <TouchableOpacity disabled={dataGraph[0].statMem === 'day' ? true : false} style={dataGraph[0].statMem === 'day' ? styles.activeButton : styles.button} onPress={() => {
      myStatusPress = 'day'
          
      printData(myStatusPress)
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
    onPress={(a) => {
        chartChoose = sampleDataMonth[0]['data'][a]
        console.log('onPress', chartChoose)
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