import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert, FlatList} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { DATA } from '../../testData'
import { Footer } from '../../components/ui/Footer'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { HEADER_FOOTER } from '../../theme'
import { removeObject, updateObject } from '../../store/actions/object'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { loadPost } from '../../store/actions/post'
import { ComponentRankCard } from '../../components/ComponentRankCard'
import { loadComponent, removeComponent, updateComponent } from '../../store/actions/component'
import { loadComponentRank } from '../../store/actions/componentRank'

let countComponentRank = 0
let listComponentRank = ''
const removeHandler = (object, dispatch, navigation) => {
    Alert.alert(
        "Удаление польователя",
        "Вы уверены, что хотите удалить объект " + object.name + ' ?',
        [
          
          {
            text: "Отменить",
            
            style: "cancel"
          },
          { text: "Удалить", style: 'destructive', onPress() {
            navigation.navigate('Components')
            dispatch(removeComponent(object.id))
          } 
        }
        ],
        { cancelable: false }
      )
      
}

export const AttributeSingle = ({navigation}) => {
    const openComponentRankHandler = component => {
        navigation.navigate('ComponentRankInfo', {componentRankId: component.id, componentRankName: component.name})
    }
    const dispatch = useDispatch()
  
    
    const componentId = navigation.getParam('componentId')
    const component = useSelector(state => state.component.componentAll.find(e => e.id === componentId))
   
    console.log(component);
    useEffect(() => {
        dispatch(loadComponentRank(componentId))
    }, [dispatch])
    const componentRankAll = useSelector(state => state.componentRank.componentRankAll)
    countComponentRank = componentRankAll.length + 1
    listComponentRank = componentRankAll
    if (!component) {
      return null
    }
    return <View style={{flex: 1, backgroundColor: '#000'}}>
       
        <View style={styles.container}>
    <View style={styles.userCard}>
    <View>
        <Image style={{height: 150, width: 150}} source={{uri: component.img}}/>
    </View>
    <View style={styles.privateData}>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{component.name} </Text>
        </View>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{component.description}</Text>
        </View>
    
    </View>
   
</View>
<ScrollView>
<View style={styles.menuCard}>
        <FlatList 
        data={componentRankAll} 
        keyExtractor={componentRank => componentRank.id.toString()} 
        renderItem={({item}) => <ComponentRankCard componentRank={item} dispatch={dispatch} componentRankAll={componentRankAll} navigation={navigation}/>}
                />
    </View>
    </ScrollView>
</View>

<Button title='Удалить' color={HEADER_FOOTER.DANGER_COLOR} onPress={() => removeHandler(component, dispatch, navigation)}/>
{/* <Footer/> */}
</View>
}
const styles = StyleSheet.create({
    image: {
        width: '100%'
    },
    userCard: {
        // flex: 1,
        // top: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // height: '25%',
        borderBottomWidth: 0.3,
        borderColor: '#fff',
        width: '100%',
        // backgroundColor: '#1C1B1B'
    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    textStyle: {
        color: '#fff', 
        borderBottomWidth: 0.5, 
        borderColor: '#fff'
        
    },
    textStyleLine: {
        color: '#fff',
        fontFamily: 'open-regular'
    },
    center: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        // paddingHorizontal: '18%',
        flex: 1,
        // height: '89%'
      },
      radioButton: {
          marginTop: 25
      },
      menuCard: {
        // padding: 4,
        // marginTop: 50,
        // borderBottomWidth: 0.3,
        borderTopWidth: 0,
        borderColor: '#fff',
        width: '100%',
        backgroundColor: '#1C1B1B'
    }, 
})
AttributeSingle.navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('componentName')
    const componentId = navigation.getParam('componentId')
    return {
        headerTitle: name,
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item 
        title='AddNewUser'
        iconName='ios-add-circle-outline'
        onPress={() => navigation.navigate('CreateComponentRank', {componentId, countComponentRank, listComponentRank})}
        />
      </HeaderButtons>
    }
}
