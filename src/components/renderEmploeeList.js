import React, { useContext, useState, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { ScreenContext } from '../context/screen/screenContext'
import { GraphContext } from '../context/graph/graphContext'
import {Cycle, Clock, Rank, QRIcon, StepsIcon} from '../components/ui/imageSVG/circle'
export const RenderEL = ({ emp, emploeeMy, renderChartForEmploee, status, userActive }) => {
    const { todoId, changeScreen, emploee } = useContext(ScreenContext)
    const { updateEmploee } = useContext(GraphContext)
    const [myIsCo, setMyIsCo] = useState(false)
    
    // console.log(emp.key_auth, "item ", emp.id);
    // console.log('Количество шагов', emp.steps)
    return (
        <TouchableOpacity onPress={() => {
            // updateEmploee('1599678906428', 666)
            // emploeeMyList.current.steps++;
            setMyIsCo(myIsCo + 1)
            renderChartForEmploee(emp.key_auth, status)
            // myIsCo ? setMyIsCo(false) : setMyIsCo(true)
            // console.log('Pressed', emp.key_auth, '   ', myIsCo)
           }}>
        <View style={styles.emp}>
            <View style={{flexWrap: 'wrap'}}>
                <Text style={userActive === emp.key_auth ? {color: 'green'} : {color: 'white'}}>{emp.userName}</Text>
            </View> 
            <View style={styles.svg}>
                <View style={styles.textAndSvg}>
                    <View style={{opacity: 0, position: 'absolute'}}>
                    {Clock()}
                    </View>
                    <Text style={{color: 'white', position: 'relative'}}>200</Text>
        
                </View>
                <View style={styles.textAndSvg}>
                <View style={{opacity: 0, position: 'absolute'}}>
                    {Cycle()}
                    </View>
                    <Text style={{color: 'white', position: 'relative'}}>200</Text>
                </View>
                <View style={styles.textAndSvg}>
                <View style={{opacity: 0, position: 'absolute'}}>
                    {Rank()}
                    </View>
                    <Text style={{color: 'white', position: 'relative'}}>200</Text>
                </View>
                <View style={styles.textAndSvg}>
                <View style={{opacity: 0, position: 'absolute'}}>
                    {QRIcon()}
                    </View>
                    <Text style={{color: 'white', position: 'relative'}}>200</Text>
                </View>
                <View style={styles.textAndSvg}>
                <View style={{opacity: 0, position: 'absolute'}}>
                    {StepsIcon()}
                    </View>
                    <Text style={{color: 'white', position: 'relative'}}>{emp.steps} {emploeeMy}</Text>
                </View>
            </View>
        {/* <Image source={require('../images/clock.png')}></Image> */}
        {/* <Text style={styles.char}>{emp.userName} steps: {emp.steps}  {myIsCo} {emploeeMy}</Text> */}
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    emp: {
        // flexDirection: 'row',
        // marginHorizontal: '0%',
        // alignItems: 'center',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        // alignContent: 'space-between',
        // justifyContent: 'space-around',
        justifyContent: 'flex-end',
        padding: 10,
       
        borderBottomWidth: 1,
        
        borderColor:'#eee',
        borderRadius: 5,
        
    },
    activeEmp: {
        marginHorizontal: '18%',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor:'green',
        borderRadius: 5,
        marginBottom: 10
    }, 
    char: {
        color: 'white'
    },
    textAndSvg: {
        alignItems: 'center',
        // paddingRight: 10,
        marginRight: 10,
        // position: 'absolute'
    },
    svg: {
        marginLeft: 'auto',
        // alignItems: 'flex-end',
        flexDirection: 'row',
        // justifyContent: 'flex-end'
        

    }
})