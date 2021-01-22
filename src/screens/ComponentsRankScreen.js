import React, { useEffect } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Dimensions, FlatList} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { Extrapolate } from 'react-native-reanimated'
import {useDispatch, useSelector} from 'react-redux'
import { loadComponentRank } from '../store/actions/componentRank'
import { ComponentsRankBypassCard } from '../components/ComponentRankBypassCard'
export const ComponentsRankScreen = ({ navigation }) => {
    dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadComponentRank(componentId))
    }, [dispatch])
    const component = navigation.getParam('item')
    const componentId = component.id
    const componentRankAll = useSelector(state => state.componentRank.componentRankAll)
    console.log(componentRankAll, 'FUCK THE');
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
                    data={componentRankAll} 
                    renderItem={({ index, item: item }) => (
                    <ComponentsRankBypassCard {...{ index, y, item}}
                    />
                    )}  
                    keyExtractor={(item) => String(item.id)} 
                    {...{onScroll}}     
                    />
                </View>
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