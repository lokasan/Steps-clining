import React, {useState, useReducer} from 'react';
import {StyleSheet, View, FlatList, Image, ScrollView, Text, TouchableOpacity} from 'react-native'
import {EmploeeContext} from './authorizationContext'
import {emploeeReducer} from './authorizationReducer'
import { ADD_TODO, REMOVE_TODO } from '../../components/types';


export const EmploeeState = ({ children }) => {
    const initialState = {
        todos: [],
        emploeeAndSteps: [],
        loading: false,
        error: null
    }
    const [state, dispatch] = useReducer(emploeeReducer, initialState)
    
   

    const addTodo = (title, pas) => dispatch({type: ADD_TODO, title, pas})
    const removeTodo = id => dispatch({type: REMOVE_TODO, id})
    
    return (
    <EmploeeContext.Provider 
        value={{
            todos: state.todos,
            addTodo, 
            removeTodo
        }}>
        {children}
    </EmploeeContext.Provider>
    )
}
const styles = StyleSheet.create({
    mainView: {
        marginTop: 20,
        borderWidth: 0.3,
        borderColor: '#C4C4C4',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mainText: {
        color: 'white',
        fontSize: 20
    }
})
{/* <View style={styles.mainView}>
            <View>
                <Text style={styles.mainText}>Сотрудники</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../../images/steps.png')}/>
                <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>{}</Text>
            </View>
        </View> */}