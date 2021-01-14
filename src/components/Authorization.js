import React , {useState, useContext, useEffect} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, InputBox, Alert, Image} from 'react-native'
import QRCode from '../screens/qrcode'
import {useDispatch, useSelector} from 'react-redux'
import { AppCard } from './ui/AppCard'
import * as SQLite from 'expo-sqlite'
import { GraphContext } from '../context/graph/graphContext'
import * as Google from 'expo-google-app-auth'
import { CreateUserInLocalBase } from './CreateUserInLocalBase'
import { DB } from '../db'
import { addEmploee, loadEmploeeDouble, updateUser } from '../store/actions/empDouble'
const IOS_CLIENT = '393783114907-tanuhn4qqds9vr7o58ksn58okss0qs5v.apps.googleusercontent.com'
const ANDROID_CLIENT = '393783114907-jrgn1caq85o8ns7bfe6reorj0vcjg7u4.apps.googleusercontent.com'
// import GoogleFit, { Scopes } from 'react-native-google-fit'
// import {VictoryChart, VictoryGroup, VictoryBar} from 'victory-native'
export const Authorization = ({navigation, onSubmit, onOpen}) => {
    const {loadEmploee, emploee, fetchEmploees} = useContext(GraphContext)
    const [value, onChangeText] = useState('')
    dispatch = useDispatch()
    users = useSelector(state => state.empDouble.empAll)
    useEffect(() => {
        dispatch(loadEmploeeDouble())
    }, [dispatch])
    // const [valueP, onChangeP] = useState('')
    const privileg = value.toString() === 'root-klining-steps' ? 'admin' : null
    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            onChangeText('')
            
            // onOpen(1)
            navigation.navigate('App')
            // onChangeP('')
        } else {
            Alert.alert('Данные пусты')
        }
    }
    const signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: ANDROID_CLIENT,
            iosClientId: IOS_CLIENT,
            scopes: [
              'profile', 
              'email', 
              'https://www.googleapis.com/auth/fitness.activity.read', 
              'https://www.googleapis.com/auth/fitness.body.read', 
              'https://www.googleapis.com/auth/fitness.activity.write',
              'https://www.googleapis.com/auth/fitness.body.write'],
          });
      
          if (result.type === 'success') {
            //   Alert.alert(JSON.stringify(result.user))
            
            let userInfoResponse = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', 
            {   method: 'POST',
                headers: 
                {
                    Authorization: `Bearer ${result.accessToken}`
                },
                body: JSON.stringify({
                  "aggregateBy": [{
                    "dataTypeName": "com.google.step_count.delta",
                    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                  }],
                  "bucketByTime": { "durationMillis": 86400000 },
                  "startTimeMillis": 1601455822683,
                  "endTimeMillis": new Date().getTime()
                })
            })
                .then((resp) => resp.json()).then((data) => console.log(data))
                .catch(err => console.log(typeof(err)))
            // console.log(userInfoResponse);
    
            const userEmp = {
                surname:result.user.name.toString().split(' ')[1],
                name:result.user.name.toString().split(' ')[0],
                lastname: 'Artemovich',
                position: 'system adm',
                email: result.user.email,
                privileg: '1',
                key_auth: Date.now().toString(),
                status: 1,
                img: 'photo',
                create_user_date: Date.now().toString()
            }
            // const response = await fetch(`https://217b1638873b.ngrok.io`, {
            //     method: 'POST', 
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }, 
            //     body: userEmp
            // })
            // .then(resp => {
            //     console.log(resp.json())
            //     return resp.json();
            // })
            if ((users.filter(e => e.email === result.user.email)).length) {
                dispatch(updateUser((users.filter(e => e.email === result.user.email))[0]))
            } else {
                dispatch(addEmploee(userEmp))
            }
            
            
            
            navigation.navigate('App')
            
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    // const qrOpen = () => {
    //     return (<QRCode/>)
    // }
    // const onPress = () => setCount(prevCount => prevCount + 1);
    return (
        <View style={styles.forms}>
            <AppCard style={styles.card}>
        <TextInput 
        placeholder='Введите логин' 
        style={styles.textA} 
        onChangeText={text => onChangeText(text)}
        value={value}
        autoCorrect={false}
        autoCapitalize='none'
        ></TextInput>
        {/* <TextInput 
        placeholder='Введите пароль' 
        secureTextEntry={true} 
        style={styles.textI} 
        onChangeText={text => onChangeP(text)}
        value={valueP}
        ></TextInput> */}
        </AppCard>
        <View style={styles.buttonsStyle}>
        <TouchableOpacity style={styles.buttonGoggle} onPress={() => signInWithGoogleAsync()}><Image style={{height: 30, width: 30, opacity: 1}} source={require('../images/Gauth.png')}/></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pressHandler}><Text style={styles.textB}>Войти</Text></TouchableOpacity>
        
        {/* <TouchableOpacity style={styles.button} onPress={() => onOpen('true')}><Text style={styles.textB}>QR Scanner</Text></TouchableOpacity> */}
        </View>
        {/* <View>
            <VictoryChart>
                <VictoryGroup>
                    <VictoryBar>
                        
                    </VictoryBar>
                </VictoryGroup>
            </VictoryChart>
        </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    textI: {
        height: 50, 
        borderColor: 'gray', 
        borderBottomWidth: 1
    },
    buttonGoggle: {
        alignItems: 'flex-end',
        backgroundColor: '#3949ab',
        padding: 5,
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightColor: 'gray',
        borderRightWidth: 1,
        top:30,
        height:40,
        marginBottom: '20%',
    },
    button: {
        alignItems: "center",
        backgroundColor: '#3949ab',
        padding: 10,
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        top:30,
        height:40,
        width: '85%',
        marginBottom: '20%',
        // width: '40%'
    },
    textB: {
        color: 'white'
    },
    forms: {
        paddingHorizontal: '18%',
        marginTop: '30%',
    },
    buttonsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textA: {
        top: -10,
        height: 60, 
        borderColor: 'gray', 
        borderBottomWidth: 1
    },
    card: {
        padding: 25,
        marginBottom: 20
    }
})