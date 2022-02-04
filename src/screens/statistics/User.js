import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { ArrowTrand } from '../../components/toolkitComponents/ArrowTrand';
import { clearListUsersStaticWithTbrCorpusDetail, clearListUsersStaticWithTbrDetail, getListUsersStaticWithTbrCorpusDetail, getListUsersStaticWithTbrDetail, getCyclesListForUserInBuildingDetail, clearCyclesListForUserInBuildingDetail, clearCyclesListForUserInCorpusDetail, getCyclesListForUserInCorpusDetail } from '../../store/actions/bypass';
import { loadPostForCorpus } from '../../store/actions/post';

import { msToTime, timeToFormat, countFormat } from '../../utils/msToTime';
import { Cycles } from './Cycles';
import { Post } from './Post';

export const User = ({period, corpus_id, building_id, monthRange, showUserDetailInfoOrUnshow, 
    setModalVisibleDay, flagArrayUsersDetail, setFlagArrayUsersDetail, 
    setMonthRange, choseDateCurrentRef, setModalVisibleRank, 
    bypassKeyByValueRef, bypassPhotoPostIdRef, bypassPhotoEmailRef, DATA_IMAGE_BYPASS_RANK}) => {
    const dispatch = useDispatch()
    const DATA_USERS_TBR = useSelector(state => state.bypass.usersWithTbr)
    const DATA_USERS_TBR_DETAIL = useSelector(state => state.bypass.userWithTbrDetail)
    
    const DATA_USERS_TBR_CORPUS = useSelector(state => state.bypass.userWithTbrCorpus)
    const DATA_USERS_TBR_CORPUS_DETAIL = useSelector(state => state.bypass.userWithTbrCorpusDetail)
    const DATA_CYCLES_LIST_FOR_USER_IN_BUILDING = useSelector(state => state.bypass.listUsersInBuildingDetail)
    const DATA_CYCLES_LIST_FOR_USER_IN_CORPUS = useSelector(state => state.bypass.listUsersInCorpusDetail)
    // console.log(DATA_CYCLES_LIST_FOR_USER_IN_BUILDING, 'cycles list for user in building')
    const [openedUsersInBuildingArray, setOpenedUsersInBuildingArray] = useState([])
    const [openedCyclesInUsers, setOpenedCyclesInUsers] = useState([])
    const choiseUser = useRef('')
    const choiseUserCycle = useRef('')
    const DATA_CYCLES_LIST = useRef()
    const itemIdRef = useRef()
    // useEffect(() => {
    //     console.log(DATA_USERS_TBR_DETAIL, 'USER COMPONENT STAT DETAIL USE')
    //   }, [DATA_USERS_TBR_DETAIL])
    
    const ItemUser = ({item, index}) => {
        const clearWindowWithListOfPostInCorpusForUser = () => {
            dispatch(clearListUsersStaticWithTbrCorpusDetail(DATA_USERS_TBR_CORPUS_DETAIL, item.id))
            setOpenedUsersInBuildingArray(openedUsersInBuildingArray.filter(e => e !== item.id))
            choiseUser.current = null
        }
        const clearWindowWithListOfCyclesInCorpusForUser = () => {
            dispatch(clearCyclesListForUserInCorpusDetail(DATA_CYCLES_LIST_FOR_USER_IN_CORPUS, item?.id))
            setOpenedCyclesInUsers(openedCyclesInUsers.filter(e => e !== item.id))
            choiseUserCycle.current = null
        }
        const getWindowWithListOfCyclesInCorpusForUser = () => {
            dispatch(getCyclesListForUserInCorpusDetail(offset=0, item?.id, corpus_id, period))
            setOpenedCyclesInUsers([...openedCyclesInUsers, item.id])
            DATA_CYCLES_LIST.current = DATA_CYCLES_LIST_FOR_USER_IN_CORPUS
            itemIdRef.current = corpus_id
            choiseUserCycle.current = item.id
        }
        const getWindowWithListOfPostInCorpusForUser = () => {
            dispatch(getListUsersStaticWithTbrCorpusDetail(period, corpus_id, item.id))
            setOpenedUsersInBuildingArray([...openedUsersInBuildingArray, item.id])
            choiseUser.current = item.id
        }
        const getWindowWithListOfPostListInBuildingForUser = () => {
            dispatch(getListUsersStaticWithTbrDetail(period, building_id, item.id))
            setOpenedUsersInBuildingArray([...openedUsersInBuildingArray, item.id])
            choiseUser.current = item.id
        }
        const getWindowWithListOfCyclesInBuildingForUser = () => {
            dispatch(getCyclesListForUserInBuildingDetail(offset=0, item?.id, building_id, period))
            setOpenedCyclesInUsers([...openedCyclesInUsers, item.id])
            choiseUserCycle.current = item.id
            DATA_CYCLES_LIST.current = DATA_CYCLES_LIST_FOR_USER_IN_BUILDING
            itemIdRef.current = building_id
        }
        const clearWindowWithListOfPostInBuildingForUser = () => {
            dispatch(clearListUsersStaticWithTbrDetail(DATA_USERS_TBR_DETAIL, item.id))
            setOpenedUsersInBuildingArray(openedUsersInBuildingArray.filter(e => e !== item.id))
            choiseUser.current = null
        }
        const clearWindowWithListOfCyclesInBuildingForUser = () => {
            dispatch(clearCyclesListForUserInBuildingDetail(DATA_CYCLES_LIST_FOR_USER_IN_BUILDING, item.id))
            setOpenedCyclesInUsers(openedCyclesInUsers.filter(e => e !== item.id))
            choiseUserCycle.current = null
        }

        const updateOpenedUsersInBuilding = () => {
            if (~openedUsersInBuildingArray.indexOf(item.id) && !corpus_id) {
                clearWindowWithListOfPostInBuildingForUser()

            } else if (!~openedUsersInBuildingArray.indexOf(item.id) && !corpus_id) {
                clearWindowWithListOfCyclesInBuildingForUser()
                getWindowWithListOfPostListInBuildingForUser()
                

            } else if (~openedUsersInBuildingArray.indexOf(item.id) && corpus_id) {
                clearWindowWithListOfPostInCorpusForUser()

            } else if (!~openedUsersInBuildingArray.indexOf(item.id) && corpus_id) {
                clearWindowWithListOfCyclesInCorpusForUser()
                getWindowWithListOfPostInCorpusForUser()
                
            }
        }
        
        const updateOpenedCyclesInUser = () => {
            if (~openedCyclesInUsers.indexOf(item.id) && !corpus_id) {
                clearWindowWithListOfCyclesInBuildingForUser()
                
            } else if (!~openedCyclesInUsers.indexOf(item.id) && !corpus_id) {
                clearWindowWithListOfPostInBuildingForUser()
                getWindowWithListOfCyclesInBuildingForUser()
                
            } else if (~openedCyclesInUsers.indexOf(item.id) && corpus_id) {
                clearWindowWithListOfCyclesInCorpusForUser()

            } else if (!~openedCyclesInUsers.indexOf(item.id) && corpus_id) {
                clearWindowWithListOfPostInCorpusForUser()
                getWindowWithListOfCyclesInCorpusForUser()
            }
        }

        return (
        <TouchableOpacity onPress={updateOpenedUsersInBuilding}>
            <View style={styles.item}
            // added functionality for viewed element
            >
                <View style={styles.wrapperFirstLine}>
                    <View>
                        <View style={styles.wrapperFirstLine}>
                            <View>
                                <Text style={styles.headTitle}>
                                    {`${item.surname} ${item.first_name.slice(0, 1)}. ${item.lastname.slice(0, 1)}.`}
                                </Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '50%'}}>
                    <TouchableOpacity onPress={updateOpenedCyclesInUser}>
                        <View 
                        style = {styles.sticker}>
                            <View style = {styles.toolkitPad}>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{item.avg_rank.toFixed(1)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{countFormat(item.cycle)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{timeToFormat(msToTime(item.time_between_bypass))}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{countFormat(item.count_bypass)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{timeToFormat(msToTime(item.time_bypass))}</Text>
                                </View>
                                <ArrowTrand item={item}/>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </TouchableOpacity>
                )
    }

    const renderItem = ({item, index}) => {
        return <>
                    <ItemUser item={item} index={index}/>
                    {~openedUsersInBuildingArray.indexOf(item.id) ? 
                    <Post 
                    user_id={item.id}
                    period={period}
                    monthRange={monthRange}
                    showUserDetailInfoOrUnshow={showUserDetailInfoOrUnshow}
                    setModalVisibleDay={setModalVisibleDay}
                    flagArrayUsersDetail={flagArrayUsersDetail}
                    setFlagArrayUsersDetail={setFlagArrayUsersDetail}
                    setMonthRange={setMonthRange}
                    choseDateCurrentRef={choseDateCurrentRef}
                    setModalVisibleRank={setModalVisibleRank}
                    bypassKeyByValueRef={bypassKeyByValueRef}
                    bypassPhotoPostIdRef={bypassPhotoPostIdRef}
                    bypassPhotoEmailRef={bypassPhotoEmailRef}
                    DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK}
                    /> : ~openedCyclesInUsers.indexOf(item.id) ? 
                    <Cycles 
                    period={period} 
                    user_id={item.id} 
                    item_id={itemIdRef.current} 
                    flagArrayUsersDetail={flagArrayUsersDetail}
                    getCyclesList={corpus_id ? getCyclesListForUserInCorpusDetail : getCyclesListForUserInBuildingDetail}
                    DATA_CYCLES_LIST={corpus_id ? DATA_CYCLES_LIST_FOR_USER_IN_CORPUS : DATA_CYCLES_LIST_FOR_USER_IN_BUILDING} setModalVisibleDay={setModalVisibleDay}/> : null}
                </>
    }

    return (
        <FlatList
            showsVerticalScrollIndicator = {false}
            data = {DATA_USERS_TBR.length ? DATA_USERS_TBR : DATA_USERS_TBR_CORPUS}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            listKey={String(Date.now())}  
        >
            
        </FlatList>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
        // flexGrow: 0,
        marginHorizontal: '5%',
        marginVertical  : 5,
        height          : 30,
        borderRadius    : 15,
        shadowColor     : "#000000",
        shadowOffset    : {
          width : 0,
          height: 6,
        },
         shadowOpacity: 0.30,
         shadowRadius : 4.65,
    },
    wrapperFirstLine: {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    headTitle: {
        fontSize   : 14,
        paddingLeft: 22,
        paddingTop : 11,
    },
    sticker: {
        borderTopLeftRadius   : 0,
        borderTopRightRadius  : 15,
        shadowColor           : "#000000",
        height: '100%', 
        backgroundColor: 'black', 
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 15, 
        shadowOffset : 
        {
        width : 0,
        height: 0,
        }, 
        shadowRadius: 0,
        elevation: 0
    },
    toolkitPad: {
        paddingTop    : 10,
        paddingLeft   : 10,
        paddingRight  : 10,
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    alignElementsCenter: {
        alignItems: 'center',
    },
    textStyleInToolkit: {
        color     : '#ffffff',
        fontSize  : 10,
        paddingTop: 0,
    }

})