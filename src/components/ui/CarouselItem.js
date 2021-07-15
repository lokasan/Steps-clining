import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
const {width, height} = Dimensions.get("window")
const CarouselItem = ({item}) => (
        <View style={{alignSelf: 'center'}}>
            <Image style={styles.image} source={{uri: item}}/>
        </View>
            )

const styles = StyleSheet.create({
    image: {
        width: width -20,
        height: 400,
        margin: 10,
    }
})
export default CarouselItem