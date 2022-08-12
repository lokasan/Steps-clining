import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { LongPressGestureHandler, PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { getYForX } from 'react-native-redash';
const CURSOR = 20

export const Cursor = ({dotesOnBarOfChart, translation, barChartArray, dateForBarChart, active}) => {
   
    function getResult(xAxis, x) {
        'worklet'
        for (let i = 0; i < xAxis.length; i += 2) {
            if (x >= xAxis[i] && x <= xAxis[i+1]) {
                return i
            }
        }
    }

    
    const x = useSharedValue(0)
    const currentDisplayedBar = useSharedValue(0)
    const xTemp = useSharedValue(0)
    const y = useSharedValue(0)
    const yTemp = useSharedValue(0)
    const heightLineRef = React.useRef(0)
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: () => {
            active.value = true
            console.log('I am start function onStart!')
        },
        onActive: (event) => {
            x.value = event.x
        },
        onEnd: () => {
            
        }
    })
    const tapRef = React.createRef()
    const style = useAnimatedStyle(() => {
        const resInFunc = getResult(dotesOnBarOfChart.x, x.value)
        currentDisplayedBar.value = resInFunc
        if (resInFunc !== undefined) {
            translation.x.value = x.value
            if (resInFunc % 2 === 0) {
                translation.x.value = (dotesOnBarOfChart.x[resInFunc] + dotesOnBarOfChart.x[resInFunc + 1]) / 2 - 1
            } else {
                translation.x.value = (dotesOnBarOfChart.x[resInFunc] + dotesOnBarOfChart.x[resInFunc - 1]) / 2 + 1
            }
            translation.y.value =  -dotesOnBarOfChart.y[resInFunc]
            dateForBarChart.value = barChartArray[0].data[0].data[resInFunc / 2].date
            
        }
        const translateX = translation.x.value
        const translateY = translation.y.value

        // console.log(Math.abs(translateY / 40).toFixed(1), 'this is best opinion and option opinion opinion onion onion onion how are you and what are you doing?')
        return {
            transform: [{ translateX }, { translateY }],
            opacity: withTiming(active.value ? 1 : 0)
        }
    })
    return (
        <TapGestureHandler onHandlerStateChange={(e) => {
            

            const resInFunc = getResult(dotesOnBarOfChart.x, e.nativeEvent.x)
            if (currentDisplayedBar.value === resInFunc) {
                active.value = !active.value
                console.log('I am inner equal functionality')
            }
            
            if (resInFunc !== undefined && currentDisplayedBar.value !== resInFunc) {
                console.log('I am inner do not equal and undefined functionality')
                currentDisplayedBar.value = resInFunc
                translation.x.value =  e.nativeEvent.x
                x.value = e.nativeEvent.x
                active.value = true
                if (resInFunc % 2 === 0) {
                    translation.x.value = (dotesOnBarOfChart.x[resInFunc] + dotesOnBarOfChart.x[resInFunc + 1]) / 2 - 1
                } else {
                    translation.x.value = (dotesOnBarOfChart.x[resInFunc] + dotesOnBarOfChart.x[resInFunc - 1]) / 2 + 1
                }
                translation.y.value =  -dotesOnBarOfChart.y[resInFunc]
                dateForBarChart.value = barChartArray[0].data[0].data[resInFunc / 2].date
            }
        }}>
        <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View style={StyleSheet.absoluteFill}>
                <PanGestureHandler waitFor={tapRef} onGestureEvent={onGestureEvent}>
                    <Animated.View style={StyleSheet.absoluteFill}>
                        <Animated.View style={[{...styles.cursor, height: 200}, style]}>
                            <View style={{...styles.cursorBody, height: 200}}/>
                        </Animated.View>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
            </Animated.View>
            </TapGestureHandler>
    )
}

const styles = StyleSheet.create({
    cursor: {
        width: 2,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
      },
      cursorBody: {
        width: 2,
        borderRadius: 0,
        backgroundColor: "black",
      },
})