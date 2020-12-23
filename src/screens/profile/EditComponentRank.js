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
import { editComponentRank } from '../../store/actions/componentRank'

export const EditComponentRank = ({navigation}) => {
    const dispatch = useDispatch()

    const componentRank = navigation.getParam('componentRank')

    const componentRankId = componentRank.id
    const componentRankName = componentRank.name
    const componentRankRank = componentRank.rank
    const componentRankImg = componentRank.img
    const [name, setName] = useState(componentRankName)
    const [rank, setRank] = useState(componentRankRank.toString())
    
    const imgRef = useRef(componentRankImg)
    
    const photoPickHandler = uri => {
      imgRef.current = uri //path to img file
    }
    const editComponentRankHandler = () => {
      const componentRank = {
        id: componentRankId,
        name,
        rank,
        img: imgRef.current,
      }
      
      dispatch(editComponentRank(componentRank))
      
      navigation.navigate('ComponentInfo')
    }
    return <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
        <Text style={styles.title}>Редактирование критерия оценки</Text>
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
     title='Сохранить критерий оценки' 
     onPress={editComponentRankHandler} 
     color={HEADER_FOOTER.MAIN_COLOR}
     disabled={!name || !rank}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
EditComponentRank.navigationOptions = ({navigation}) => {
    const componentRank = navigation.getParam('componentRank')
    const componentRankName = componentRank.name
    const componentRankRank = componentRank.rank
    return {
        headerTitle: `${componentRankName} | ${componentRankRank}`, 
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item 
        title='AddNewUser'
        iconName='ios-arrow-dropdown'
        onPress={() => navigation.navigate('CreatePost')}
        />
    </HeaderButtons>
    }
}

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