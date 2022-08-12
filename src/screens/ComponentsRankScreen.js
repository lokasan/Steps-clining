import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Dimensions, FlatList, ActivityIndicator} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { Extrapolate } from 'react-native-reanimated'
import {useDispatch, useSelector} from 'react-redux'
import { loadComponentRank } from '../store/actions/componentRank'
import { ComponentsRankBypassCard } from '../components/ComponentRankBypassCard'
import { AppLoader } from '../components/ui/AppLoader'
import { hideLoaderBypassRank, showLoaderBypassRank } from '../store/actions/bypassRank'
import * as SQLite from 'expo-sqlite'
const  db                         = SQLite.openDatabase('dbas.db')
export const ComponentsRankScreen = ({route, navigation }) => {
    
    dispatch = useDispatch()
    useEffect(() => {
        
        dispatch(loadComponentRank(componentId))
        
        
    }, [dispatch])
    
    //// остановился тут
    const target            = route.params.target
    const createdBypassRank = useSelector(state => state.bypassRank.bypassRankId)
    const component         = route.params.item
    // console.log(createdBypassRank, 'СОЗДАННЫЙ РАНК')
    const {bypassId}       = useSelector(state => state.bypass.bypassNumber)
    const {post}           = route.params
    const bypassDispatch = route.params.dispatch
    // const bypassRankId = navigation.getParam('startedBypassRank')
    const componentSingle    = route.params.item
    const componentsValid    = route.params.componentsValid
    const setModalVisibleCompleteCycle = route.params.setModalVisibleCompleteCycle
    const startedBypassRanks = useSelector(state => state.bypassRank.bypassRankIsStarted)
    const loading            = useSelector(state => state.bypassRank.loading)
    // console.log(loading, 'загрузка')
    if (loading) {
        return <AppLoader/>
    }
    // console.log(startedBypassRanks, 'STATE RANK2')
    const bypassRank       = startedBypassRanks.filter(e => e.component_id === componentSingle.id)
    const bypassRankId     = bypassRank.length ? bypassRank[0].id : null
    const componentId      = component.id
    const componentRankAll = useSelector(state => state.componentRank.componentRankAll)
    const loader = useSelector(state => state.componentRank.loading)
    // console.log(componentRankAll, 'Component Rank all my is component')
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
    const y                = new Animated.Value(0)
    const onScroll         = Animated.event([{ nativeEvent: { contentOffset: { y } }}], { useNativeDriver: true })
   
    return <View style = {{flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}>
       
                {loader ? <ActivityIndicator size="large" color="#0000ff"/> : <View style = {[styles.container, styles.centers]}>
                    <AnimatedFlatList 
                    scrollEventThrottle          = {16}
                    vertical                     = {true}
                    showsVerticalScrollIndicator = {false}
                    bounces                      = {false}
                    data                         = {componentRankAll}
                    renderItem                   = {({ index, item: item }) => (
                    <ComponentsRankBypassCard {...{ index, y, item}} 
                    navigation      = {navigation}
                    post            = {post}
                    dispatch        = {bypassDispatch}
                    bypassRankId    = {bypassRankId}
                    componentsValid = {componentsValid}
                    target          = {target}
                    componentRankAll = {componentRankAll}
                    setModalVisibleCompleteCycle = {setModalVisibleCompleteCycle}
                    />
                    )}  
                    keyExtractor = {(item) => String(item.id)}
                    {...{onScroll}}     
                    />
                </View>}
            </View>
}
const styles = StyleSheet.create({
    centers: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    },
    menuCard: {
        // padding: 4,
        // marginTop: 50,
        // borderBottomWidth: 0.3,
        borderTopWidth : 0,
        borderColor    : '#000',
        width          : '100%',
        backgroundColor: '#000'
    },
    emploee: {
        marginBottom: 15,
        overflow    : 'hidden'
    },
    image: {
        width       : 51,
        height      : 51,
        borderRadius: 25
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems     : 'center',
        width          : '100%'
    }, 
    title: {
        color     : '#fff',
        fontFamily: 'open-regular'
    },
    actionMenu: {
        paddingTop       : 10,
        paddingLeft      : 40,
        paddingBottom    : 10,
        flexDirection    : 'row',
        alignItems       : 'center',
        justifyContent   : 'space-between',
        borderBottomWidth: 0.3,
        
        
        borderColor: '#fff'

    },
    privateData: {
        flexDirection : 'column',
        justifyContent: 'space-evenly'
    },
})
ComponentsRankScreen.navigationOptions = ({route, navigation }) => {
    const component = route.params.item
    return {
        headerTitle: component.name
    }
}