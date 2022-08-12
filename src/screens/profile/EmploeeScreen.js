import React, {useCallback, useEffect, useState, useRef} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert, Modal, TouchableOpacity, Animated, Dimensions} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { DATA } from '../../testData'
import { Footer } from '../../components/ui/Footer'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { HEADER_FOOTER } from '../../theme'
import { getUserShift, removeEmploee, updateUserPrivileg, updateUserShift } from '../../store/actions/empDouble'
import {PinchGestureHandler, PanGestureHandler} from 'react-native-gesture-handler'
import { ArrowRight } from '../../components/ui/imageSVG/circle'
import { UploadDataToServer } from '../../uploadDataToServer'
import { ModalZoomable } from '../../components/ui/ModalZoomable'
var radio_props = [
    {label: 'Без прав', value: 0 },
    {label: 'Только чтение', value: 1 },
    {label: 'Чтение/Запись', value: 2}
  ]
const removeHandler = (emploee, dispatch, navigation) => {
    Alert.alert(
        "Удаление польователя",
        "Вы уверены, что хотите удалить пользователя " + emploee.name + ' ?',
        [
          
          {
            text: "Отменить",
            
            style: "cancel"
          }, 
          { text: "Удалить", style: 'destructive', onPress() {
            navigation.navigate('Emploees')
            dispatch(removeEmploee(emploee.id))
          } 
        }
        ],
        { cancelable: false }
      )
      
}
const width = Dimensions.get('window')

export const EmploeeScreen = ({route, navigation}) => {
   
    const dispatch = useDispatch()
    const [zoomable, setZoomable] = useState(false)
    const {emploeeId} = route.params
    const emploee = useSelector(state => state.empDouble.empServer.find(e => e.id === emploeeId))
    const [selectedValue, setSelectedValue] = useState(emploee ? emploee.privileg : 0)
    
    const [date, setDate] = useState(new Date(emploee?.start_shift ? parseInt(emploee.start_shift) : new Date().getTime()))
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date')
    useEffect(() => {
      dispatch(getUserShift(emploeeId))
    }, [])

    // console.log(emploee);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      dispatch(updateUserShift(emploee, currentDate.getTime()), emploeeId)
      
    }
    
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    }
    const showTimepicker = () => {
      

      showMode('time');

    }

    const updatedUserPrivileg =  useCallback(() => {
      dispatch(updateUserPrivileg(emploee))
    }, [dispatch, emploee])
    if (!emploee) {
      return null
    }
    
    
    return <React.Fragment><View style={{flex: 1, backgroundColor: '#000'}}>
        <ScrollView>
        <View style={[styles.container, styles.center]}>
    <View style={styles.userCard}>
    <View>
        <TouchableOpacity onPress={() => setZoomable(true)}>
        <Image source={{uri: emploee.img}} style={{height: 150, width: 150}}/>
        </TouchableOpacity>
    </View>
    <View style={styles.privateData}>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{emploee.surname} {emploee.name} {emploee.lastname}</Text>
        </View>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{emploee.email}</Text>
        </View>
        <View>
  <Text style={{color: '#fff', textAlign:'center'}}>{emploee.position}</Text>
        </View>
    </View>
   
</View>
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
          isSelected={selectedValue === i}
          onPress={(value) => {
            emploee.privileg = value
            updatedUserPrivileg(emploee)
            setSelectedValue(value)
          }}
          borderWidth={1}
          buttonInnerColor={'#303f9f'}
          buttonOuterColor={selectedValue === i ? 'red' : '#fff'}
          buttonSize={16}
          buttonOuterSize={24}
          buttonStyle={{}}
          buttonWrapStyle={{marginLeft: 10}}
        />
        <RadioButtonLabel
          obj={obj}
          index={i}
          labelHorizontal={true}
          onPress={(value) => {
            emploee.privileg = value
            updatedUserPrivileg(emploee)
            setSelectedValue(value)
          }}
          labelStyle={{fontSize: 12, color: '#2ecc71'}}
          labelWrapStyle={{}}
        />
      </RadioButton>
    ))
  }  
        </RadioForm>
        <View>
        {!show && (<Button onPress = {showTimepicker} title = 'Время начала смен'/>)}
        </View>
        {show && <DateTimePicker
          style={{color:"red"}}
          testID   = "dateTimePicker"
          value    = {date}
          mode     = {mode}
          is24Hour = {true}
          display  = "default"
          onChange = {onChange}
        />}
      </View>
    
</View>
</ScrollView>
<Button title='Удалить' color={HEADER_FOOTER.DANGER_COLOR} onPress={() => removeHandler(emploee, dispatch, navigation)}/>
{/* <Footer/> */}
</View>
<ModalZoomable zoomable={zoomable} setZoomable={setZoomable} pathImg={emploee.img}/>
{/* <Modal visible={zoomable} animationType='slide' animated>
  <View style={{ backgroundColor: '#000', position: 'relative', paddingTop: 30, paddingLeft: '90%'}}>
  <TouchableOpacity onPress={() => setZoomable(false)}>
    <ArrowRight/>
  </TouchableOpacity>
  </View>
  <PanGestureHandler onGestureEvent={handlePan}>
  <Animated.View style={{backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
<PinchGestureHandler onGestureEvent={handlePinch}>
    <Animated.Image source={{uri: emploee.img}} style={[styles.image, { transform: [{scale}, {translateX}, {translateY}]}]}/>
</PinchGestureHandler>
</Animated.View>
</PanGestureHandler>
</Modal> */}
</React.Fragment>
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400
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
        backgroundColor: '#1C1B1B'
    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '60%'
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
      }
})
EmploeeScreen.navigationOptions = ({route, navigation }) => {
    const name = route.params.emploeeName

    return {
        headerTitle: name
    }
}