import * as Font from 'expo-font'
import {DB} from './db'

export async function bootstrap() {
    try {
        await Font.loadAsync({
            'open-bold': require('../src/assets/fonts/OpenSans-Bold.ttf'),
            'open-regular': require('../src/assets/fonts/OpenSans-Regular.ttf')
        })
        await DB.init()
        console.log('DATABASE CREATED')
    } catch(e) {
        console.log('Eroor: ', e)
    }
    
}