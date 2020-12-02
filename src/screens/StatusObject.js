import React from 'react'
import { Text, View } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
export const StatusObject = () => {
    return <View><Text></Text></View>
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