import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Dimensions} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { Extrapolate } from 'react-native-reanimated'
import {useDispatch, useSelector} from 'react-redux'
import { loadComponentRank } from '../store/actions/componentRank'
import { componentClear, removeComponent } from '../store/actions/component'
import { deleteComponentToPostLink } from '../store/actions/postWithComponent'
import { updateBypassRank } from '../store/actions/bypassRank'
import { finishedBypass } from '../store/actions/bypass'
import { loadFinishedBypassComponents } from '../store/actions/bypassRank'
import { loadPostWithComponent } from '../store/actions/postWithComponent'


const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
const CARD_WIDTH = 200
const CARD_HEIGHT = 200
export const MARGIN = 16
export const HEIGHT = CARD_HEIGHT + MARGIN * 2
const { height: wHeight } = Dimensions.get("window")
const height = wHeight - 64
export const ComponentsRankBypassCard = ({index, y, item, navigation, post, dispatch, bypassRankId, componentsValid, target}) => {
    
    
    let components = useSelector(state => state.postWithComponent.postWithComponentAll)
    let componentsFinished = useSelector(state => state.bypassRank.bypassComponents)
    
    const postId = post.id
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
        <Animated.View style={[styles.card]} key={String(item.id)}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                // console.log(item.id, " Я Улетаю в базу", ' ', bypassRankId)
                dispatch(updateBypassRank(item.id, bypassRankId))
                
                // console.log(componentsFinished.length, '===', components.length, 'общая длина')
                if ((componentsFinished.length + 1) === components.length) {
                    // console.log(bypassId, "я байпас")
                    // dispatch(updateBypassRank(item.id, bypassRankId))
                    dispatch(finishedBypass(1, bypassId)) 
                    target()
                    navigation.navigate('QRCode')
                } else navigation.navigate('BypassScreen')
                
            }}>
            <Image style={styles.image} source={{uri: item.img}}/>
            </TouchableOpacity>
            
            <Text style={{textAlign: 'center'}}>{item.name}</Text>
            
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    emploee: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        
        marginVertical: MARGIN/2,
        marginHorizontal: MARGIN/2,
        // alignSelf: "center"
    },
    image: {
    
        width: 100,
        height: 100,
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