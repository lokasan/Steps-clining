import React from 'react'
import {Platform} from 'react-native'
import { HEADER_FOOTER } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'

export const AppHeaderIcon = props => (
    <HeaderButton
        {...props}
        iconSize={24}
        IconComponent={Ionicons}
        
        color={Platform.OS === 'android' ? '#fff' : HEADER_FOOTER.MAIN_COLOR}/>
)