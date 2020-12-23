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
import { addComponent } from '../../store/actions/component'

export const CreateNewComponent = ({navigation}) => {
    const dispatch = useDispatch()
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    
    const imgRef = useRef()
    const photoPickHandler = uri => {
      imgRef.current = uri
    }
    const createComponentHandler = () => {
      const component = {
        name,
        description,
        img: imgRef.current,
        
      }
      dispatch(addComponent(component))
      navigation.navigate('Components')
    }
    return <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
        <Text style={styles.title}>Создание нового компонента</Text>
        <AppCard>
        <TextInput
        style={styles.textarea}
        placeholder='Название компонента'
        value={name}
        onChangeText={setName}/>
        
        
        <TextInput
        style={styles.textarea}
        placeholder='Описание'
        value={description}
        onChangeText={setDescription}/>
        </AppCard>
        <PhotoPicker onPick={photoPickHandler}/>
        
     <Button 
     title='Создать компонент' 
     onPress={createComponentHandler} 
     color={HEADER_FOOTER.MAIN_COLOR}
     disabled={!name || !description}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewComponent.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый компонент', 
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-arrow-dropdown'
    onPress={() => navigation.navigate('CreateComponent')}
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