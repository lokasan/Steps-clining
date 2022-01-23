import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
export const Todo = ({ todo, onRemove }) => {
    // console.log(todo)
    return (
        <TouchableOpacity onPress={() => console.log('Pressed', todo.id)}
        >
        <View style={styles.todo}>
            <Text>{todo.title} {todo.pas}</Text>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    todo: {
        // flexDirection: 'row',
        marginHorizontal: '18%',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor:'#eee',
        borderRadius: 5,
        marginBottom: 10
        
        
        
        
    }
})