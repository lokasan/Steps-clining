import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { AppCard } from '../../components/ui/AppCard'
import { HEADER_FOOTER } from '../../theme'
import {useDispatch} from 'react-redux'
import { addEmploee } from '../../store/actions/empDouble'
import { PhotoPicker } from '../../components/PhotoPicker'

var radio_props = [
    {label: 'Без прав', value: 0 },
    {label: 'Только чтение', value: 1 },
    {label: 'Чтение/Запись', value: 2}
  ]
export const CreateNewUser = ( {navigation} ) => {
  const dispatch = useDispatch()
    const [privileg, setPrivileg] = useState(0)
    const [name, setName] = useState('')
    const [surname, setSurName] = useState('')
    const [lastname, setLastName] = useState('')
    const [position, setPosition] = useState('')
    const [email, setEmail] = useState('')
    const imgRef = useRef()
    const photoPickHandler = uri => {
      imgRef.current = uri
    }
    const createUserHandler = () => {
      const emploee = {
        surname,
        name,
        lastname,
        position,
        email,
        privileg,
        key_auth: 1,
        status: 1,
        img: imgRef.current,
        createdUserDate: 5
      }
      dispatch(addEmploee(emploee))
      navigation.navigate('Emploees')
    }
    return <ScrollView style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View>
        <Text style={styles.title}>Создание нового пользователя</Text>
        <AppCard>
        <TextInput
        style={styles.textarea}
        placeholder='Фамилия'
        value={surname}
        onChangeText={setSurName}/>
        
        <TextInput
        style={styles.textarea}
        placeholder='Имя'
        value={name}
        onChangeText={setName}/>
        <TextInput
        style={styles.textarea}
        placeholder='Отчество'
        value={lastname}
        onChangeText={setLastName}/>
        <TextInput
        style={styles.textarea}
        placeholder='Должность'
        value={position}
        onChangeText={setPosition}/>
        <TextInput
        style={styles.textarea}
        placeholder='Почта'
        value={email}
        onChangeText={setEmail}/>
        </AppCard>
        <PhotoPicker onPick={photoPickHandler}/>
        <View style={styles.radioButton}>
        <RadioForm
          labelColor={'white'}
          formHorizontal={true}
          animation={true}>
              {
    radio_props.map((obj, i) => (
      <RadioButton labelHorizontal={true} key={i} >
        {/*  You can set RadioButtonLabel before RadioButtonInput */}
        <RadioButtonInput
          obj={obj}
          index={i}
          isSelected={privileg === i}
          onPress={(value) => {setPrivileg(value)}}
          borderWidth={1}
          buttonInnerColor={'#303f9f'}
          buttonOuterColor={privileg === i ? 'red' : '#fff'}
          buttonSize={16}
          buttonOuterSize={24}
          buttonStyle={{}}
          buttonWrapStyle={{marginLeft: 10}}
        />
        
        <RadioButtonLabel
          obj={obj}
          index={i}
          labelHorizontal={true}
          onPress={(value) => {setPrivileg(value)}}
          labelStyle={{fontSize: 12, color: '#2ecc71'}}
          labelWrapStyle={{}}
        />
      </RadioButton>
    ))
  }  
        </RadioForm>
      </View>
     <Button 
     title='Создать пользователя' 
     onPress={createUserHandler} 
     color={HEADER_FOOTER.MAIN_COLOR}
     disabled={!name || !surname || !lastname || !email || !position}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewUser.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый пользователь', 
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-arrow-dropdown'
    onPress={() => navigation.navigate('CreateUser')}
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
    },
    radioButton: {
      marginBottom: 10
    }
})