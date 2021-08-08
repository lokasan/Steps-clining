import React, {useRef} from 'react'
import {View, Modal, StyleSheet, Image, Animated, TouchableOpacity} from 'react-native'
import {PinchGestureHandler, PanGestureHandler} from 'react-native-gesture-handler'
import { ArrowRight } from './imageSVG/circle'

export const ModalZoomable = ({ zoomable, setZoomable, pathImg }) => {
    const scale = useRef(new Animated.Value(1)).current
    const translateX = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(0)).current
    const handlePan = Animated.event([
        {
          nativeEvent: {
            translationX: translateX,
            translationY: translateY
          },
        },
      ], {
        listener: e => console.log(e.nativeEvent),
        useNativeDriver: true
      })
      const handlePinch = Animated.event([ { nativeEvent: { scale } } ], {useNativeDriver: true})
    return (
        <Modal visible={zoomable} animationType='slide' animated>
            <View style={{ backgroundColor: '#000', position: 'relative', paddingTop: 30, paddingLeft: '90%'}}>
                <TouchableOpacity onPress={() => setZoomable(false)}>
                    <ArrowRight/>
                </TouchableOpacity>
            </View>
            <PanGestureHandler onGestureEvent={handlePan}>
                <Animated.View style={{backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <PinchGestureHandler onGestureEvent={handlePinch}>
                        <Animated.Image source={{uri: pathImg}} style={[styles.image, { transform: [{scale}, {translateX}, {translateY}]}]}/>
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </Modal>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400
    },
})