import React, { Component, useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, Image, TouchableHighlight, Alert } from 'react-native'
// import { MainLayout } from './src/MainLayout'
import { EmploeeState } from './src/context/emploee/AuthorizationState'
import { ScreenState } from './src/context/screen/ScreenState'
import { GraphState } from './src/context/graph/GraphState'
import { Provider } from 'react-redux'
import store from './src/store/index'
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'
import { AppNavigation } from './src/navigation/AppNavigation'
// import { myPedometer } from './src/components/myPedometer'
export default function App() {
  
  const [isReady, setIsReady] = useState(false)
  if (!isReady) {
    return <AppLoading 
    startAsync={bootstrap}
    onFinish={() => setIsReady(true)} 
    onError={err => console.log(err)}
      />
  }
  
   
  // if (TodoId) {
  //   content = <QRCode goBack={() => setTodoId(null)}/>
  // }
  
  // let my_footer = (<Image style={{height: 30, width: 30, opacity: 0.5}} source={require('3.png')} />);
  return (
    <Provider store={store}>
      <ScreenState>
        <EmploeeState>
          <GraphState>
          <AppNavigation/>
        </GraphState>
        </EmploeeState> 
      </ScreenState>
    </Provider>
    
  )
}



