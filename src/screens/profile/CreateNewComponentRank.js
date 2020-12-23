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
import { addComponentRank, updateComponentRank } from '../../store/actions/componentRank'

export const CreateNewComponentRank = ({navigation}) => {
    const dispatch = useDispatch()
    const component_id = navigation.getParam('componentId')
    const listComponentRank = navigation.getParam('listComponentRank')
    const [name, setName] = useState('')
    const countComponentRank = navigation.getParam('countComponentRank')
    const currentRankForComponent = (5 / (countComponentRank)).toFixed(2)
    const [rank, setRank] = useState(currentRankForComponent.toString())
    
    const imgRef = useRef()
    const photoPickHandler = uri => {
      imgRef.current = uri
    }
    const createComponentRankHandler = () => {
      const componentRank = {
        component_id,
        name,
        rank,
        img: imgRef.current,
      }
      
      if (countComponentRank !== 1){
        dispatch(updateComponentRank(listComponentRank, listComponentRank.length + 1, count=2))
      }
      dispatch(addComponentRank(componentRank))
      
      navigation.navigate('ComponentInfo')
    }
    return <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
        <Text style={styles.title}>Создание нового критерия оценки</Text>
        <AppCard>
        <TextInput
        style={styles.textarea}
        placeholder='Название критерия'
        value={name}
        onChangeText={setName}/>
        
        <TextInput
        style={styles.textarea}
        placeholder='Балл'
        value={rank}
        onChangeText={setRank}
        editable={false}/>
        </AppCard>
        <PhotoPicker onPick={photoPickHandler}/>
        
     <Button 
     title='Создать критерий оценки' 
     onPress={createComponentRankHandler} 
     color={HEADER_FOOTER.MAIN_COLOR}
     disabled={!name || !rank}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewComponentRank.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый критерий оценки', 
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-arrow-dropdown'
    onPress={() => navigation.navigate('CreatePost')}
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