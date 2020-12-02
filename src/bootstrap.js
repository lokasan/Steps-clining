import * as Font from 'expo-font'

export async function bootstrap() {
    await Font.loadAsync({
        'open-bold': require('../src/assets/fonts/OpenSans-Bold.ttf'),
        'open-regular': require('../src/assets/fonts/OpenSans-Regular.ttf')
    })
}