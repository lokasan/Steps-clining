import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView, Image, Button, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import DateTimePicker from '@react-native-community/datetimepicker'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { AppCard } from '../../components/ui/AppCard'
import { HEADER_FOOTER } from '../../theme'
import {useDispatch, useSelector} from 'react-redux'
import { addEmploee } from '../../store/actions/empDouble'
import { PhotoPicker } from '../../components/PhotoPicker'
import { UploadDataToServer } from '../../uploadDataToServer'
import {Cycle, Clock, Rank, QRIcon, StepsIcon, PeopleIcon, errorData, successData} from '../../components/ui/imageSVG/circle'
import correctedTime from '../../utils/msToTime'
import { DB } from '../../db'

var radio_props = [
    {label: 'Без прав', value: 0 },
    {label: 'Только чтение', value: 1 },
    {label: 'Чтение/Запись', value: 2}
  ]
export const CreateNewUser = ( {navigation} ) => {
  // timePicker state
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    }
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    }
  
    const showDatepicker = () => {
      showMode('date');
    }
  
    const showTimepicker = () => {
      showMode('time');
    }



    const dispatch                                  = useDispatch()
    const [privileg, setPrivileg]                   = useState(0)
    const [name, setName]                           = useState('')
    const [surname, setSurName]                     = useState('')
    const [lastname, setLastName]                   = useState('')
    const [position, setPosition]                   = useState('')
    const [email, setEmail]                         = useState('')
    const imgRef                                    = useRef()
    const [borderBottomColor, setBorderBottomColor] = useState({
      surname : false,
      name    : false,
      lastname: false,
      email   : false,
    })
    const existsEmail      = useSelector(state => state.empList.existsEmail)
    const photoPickHandler = uri => {
      imgRef.current = uri
    }
    const validateEmail = (text) => {
      console.log(text);
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(text) === false) {
        console.log("Email is Not Correct");
        setEmail(text)
        setBorderBottomColor({...borderBottomColor, email: false})
        return false;
      }
      else {
        setEmail(text)
        setBorderBottomColor({...borderBottomColor, email: true})
        UploadDataToServer.checkUserEmail(text)
        console.log("Email is Correct");
        console.log(existsEmail)
      }
    }

    const createUserHandler = () => {
      const emploee = {
        surname,
        name,
        lastname,
        position,
        email,
        privileg,
        key_auth        : 1,
        status          : 0,
        img             : imgRef.current,
        create_user_date: Date.now().toString(),
        start_shift     : correctedTime(
          date.getHours(), 
          date.getMinutes(), 
          date.getSeconds())
          .split(':')
          .slice(0, 2)
          .join(':')
      }
      dispatch(addEmploee(emploee))
      navigation.navigate('Emploees')
    }
    const checkedEmailIcon = function () {
      if (existsEmail) {
        return errorData('#f00')
      } else {
        return successData('#008000')
      }
    }
    
    return                    <ScrollView style = {styles.wrapper}>
    <TouchableWithoutFeedback onPress           = {() => Keyboard.dismiss()}>
            <View>
        <Text style = {styles.title}>Создание нового пользователя</Text>
        <AppCard>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Фамилия'
        value        = {surname}
        onChangeText = {setSurName}/>
        
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Имя'
        value        = {name}
        onChangeText = {setName}/>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Отчество'
        value        = {lastname}
        onChangeText = {setLastName}/>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Должность'
        value        = {position}
        onChangeText = {setPosition}/>
        <View>
        <TextInput
        style        = {borderBottomColor.email && !existsEmail ? {...styles.textarea, borderColor: '#008000'} : {...styles.textarea, borderColor: 'red'}}
        placeholder  = 'Почта'
        value        = {email.trim()}
        onChangeText = {text => validateEmail(text)}/>
        {borderBottomColor.email ? <View style={{position: 'absolute', bottom: 30, right: 10}}>
          {checkedEmailIcon()}
        </View> : null}
        </View>
        <View style = {{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <View>
        {!show && (<Button onPress = {showTimepicker} title = 'Время начала смен'/>)}
        </View>
        <View>
        {show && (
        <DateTimePicker
          style={{color:"red"}}
          testID   = "dateTimePicker"
          value    = {date}
          mode     = {mode}
          is24Hour = {true}
          display  = "default"
          onChange = {onChange}
        />
      )}
      </View>
        </View>
        </AppCard>
        
        <PhotoPicker onPick = {photoPickHandler}/>
        <View        style  = {styles.radioButton}>
        <RadioForm
          labelColor     = {'white'}
          formHorizontal = {true}
          animation      = {true}>
              {
    radio_props.map((obj, i) => (
      <RadioButton labelHorizontal = {true} key = {i} >
        {/*  You can set RadioButtonLabel before RadioButtonInput */}
        <RadioButtonInput
          obj              = {obj}
          index            = {i}
          isSelected       = {privileg === i}
          onPress          = {(value) => {setPrivileg(value)}}
          borderWidth      = {1}
          buttonInnerColor = {'#303f9f'}
          buttonOuterColor = {privileg === i ? 'red' : '#fff'}
          buttonSize       = {16}
          buttonOuterSize  = {24}
          buttonStyle      = {{}}
          buttonWrapStyle  = {{marginLeft: 10}}
        />
        
        <RadioButtonLabel
          obj             = {obj}
          index           = {i}
          labelHorizontal = {true}
          onPress         = {(value) => {setPrivileg(value)}}
          labelStyle      = {{fontSize: 12, color: '#2ecc71'}}
          labelWrapStyle  = {{}}
        />
      </RadioButton>
    ))
  }  
        </RadioForm>
      </View>
      <Button title='create column' onPress={() => DB.createAlter()}/>
     <Button 
     title    = 'Создать пользователя'
     onPress  = {createUserHandler}
     color    = {HEADER_FOOTER.MAIN_COLOR}
     disabled = {!name || !surname || !lastname || !email || existsEmail || !borderBottomColor.email || !position}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewUser.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый пользователь',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title    = 'AddNewUser'
    iconName = 'ios-arrow-dropdown'
    onPress  = {() => navigation.navigate('CreateUser')}
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
    },
    radioButton: {
      marginBottom: 10
    }
})