import React, {useState, useCallback, useEffect, useContext, Alert} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {Navbar} from './components/Navbar'
import { MainScreen } from './screens/mainsreen'
import { EmploeeContext } from './context/emploee/EmploeeContext'
import { GraphPed} from './components/GraphPed'
import * as SQLite from 'expo-sqlite'
import {QRCode} from './screens/qrcode'

export const MainLayout = () => {
    const emploeeContext = useContext(EmploeeContext)
    console.log(emploeeContext)
    const [TodoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])

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
    if (TodoId) {
        content = <GraphPed/>
      }

    return (
        <View style={{flex: 1}}>
      
      <Navbar title='Электронный бригадир'/>
      
      <View style={styles.container}>
       
      {content}
      </View>
      <View style={{backgroundColor: '#B9B8B8', justifyContent: 'center', alignItems: 'center'}}>
      {/* <TouchableHighlight onPress={() => setTodoId(1)}> */}
      <Image onPress style={{height: 40, width: 40}} source={require('./images/3.png')} />
      {/* </TouchableHighlight> */}
      </View>
      
      {/* <View style={styles.frame}> */}
      
      {/* </View> */}
      
      
    </View>
    )
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