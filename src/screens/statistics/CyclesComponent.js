import React, {useCallback, useState, useEffect, useRef} from 'react'
import {FlatList, StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { getBypassListOfPostInCycle, getCyclesListForUserInBuildingDetail } from '../../store/actions/bypass'
import { msToTime, timeToFormat, countFormat } from '../../utils/msToTime'


export const CyclesComponent = ({setModalVisibleDay, existsComponents, item_id, building_id, period}) => {
    const DATA_CYCLES_LIST_FOR_USER_IN_BUILDING = useSelector(state => state.bypass.listUsersInBuildingDetail)
    
   
    const dispatch = useDispatch()
    const scrollXGallery = new Animated.Value(0)
    const CreateTextComponentWithRatingPost = ({item}) => {
        const createdElements = []
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value)
        }
        for (let cmp of existsComponents.current) {
            let keyByValue = getKeyByValue(item, cmp)
            if (keyByValue) {
                console.log(keyByValue, 'Value rank')
                createdElements.push(<TouchableOpacity onPress={() => {setModalVisibleDay(true); dispatch(getBypassListOfPostInCycle(item.cycle_id, keyByValue))}}>
                <Text style={{...styles.beastAndBad, color: "black"}}>{`${item[keyByValue + '_rank']}`}
                </Text></TouchableOpacity>)
            } else {
                createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
            }
            }  
        return createdElements
    }
    const CreateViewDataComponentPost = ({item, index}) => {
        
        
        const dateBypassEnd = new Date(+item.end_cycle)
        const dateBypassStart = new Date(+item.start_cycle)
        return (<View>
            
            <Text style={styles.beastAndBad}>{index + 1}</Text>
            <Text style={styles.beastAndBad}>{item.avg_rank_cycle}</Text>
            <Text style={styles.beastAndBad}>{countFormat(item.count_bypass)}</Text>
            <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.time_cycle))}</Text>
            <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.time_between_cycle))}</Text>
            <Text style={styles.beastAndBad}>{item.avg_temperature}</Text>
            <Text style={styles.beastAndBad}>{dateBypassStart.getHours() / 10 >= 1 ? dateBypassStart.getHours() : '0' + dateBypassStart.getHours()}:{dateBypassStart.getMinutes() / 10 >= 1? dateBypassStart.getMinutes() : '0' + dateBypassStart.getMinutes()} 
            </Text>
            <Text style={styles.beastAndBad}>{dateBypassEnd.getHours() / 10 >= 1? dateBypassEnd.getHours() : '0' + dateBypassEnd.getHours()}:{dateBypassEnd.getMinutes() / 10 >= 1 ? dateBypassEnd.getMinutes() : '0' + dateBypassEnd.getMinutes()}
            </Text>
            <Text style={styles.beastAndBad}>{item.cleaner}</Text>
            <CreateTextComponentWithRatingPost item={item} />
            </View>)
            
        
        
    }
    
    const onReached = () => {
        dispatch(getCyclesListForUserInBuildingDetail(DATA_CYCLES_LIST_FOR_USER_IN_BUILDING.length, item_id, building_id, period))
    }
    return (
        <FlatList
                                data={DATA_CYCLES_LIST_FOR_USER_IN_BUILDING}
                                keyExtractor={item => item.cycle_id}
                                vertical={false}
                                renderItem={CreateViewDataComponentPost}
                                horizontal
                                pagingEnabled
                                scrollEnabled
                                showsHorizontalScrollIndicator={false}
                                onEndReached={onReached}
                                onEndReachedThreshold={0.20}
                                snapToAlignment="center"
                                scrollEventThrottle={16}
                                decelerationRate={"fast"}
                                initialScrollIndex={0}
                                onScroll={Animated.event(
                                    [{nativeEvent: {contentOffset: {x: scrollXGallery}}}],
                                    { useNativeDriver: false}
                                  )}
                                style={{display: 'flex', flexDirection: 'row', width: '65%'}}
                                
                                />
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
})