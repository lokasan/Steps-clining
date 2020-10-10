import React, { useContext, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { ScreenContext } from '../context/screen/screenContext'
export const RenderEL = ({ emp, emploeeMy }) => {
    const { todoId, changeScreen } = useContext(ScreenContext)
    const [myIsCo, setMyIsCo] = useState(0)
    console.log(emploeeMy, "");
    return (
        <TouchableOpacity onPress={() => {
            setMyIsCo(myIsCo + 1)
            // console.log('Pressed', emp.key_auth, '   ', myIsCo)
           }}>
        <View style={styles.emp}>
        <Text style={{color: 'red'}}>{emp.userName} steps: {emp.steps}  {myIsCo} {emploeeMy}</Text>
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