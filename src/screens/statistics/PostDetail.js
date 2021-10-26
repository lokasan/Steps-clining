import React, {useState, useRef, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { clearBypassUsersDetail, loadBypassUsersDetail } from '../../store/actions/bypass';
import {msToTime} from '../../utils/msToTime';


export const PostDetail = ({period, monthRange, user, flagArrayUsersDetail, setFlagArrayUsersDetail, 
    setMonthRange, setModalVisibleDay, choseDateCurrentRef}) => {
    const [openedPostDetailInUser, setOpenedPostDetailInUser] = useState([])
    const existsComponents = useRef([])
    const dispatch = useDispatch()
    const DATA_USERS_DETAIL = useSelector(state => state.bypass.bypassUsersListDetail)
    console.log(`PERIOD: ${period} \nMonthRange: ${monthRange}`)
    const CreateTextComponentWithRatingPostDetail = ({item}) => {
        const createdElements = []
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        for (let cmp of existsComponents.current) {
            let keyByValue = getKeyByValue(item, cmp)
            if (keyByValue) {
              // console.log(item.is_image)
              createdElements.push(
                <Text style={styles.beastAndBad}>{item[keyByValue + '_rank']}
                </Text>)
            } else {
              createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
            }
          }  
        return createdElements
    }
    
    const CreateViewDataComponentPostDetail = ({item}) => {
        
        function getFilledArray (arr) {

            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < item.data.length; j++) {
  
                  if (arr[i].date === item.data[j].date) {
                    arr[i] = item.data[j]
                      break
                  }
              }
            }
            return JSON.parse(JSON.stringify(arr))
          }
  
          let createViewData = []
  
          if (item?.data?.length !== 0) {
            // console.log(item.data, 'FINAL RES')
            const fullFillArray = []
            if (period === 'week' || period === 'month') {
              for (let i = period === 'week' ? 7 : period === 'month' ? 31 : 0; i >= 0; i--) {
                currentDate = new Date(new Date().setDate(new Date().getDate() - i))
                fullFillArray.push({date: 
                  currentDate.getFullYear() + '-' + 
                  ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                  (currentDate.getMonth() + 1) : 
                  '0' + (currentDate.getMonth() + 1)) + '-' +
                  (currentDate.getDate() / 10 >= 1 ? currentDate.getDate()  : '0' + currentDate.getDate() )
                })
              }
              
              item.data = getFilledArray(fullFillArray)
              console.log(item.data, 'REKET')
            }
            if (monthRange === 'month_range') {
  
              for (let i = 31; i >= 0; i--) {
                currentDate = new Date(new Date(...choseDateCurrentRef.current)
                              .setDate(new Date(...choseDateCurrentRef.current).getDate() - i))
                              
                console.log(currentDate)
                console.log(choseDateCurrentRef)
                fullFillArray.push({date: 
                  currentDate.getFullYear() + '-' + 
                  ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                  (currentDate.getMonth() + 1) : 
                  '0' + (currentDate.getMonth() + 1)) + '-' +
                  (currentDate.getDate() / 10 >= 1 ? currentDate.getDate()  : '0' + currentDate.getDate() )
                })
              }
              
              item.data = getFilledArray(fullFillArray)
            }
            if (period === 'year' && monthRange === 'year') {
              for (let i = 12; i >= 0; i--) {
                currentDate = new Date(new Date().setMonth(new Date().getMonth() - i))
                
                fullFillArray.push({date: String(currentDate.getFullYear()).slice(2) + '-' 
                + ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                (currentDate.getMonth() + 1) : 
                '0' + (currentDate.getMonth() + 1))})
              }
              
              item.data = getFilledArray(fullFillArray)
            }
            console.log(item.data, 'REKET')
            for (let el in item.data) {
              
                let [year, month, day] = item.data[el].date.split('-')
  
                createViewData.push(<View>
                  <TouchableOpacity 
                    disabled={!item.data[el].email ? true : false}
                    onPress={() => {
                      if (period === 'year' && monthRange === 'year') {
                        choseDateCurrentRef.current = [year.length === 2 ? 20 + year : year, +month]
                        console.log(choseDateCurrentRef.current, 'SET CHOSE DATE CURRENT')
                        setMonthRange('month_range')
                        dispatch(loadBypassUsersDetail(
                          'month_range', item.data[el].email, item.data[el].post_name, 
                        new Date(year.length === 2 ? 20 + year : year, +month - 1).getTime()))
                      } else {
                        dispatch(loadBypassUsersDetail(period === 'year' && monthRange === 'year' ? 'month' : 'day', item.data[el].email, item.data[el].post_name, 
                        new Date(year.length === 2 ? 20 + year : year, +month - 1, day ? +day : 1).getTime()))
                      }
                      
                      if (period !== 'year' || monthRange === 'month_range') {
                        // if (monthRange === 'month_range') {
  
                        // }
                        setModalVisibleDay(true)
                      }
                      
                    }}
                  >
                    <Text 
                      style={styles.beastAndBad}>
                        {item.data[el].date.split('-').reverse().join('.').slice(0, 5)}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.beastAndBad}>{item.data[el].temperature}</Text>
                  <Text style={styles.beastAndBad}>{item.data[el].avg_rank}</Text>
                  <Text style={styles.beastAndBad}>{item.data[el].count_bypass}</Text>
                  <Text style={styles.beastAndBad}>{msToTime(item.data[el].time_bypass)}</Text>
                  <Text style={styles.beastAndBad}>{msToTime(item.data[el].time_bbb)}</Text>
                  <Text style={styles.beastAndBad}>{item.data[el].cleaner}</Text>
                  <CreateTextComponentWithRatingPostDetail item={item?.data[el]}/>
                </View>)
              
              
            }
          }
          return createViewData
    }

    const createTextComponent = (item, index) => {
        let createdComponent = []
        const uniqueComponent = {}
        let valueOfKeyComponent = []
        if (item?.data?.length !== 0) {
        item.data.map(el => {
            Object.keys(el).map(key => {
                if (!isNaN(Number(key))) {
                    if (!uniqueComponent.hasOwnProperty(key)) {
                        uniqueComponent[key] = el[key]
                    }
                }
            })
        })
            
          valueOfKeyComponent.push(...Object.values(uniqueComponent))
          valueOfKeyComponent.map(el => createdComponent.push(<Text style ={styles.beastAndBad}>{el}</Text>))
           
          existsComponents.current = valueOfKeyComponent
          valueOfKeyComponent = []
        }
        return {textComponent: createdComponent, existsComponents}
      }


    const renderItem = ({item, index}) => {
        let textComponent = createTextComponent(item).textComponent

        const weekMonthBeforeTemplate = (() => {
            return [
              <Text style={styles.beastAndBad}>Дата</Text>,
              <Text style={styles.beastAndBad}>Температура</Text>,
              <Text style={styles.beastAndBad}>Средний балл</Text>,
              <Text style={styles.beastAndBad}>Кол-во обходов</Text>,
              <Text style={styles.beastAndBad}>Время обходов</Text>,
              <Text style={styles.beastAndBad}>Время между обх.</Text>,
              <Text style={styles.beastAndBad}>Уборщик</Text>
            ]
          })()

        return (
            <View style={styles.itemUD}>
                <View style={styles.wrapperFirstLine}>
                    <View>
                        <View style={styles.wrapperFirstLine}>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (monthRange === 'month_range') {
                                            dispatch(loadBypassUsersDetail('year', item?.data[0]?.email, item?.data[0]?.post_name))
                                            setMonthRange('year')
                                        } else {
                                            setFlagArrayUsersDetail(flagArrayUsersDetail
                                                .filter(el => !(el.email == item?.data[0]?.email &&
                                                    el.post === item?.data[0].post_name)))
                                        }
                                        dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, item?.data[0]?.email, item?.data[0]?.post_name))
                                    }}>
                                    <Text style={styles.headTitle}>{period !== 'today' ? 
                                    item?.data[0]?.post_name : item?.data[0].title}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.wrapperSecondLine}>
                            <View>
                                {weekMonthBeforeTemplate}
                                {textComponent}
                            </View>
                            <ScrollView
                                vertical={false}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{display: 'flex', flexDirection: 'row', width: '68%'}}>
                                <CreateViewDataComponentPostDetail item={JSON.parse(JSON.stringify(item))}/>
                            </ScrollView>
                            <Image
                                style={{...styles.beastAndBad, heigth: 32, width: 20}}
                                source={item.data?.length !== 0 ? 
                                    {uri: `http://openweathermap.org/img/wn/${item.data[0].icon}@2x.png`} : null}/>
                        </View>
                    </View>
                    <View 
                      style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}> 
                    </View>
                </View>
            </View>
        )
    }

    return (
        <FlatList
        data={[{id: String(Date.now()), 
            data: DATA_USERS_DETAIL
            .filter(el => user
                .filter(elD => el.email === elD.email && el.post_name === elD.post_name).length ? true : false)}]}
        renderItem={renderItem}
        keyExtractor={item => item.id}>

        </FlatList>
    )
    
}

const styles = StyleSheet.create({
    itemUD: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
        // flexGrow: 0,
        marginHorizontal: '5%',
        marginVertical  : 5,
        borderRadius    : 15,
        shadowColor     : "#000000",
        shadowOffset    : {
          width : 0,
          height: 6,
        },
         shadowOpacity: 0.30,
         shadowRadius : 4.65,
      },
      beastAndBad: {
        fontSize   : 10,
        paddingLeft: 22,
        paddingTop : 11,
        fontFamily: 'open-bold'
    },
    wrapperFirstLine: {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    wrapperSecondLine: {
         flexDirection: 'row',
         alignItems   : 'center'
    },
    headTitle: {
        fontSize   : 14,
        paddingLeft: 22,
        paddingTop : 11,
    }
})