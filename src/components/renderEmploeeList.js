import React, { useContext } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { ScreenContext } from '../context/screen/screenContext'
export const RenderEL = ({ emp }) => {
    const { todoId, changeScreen } = useContext(ScreenContext)
    return (
        <TouchableOpacity onPress={() => {
            console.log('Pressed', emp.key_auth)
           }}>
        <View style={styles.emp}>
            <Text style={{color: 'red'}}>{emp.userName} {emp.key_auth}</Text>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    emp: {
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