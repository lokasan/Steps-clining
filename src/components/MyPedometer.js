import React, {useState, useEffect} from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';
import { LocalDB } from './LocalAndServerBaseSaveData'
function savePedData(data) {
  
}


export const MyPedometer = (key_auth) => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('ckecking')
  const [pastStepCount, setPastStepCount] = useState(0)
  const [currentStepCount, setCurrentStepCount] = useState(0)
  const [subscriptionStatus, setSubscriptionStatus] = useState()

  console.log(key_auth, 'user');
  // state = {
  //   isPedometerAvailable: 'checking',
  //   pastStepCount: 0,
  //   currentStepCount: 0,
  // };

  // _subscribe = () => {
    
  //   setSubscriptionStatus(Pedometer.watchStepCount(result => {
  //     setCurrentStepCount(result.steps)
  //     console.log(setCurrentStepCount)
      
  //     }))}
  useEffect(() => {
    
    setSubscriptionStatus(Pedometer.watchStepCount(result => {
          setCurrentStepCount(result.steps)
          
          
          }))
    //       subscriptionStatus && subscriptionStatus.remove();
    // setSubscriptionStatus(null)
    
  }, [])
  // useEffect(() => {
  //   _unsubscribe()
  // }, [])

  

    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(String(result))
        
      },
      error => {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error)
        
      }
    );
  

    const end = new Date();
    const start = new Date();
    start.setHours(end.getHours() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount(result.steps)
      },
      error => {
        setPastStepCount('Could not get stepCount: ' + error)
        });
      
  
  

  _unsubscribe = () => {
    subscriptionStatus && subscriptionStatus.remove();
    setSubscriptionStatus(null)
  };
  LocalDB(key_auth = null, currentStepCount)

  console.log(currentStepCount)
    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
        <Text style={{color: 'white'}}>Количество шагов за последние 24 часа: {pastStepCount}</Text>
        <Text style={{color: 'white'}}>Количество шагов с запуска: {currentStepCount}</Text>
      </View>
    )
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
})
