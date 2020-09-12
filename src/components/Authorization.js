import React , {useState} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity, InputBox, ALert, Alert} from 'react-native'
import QRCode from '../screens/qrcode'
import { AppCard } from './ui/AppCard'
import * as SQLite from 'expo-sqlite'
// import {VictoryChart, VictoryGroup, VictoryBar} from 'victory-native'
export const Authorization = ({onSubmit, onOpen}) => {
    const [value, onChangeText] = useState('')
    // const [valueP, onChangeP] = useState('')
    const privileg = value.toString() === 'root-klining-steps' ? 'admin' : null
    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value)
            onChangeText('')
            const db = SQLite.openDatabase('db.db')
            db.transaction(tx => { 
                // console.log('create table')
                tx.executeSql("create table if not exists user_local (id integer primary key autoincrement not null, name text not null, key_auth text not null unique, status text);")
                // tx.executeSql("drop table user_local;")
                // console.log('insert user')
                tx.executeSql("create table if not exists step_time (id integer primary key autoincrement not null, user_id integer not null, \
                    count_step integer not null, date_time text not null, current_time text not null, foreign key (user_id) references user_local(id));")
                tx.executeSql("insert into user_local (name, key_auth, status) values (?, ?, ?);", [value.toString(), Date.now().toString(), privileg])
                tx.executeSql('select * from user_local', [], (_, { rows }) =>
                console.log(JSON.stringify(rows['_array']))
                                    )
                
              })
              onOpen(1)
              
            // onChangeP('')
        } else {
            Alert.alert('Данные пусты')
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
   
    button: {
        alignItems: "center",
        backgroundColor: '#3949ab',
        padding: 10,
        borderRadius: 5,
        top:30,
        height:40,
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
        // flexDirection: 'row',
        // justifyContent: 'space-between'
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