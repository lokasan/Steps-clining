import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { AppCard } from '../../components/ui/AppCard'
import { HEADER_FOOTER } from '../../theme'
import {useDispatch} from 'react-redux'
import { addEmploee } from '../../store/actions/empDouble'
import { addObject } from '../../store/actions/object'
import { PhotoPicker } from '../../components/PhotoPicker'

export const CreateNewObjects = ({navigation}) => {
    const dispatch = useDispatch()
    
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    
    const imgRef = useRef()
    const photoPickHandler = uri => {
      imgRef.current = uri
    }
    const createObjectHandler = () => {
      const object = {
        name,
        address,
        description,
        img: imgRef.current,
        
      }
      dispatch(addObject(object))
      navigation.navigate('ObjectsBuildings')
    }
    return <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
        <Text style={styles.title}>Создание нового объекта</Text>
        <AppCard>
        <TextInput
        style={styles.textarea}
        placeholder='Название объекта'
        value={name}
        onChangeText={setName}/>
        
        <TextInput
        style={styles.textarea}
        placeholder='Адрес объекта'
        value={address}
        onChangeText={setAddress}/>
        <TextInput
        style={styles.textarea}
        placeholder='Описание'
        value={description}
        onChangeText={setDescription}/>
        </AppCard>
        <PhotoPicker onPick={photoPickHandler}/>
        
     <Button 
     title='Создать объект' 
     onPress={createObjectHandler} 
     color={HEADER_FOOTER.MAIN_COLOR}
     disabled={!name || !address || !description}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewObjects.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый объект', 
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-arrow-dropdown'
    onPress={() => navigation.navigate('CreateObjects')}
    />
  </HeaderButtons>
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'open-regular',
        marginVertical: 10
    },
    textarea: {
        top: -10,
        height: 60, 
        borderColor: 'gray', 
        borderBottomWidth: 1
    }
})