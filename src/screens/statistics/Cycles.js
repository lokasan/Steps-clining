import React, {useEffect, useState, useRef, useCallback} from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image, Animated} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import {msToTime, timeToFormat, countFormat} from '../../utils/msToTime';
import {getBypassListOfPostInCycle, getCyclesListForUserInBuildingDetail, getCyclesListForUserInCorpusDetail} from '../../store/actions/bypass'
import { CyclesComponent } from './CyclesComponent';
export const Cycles = ({flagArrayUsersDetail, setFlagArrayUsersDetail, start_time, clearCyclesList, choiseDate, getCyclesList, period, user_id, item_id, DATA_CYCLES_LIST, setModalVisibleDay}) => {
    const DATA_CYCLES_LIST_FOR_USER_IN_BUILDING = useSelector(state => state.bypass.listUsersInBuildingDetail)
    const DATA_CYCLES_LIST_FOR_USER_IN_CORPUS = useSelector(state => state.bypass.listUsersInCorpusDetail)
    const existsComponents = useRef([])
    const POSTS_LIST = useSelector(state => state.post.postAll)
    const dispatch = useDispatch()
    const scrollXGallery = new Animated.Value(0)
    const createTextComponent = useCallback((item, index) => {
        let createdComponent = []
        const uniqueComponent = {}
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
          valueOfKeyComponent.map((el, idx) => createdComponent.push(<Text key={String(idx)} style ={styles.beastAndBad}>{el}</Text>))
           
          existsComponents.current = valueOfKeyComponent
          valueOfKeyComponent = []
        }
        return createdComponent
      })
    const CreateTextComponentWithRatingPost = useCallback(({item}) => {
        const createdElements = []
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value)
        }
        for (let [index, cmp] of existsComponents.current.entries()) {
            let keyByValue = getKeyByValue(item, cmp)
            if (keyByValue) {
                // console.log(keyByValue, 'Value rank')
                createdElements.push(<TouchableOpacity key={String(keyByValue)} onPress={() => {setModalVisibleDay(true); dispatch(getBypassListOfPostInCycle(item.cycle_id, keyByValue))}}>
               <Text style={+item[keyByValue + '_is_image'] ? {...styles.beastAndBad, color: '#e4a010'} : 
                {...styles.beastAndBad, color: "black"}}>{`${item[keyByValue + '_rank']}`}
                </Text></TouchableOpacity>)
            } else {
                createdElements.push(<Text key={String(index)} style = {styles.beastAndBad}>-</Text>)
            }
            }  
        return createdElements
    })
    const CreateViewDataComponentPost = useCallback(({item, index}) => {
        
        
        const dateBypassEnd = new Date(+item.end_cycle)
        const dateBypassStart = new Date(+item.start_cycle)
        return (<View>
            
            <Text style={styles.beastAndBad}>{index + 1}</Text>
            <Text style={styles.beastAndBad}>{item.avg_rank_cycle}</Text>
            <Text style={styles.beastAndBad}>{countFormat(item.count_bypass)}</Text>
            <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.time_cycle))}</Text>
            <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.time_between_cycle))}</Text>
            <Text style={styles.beastAndBad}>{item.avg_temperature}</Text>
            <Text style={styles.beastAndBad}>{ dateBypassStart.getHours() / 10 >= 1 ? dateBypassStart.getHours() : '0' + dateBypassStart.getHours()}:{dateBypassStart.getMinutes() / 10 >= 1? dateBypassStart.getMinutes() : '0' + dateBypassStart.getMinutes()} 
            </Text>
            <Text style={styles.beastAndBad}>{dateBypassEnd.getHours() / 10 >= 1? dateBypassEnd.getHours() : '0' + dateBypassEnd.getHours()}:{dateBypassEnd.getMinutes() / 10 >= 1 ? dateBypassEnd.getMinutes() : '0' + dateBypassEnd.getMinutes()}
            </Text>
            <Text style={styles.beastAndBad}>{item.cleaner}</Text>
            <CreateTextComponentWithRatingPost item={item} />
            </View>)
            
        
        
    })
    const onReached = useCallback(() => {
        dispatch(getCyclesList(DATA_CYCLES_LIST.filter(el => el.user_id == user_id).length, user_id, item_id, period, start_time ? start_time : null))
    })

    const MainWindowWithRanking = () => {
        const data = DATA_CYCLES_LIST.filter(el => el.user_id == user_id)
        return (<FlatList
            data={data}
            keyExtractor={useCallback(item => item?.cycle_id?.toString())}
            
            renderItem={CreateViewDataComponentPost}
            horizontal
            showsHorizontalScrollIndicator={false}
            onEndReached={onReached}
            onEndReachedThreshold={0.20}
            scrollEventThrottle={16}
            
            style={{display: 'flex', flexDirection: 'row', width: '65%'}}
            
            />)
    }
    const ItemPost = () => {
        let textComponent = createTextComponent(DATA_CYCLES_LIST)

        
        return (
            <View style={DATA_CYCLES_LIST.filter(el => el.user_id == user_id).length === 0   ? {display: 'none'} : {...styles.itemUD}}>
                {/* {textCmpt(item.data)} */}
                <View style={styles.wrapperFirstLine}>
                    <View>
                        <View style={styles.wrapperFirstLine}>
                            {choiseDate && 
                            <View>
                                <TouchableOpacity onPress={() => dispatch(clearCyclesList(DATA_CYCLES_LIST, user_id))}>
                                    <Text style={styles.headTitle}>{choiseDate}</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>
                        
                        <View style={styles.wrapperSecondLine}>
                        
                            <View>
                                <Text style={styles.beastAndBad}>Цикл №</Text>
                                <Text style={styles.beastAndBad}>Средний балл</Text>
                                <Text style={styles.beastAndBad}>Кол-во обходов</Text>
                                <Text style={styles.beastAndBad}>Длит. цикла</Text>
                                <Text style={styles.beastAndBad}>Время между цик.</Text>
                                <Text style={styles.beastAndBad}>Температура</Text>
                                <Text style={styles.beastAndBad}>Вр. нач. цик.</Text>
                                <Text style={styles.beastAndBad}>Вр. кон. цик.</Text>
                                <Text style={styles.beastAndBad}>Уборщик</Text>
                                {textComponent}
                            </View>
                            {MainWindowWithRanking()}
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <>
            <ScrollView>
                {ItemPost()}
            </ScrollView>
            
        </>
    )
}

const styles = StyleSheet.create({
    itemUD: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
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
         alignItems   : 'center',
    },
    headTitle: {
        fontSize   : 14,
        paddingLeft: 22,
        paddingTop : 11,
    },
})