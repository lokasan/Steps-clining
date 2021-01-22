
import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert, FlatList, SafeAreaView, TouchableOpacity, Animated} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { ComponentsBypassCard } from '../components/ComponentsBypassCard'
import {ArrowRight} from '../components/ui/imageSVG/circle'
export const BypassScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const components = navigation.getParam('svaaaag')
    // useEffect(() => {

    // }, [])
    const existsRank =  useSelector(state => state.componentRank.componentRankAll)
    console.log(existsRank, 'EXISTS_RANK')
    console.log(components, 'Мой вывод');
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
    const y = new Animated.Value(0) 
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } }}], { useNativeDriver: true })
    return <View style={{flex: 1, backgroundColor: '#fff'}}>
    <View style={styles.container, styles.centers}>
    
    <AnimatedFlatList
        scrollEventThrottle={16}
        vertical={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        data={components}
        numColumns={2}
        renderItem={({ index, item: item }) => (
          <ComponentsBypassCard {...{ index, y, item}} navigation={navigation}/>
        )}
        keyExtractor={(item) => String(item.id)}
        {...{onScroll}}
        />
        </View>
    </View>
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    centers: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        padding: 10
    },
    container: {
        flex: 1
    },
    menuCard: {
        // padding: 4,
        // marginTop: 50,
        // borderBottomWidth: 0.3,
        borderTopWidth: 0,
        borderColor: '#000',
        width: '100%',
        backgroundColor: '#000'
    },
    emploee: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: 51,
        height: 51,
        borderRadius: 25
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    }, 
    title: {
        color: '#fff',
        fontFamily: 'open-regular'
    },
    actionMenu: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 0.3,
        
        
        borderColor: '#fff'

    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
})