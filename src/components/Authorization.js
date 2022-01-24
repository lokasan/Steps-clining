import React , {useState, useContext, useEffect, useMemo} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, InputBox, Alert, Image} from 'react-native'
import QRCode from '../screens/qrcode'
import {useDispatch, useSelector} from 'react-redux'
import { AppCard } from './ui/AppCard'
import * as SQLite from 'expo-sqlite'
import { GraphContext } from '../context/graph/graphContext'
import * as Google from 'expo-google-app-auth'
import { CreateUserInLocalBase } from './CreateUserInLocalBase'
import { DB } from '../db'
import { addEmploee, clearIsAccess, getAccess, getUsersServer, loadEmploeeDouble, updateUser } from '../store/actions/empDouble'
import { UploadDataToServer } from '../uploadDataToServer'
import { loadPost } from '../store/actions/post';
import { loadComponentRank } from '../store/actions/componentRank';
import { loadPostWithComponent } from '../store/actions/postWithComponent';
import { loadObject } from '../store/actions/object';
const IOS_CLIENT = '393783114907-tanuhn4qqds9vr7o58ksn58okss0qs5v.apps.googleusercontent.com'
const ANDROID_CLIENT = '393783114907-jrgn1caq85o8ns7bfe6reorj0vcjg7u4.apps.googleusercontent.com'
// import GoogleFit, { Scopes } from 'react-native-google-fit'
// import {VictoryChart, VictoryGroup, VictoryBar} from 'victory-native'
export const Authorization = ({navigation}) => {
    const {loadEmploee, emploee, fetchEmploees} = useContext(GraphContext)
    const [value, onChangeText] = useState('')
    dispatch = useDispatch()
    let   buildings                 = useSelector(state => state.object.objAll)
    let   components                = useSelector(state => state.component.componentAll)
    let   posts                     = useSelector(state => state.post.postAll)
    useEffect(() => {
        dispatch(loadObject())
    }, [])
    useEffect(() => {
        // console.log('USEFFECT BUILDINGS!!', JSON.stringify(buildings))
        for (let el of buildings) {
          dispatch(loadPost(el.id)) 
        }
      }, [buildings])
    
    //   useEffect(() => {
    //     console.log('USEFFECT COMPONENTS!!', JSON.stringify(components))
    //     for (el of components) {
    //       dispatch(loadComponentRank(el.id))
    //     }
    //   }, [components])
    
    //   useEffect(() => {
    //     console.log('USEFFECT POSTS!!', JSON.stringify(posts))
    //     for (el of posts) {
    //       dispatch(loadPostWithComponent(el.id))
    //     }
    //   }, [buildings])
    users = useSelector(state => state.empDouble.empAll)
    isAccess = useSelector(state => state.empDouble.isAccess)
    // console.log('MY UPLOAD USER', users)
    const empServer = useSelector(state => state.empDouble.empServer)
    isAccessMemo = useMemo(() => {
        return isAccess
    }, [isAccess])
    useEffect(() => {
        if (isAccess == -1) {
            Alert.alert('Неверный логин или пароль!')
            dispatch(clearIsAccess())
        }
        else if (isAccess == 1) {
            navigation.navigate('App')
            dispatch(clearIsAccess())
        }
    }, [isAccessMemo])
    useEffect(() => {
        dispatch(loadEmploeeDouble())
    }, [empServer])

    // useEffect(() => {
    //     dispatch(getUsersServer())
    // }, [])
    const [valueP, onChangeP] = useState('')
    const privileg = value.toString() === 'root-klining-steps' ? 'admin' : null
    const pressHandler = async () => {
        if (value.trim() && valueP.length) {
            onChangeText('')
            onChangeP('')
            await dispatch(getAccess(value, valueP))
            // navigation.navigate('App')
        } else {
            Alert.alert('Данные пусты')
        }
    }
    
    return (
        <View style={styles.forms}>
            <AppCard style={styles.card}>
                <TextInput 
                placeholder='Введите почту' 
                style={styles.textA} 
                onChangeText={text => onChangeText(text)}
                value={value}
                autoCorrect={false}
                autoCapitalize='none'
                ></TextInput>
                <TextInput 
                placeholder='Введите пароль' 
                secureTextEntry={true} 
                style={styles.textI} 
                onChangeText={text => onChangeP(text)}
                value={valueP}
                ></TextInput>
        </AppCard>
        <View style={styles.buttonsStyle}>
            <TouchableOpacity style={styles.button} onPress={() => {
                pressHandler() 
            }}>
            <Text style={styles.textB}>Войти</Text></TouchableOpacity>
            
        </View>
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
        height:40,
        width: '100%',
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