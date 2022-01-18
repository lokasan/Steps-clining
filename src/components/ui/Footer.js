import React from 'react'
import { View, Image, TouchableOpacity} from 'react-native'
// import { Background } from 'victory-native'
import { HEADER_FOOTER } from '../../theme'
import { Platform } from 'react-native'

export const Footer = () => {
    return (
        <View style={{backgroundColor: `${Platform.OS === 'android' ? HEADER_FOOTER.MAIN_COLOR : '#fff'}`, justifyContent: 'center', alignItems: 'center'}}>
      {/* <TouchableHighlight onPress={() => setTodoId(1)}> */}
      {/* {emploee} */}
      <Image onPress style={{ height: 40, width: 40, borderRightWidth: 1, borderLeftWidth: 1, borderRadius: 5}} source={require('../../images/3.png')} />
      {/* </TouchableHighlight> */}
      </View>
      
    //   {/* <View style={styles.frame}> */}
      
    //   {/* </View> */}
    )
}
