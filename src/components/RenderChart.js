import React, {useContext, useCallback, useEffect, useState, useRef} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import PureChart from 'react-native-pure-chart'
import * as SQLite from 'expo-sqlite'
import {lastDayForMonth} from '../lastDayForMonth'
import { GraphContext } from '../context/graph/graphContext'
import { EmploeeList } from '../screens/EmploeeList'
import { updateEmploeers } from '../store/actions/emp'
import {connect, useSelector, useDispatch} from 'react-redux'
import {changeEmploeeListParameters} from './changeEmploeeListParameters'
export const RenderChart = ({ dataGraph, onSubmit}) => {
   let createTemplateEmp = null
   const dispatch = useDispatch()
    let chartChoose = null
    const savedChartTouch = useRef(null)
    let dataForChart = dataGraph[0].dataForChart
    const {loadEmploee, emploee, fetchEmploees, updateEmploee} = useContext(GraphContext)
    const loadingEmp = useCallback(async () => await fetchEmploees(), [fetchEmploees])
    const [myIsCo, setMyIsCo] = useState(0)
    let myStatusPress = dataGraph.statMem
    const storeChoise = useRef(null)
    let deactivateButton = true
    const db = SQLite.openDatabase('dbas.db')
    const origami = useSelector((state) => {console.log(state, 'statelog');
      return state.empList.emploee})
    
    const renderChartForEmploee = (my_key, status) => {
      let tempSlice = null
      if (storeChoise.current === my_key) {
        storeChoise.current = null
      } else {
        storeChoise.current = my_key
      }
      my_key = storeChoise.current
      if ((status === 'month' || status === 'day') && savedChartTouch.current) {
        // console.log(savedChartTouch.current);
        tempSlice = {x: savedChartTouch.current.x, y: savedChartTouch.current.y}
        if (status === 'day') {
          tempSlice.x = tempSlice.x.split(' ').length === 4 ? tempSlice.x.slice(3) : tempSlice.x
        } else 
        {
          tempSlice.x = tempSlice.x.split(' ').length === 4 ? tempSlice.x.slice(6) : tempSlice.x.slice(3)
        }
        // баги - нажать на месяц -> выбрать свечу, нажать на день -> нажать на пользователя - выбрать свечу и нажать на пользователя
        // баги - посмотреть слайс для дня 
        // баги - нажать на год без выбора пользователя, нажать на месяц без выбора пользователя, выбрать пользователя
        // Нужно сделать - добавить  
      }
      console.log(`Я твое значение`, tempSlice);
      printData(status, tempSlice, my_key)
    }
  // if (chartChoose) {
  //   setMyIsCo(chartChoose.x) //Работа была в файлах emploeelist, renderEmploeeList
  // }
    
    const getChartYear = (userStatus, key_auth, countUser, key_my) => {
      
      return new Promise(resolve => {
        // fetchEmploees()
        
        // loadEmploee(5555, 'Bor', 0, '45', 'adm') //ПОСМОТРЕТЬ
        db.transaction(tx => {
          let RDB = `select sum(count_step)/${countUser} as step, max(strftime('%d', date_time)) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time group by month, year order by year desc, month desc limit 12;`
          if (storeChoise.current) {
            RDB = `select sum(count_step)  as step, max(strftime('%d', date_time)) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time left join user_local where user_local.id=user_id and key_auth='${storeChoise.current}' group by month, year order by year desc, month desc limit 12;`
          }
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
      console.log('getChartDay():', storeChoise.current)
      return new Promise(resolve => {
        {/* Вынести в отдельный промис */}
        console.log(monthChoose, "LUNA");
        db.transaction(tx => {
          let RDB = `select sum(count_step) as steps, strftime('%H', date_time) as hour, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and hour<='23' and day=? and month=? and year=? group by year, month, day, hour order by year desc, month desc, day desc, hour desc limit 24;`
          if (storeChoise.current) {
            console.log(storeChoise.current, 'MyStore');
            
            RDB =  `select sum(count_step) as steps, strftime('%H', date_time) as hour, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and hour<='23' and day=? and month=? and year=? and key_auth='${storeChoise.current}' group by year, month, day, hour order by year desc, month desc, day desc, hour desc limit 24;`
          }
          if (monthChoose.length === 2) {
            console.log(monthChoose, 'PRIVET');
            if (storeChoise.current) {
              RDB = `select sum(count_step) as steps, strftime('%H', date_time) as hour, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and day IN (select max(strftime('%d', date_time)) as day from step_time where strftime('%m', date_time) is '${monthChoose[0]}') and month=? and year=? and key_auth='${storeChoise.current}' group by year, month, day, hour order by year desc, month desc, day desc, hour desc limit 24;`
            }
            else {
              RDB = `select sum(count_step) as steps, strftime('%H', date_time) as hour, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and day IN (select max(strftime('%d', date_time)) as day from step_time where strftime('%m', date_time) is '${monthChoose[0]}') and month=? and year=? group by year, month, day, hour order by year desc, month desc, day desc, hour desc limit 24;`
            }
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
            resolve(userStatus)
          })
        })
    }) 
      
    const getChartMonthReserve = (month = null, year = null, key_auth = null) => {
      return new Promise( (resolve) => {
        // updateEmploee(1, '1599678906428', 52)
        db.transaction(tx => {
          let reqDB = null
          if (month && year) {
            if (storeChoise.current) {
              reqDB = `select sum(count_step) steps, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and month <='${month}' and year <='${year}' and key_auth='${storeChoise.current}' group by year, month, day order by year desc, month desc, day desc limit 31;`
            } else {
              reqDB = `select sum(count_step) steps, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and month <='${month}' and year <='${year}' group by year, month, day order by year desc, month desc, day desc limit 31;`
          }
          }
          else if (!(month && year) && storeChoise.current) {
            console.log("Success");
            reqDB = `select sum(count_step) steps, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id and user_local.key_auth='${storeChoise.current}' group by year, month, day order by year desc, month desc, day desc limit 31;`
          }
          else {
            reqDB = `select sum(count_step) steps, strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year, count(DISTINCT user_local.id) as users_count from step_time left join user_local where user_local.id = user_id${storeChoise.current ?  " and key_auth=" + storeChoise.current + ' ' : ' '}group by year, month, day order by year desc, month desc, day desc limit 31;`
          }
         
          tx.executeSql(reqDB, [], (_, { rows }) => {
            let monthObj = JSON.parse(JSON.stringify(rows['_array']))
            
            for(let key of monthObj) {
              dataForChart.unshift({
                x: key['day'] + ' ' + key['month'] + ' ' + key['year'],
                y: parseInt(key['steps']/key['users_count'])
              })
            }
            // console.log(dataForChart, key_auth)
            resolve(dataForChart)
          })
        })
      })
    }

    async function printData(statMem, chartChoose = null, key_auth = null) {
      // reservMonth = "select sum(count_step), strftime('%d', date_time) as day, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time group by month;"
      dataForChart = []
      let dataArrayForChart = null
      let tmpArr = []
      let countUser = null
      const userStatus = await getUserStatus
      // console.log('я проделал долгий путь и попал сюда', key_auth);
      // updateEmploee('1602577396305', 666)
      if (statMem === 'year') {
        // let countYear = await getMinAndCountYear
        dataArrayForChart = await getChartYear(...userStatus, key_auth)
        onSubmit(dataArrayForChart, statMem)
      }
      
      // double refresh
      if (statMem === 'month') {
        console.log('hiii');
        if (chartChoose) {
          let monthChoose = chartChoose.x
            .replace(/"/)
            .split(' ')
            if (monthChoose.length === 4) {
              monthChoose = [monthChoose[2], monthChoose[3]]
            }
            dataArrayForChart = await getChartMonthReserve(...monthChoose, key_auth)
            onSubmit(dataArrayForChart, statMem)

        } else {
          dataArrayForChart = await getChartMonthReserve(null, null, key_auth)
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
    height={200} 
    defaultColumnWidth={dataGraph[0].statMem === 'year' ? 22 : dataGraph[0].statMem === 'day' ? 11.7 : 8.6}
    defaultColumnMargin={dataGraph[0].statMem === 'year' ? 10 : dataGraph[0].statMem === 'day' ? 4 : 3.2}
    onPress={(a) => {
        chartChoose = sampleDataMonth[0]['data'][a]
        savedChartTouch.current = chartChoose
        console.log(chartChoose.x);
        
        Promise.all([origami, changeEmploeeListParameters(chartChoose.x)]).then((r) => {
          const current = r[0]
          const now = r[1]
          console.log(r, 'hi');
          createTemplateEmp = <EmploeeList emploeeMy={570} renderChartForEmploee={renderChartForEmploee} status={dataGraph[0].statMem} userActive={storeChoise.current}/>
          // console.log(r[1](chartChoose.x), 'tot samiy');
          // console.log(`Cначала ${JSON.parse(JSON.parse(current))}, а затем ${JSON.parse(JSON.parse(now))}`)
        })
        origami.then((res) => console.log(res, 'res'))
        // changeEmploeeListParameters(chartChoose.x).then((result) => {
          
          
        //   console.log(result, 'baah')
        // })
       
        // console.log('onPress', chartChoose.x.split(' '))
        // updateEmploee(storeChoise.current, '50')
        // updateEmploeers(storeChoise.current, '50')
        // let basicP = changeEmploeeListParameters()
        // console.log(storeChoise.current, 'leg', 'chartChoose', chartChoose.x)
        // let avram = updateEmploee('1599678906428', 666)
        // console.log(avram, "AVRAM")
        // console.log(setMyIsCo(myIsCo + 1));
        // сделать связь между свечами и пользователями
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
    <EmploeeList emploeeMy={myIsCo} renderChartForEmploee={renderChartForEmploee} status={dataGraph[0].statMem} userActive={storeChoise.current}/>
    {createTemplateEmp}
    
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
