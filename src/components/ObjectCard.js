import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'

export const ObjectCard = ({object, onOpen}) => {
    return <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(object)}>
    <View style={styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: object.img}}/>
        <View style={styles.privateData}>
        <View>    
<Text style={{color: '#fff'}}>{object.name}</Text>
</View>
<View>
<Text style={{color: '#fff'}}>{object.address}</Text>
</View>
</View>
        
        
        <ArrowRight/>
        
    </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
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