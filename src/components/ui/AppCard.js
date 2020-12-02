import React from 'react'
import {StyleSheet, View} from 'react-native'
import { findDOMNode } from 'react-dom'


export const AppCard = props => (
    <View 
        style={ { ...styles.default, ...props.style } }>{props.children}
    </View>
)


const styles = StyleSheet.create({
    default: {
        padding: 20,
        shadowColor: '#000',
        shadowRadius: 1,
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 1 },
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 1,
        marginBottom: 10
    }
})