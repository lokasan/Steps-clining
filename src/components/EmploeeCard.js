import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'

export const EmploeeCard = ({emploee, onOpen}) => {
    return <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(emploee)}>
    <View style={styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: emploee.img}}/>
<Text style={{color: '#fff'}}>{emploee.surname} {emploee.name} {emploee.lastname}</Text>
        
        
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

    }
})