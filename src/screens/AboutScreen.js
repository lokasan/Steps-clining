import React from 'react'
import { Text, View , StyleSheet} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
export const AboutScreen = () => {
    return <View style={styles.center}>
        <Text>Название компании</Text>
        <Text>Фото <Text style={styles.boldText}>объектов</Text></Text>
        <Text>Фото <Text style={styles.boldText}>постов</Text></Text>
    </View>
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