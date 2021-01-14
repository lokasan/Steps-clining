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
import { useState } from 'react';
// import Shares from 'react-native-share'


export const StatusObject = () => {
    const [hi, setHi] = useState('0')
    dispatch = useDispatch()
    const result = useSelector(state => state.post.postAlls)
    useEffect(() => {
        dispatch(getPostAll())
    }, [dispatch])
    
    console.log(result);
    async function calculate() {
        let html = ''
        for (let el of result) {
            console.log(el);
            const data = await FileSystem.readAsStringAsync(el.img, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const imageData = 'data:image/png;base64,' + data;
            html += `<h1> ${el.name} </h1>
            <div>
            <img src="${imageData}" width="100%"/>
            </div>`;
        }
        let factory = React.createFactory(QRCode)
        let element = factory({value: 'fgdfg'})
        
        console.log(element.props.getImageOnLoad())
        return html
    }
    async function execute() {
        let html = await calculate()
        
        const { uri } = await Print.printToFileAsync({ html });
        Sharing.shareAsync(uri);
      }
    return <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity style={{alignItems: 'center', backgroundColor: '#1C1B1B'}} onPress={execute}>
        <Text style={{color: 'white'}}>Отправить список QR-кодов</Text>
        </TouchableOpacity>
        <QRCode 
            value={'gdfgfd'}
            size={200}
            fgcolor='white'
            />
            <Text>{hi}</Text>
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