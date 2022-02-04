import React, { useCallback, useRef } from 'react';
import {View, Text, FlatList, StyleSheet, Animated, TouchableOpacity, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { clearBypassUsersDetail, loadBypassUsersDetail } from '../../store/actions/bypass';
import { showLoaderBypassRank } from '../../store/actions/bypassRank';
import { UploadDataToServer } from '../../uploadDataToServer';
import { countFormat, msToTime, timeToFormat } from '../../utils/msToTime';

export const EmployeeDetail = ({DATA_IMAGE_BYPASS_RANK, period, monthRange, setMonthRange,
                                flagArrayUsersDetail, setFlagArrayUsersDetail, setModalVisible, 
                                setModalVisibleDay, choisePostS, user, choseDateCurrentRef}) => {
    const dispatch = useDispatch()
    const DATA_USERS_DETAIL = useSelector(state => state.bypass.bypassUsersListDetail)
    const loaderIcon = useSelector(state => state.bypass.loaderIcon)
    const getArrayCompareUserDetailCallback = useCallback(getArrayCompareUserDetail)
    const compareUserDetail = getArrayCompareUserDetailCallback(useSelector(state => state.bypass.bypassUsersListDetail)
    .filter(el => user
      .filter(elD => el.email === elD.email && el.post_name === elD.post_name).length ? true : false))
    const existsComponents = useRef([])
    const CreateTextComponentWithRating = useCallback(({item}) => {
        let createdElements = []
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
            for (let cmp of existsComponents.current) {
            let keyByValue = getKeyByValue(item, cmp)
            if (keyByValue) {
                // console.log(item.is_image)
                createdElements.push(<TouchableOpacity 
                style={item[keyByValue + '_is_image'] ? {...styles.beastAndBad} : styles.beastAndBad }
                onLongPress={() => alertStatus(item[keyByValue + '_name_c_r'])}
                onPress={() => {
                // console.log(keyByValue)
                if (item[keyByValue + '_is_image']) {
                    bypassKeyByValueRef.current = item[keyByValue + '_bypass_rank_id']
                    dispatch(showLoaderBypassRank())
                    UploadDataToServer.getBypassPhotoCount(item[keyByValue + '_bypass_rank_id'])

                    UploadDataToServer.getBypassPhoto(item[keyByValue + '_bypass_rank_id'], DATA_IMAGE_BYPASS_RANK.length)
                    setModalVisible(true)
                }
                }}>
                
                <Text 
                style={
                    item[keyByValue + '_is_image'] ? 
                    {fontSize: 10, fontFamily: 'open-bold', color: '#e4a010'} : 
                    {fontSize: 10, fontFamily: 'open-bold'}}>{item[keyByValue + '_rank']}
                </Text>
                
                </TouchableOpacity>)
            } else {
                createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
            }
            }  
        return createdElements;
    })

    const DisplayDateForPeriod = React.memo(({item}) => {
        let [year, month, day] = item?.date.split('-')
        return (
            [<TouchableOpacity 
            disabled={!item?.email ? true : false}
            onPress={() => {
                if (period === 'year' && monthRange === 'year') {
                choseDateCurrentRef.current = [year.length === 2 ? 20 + year : year, +month]
                // console.log(choseDateCurrentRef.current, 'SET CHOSE DATE CURRENT')
                setMonthRange('month_range')
                dispatch(loadBypassUsersDetail(
                    'month_range', item?.email, item?.post_name, 
                new Date(year.length === 2 ? 20 + year : year, +month - 1).getTime()))
                } else {
                dispatch(loadBypassUsersDetail(period === 'year' && monthRange === 'year' ? 'month' : 'day', item?.email, item?.post_name, 
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
                {item?.date.split('-').reverse().join('.').slice(0, 5)}
            </Text>
            </TouchableOpacity>]
        )
        })

    function getArrayCompareUserDetail(item) {

        function getFilledArray(arr) {

            for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < item.length; j++) {

                if (arr[i].date === item[j].date) {
                    arr[i] = item[j]
                    break
                }
            }
            }
            return JSON.parse(JSON.stringify(arr))
        }

        let currentDate = ''
        if (item?.length !== 0) {
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
            
            item = getFilledArray(fullFillArray)
            // console.log(item.data, 'REKET')
            }
            if (monthRange === 'month_range') {

            for (let i = 31; i >= 0; i--) {
                currentDate = new Date(new Date(...choseDateCurrentRef.current)
                            .setDate(new Date(...choseDateCurrentRef.current).getDate() - i))
                fullFillArray.push({date: 
                currentDate.getFullYear() + '-' + 
                ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                (currentDate.getMonth() + 1) : 
                '0' + (currentDate.getMonth() + 1)) + '-' +
                (currentDate.getDate() / 10 >= 1 ? currentDate.getDate()  : '0' + currentDate.getDate() )
                })
            }
            
            item = getFilledArray(fullFillArray)
            }
            if (period === 'year' && monthRange === 'year') {
            for (let i = 12; i >= 0; i--) {
                let currentDate = new Date(new Date().getFullYear(), new Date().getMonth() - i)
                // console.log(currentDate, 'TEST My DATE', `[${i}]`)
                fullFillArray.push({date: String(currentDate.getFullYear()).slice(2) + '-' 
                + ((currentDate.getMonth() + 1) / 10 >= 1 ? 
                (currentDate.getMonth() + 1) : 
                '0' + (currentDate.getMonth() + 1))})
            }
            
            item = getFilledArray(fullFillArray)
            }
            
        }
        return item
    }

    const CreateViewDataComponentUserDetail = useCallback(({item}) => {
        return (<View>
            <DisplayDateForPeriod item={item}/>
            <Text style={styles.beastAndBad}>{item?.temperature}</Text>
            <Text style={styles.beastAndBad}>{item?.avg_rank}</Text>
            <Text style={styles.beastAndBad}>{countFormat(item?.count_bypass)}</Text>
            <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item?.time_bypass))}</Text>
            <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item?.time_bbb))}</Text>
            <Text style={styles.beastAndBad}>{item?.cleaner}</Text>
            <CreateTextComponentWithRating item={item}/>
        </View>)
    })
    
    const createTextComponent = (item, index) => {
        let createdComponent = []
        let uniqueComponent = {}
        let valueOfKeyComponent = []
        if (item?.length !== 0) {
            item.map(el => {
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
        return createdComponent
    }

    

    const MainWindowWithRanking = () => {
        return (
            <FlatList
                data={compareUserDetail}
                keyExtracor={useCallback(item => item?.date?.toString())}
                renderItem={CreateViewDataComponentUserDetail}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{display: 'flex', flexDirection: 'row', width: '68%'}}
            />
        )
    }
    const ItemUsersDetails = () => {
        // const randomColour = () => '#'+(Math.random()*0xFFFFFF<<0).toString(16);

        
        const dataUserDetail = DATA_USERS_DETAIL
        .filter(el => user
            .filter(elD => el.email === elD.email && el.post_name === elD.post_name).length ? true : false)
        const textComponent = createTextComponent(dataUserDetail)
        const comparePosts = choisePostS.current?.email === dataUserDetail[0]?.email && 
        choisePostS.current?.post === dataUserDetail[0]?.post_name
       
          return (
            <Animated.View style = {  comparePosts && loaderIcon ? {display: 'none'} : {...styles.itemUD}}>
              <View style = {{...styles.wrapperFirstLine}}>
                <View> 
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                          <TouchableOpacity 
                            onPress={() => {
                              if (monthRange === 'month_range') {
                                dispatch(loadBypassUsersDetail('year', dataUserDetail[0]?.email, 
                                dataUserDetail[0]?.post_name))
                                setMonthRange('year')
                              } else {
                                setFlagArrayUsersDetail(flagArrayUsersDetail
                                  .filter(el => !(el.email === dataUserDetail[0]?.email && 
                                    el.post === dataUserDetail[0]?.post_name)))
                              }
                              
                              dispatch(clearBypassUsersDetail(DATA_USERS_DETAIL, 
                                dataUserDetail[0]?.email, dataUserDetail[0]?.post_name))}}>
                            <Text 
                              style = {styles.headTitle}>{period === 'today' ? 
                              dataUserDetail[0]?.post_name : dataUserDetail[0]?.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {styles.wrapperSecondLine}>
                      <View>
                      <Text style={styles.beastAndBad}>Дата</Text>
                      <Text style={styles.beastAndBad}>Температура</Text>
                      <Text style={styles.beastAndBad}>Средний балл</Text>
                      <Text style={styles.beastAndBad}>Кол-во обходов</Text>
                      <Text style={styles.beastAndBad}>Время обходов</Text>
                      <Text style={styles.beastAndBad}>Время между обх.</Text>
                      <Text style={styles.beastAndBad}>Уборщик</Text>
                        {textComponent}
                      </View>
                      {MainWindowWithRanking()}
                    </View>
                </View>
                <View 
                  style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}> 
                </View>
              </View>
            </Animated.View>
          ) 
          
    }

    return (
            <ScrollView>
                {ItemUsersDetails()}
            </ScrollView>
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