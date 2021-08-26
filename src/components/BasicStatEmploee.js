import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Animated, TextInput, TouchableOpacity} from 'react-native'
import Svg, {G, Circle, Path} from 'react-native-svg'
import { QRIcon } from './ui/imageSVG/circle'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export const BasicStatEmploee = ({
    percentage=0,
    radius=40,
    strokeWidth=10,
    duration=1000,
    color='red',
    delay=500,
    textColor,
    max=32,
    svgRender,
    navigation,
    width_svg, 
    height_svg
}) => {
    color= (percentage / max) < 1 ? 'tomato' : 'forestgreen'
    const animatedValue = React.useRef(new Animated.Value(0)).current
    const circleRef = React.useRef()
    const inputRef = React.useRef()

    const halfCircle = radius + strokeWidth
    const circleCircumference = 2 * Math.PI * radius

    const animation = toValue => {
        return Animated.timing(animatedValue, {
            toValue,
            duration,
            delay,
            useNativeDriver: true

        }).start()
    }

    useEffect(() => {
        animation(percentage)
        
        animatedValue.addListener(v => {
            const maxPerc = 100 * v.value / max
            const strokeDashoffset = circleCircumference - (circleCircumference * maxPerc) / 100
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
            if (inputRef?.current) {
                inputRef.current.setNativeProps({
                    text: `${Number.isInteger(percentage) ? Math.round(v.value) : v.value.toFixed(2)}` 
                })
            }
        })
        
        return () => {
            animatedValue.removeAllListeners()
        }
    }, [max, percentage])
    return (<>
    
    <View style={styles.container}>
    <TouchableOpacity onPress={() => {}}>
    <View>
        <Svg 
            width={radius * 2} 
            height={radius * 2} 
            viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
            <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
                <Circle
                    cx='50%'
                    cy='50%'
                    stroke={color}
                    strokeWidth={strokeWidth}
                    r={radius}
                    fill='transparent'
                    strokeOpacity={0.2}
                    />
                <AnimatedCircle
                    ref={circleRef}
                    cx='50%'
                    cy='50%'
                    stroke={color}
                    strokeWidth={strokeWidth}
                    r={radius}
                    fill='transparent'
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={circleCircumference}
                    strokeLinecap='round'
                />
            </G>
        </Svg>
        <View style={[StyleSheet.absoluteFillObject,
                { color: textColor ?? color},
                { alignItems: 'center', justifyContent: 'center'}
            ]}
                >   
                
                    {svgRender('black', width_svg, height_svg)}
                
        
        </View>
        
        </View>
        </TouchableOpacity>
        <AnimatedTextInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue="0"
            style={[
                // StyleSheet.absoluteFillObject,
                { fontSize: radius / 2, color: textColor ?? color},
                { fontWeight: '900', textAlign: 'center'}
            ]}
        />
        </View></>)
}


const styles = StyleSheet.create({
    textWrapper: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
        
    },
    textDate: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        // flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignSelf: 'center'
    }
})