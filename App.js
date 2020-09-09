import React, { Component, useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList, Image, TouchableHighlight, Alert } from 'react-native'
import { MainLayout } from './src/MainLayout'
import { EmploeeState } from './src/context/emploee/AuthorizationState'
import { ScreenState } from './src/context/screen/ScreenState'
// import { myPedometer } from './src/components/myPedometer'
export default function App() {


  
   
  // if (TodoId) {
  //   content = <QRCode goBack={() => setTodoId(null)}/>
  // }
  
  // let my_footer = (<Image style={{height: 30, width: 30, opacity: 0.5}} source={require('3.png')} />);
  return (
    <ScreenState>
    <EmploeeState>
      <MainLayout />
    </EmploeeState>
    </ScreenState>
  )
}



