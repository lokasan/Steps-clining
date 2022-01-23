import * as Font from 'expo-font'
import {DB} from './db'
import * as firebase from 'firebase'
import ApiKeys from './components/ApiKeys'
export async function bootstrap() {
    try {
        await Font.loadAsync({
            'open-bold': require('../src/assets/fonts/OpenSans-Bold.ttf'),
            'open-regular': require('../src/assets/fonts/OpenSans-Regular.ttf'),
            'adantino': require('../src/assets/fonts/Adantino.ttf')
        })
        await DB.init()
        // console.log('DATABASE CREATED')
        
        // console.log('USERS LOADED')
        
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig)
           }
    } catch(e) {
        console.log('Eroor: ', e)
    }
    
}