import React, { Component, useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, Image, TouchableHighlight, Alert } from 'react-native'
import {Navbar} from './src/components/Navbar'
import {QRCode} from './src/screens/qrcode'
import { MainScreen } from './src/screens/mainsreen'
import * as SQLite from 'expo-sqlite'
import { GraphPed} from './src/components/GraphPed'
// import { myPedometer } from './src/components/myPedometer'
export default function App(onOpen) {
  const myKey = {
    key_auth: null
  }
  const db = SQLite.openDatabase('db.db')
  
  function buildQ ()  {
    
     return new Promise(resolve => {
       db.transaction((tx) => { 
        tx.executeSql('select * from user_local', [], (_, { rows }) => {
          myKey.key_auth = JSON.stringify(rows['_array'][0]['key_auth'])
         resolve()                
       }                                
        )                               
      })
    })
    // console.log(abcd)
  }

  // getAsyncData()
  const loadGetDB = useCallback(async () => await getAsyncData(), [getAsyncData])
  
  useEffect(() => {
    console.log('hi')
    loadGetDB()
    
  }, [])
  async function getAsyncData() {
    console.log('start')
    await buildQ()
    if (myKey.key_auth) {
      setTodoId(1)
    }
  }
  // }, [])
  // setTimeout(()=> console.log(myKey.key_auth, 2), 400)
  getAsyncData()
  const [TodoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])
  const addTodo = (title, pas) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title,
      pas: pas
    }
    setTodos(prev => [
      ...prev, 
      {
      id: Date.now().toString(),
      title: title,
      pas: pas
    }
  ])
    
  }
  // console.log(todos)

  // var content = <QRCode/>
  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: "Отмена",
          style: "cancel"
        },
        { 
          text: "Удалить", 
          style: 'destructive',
          onPress: () => {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        } }
      ],
      { cancelable: false }
    );
    
  }

  let content = (
    <MainScreen 
    todos={todos} 
    addTodo={addTodo} 
    removeTodo={removeTodo} 
    openQR={setTodoId}/>
)
   
  // if (TodoId) {
  //   content = <QRCode goBack={() => setTodoId(null)}/>
  // }
  if (TodoId) {
    content = <GraphPed/>
  }
  // let my_footer = (<Image style={{height: 30, width: 30, opacity: 0.5}} source={require('3.png')} />);
  return (
    <View style={{flex: 1}}>
      
      <Navbar title='Электронный бригадир'/>
      
      <View style={styles.container}>
       
      {content}
      </View>
      <View style={{backgroundColor: '#B9B8B8', justifyContent: 'center', alignItems: 'center'}}>
      {/* <TouchableHighlight onPress={() => setTodoId(1)}> */}
      <Image onPress style={{height: 40, width: 40}} source={require('../klining-helper/src/images/3.png')} />
      {/* </TouchableHighlight> */}
      </View>
      
      {/* <View style={styles.frame}> */}
      
      {/* </View> */}
      
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: '18%',
    flex: 1,
    height: '89%'
  },
  text: {
    textAlign: 'center'
  },
  frame: {
    marginLeft: 20,
    marginRight: 20
    
  }
});



