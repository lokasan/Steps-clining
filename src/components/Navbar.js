import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

import {THEME} from '../theme'
import { Account } from './Account'

export const Navbar = (props) => {
    console.log(`fotochka ${props.photoProfile._55}`);
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{props.title}</Text>
            <View>
            <Image sttyle={styles.logo} source={{uri: `data:image/jpg;base64,${props.photoProfile._55}`,}}/>
            <TouchableOpacity onPress={Account}><Text>TOUCH</Text></TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.NAVBAR_C,
        paddingBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 20
    },
    logo: {
        width: 66,
        height: 58
    }
})