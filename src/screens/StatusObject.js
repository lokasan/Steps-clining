import React, {useEffect} from 'react'
import { Text, View, Share, TouchableOpacity } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {useDispatch, useSelector} from 'react-redux'
import { getPostAll } from '../store/actions/post';
import QRCode from 'react-native-qrcode-generator'
import { useState, useRef } from 'react';
// import Shares from 'react-native-share'


export const StatusObject = () => {
   
    return <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#1C1B1B'}}>
        <Text style={{color: 'white'}}>Заглушка</Text>
        </TouchableOpacity>
        
            
        </View>
}
StatusObject.navigationOptions = ({navigation}) => ({
    headerTitle: 'Состояние объекта',
    
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='toogle'
    iconName='ios-menu'
    onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
    
    
  })