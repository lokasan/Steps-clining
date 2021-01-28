import React from 'react'
import  {StyleSheet, View, ActivityIndicator, Platform} from 'react-native'
import { HEADER_FOOTER } from '../../theme'

export const AppLoader = () => (
        <View style={styles.center}>
            <ActivityIndicator size='large' color={HEADER_FOOTER.MAIN_COLOR}/>
        </View>
        )

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})