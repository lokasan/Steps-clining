import React from 'react';
import { View, Image } from 'react-native'

export const ArrowTrand = React.memo(({item}) => {
    switch (item.trand) {
      case 1: return (
      <>
        
        <View  style  = {{alignItems: 'center'}}>
        <Image  source = {require('../../images/ArrowUp.png')}/>
        </View>
        
      </>
      )
      case 0: return (
        <>
        
        <View  style  = {{alignItems: 'center'}}>
        <Image  source = {require('../../images/stability.jpg')}/>
        </View>

      </>
      )
      case -1: return (
      <>
        
        <View  style  = {{alignItems: 'center'}}>
        <Image  source = {require('../../images/ArrowDown.png')}/>
        </View>

      </>
      )
    default: return null
    }
  }, (prevProps, nextProps) => {
    return nextProps.item.trand === prevProps.item.trand ? true : false
  })