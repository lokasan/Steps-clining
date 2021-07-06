import React, {useState, useRef, Fragment} from 'react'
import {View, Text, StyleSheet, TextInput, Modal, Pressable, ScrollView, Image, Button, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import DateTimePicker from '@react-native-community/datetimepicker'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { AppCard } from '../../components/ui/AppCard'
import { HEADER_FOOTER } from '../../theme'
import {useDispatch, useSelector} from 'react-redux'
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { addEmploee, sendMessageToMail } from '../../store/actions/empDouble'
import { PhotoPicker } from '../../components/PhotoPicker'
import { UploadDataToServer } from '../../uploadDataToServer'
import {Cycle, Clock, Rank, QRIcon, StepsIcon, PeopleIcon, errorData, successData} from '../../components/ui/imageSVG/circle'
import correctedTime, { msToTime } from '../../utils/msToTime'
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
    const keyssymbol = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 
    'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const keysnumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const dispatch                                  = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const [privileg, setPrivileg]                   = useState(0)
    const [name, setName]                           = useState('')
    const [surname, setSurName]                     = useState('')
    const [lastname, setLastName]                   = useState('')
    const [position, setPosition]                   = useState('')
    const [email, setEmail]                         = useState('')
    const [password, setPassword] = useState('')
    const [accessMail, setAccessMail] = useState(true)
    const imgRef                                    = useRef()
    const paswdRef = useRef()
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
    async function calculate() {
      let html = `<head>
          <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
        </head>
        <body>
          
          <h2 style="text-align: center;">Авторизационные данные пользователя</h2>
          <h2 style="text-align: center;">${surname} ${name} ${lastname}</h2>
          </body>
          <p>Логин <b>${email}</b></p>
          <p>Пароль <b>${password}</b></p>
          <p>Время начала смен <b>${correctedTime(date.getHours(), date.getMinutes(), 0).split(':', 2).join(':')}</b></p>
          </body>`;
      
      
      return html
      
      
  }
    async function execute() {
      let html = await calculate()
      
      const { uri } = await Print.printToFileAsync({ html });
      Sharing.shareAsync(uri);
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
    const navigationReturn = () => {
      navigation.navigate('Emploees')
    }
    
    const generatePassword = () => {
      let passwdGeneratedArray = []
      for (let i = 0; i < 3; i++) {
        
        passwdGeneratedArray.push(keyssymbol[Math.floor(Math.random() * keyssymbol.length)])
        passwdGeneratedArray.push(keysnumber[Math.floor(Math.random() * keysnumber.length)])
      }
      passwdGeneratedArray.sort(function shuffleArray() {
        return Math.random() - 0.5;
      })
      return passwdGeneratedArray.join('')
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
        start_shift     : date.getTime(),
        password: paswdRef.current
      }
      dispatch(addEmploee(emploee))
    }
    const checkedEmailIcon = function () {
      if (existsEmail) {
        return errorData('#f00')
      } else {
        return successData('#008000')
      }
    }
    
    return                   <Fragment>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Авторизационные данные</Text>
              <Text style={styles.modalText}>
                <Text>Пользователь </Text>
                <Text style={{fontWeight: 'bold'}}>{surname} {name} {lastname}</Text>
                <Text> успешно был создан</Text>
                </Text>
                <Text>Данные для входа: </Text>
                <View style={{margin: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>Логин: </Text>
                  <Text style={{fontWeight: 'bold'}}>{email}</Text>
                </View>
                <View style={{margin: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>Пароль: </Text>
                  <Text style={{fontWeight: 'bold'}}>{password}</Text>
                </View>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                style={({ pressed }) => [styles.button, pressed ? styles.buttonClosePressed : styles.buttonClose ]}
                onPress={() => {
                  
                  setModalVisible(!modalVisible)
                  navigationReturn()

                  }}>
                  <Text style={styles.textStyle}>Закрыть</Text>
              </Pressable>
              <Pressable disabled={!accessMail}
                style={() => [styles.button, !accessMail ? styles.buttonEmailSend : styles.buttonClose ]}
                onPress={() => {
                  setAccessMail(false)
                  // setModalVisible(!modalVisible)
                  dispatch(sendMessageToMail({surname, name, lastname, email, password, start_shift: correctedTime(date.getHours(), date.getMinutes(), 0).split(':', 2).join(':')}))

                  }}>
                  <Text style={styles.textStyle}>Отправить на почту</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.button, pressed ? styles.buttonClosePressed : styles.buttonClose]}
                onPress={execute}>
                  <Text style={styles.textStyle}>Прочее</Text>
              
              </Pressable>
              </View>
            </View>
          </View>
      </Modal>
      <ScrollView style = {styles.wrapper}>
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
     onPress  = {() => {
       paswdRef.current = generatePassword()
       setPassword(paswdRef.current)
       createUserHandler()
       setModalVisible(true)
      }}
     color    = {HEADER_FOOTER.MAIN_COLOR}
     disabled = {!name || !surname || !lastname || !email || existsEmail || !borderBottomColor.email || !position}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
    </Fragment>
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
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding:35,
      paddingBottom: 10,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonClosePressed: {
      backgroundColor: '#000'
    },
    buttonEmailSend: {
      backgroundColor: '#303f9f',
      opacity: 0.4
    },
    buttonClose: {
      backgroundColor: '#303f9f',
    },
    buttonDeletePressed: {
      backgroundColor: 'green',
    },
    buttonDelete: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center'
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22
    }
})