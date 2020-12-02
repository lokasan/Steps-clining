import React, {useState, useCallback, useEffect, useContext} from 'react'
import {View, Image, StyleSheet, Alert, Button} from 'react-native'
// import {Navbar} from './components/Navbar'
import { MainScreen } from './screens/mainsreen'
import { EmploeeContext } from './context/emploee/authorizationContext'
import { GraphPed} from './components/GraphPed'

import {QRCode} from './screens/qrcode'
import { ScreenContext } from './context/screen/screenContext'
import { GraphContext } from './context/graph/graphContext'
import { EmploeeList } from './screens/EmploeeList'
import { getPhoto } from './UserDB'
import { Footer } from './components/ui/Footer'
// import { HeaderRightButton } from 'react-navigation-stack'
let navigationProfile = ''
export const MainLayout = ({ navigation }) => {
    const {loadEmploee, emploee, fetchEmploees} = useContext(GraphContext)
    // const {todos, addTodo, removeTodo} = useContext(EmploeeContext)
    const {todoId, changeScreen} = useContext(ScreenContext)
    // navigationProfile = navigation
    // const [TodoId, setTodoId] = useState(null)
    // const [todos, setTodos] = useState(emploeeContext.todos)
  const userStatus = null
    
      // getAsyncData()
      // var content = <QRCode/>
    //   const removeTodo = id => {
    //     const todo = emploeeContext.todos.find(t => t.id === id)
    //     Alert.alert(
    //       "Удаление элемента",
    //       `Вы уверены, что хотите удалить "${todo.title}"?`,
    //       [
    //         {
    //           text: "Отмена",
    //           style: "cancel"
    //         },
    //         { 
    //           text: "Удалить", 
    //           style: 'destructive',
    //           onPress: () => {
    //             setTodos(prev => prev.filter(todo => todo.id !== id))
    //         } }
    //       ],
    //       { cancelable: false }
    //     );
        
    //   }
    // todos={todos} 
    //     addTodo={addTodo} 
    //     removeTodo={removeTodo} 
    //     openQR={changeScreen}
    let content = <MainScreen/>
   
    if (todoId) {
        
        content = <GraphPed/>
      }
    
    return (
        <View style={{flex: 1}}>
      
      {/* <Navbar title='Электронный бригадир' photoProfile={getPhoto()}/> */}
      
      <View style={styles.container}>
       
      {content}
      </View>
      <Footer/>
      
      
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