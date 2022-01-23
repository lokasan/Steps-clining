import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { AppCard } from '../../components/ui/AppCard'
import { HEADER_FOOTER } from '../../theme'
import {useDispatch} from 'react-redux'
import { addEmploee } from '../../store/actions/empDouble'
import { addPost } from '../../store/actions/post'
import { PhotoPicker } from '../../components/PhotoPicker'
import { QRCodePicker } from '../../components/QRCodePicker'
import findTrashSymbolsInfo from '../../utils/findTrashSymbolsInfo'

export const CreateNewPost = ({navigation}) => {
    const dispatch = useDispatch()
    const building_id = navigation.getParam('objectId')
    const [name, setName] = useState('')
    const [borderBottomColor, setBorderBottomColor] = useState({
      name    : false,
    })
    const [description, setDescription] = useState('')
    const imgExtensionsRef = useRef()
    const imgRef = useRef()
    const qrRef = useRef()
    const qrcodePickHandler = uri => {
      qrRef.current = uri
    }
    const photoPickHandler = uri => {
      imgRef.current = uri
      imgExtensionsRef.current = '.' + uri.split('.')[uri.split('.').length - 1]
    }
    const createPostHandler = () => {
      const post = {
        building_id,
        name,
        description,
        img: imgRef.current,
        qrcode: String(Date.now()) + name,
        qrcode_img: qrRef.current,
        extensions: imgExtensionsRef.current
        
      }
      dispatch(addPost(post))
      navigation.navigate('ObjectInfo')
    }
    return <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
        <Text style={styles.title}>Создание нового поста</Text>
        <AppCard>
        <Text style={{color: 'red'}}>{findTrashSymbolsInfo(name).status !== 200 ?
        `Некорректные символы: ${Array
          .from(new Set(findTrashSymbolsInfo(name).error))
          .join('')}` :
        ''}</Text>
        <TextInput
        style={styles.textarea}
        placeholder='Название поста'
        value={name}
        onChangeText={(text) => {
          findTrashSymbolsInfo(text).status !== 200 ?
          setBorderBottomColor({...borderBottomColor, name: false}) : 
          setBorderBottomColor({...borderBottomColor, name: true})
          setName(text)
          
        }}/>
        
        <TextInput
        style={styles.textarea}
        placeholder='Описание'
        value={description}
        onChangeText={setDescription}/>
        </AppCard>
        <PhotoPicker onPick={photoPickHandler}/>
        <Button 
     title='Создать пост' 
     onPress={createPostHandler} 
     color={HEADER_FOOTER.MAIN_COLOR}
     disabled={!name || !description || !borderBottomColor.name}/>
        <QRCodePicker value={name} onPick={qrcodePickHandler}/>

        
     
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewPost.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый пост'
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