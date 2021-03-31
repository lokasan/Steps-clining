import * as Font from 'expo-font'
import {DB} from './db'
import * as firebase from 'firebase'
import ApiKeys from './components/ApiKeys'
export async function bootstrap() {
    try {
        await Font.loadAsync({
            'open-bold': require('../src/assets/fonts/OpenSans-Bold.ttf'),
            'open-regular': require('../src/assets/fonts/OpenSans-Regular.ttf')
        })
        await DB.init()
        console.log('DATABASE CREATED')
        
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig)
           }
    } catch(e) {
        console.log('Eroor: ', e)
    }
    
}