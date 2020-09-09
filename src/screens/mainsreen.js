import React, {useContext} from 'react';
import {StyleSheet, View, FlatList, Image, ScrollView, Text} from 'react-native'
import {Authorization} from '../components/Authorization'
import {Svg} from 'react-native-svg'
import {Todo} from '../components/Todo'
import {GraphPed} from '../components/GraphPed'
// import PureChart from 'react-native-pure-chart'
import {VictoryChart, VictoryGroup, VictoryBar, VictoryZoomContainer, VictoryScatter} from 'victory-native'
import { EmploeeContext } from '../context/emploee/authorizationContext';
import { ScreenContext } from '../context/screen/screenContext';
export const MainScreen = ({}) => {
  const {addTodo, todos, removeTodo} = useContext(EmploeeContext)
  const {changeScreen} = useContext(ScreenContext)
    return (
      
        <View>
        <Authorization onSubmit={addTodo} onOpen={changeScreen}/>
        
        <FlatList style={styles.frame}
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo}/>
        }
        
        />
        
      </View>
      
      
       
      
      
    )
    
}
const styles = StyleSheet.create({})