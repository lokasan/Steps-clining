import React, {useCallback, useContext, useEffect} from 'react'
import {StyleSheet, View, FlatList, Image, ScrollView, Text} from 'react-native'
import { GraphContext } from '../context/graph/graphContext'
import { RenderEL } from '../components/renderEmploeeList'

export const EmploeeList = ({emploeeMy}) => {
    const {loadEmploee, emploee, fetchEmploees} = useContext(GraphContext)
    const loadingEmp = useCallback(async () => await fetchEmploees(), [fetchEmploees])
    
    useEffect(() => {
        loadingEmp()
    }, [])
    return (
        <View>
            <FlatList style={StyleSheet.frame}
            keyExtractor={item => item.id.toString()}
            data={emploee}
            renderItem={
                ({ item }) => <RenderEL emp={item} emploeeMy={emploeeMy}/>
            }
            />
        </View>
    )
}