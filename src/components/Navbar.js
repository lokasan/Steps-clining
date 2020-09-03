import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {THEME} from '../theme'
export const Navbar = (props) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{props.title}</Text>
            
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
    }
})