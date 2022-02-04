
import React, {useCallback, useEffect, useState, useRef} from 'react'
import {Pressable, View, Text, Modal, StyleSheet, Image, Button, ScrollView, SafeAreaView, Alert, FlatList, TouchableOpacity, Animated, StatusBar, ActivityIndicator} from 'react-native'

import {useDispatch, useSelector} from 'react-redux'
import { ComponentsBypassCard } from '../components/ComponentsBypassCard'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { loadFinishedBypassComponents } from '../store/actions/bypassRank'
import { loadStartedBypassRank } from '../store/actions/bypassRank'
import { bypassIsCleaner } from '../store/actions/bypass'
import { finishedBypass } from '../store/actions/bypass'
import { AppLoader } from '../components/ui/AppLoader'
import { hideLoaderBypassRank, showLoaderBypassRank } from '../store/actions/bypassRank'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'
import { ModalPostsDone } from '../components/ui/ModalPostsDone'
export const BypassScreen = ({route, navigation}) => {
    const dispatch = useDispatch()
    const post = route.params.element
    const {bypassId} = useSelector(state => state.bypass.bypassNumber)
    const {modalVis} = route.params
    const {bypassIdRef} = route.params
    // console.log(bypassId, 'BYPASSSCREEN YOU LIVE?')
    const [modalVisible, setModalVisible] = useState(false)
    let components = useSelector(state => state.postWithComponent.postWithComponentAll)
    const startedBypassRanks = useSelector(state => state.bypassRank.bypassRankIsStarted)
    let componentsFinished = useSelector(state => state.bypassRank.bypassComponents)
    const loading = useSelector(state => state.bypassRank.loading)
    // console.log(bypassId, 'АЙДИ ОБХОДА');
    
    const [modalVisibleCompleteCycle, setModalVisibleCompleteCycle] = useState(false)

    useEffect(() => {
       (async () => {
        dispatch(loadFinishedBypassComponents(bypassId))
        dispatch(loadStartedBypassRank(bypassId))
       })()
        
        // dispatch(loadPostWithComponent(post.id))
        
    }, [bypassId])
    useEffect(() => {
        setModalVisible(modalVis)
    }, [])
    if (loading) {
        return <AppLoader/>
    }
    let componentsValid = components
    const target = route.params.goBackQRScreen
    if (componentsFinished.length) {
            componentsValid = components.filter(e => componentsFinished.findIndex(i => i.id == e.id) === -1)
        }
    const existsRank =  useSelector(state => state.componentRank.componentRankAll)
    
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
    const keyExtractor = useCallback((item) => String(item.id))
    const renderItem = useCallback(({ index, item: item }) => {
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
        setModalVisibleCompleteCycle={setModalVisibleCompleteCycle}
        target={target}/>
    })
    const loader = <View style = {styles.center}>
      <ActivityIndicator color  = "#0000ff"/>
        </View>
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } }}], { useNativeDriver: true })
    return (
    
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            {/* <View style={styles.container, styles.centers}> */}
                <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Наличие уборщика</Text>
                        <Text style={styles.modalText}>
                            <Text> Уборщик на месте </Text>
                            <Text> ?</Text>
                            </Text>
                            
                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonDelete : styles.buttonClosePressed]}
                            onPress={() => {
                            setModalVisible(!modalVisible)
                            dispatch(bypassIsCleaner(0, bypassIdRef.current))
                            }}>
                            <Text style={styles.textStyle}>Нет</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed ? styles.buttonDeletePressed : styles.buttonClose]}
                            onPress={() => {
                            setModalVisible(!modalVisible)
                            dispatch(bypassIsCleaner(1, bypassIdRef.current))
                            }}>
                            <Text style={styles.textStyle}>Да</Text>
                        
                        </Pressable>
                        </View>
                        </View>
                    </View>
                </Modal>
                <ModalPostsDone navigation={navigation} modalVisible={modalVisibleCompleteCycle} setModalVisible={setModalVisibleCompleteCycle}/>
                
                {false ? loader : <FlatList
                data={componentsValid.length ? [componentsValid[0]] : []}
                keyExtractor={keyExtractor}
                scrollEnabled={false}
                renderItem={renderItem}
                contentContainerStyle={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}/>}
            </SafeAreaView>)
}
const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding:35,
        paddingBottom: 10,
    
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClosePressed: {
        backgroundColor: '#000'
      },
      buttonClose: {
        backgroundColor: '#303f9f',
      },
      buttonDeletePressed: {
        backgroundColor: 'green',
      },
      buttonDelete: {
        backgroundColor: 'red',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center'
      },
      modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      }
})

// BypassScreen.navigationOptions = ({ route, navigation }) => {
//     const post = route.params.element
//     return {
//         headerTitle: post.name
//     }
// }