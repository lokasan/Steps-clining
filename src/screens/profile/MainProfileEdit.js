import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const MainProfileEdit = () => {
    return <View style={styles.center}>
        <Text>Редактирование</Text>
    </View>
}

MainProfileEdit.navigationOptions = {
    headerTitle: 'Редактирование'
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})