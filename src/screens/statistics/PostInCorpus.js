import React, {useCallback, useState} from 'react';
import {View, FlatList, Text, Animated, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import { ArrowTrand } from '../../components/toolkitComponents/ArrowTrand';
import { clearBypassUsersAverage, getListUsersAverageForPost, loadBypassBuildingForCorpus } from '../../store/actions/bypass';
import { Employee } from './Employee';

export const PostInCorpus = ({choisePostS, flagArrayUsersDetail, 
    showUserDetailInfoOrUnshow, setModalVisibleRank, DATA_IMAGE_BYPASS_RANK, 
    bypassKeyByValueRef, bypassPhotoPostIdRef, bypassPhotoEmailRef, flagArrayPosts, 
    setFlagArrayPosts, choisePost, period, corpusId, setModalVisible, choseDateCurrentRef, setModalVisibleDay,
    monthRange, setMonthRange, setFlagArrayUsersDetail}) => {
    const keyExtractors = useCallback(item => item.id)
    const DATA_POSTS = useSelector(state => state.bypass.bypassPostsList)
    const loaderIcon = useSelector(state => state.bypass.loaderIcon)
    const USERS_AVERAGE_STAT = useSelector(state => state.bypass.usersAverageStat)
    const dispatch = useDispatch()
    const [isRefreshing, setIsRefreshing] = useState(false)
    function onRefresh() {
        setIsRefreshing(true)
        dispatch(loadBypassBuildingForCorpus(period, corpusId))
        setIsRefreshing(false)
      }

    const ItemPostsInner = ({item, index}) => {

    const updateElement = useCallback(() => {
        if (~flagArrayPosts.indexOf(item.title)) {
        // dispatch(loadBypassUsers(period, 'tropic'))
        // dispatch(clearBypassUsers(DATA_USERS, item.title))
        dispatch(clearBypassUsersAverage(USERS_AVERAGE_STAT, item.title))
        setFlagArrayPosts(flagArrayPosts.filter(e => e !== item.title))
        choisePost.current = null
        }
        else {
        // dispatch(loadBypassUsers(period, item.title))
        dispatch(getListUsersAverageForPost(period, null, null, item.title))
        setFlagArrayPosts([...flagArrayPosts, item.title])
        choisePost.current = item.title
        }
        
        }, [])
    
        return (
        <TouchableOpacity onPress={useCallback(updateElement, [])}>
            <Animated.View style = { 
            choisePost.current === item.title && loaderIcon ? 
            {opacity: 0.2, ...styles.item,  height: 30} : 
            {...styles.item, height: 30}}>
                <View style = {{...styles.wrapperFirstLine}}>
                <View>
                    <View style = {styles.wrapperFirstLine}>
                        <View>
                            <Text style = {styles.headTitle}>{item?.title?.substr(0, 19)}</Text>
                        </View>
                    </View>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '50%'}}>
                <View style = {styles.sticker}>
                <View style = {styles.toolkitPad}>
                    <View style = {styles.alignElementsCenter}>
                        <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.avgRanks.toFixed(1)}</Text>
                    </View>
                    <View style = {styles.alignElementsCenter}>
                        <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.countBypass}</Text>
                    </View>
                    <View style = {styles.alignElementsCenter}>
                        <Text style = {{...styles.textStyleInToolkit, paddingTop: 0}}>{item.countTime}</Text>
                    </View>
                    <ArrowTrand item={item}/>
                </View>
                </View>
                </View>
                {  choisePost.current === item.title &&  loaderIcon ? 
                <View 
                style={styles.loaderIcon}>
                <ActivityIndicator color  = "#0000ff"/>
                </View> : null}
                </View>
                
            </Animated.View>
        </TouchableOpacity>
        )
    }
    const renderItemPosts = useCallback(({ item, index }) => {
        return <><ItemPostsInner item = {item} index = {index}/>
        { ~flagArrayPosts.indexOf(item.title) ? 
        <Employee
            DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK}
            post_name={item.title}
            bypassKeyByValueRef={bypassKeyByValueRef}
            bypassPhotoPostIdRef={bypassPhotoPostIdRef}
            bypassPhotoEmailRef={bypassPhotoEmailRef}
            period={period}
            setModalVisibleRank={setModalVisibleRank}
            setModalVisible={setModalVisible}
            setModalVisibleDay={setModalVisibleDay}
            showUserDetailInfoOrUnshow={showUserDetailInfoOrUnshow}
            flagArrayUsersDetail={flagArrayUsersDetail}
            setFlagArrayUsersDetail={setFlagArrayUsersDetail}
            monthRange={monthRange}
            setMonthRange={setMonthRange}
            choseDateCurrentRef={choseDateCurrentRef}
            choisePostS={choisePostS}/> :
        null}
        </>
        
    })

    return (

        <Animated.FlatList 
        showsVerticalScrollIndicator = {false}
        data = {DATA_POSTS} renderItem={renderItemPosts}
        keyExtractor={keyExtractors} 
        listKey={String(Date.now())}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        />
    )
       
}

const styles = StyleSheet.create({
    loaderIcon: {
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        height: 100,
        opacity: 1
    },
    sticker: {
        borderTopLeftRadius   : 0,
        borderTopRightRadius  : 15,
        shadowColor           : "#000000",
        shadowOpacity: 0.30,
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
    item: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
        marginHorizontal: '5%',
        marginVertical  : 5,
        height          : 100,
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
    alignElementsCenter: {
        alignItems: 'center',
        
    },
    textStyleInToolkit: {
    color     : '#ffffff',
    fontSize  : 10,
    paddingTop: 10,
    },
})

