import React from 'react'
import Router from 'react-native-easy-router'
import { Text, View } from 'react-native'

const First = ({ router }) => (
  <View style={{ backgroundColor: 'white', flex: 1 }}>
    <Text>First screen</Text>
    <Text onPress={() => router.push.Second({ name: 'John' })}>Go forward</Text>
  </View>
)

const Second = ({ router, name }) => (
  <View style={{ backgroundColor: 'pink', flex: 1 }}>
    <Text>Second screen</Text>
    <Text>Hello {name}!</Text>
    <Text onPress={() => router.pop()}>Go back</Text>
  </View>
)

const routes = { First, Second }
export default () => <Router routes={routes} initialRoute="First" />