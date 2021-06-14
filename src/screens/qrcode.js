'use strict';
import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, Animated, FlatList, Alert } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { withNavigationFocus } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getPostAll } from '../store/actions/post';
import { clearPostWithComponent, loadPostWithComponent } from '../store/actions/postWithComponent';
import ActiveComponentsCard from '../components/ActiveComponentsCard';
import { createBypass, loadBypass } from '../store/actions/bypass';

export const QRCode = ({goBack, navigation}) => {


  const dispatch = useDispatch()
  const [isFocused, setIsFocused] = useState(true)
  const posts = useSelector(state => state.post.postAlls)
  const postsWithComponent = useSelector(state => state.postWithComponent.postWithComponentAll)
  const bypassId = useSelector(state => state.bypass.bypassNumber)
  // console.log('Hello', bypassId)
  const userId = useSelector(state => state.empDouble.empAll.filter(e => e.status === 1))
  // console.log(userId[0].id, 'HELLO USER NAMERS');
  let didBlurSubscription = navigation.addListener(
    'didBlur',
    payload => {
      setIsFocused(navigation.isFocused())
      console.debug('didBlur', payload, isFocused);


    }
  );
  // console.log(isFocused, 'hiiii');
  let didFocusSubscription = navigation.addListener(
    'didFocus',
    payload => {
      setIsFocused(navigation.isFocused())
      // console.debug('didFocus', payload, isFocused);


    }
  );
 
  console.log(didBlurSubscription);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScan, setDataScan] = useState(null);
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
  const DataOperation = (data) => {
    setDataScan(data)
    // console.log(data)
  }

  useEffect(() => {
    dispatch(getPostAll())
  }, []) 

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [dispatch]);
  useEffect(() => {
    return function cleanup() {
      didFocusSubscription.remove()
      didBlurSubscription.remove()
    } 
  })
  useEffect(() => {
    for (const element of posts) {
      if (dataScan === element.name) {
        dispatch(loadBypass(userId[0].id, element.id))
        dispatch(loadPostWithComponent(element.id))
        
      }
    }
  }, [dataScan])
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    return DataOperation(data)
    
    
  };
  const goBackQRScreen = () => {
    setScanned(false)
    setDataScan(undefined)
  }
  let content = (<Image style={{height: 300, width: 300, marginHorizontal: '15%', marginTop: '30%', opacity: 0.5}} source={require('../images/3.png')} />);
  for (const element of posts){
    // console.log(element);
    if (dataScan === element.name) {
      console.log(postsWithComponent, ' MY Data test');
      
      const x = new Animated.Value(0) 
      const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x } }}], { useNativeDriver: true })
      return <View style={{flex: 1}}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => {
            if (bypassId === -1) {
              // dispatch(createBypass(userId.id, element.id, gismeteo.weather. gismeteo.temperature))
              fetch('http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=1127426f6c715f020198315e1b366cba&lang=ru')
              .then((res) => res.json())
              .then(data => {
                console.log(Math.round(data.main.temp - 272.1), data.weather[0].description)
                dispatch(createBypass(userId[0].id, element.id, data.weather[0].description, parseInt(Math.round(data.main.temp - 272.1)), data.weather[0].icon))
                navigation.navigate('BypassScreen', {postsWithComponent, element, goBackQRScreen})
              }).catch((err) => console.log(err))
            } else {
              
              navigation.navigate('BypassScreen', {postsWithComponent, element, goBackQRScreen})
              Alert.alert('Hello')
            }
              }}>
      <Image style={styles.image} source={{uri: element.img}}/>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() =>{goBackQRScreen(); dispatch(clearPostWithComponent());}}>
        <Text style={styles.title}>{element.name}</Text>
        
      </TouchableOpacity>
      <AnimatedFlatList
        scrollEventThrottle={16}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={postsWithComponent}
        renderItem={({ index, item: item }) => (
          <ActiveComponentsCard {...{ index, x, item}} />
        )}
        keyExtractor={(item) => String(item.id)}
        {...{onScroll}}
        />
        
      </View>
      
      
    } 
  }
  if (hasPermission === null) {
    return <Text>Ответ от камеры</Text>;
  }
  if (hasPermission === false) {
    return <Text>Нет доступа к камере</Text>;
  }
  
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      {isFocused ? <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> : <Text>Hi</Text>}
     
      {content}

      {scanned && (
        <TouchableOpacity
        style={{alignItems: "center",
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        top:30,
        height:40,
        marginBottom: '20%',
        marginHorizontal: '10%'}} 
        title={''} 
        onPress={() => setScanned(false)} >
          <Text style={{height: 50, 
        borderColor: 'gray', 
        borderBottomWidth: 1,
        color: 'white'}}>Нажмите для сканирования</Text>
        </TouchableOpacity>
      )}
      <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      
    </View>
    </View>
    
  );
  
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginTop:'10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    
    width: 250,
    height: 250,
    borderRadius: 25
},
title: {
  marginTop: '10%',
  textAlign: 'center',
  fontSize: 36
}
})

QRCode.navigationOptions = {
  headerTitle: 'Сканер'
}