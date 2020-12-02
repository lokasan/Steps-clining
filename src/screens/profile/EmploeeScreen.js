import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { DATA } from '../../testData'
import { Footer } from '../../components/ui/Footer'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { HEADER_FOOTER } from '../../theme'
import { removeEmploee } from '../../store/actions/empDouble'
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
export const EmploeeScreen = ({navigation}) => {
  const dispatch = useDispatch()
  
    
    const emploeeId = navigation.getParam('emploeeId')
    const emploee = useSelector(state => state.empDouble.empAll.find(e => e.id === emploeeId))
    const [selectedValue, setSelectedValue] = useState(emploee.privileg)
    if (!emploee) {
      return null
    }
    return <View style={{flex: 1, backgroundColor: '#000'}}>
        <ScrollView>
        <View style={styles.container, styles.center}>
    <View style={styles.userCard}>
    <View>
        <Image style={{height: 150, width: 150}} source={{uri: emploee.img}}/>
    </View>
    <View style={styles.privateData}>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{emploee.surName} {emploee.name} {emploee.lastName}</Text>
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
          onPress={(value) => {setSelectedValue(value)}}
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
          onPress={(value) => {setSelectedValue(value)}}
          labelStyle={{fontSize: 12, color: '#2ecc71'}}
          labelWrapStyle={{}}
        />
      </RadioButton>
    ))
  }  
        </RadioForm>
      </View>
</View>
</ScrollView>
<Button title='Удалить' color={HEADER_FOOTER.DANGER_COLOR} onPress={() => removeHandler(emploee, dispatch, navigation)}/>
{/* <Footer/> */}
</View>
}
const styles = StyleSheet.create({
    image: {
        width: '100%'
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
        justifyContent: 'space-evenly'
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
EmploeeScreen.navigationOptions = ({ navigation }) => {
    const name = navigation.getParam('emploeeName')

    return {
        headerTitle: name
    }
}