import React from 'react'
import { Text, View , StyleSheet, SafeAreaView, StatusBar, TouchableOpacity} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
export const AboutScreen = ({navigation}) => {
    return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#1E1D1D'}}>
        <StatusBar hidden/>
        <TouchableOpacity onPress={() => navigation.navigate('TravelUpDetails')}></TouchableOpacity>
        <Text style={{color: 'white'}}>details screen</Text>
    </SafeAreaView>
    )
}
AboutScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'О нас',
    
    headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='toogle'
    iconName='ios-menu'
    onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
    
    
  })
  const styles = StyleSheet.create({
      center: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
      },
      boldText: {
          fontFamily: 'open-bold'
      }
  })