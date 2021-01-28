
import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert, FlatList, SafeAreaView, TouchableOpacity, Animated} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { ComponentsBypassCard } from '../components/ComponentsBypassCard'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { loadFinishedBypassComponents } from '../store/actions/bypassRank'
import { loadStartedBypassRank } from '../store/actions/bypassRank'
import { finishedBypass } from '../store/actions/bypass'
import { AppLoader } from '../components/ui/AppLoader'
import { hideLoaderBypassRank, showLoaderBypassRank } from '../store/actions/bypassRank'
export const BypassScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const post = navigation.getParam('element')
    const bypassId = useSelector(state => state.bypass.bypassNumber)
    let components = useSelector(state => state.postWithComponent.postWithComponentAll)
    const startedBypassRanks = useSelector(state => state.bypassRank.bypassRankIsStarted)
    let componentsFinished = useSelector(state => state.bypassRank.bypassComponents)
    const loading = useSelector(state => state.bypassRank.loading)
    // console.log(bypassId, 'АЙДИ ОБХОДА');
    
    useEffect(() => {
       
        dispatch(loadFinishedBypassComponents(bypassId))
        dispatch(loadStartedBypassRank(bypassId))
        dispatch(loadPostWithComponent(post.id))
        
    }, [bypassId])
   
    if (loading) {
        return <AppLoader/>
    }
    let componentsValid = components
    // console.log(components, 'components');
    const target = navigation.getParam('goBackQRScreen')
    // console.log(target, 'target');
    // console.log(`Components: ${components}\n componentsFinished: ${componentsFinished} \n`)
    // if (componentsFinished.length === components.length) {
    //     console.log(bypassId, "я байпас")
        // dispatch(finishedBypass(1, bypassId))
    //     navigation.pop()
    if (componentsFinished.length) {
            componentsValid = components.filter(e => componentsFinished.findIndex(i => i.id == e.id) === -1)
            // console.log("PRIVETS", componentsValid)
                // if (componentsValid.length === 0) {
                //     console.log('Зашел сюда')
                //     dispatch(finishedBypass(1, bypassId))
                    
                    
                    
                // }
        }
    const existsRank =  useSelector(state => state.componentRank.componentRankAll)
    // console.log(existsRank, 'EXISTS_RANK')
    // console.log(components, 'Мой вывод', componentsFinished);
    
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
        data={componentsValid}
        numColumns={2}
        renderItem={({ index, item: item }) => (
          <ComponentsBypassCard {...{ index, y, item}} navigation={navigation} post={post} dispatch={dispatch} startedBypassRanks={startedBypassRanks} componentsValid={componentsValid} target={target}/>
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

BypassScreen.navigationOptions = ({ navigation }) => {
    const post = navigation.getParam('element')
    return {
        headerTitle: post.name
    }
}