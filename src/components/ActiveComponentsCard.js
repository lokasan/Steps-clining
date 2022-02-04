import React from 'react'
import { Dimensions, StyleSheet, View, Animated, Text, Image, TouchableOpacity } from 'react-native'
import { Extrapolate } from 'react-native-reanimated'
const { width } = Dimensions.get("window");
const CARD_ASPECT_RATIO = 1324 / 863;
const CARD_WIDTH = 200
const CARD_HEIGHT = 150
export const MARGIN = 16
export const HEIGHT = CARD_HEIGHT + MARGIN * 2
const { height: wHeight } = Dimensions.get("window")
const height = wHeight - 64
const styles = StyleSheet.create({
    card: {
        marginHorizontal: MARGIN,
        alignSelf: "center"
    },
    image: {
    
        width: 150,
        height:150,
        borderRadius: 25
    },
})

const ActiveComponentsCard = ({index, x, item }) => {
    const position = Animated.subtract(!index ? 1 : index * HEIGHT, x)
    const isDisappearing = -HEIGHT
    const isLeft = 0
    const isRight = height - HEIGHT
    const isAppearing = height
    const translateX = Animated.add(Animated.add(x, x.interpolate({
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
        <Animated.View style={[styles.card, { opacity, transform: [{ translateX }, { scale }] }]} key={String(item.id)}>
            <TouchableOpacity activeOpacity={0.9}>
            <Image style={styles.image} source={{uri: item.img}}/>
            </TouchableOpacity>
            <Text style={{textAlign: 'center'}}>{item.name}</Text>
        </Animated.View>
    )
}


export default ActiveComponentsCard