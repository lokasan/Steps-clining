import React, {useState} from 'react'
import {View, StyleSheet, Image, Button, Alert} from 'react-native'
import QRCode from 'react-native-qrcode-generator'
export const QRCodePicker = ({value, onPick}) => {
    return <View style={{flex: 1, justifyContent: 'center', opacity: 0}}>
        <QRCode 
            value={value}
            size={100}
            fgcolor='white'
            getImageOnLoad={(e) =>{
                console.log(e) 
                onPick(e)}} 
        />
        </View>
}