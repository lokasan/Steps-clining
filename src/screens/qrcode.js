'use strict';
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, Animated } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export const QRCode = ({goBack, navigaton}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dataScan, setDataScan] = useState(null);
  const DataOperation = (data) => {
    setDataScan(data)
    console.log(data)
  }
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    return DataOperation(data)
    
    
  };

  let content = (<Image style={{height: 300, width: 300, marginHorizontal: '15%', marginTop: '30%', opacity: 0.5}} source={require('../images/3.png')} />);
  if (dataScan === 'Пост 1') {
    console.log(dataScan)
    // setHasPermission('ff')
    return (<View>
      <Text style={{color: 'red', fontSize: 30, textAlign: 'center'}}>Начать обход</Text>
      
      </View>)
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
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
     
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
        color: 'white'}}>Неверный код. Нажмите для сканирования</Text>
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
QRCode.navigationOptions = {
  headerTitle: 'Сканнер'
}