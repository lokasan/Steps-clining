import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { ArrowTrand } from '../../components/toolkitComponents/ArrowTrand';
import { clearListUsersStaticWithTbrDetail, getListUsersStaticWithTbrDetail } from '../../store/actions/bypass';
import { msToTime } from '../../utils/msToTime';
import { Post } from './Post';

export const User = ({period, building_id, monthRange, showUserDetailInfoOrUnshow, 
    setModalVisibleDay, flagArrayUsersDetail, setFlagArrayUsersDetail, 
    setMonthRange, choseDateCurrentRef, setModalVisibleRank, 
    bypassKeyByValueRef, bypassPhotoPostIdRef, bypassPhotoEmailRef, DATA_IMAGE_BYPASS_RANK}) => {
    const dispatch = useDispatch()
    const DATA_USERS_TBR = useSelector(state => state.bypass.usersWithTbr)
    const DATA_USERS_TBR_DETAIL = useSelector(state => state.bypass.userWithTbrDetail)
    const [openedUsersInBuildingArray, setOpenedUsersInBuildingArray] = useState([])
    const choiseUser = useRef('')
    useEffect(() => {
        console.log(DATA_USERS_TBR_DETAIL, 'USER COMPONENT STAT DETAIL USE')
      }, [DATA_USERS_TBR_DETAIL])
    
    const ItemUser = ({item, index}) => {

        const updateOpenedUsersInBuilding = () => {
            if (openedUsersInBuildingArray.indexOf(item.id) !== -1) {
                dispatch(clearListUsersStaticWithTbrDetail(DATA_USERS_TBR_DETAIL, item.id))
                setOpenedUsersInBuildingArray(openedUsersInBuildingArray.filter(e => e !== item.id))
                choiseUser.current = null
            } else {
                dispatch(getListUsersStaticWithTbrDetail(period, building_id, item.id))
                setOpenedUsersInBuildingArray([...openedUsersInBuildingArray, item.id])
                choiseUser.current = item.id
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
                        <View 
                        style = {styles.sticker}>
                            <View style = {styles.toolkitPad}>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{item.avg_rank.toFixed(1)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{item.cycle}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{msToTime(item.time_between_bypass)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{item.count_bypass}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{msToTime(item.time_bypass)}</Text>
                                </View>
                                <ArrowTrand item={item}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
                )
    }

    const renderItem = ({item, index}) => {
        return <>
                    <ItemUser item={item} index={index}/>
                    {openedUsersInBuildingArray.indexOf(item.id) !== -1 ? 
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
                    /> : null}
                </>
    }

    return (
        <FlatList
            showsVerticalScrollIndicator = {false}
            data = {DATA_USERS_TBR}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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