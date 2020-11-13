import React, {useCallback, useContext, useEffect} from 'react'
import {StyleSheet, View, FlatList, Image, ScrollView, Text} from 'react-native'
import { GraphContext } from '../context/graph/graphContext'
import { RenderEL } from '../components/renderEmploeeList'
import { useDispatch, useSelector } from 'react-redux'
import { loadListEmp, updateEmploeers } from '../store/actions/emp'
import {Cycle, Clock, Rank, QRIcon, StepsIcon} from '../components/ui/imageSVG/circle'
import {connect} from 'react-redux'

export const EmploeeList = ({emploeeMy, renderChartForEmploee, status, userActive}) => {
    const {loadEmploee, emploee, fetchEmploees} = useContext(GraphContext)
    const loadingEmp = useCallback(async () => await fetchEmploees(), [fetchEmploees])
    const dispatch = useDispatch()
    const allEmps = useSelector((state) => state.empList.emploee._55)
    
    // console.log("MOY NOVIY ", allEmps);
    useEffect(() => {
        // loadingEmp()
        dispatch(loadListEmp())
        // console.log('RENDER EMPLOEELIST')
        // console.log(emploeeMy);
        //остановился здесь
        // dispatch(updateEmploeers())
        
    }, [dispatch])
    
    return (
        <View>
            <View>
                
            <View style={styles.emp}>
                
            <View style={{flexWrap: 'wrap'}}>
                <Text style={{color: 'white'}}>Сотрудники</Text>
            </View> 
            <View style={styles.svg}>
                <View style={styles.textAndSvg}>
                    {Clock()}
                    <Text style={{color: 'white'}}>200</Text>
        
                </View>
                <View style={styles.textAndSvg}>
                    {Cycle()}
                    <Text style={{color: 'white'}}>200</Text>
                </View>
            </View>
            <View style={styles.textAndSvg}>
                
                    {Rank()}
                    
                    <Text style={{color: 'white'}}>200</Text>
                </View>
                <View style={styles.textAndSvg}>
                
                    {QRIcon()}
                    
                    <Text style={{color: 'white'}}>200</Text>
                </View>
                <View style={styles.textAndSvg}>
                    {StepsIcon()}
                    <Text style={{color: 'white'}}>185KK</Text>
                </View>
        {/* <Image source={require('../images/clock.png')}></Image> */}
        {/* <Text style={styles.char}>{emp.userName} steps: {emp.steps}  {myIsCo} {emploeeMy}</Text> */}
        </View>
            </View>
            <FlatList style={StyleSheet.frame}
            keyExtractor={item => item.id.toString()}
            data={allEmps}
            renderItem={
                ({ item }) => <RenderEL emp={item} emploeeMy={emploeeMy} renderChartForEmploee={renderChartForEmploee} status={status} userActive={userActive}/>
            }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    svg: {
        marginLeft: 'auto',
        // alignItems: 'flex-end',
        flexDirection: 'row',
        // justifyContent: 'flex-end'
        

    },
    textAndSvg: {
        alignItems: 'center',
        paddingRight: 10
    },
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
        borderTopWidth: 1,
        borderColor:'#eee',
        // borderRadius: 5,
        
    },
})

