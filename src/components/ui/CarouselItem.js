import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
const {width, height} = Dimensions.get("window")
import * as Localization from 'expo-localization';
const CarouselItem = ({item}) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
    const date = new Date(item?.time_make_photo)
    const language = Localization.locale
    return(
        <View style={{alignSelf: 'center'}}>
            <Image style={styles.image} source={{uri: item.filename}}/>
            {item.weather && <><Text style={{color: 'orange'}}>{item?.weather?.charAt(0).toUpperCase() + item?.weather?.slice(1)}</Text>
            <Text style={{color: 'orange'}}>{item?.temperature} &#8451;</Text>
            <Text style={{color: 'orange'}}>{`${item?.surname} ${item?.name} ${item?.lastname}`}</Text>
            <Text style={{color: 'orange'}}>{date.toLocaleString(language.slice(0, 2) === 'ru' ? 'ru' : 'ru', options)}</Text></>}
        </View>
            )}

const styles = StyleSheet.create({
    image: {
        width: width -20,
        height: 400,
        margin: 10,
    }
})
export default CarouselItem