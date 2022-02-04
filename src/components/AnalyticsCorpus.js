import React, {useEffect, useRef, useState} from 'react'
import {Animated, View, Text, StyleSheet, ScrollView, Pressable, FlatList, Image, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { loadCorpus, loadCorpusBypassBase } from '../store/actions/corpus'
import {AnalyticsCorpusCard} from './AnalyticCorpusCard'
export const AnalyticsCorpus = ({navigation}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCorpus())
        
    }, [])
    useEffect(() => { 
        let msToday = new Date().getTime()
        msToday = msToday - (msToday % (24 * 60 * 60 * 1000))
        dispatch(loadCorpusBypassBase('', msToday))
    }, [])
    const corpusData = useSelector(state => state.corpus.corpusAll)
    const corpusAnalyticsBase = useSelector(state => state.corpus.corpusAnalyticsBase)
    // console.log(corpusAnalyticsBase)

    return <ScrollView style={{marginLeft: 20, alignSelf: 'center'}}>
        <FlatList
        renderItem={({item, index}) => <AnalyticsCorpusCard item={item} index={index} navigation={navigation}/>}
        data={corpusAnalyticsBase}
        keyExtractor={(item) => item.id}
        numColumns={2}
        horizontal={false}
        />
    </ScrollView>
}