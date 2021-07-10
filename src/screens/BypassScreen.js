
import React, {useCallback, useEffect, useState, useRef} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert, FlatList, TouchableOpacity, Animated, StatusBar} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useDispatch, useSelector} from 'react-redux'
import { ComponentsBypassCard } from '../components/ComponentsBypassCard'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { loadFinishedBypassComponents } from '../store/actions/bypassRank'
import { loadStartedBypassRank } from '../store/actions/bypassRank'
import { finishedBypass } from '../store/actions/bypass'
import { AppLoader } from '../components/ui/AppLoader'
import { hideLoaderBypassRank, showLoaderBypassRank } from '../store/actions/bypassRank'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'
export const BypassScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const post = navigation.getParam('element')
    const {bypassId} = useSelector(state => state.bypass.bypassNumber)
    let components = useSelector(state => state.postWithComponent.postWithComponentAll)
    const startedBypassRanks = useSelector(state => state.bypassRank.bypassRankIsStarted)
    let componentsFinished = useSelector(state => state.bypassRank.bypassComponents)
    const loading = useSelector(state => state.bypassRank.loading)
    // console.log(bypassId, 'АЙДИ ОБХОДА');
    
    useEffect(() => {
       
        dispatch(loadFinishedBypassComponents(bypassId))
        dispatch(loadStartedBypassRank(bypassId))
        // dispatch(loadPostWithComponent(post.id))
        
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
    const [activeIndex, setActiveIndex] = useState(0)
    const animatedValue = useRef(new Animated.Value(0)).current
    const reactiveAnimated = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactiveAnimated,
            duration: 300,
            useNativeDriver: true
        }).start()
    }, [])
    const setActiveSlide = useCallback(newIndex => {
        setActiveIndex(newIndex)
        reactiveAnimated.setValue(newIndex)
    })
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } }}], { useNativeDriver: true })
    return (
    <FlingGestureHandler 
        key='UP' 
        direction={Directions.UP} 
        onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
            if (activeIndex === componentsValid.length - 1) {
                return
            }
            setActiveSlide(activeIndex + 1)
        }
    }}>
        <FlingGestureHandler
            key='DOWN' 
            direction={Directions.DOWN} 
            onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
                if (activeIndex === 0) {
                    return
                }
                setActiveSlide(activeIndex - 1)
            }
        }}>
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            {/* <View style={styles.container, styles.centers}> */}
            
                <StatusBar hidden/>
                <FlatList
                data={componentsValid}
                keyExtractor={(item) => String(item.id)}
                scrollEnabled={false}
                renderItem={({ index, item: item }) => {
                    const inputRange = [index - 1, index, index + 1]
                    const translateYs = animatedValue.interpolate({
                        inputRange,
                        outputRange: [-30, 0, 30]
                    })
                    const opacitys = animatedValue.interpolate({
                        inputRange,
                        outputRange: [1 - 1 / 4, 1, 0]
                    })
                    const scales = animatedValue.interpolate({
                        inputRange,
                        outputRange: [0.92, 1, 1.2]
                    })
                    return <ComponentsBypassCard {...{ index, y, item, translateYs, opacitys, scales, activeIndex, componentsList: componentsValid}} 
                    navigation={navigation} 
                    post={post}
                    startedBypassRanks={startedBypassRanks} 
                    
                    target={target}/>
                }}
                
                contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                CellRendererComponent={({index, item, children, style, ...props}) => {
                    const newStyle = [
                        style,
                        {
                            zIndex: componentsValid.length - index,
                            left: -400 / 2,
                            top: -400 / 2
                        }
                    ]
                    return <View index={index} {...props} style={newStyle}>
                        {children}
                    </View>
                }}
                // {...{onScroll}}
                />
                
                {/* </View> */}
            </SafeAreaView>
    </FlingGestureHandler>
    </FlingGestureHandler>)
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