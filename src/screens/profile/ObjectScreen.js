import React, {useCallback, useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert, FlatList, SafeAreaView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { DATA } from '../../testData'
import { Footer } from '../../components/ui/Footer'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { HEADER_FOOTER } from '../../theme'
import { removeObject, updateObject } from '../../store/actions/object'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { loadPost } from '../../store/actions/post'
import { PostCard } from '../../components/PostCard'


export const ObjectScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const objectId = navigation.getParam('objectId')
    const object = useSelector(state => state.object.objAll.find(e => e.id === objectId))
    
    useEffect(() => {
        dispatch(loadPost(objectId))
    }, [dispatch])
    const postAll = useSelector(state => state.post.postAll)
    const updatedUserPrivileg =  useCallback(() => {
      dispatch(updateObject(object))
    }, [dispatch, object])
    if (!object) {
      return null
    }
    return <View style={{flex: 1, backgroundColor: '#000'}}>
        
        <View style={styles.container}>
    <View style={styles.userCard}>
    <View>
        <Image style={{height: 150, width: 150}} source={{uri: object.img}}/>
    </View>
    <View style={styles.privateData}>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{object.name}</Text>
        </View>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{object.description}</Text>
        </View>
    
    </View>
   
</View>

        <FlatList 
        style={styles.menuCard}
        data={postAll} 
        keyExtractor={post => post.id.toString()} 
        renderItem={({item}) => <PostCard post={item} navigation={navigation}
        horizontal={false}
        />}
                />
    
</View>


{/* <Footer/> */}
</View>
}
const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#f9c2ff',
        
    },
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
ObjectScreen.navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('objectName')
    const objectId = navigation.getParam('objectId')
    return {
        headerTitle: name,
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item 
        title='AddNewUser'
        iconName='ios-add-circle-outline'
        onPress={() => navigation.navigate('CreatePost', {objectId})}
        />
      </HeaderButtons>
    }
}