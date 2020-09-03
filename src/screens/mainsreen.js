import React from 'react';
import {StyleSheet, View, FlatList, Image, ScrollView, Text} from 'react-native'
import {Authorization} from '../components/Authorization'
import {Svg} from 'react-native-svg'
import {Todo} from '../components/Todo'
import {GraphPed} from '../components/GraphPed'
// import PureChart from 'react-native-pure-chart'
import {VictoryChart, VictoryGroup, VictoryBar, VictoryZoomContainer, VictoryScatter} from 'victory-native'
export const MainScreen = ({ addTodo, todos, removeTodo, openQR}) => {
    return (
      
        <View>
        <Authorization onSubmit={addTodo} onOpen={openQR}/>
        
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