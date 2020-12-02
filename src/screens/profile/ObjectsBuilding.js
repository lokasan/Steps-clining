import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const ObjectsBuilding = () => {
    return <View style={styles.center}>
        <Text>Объекты</Text>
    </View>
}

ObjectsBuilding.navigationOptions = {
    headerTitle: 'Объекты'
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})