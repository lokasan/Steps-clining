import React, { useState } from 'react'
import { EmploeeState } from './src/context/emploee/AuthorizationState'
import { ScreenState } from './src/context/screen/ScreenState'
import { GraphState } from './src/context/graph/GraphState'
import { Provider } from 'react-redux'
import store from './src/store/index'
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'
import { AppNavigation } from './src/navigation/AppNavigation'

export default function App() {
  
  const [isReady, setIsReady] = useState(false)
  if (!isReady) {
    return <AppLoading 
    startAsync={bootstrap}
    onFinish={() => setIsReady(true)} 
    onError={err => console.log(err)}
      />
  }
  
  return (
    <Provider store={store}>
      <ScreenState>
        <EmploeeState>
          <GraphState>
          <AppNavigation/>
        </GraphState>
        </EmploeeState> 
      </ScreenState>
    </Provider>
    
  )
}



