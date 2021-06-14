import React, { useEffect } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Dimensions} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { Extrapolate } from 'react-native-reanimated'
import {useDispatch, useSelector} from 'react-redux'
// import { loadComponentRank } from '../store/actions/componentRank'
// import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { createBypassRank, loadStartedBypassRank } from '../store/actions/bypassRank'
// import { loadStartedBypassRank } from '../store/actions/bypassRank'
const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
const CARD_WIDTH = 200
const CARD_HEIGHT = 200
export const MARGIN = 16
export const HEIGHT = CARD_HEIGHT + MARGIN * 2
const { height: wHeight } = Dimensions.get("window")
const height = wHeight - 64
export const ComponentsBypassCard = ({index, y, item, navigation, post, startedBypassRanks, componentsValid, target, translateYs, opacitys, scales, activeIndex, componentsList}) => {

    startedBypassRanks = useSelector(state => state.bypassRank.bypassRankIsStarted)
    // console.log(startedBypassRanks, 'STATE RANK')
    const startedBypassRank = startedBypassRanks.filter(e => e.component_id === item.id)
    
    // console.log(item, 'что происходит', startedBypassRank)
    const bypassId = useSelector(state => state.bypass.bypassNumber)
    const position = Animated.subtract( index * HEIGHT, y)
    const isDisappearing = -HEIGHT
    const isLeft = 0
    const isRight = height - HEIGHT
    const isAppearing = height
    const translateY = Animated.add(Animated.add(y, y.interpolate({
        inputRange: [0, 0.0001 + index * HEIGHT],
        outputRange: [0, -index * HEIGHT],
        extrapolateRight: "clamp"
    })),
        position.interpolate({
            inputRange: [isRight, isAppearing],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: "clamp"
        })
    )
    const scale = position.interpolate({
        inputRange: [isDisappearing, isLeft, isRight, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp"
    })
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isLeft, isRight, isAppearing],
        outputRange: [0.5, 1, 1, 0.5]
    })
    return (
        <Animated.View style={{position: 'absolute', transform: [{translateY:translateYs}, {scale:scales}], opacity: opacitys}}  key={String(item.id)}>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                // dispatch(loadStartedBypassRank(bypassId, item.id))
                
                if (startedBypassRank.length) {
                    Alert.alert('HI')
                    
                    navigation.navigate('ComponentsRankScreen', {item: componentsList[activeIndex], post, componentsValid, target})
                } else { 
                    dispatch(createBypassRank(bypassId, componentsList[activeIndex].id))
                    
                    navigation.navigate('ComponentsRankScreen', {item: componentsList[activeIndex], post, startedBypassRank: startedBypassRank, componentsValid, target})
                }
                
                }}>
            
            <Image style={styles.image} source={{uri: item.img}}/>
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: 20, left: 20}}>
            <Text style={{textAlign: 'center', ...styles.name}}>{item.name}</Text>
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    emploee: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    card: {
        marginVertical: MARGIN,
        marginHorizontal: MARGIN/2,
        alignSelf: "center"
    },
    image: {
    
        width: 400,
        height:400,
        resizeMode: 'cover',
        borderRadius: 16
    },
    name: {
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '900',
        color: '#000'
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