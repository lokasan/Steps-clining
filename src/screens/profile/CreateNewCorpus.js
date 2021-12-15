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
import findTrashSymbolsInfo from '../../utils/findTrashSymbolsInfo'
import { addCorpus } from '../../store/actions/corpus'

export const CreateNewCorpus= ({navigation}) => {
    const dispatch = useDispatch()
    
    const [name, setName]               = useState('')
    const [address, setAddress]         = useState('')
    const [coords, setCoords] = useState('')
    const [description, setDescription] = useState('')
    const [borderBottomColor, setBorderBottomColor] = useState({
      name    : false,
    })

    const imgRef           = useRef()
    const imgExtensionsRef = useRef()
    const photoPickHandler = uri => {
      imgRef.current = uri
      imgExtensionsRef.current = '.' + uri.split('.')[uri.split('.').length - 1]
    }
    const createCorpusHandler = () => {
      const corpus = {
        name,
        address,
        coords,
        description,
        img: imgRef.current,
        extensions: imgExtensionsRef.current,
        
      }
      dispatch(addCorpus(corpus))
      navigation.navigate('CorpusesBuilding')
    }
    return                    <ScrollView style = {styles.wrapper}>
    <TouchableWithoutFeedback onPress           = {() => Keyboard.dismiss()}>
            <View>
        <Text style = {styles.title}>Создание нового объекта</Text>
        <AppCard>
        <Text style={{color: 'red'}}>{findTrashSymbolsInfo(name).status !== 200 ?
        `Некорректные символы: ${Array
          .from(new Set(findTrashSymbolsInfo(name).error))
          .join('')}` :
        ''}</Text>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Название объекта'
        value        = {name}
        onChangeText = {(text) => {
          findTrashSymbolsInfo(text).status !== 200 ?
          setBorderBottomColor({...borderBottomColor, name: false}) : 
          setBorderBottomColor({...borderBottomColor, name: true})
          setName(text)
          
        }}/>
        
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Адрес объекта'
        value        = {address}
        onChangeText = {setAddress}/>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Описание'
        value        = {description}
        onChangeText = {setDescription}/>
        <TextInput 
        style = {styles.textarea}
        placeholder = 'Координаты'
        value = {coords}
        onChangeText = {setCoords}
        />
        </AppCard>
        <PhotoPicker onPick = {photoPickHandler}/>
        
     <Button 
     title    = 'Создать объект'
     onPress  = {createCorpusHandler}
     color    = {HEADER_FOOTER.MAIN_COLOR}
     disabled = {!name || !address || !description || !borderBottomColor.name}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewCorpus.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый объект',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title    = 'AddNewUser'
    iconName = 'ios-arrow-dropdown'
    onPress  = {() => navigation.navigate('CreateCorpus')}
    />
  </HeaderButtons>
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize      : 20,
        textAlign     : 'center',
        fontFamily    : 'open-regular',
        marginVertical: 10
    },
    textarea: {
        top              : -10,
        height           : 60,
        borderColor      : 'gray',
        borderBottomWidth: 1
    }
})