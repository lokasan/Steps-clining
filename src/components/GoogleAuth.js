import * as Google from 'expo-google-app-auth'
import {Alert} from 'react-native'
const IOS_CLIENT = '393783114907-tanuhn4qqds9vr7o58ksn58okss0qs5v.apps.googleusercontent.com'
const ANDROID_CLIENT = '393783114907-jrgn1caq85o8ns7bfe6reorj0vcjg7u4.apps.googleusercontent.com'
// import GoogleFit, { Scopes } from 'react-native-google-fit'
// GoogleFit.checkIsAuthorized().then(() => {
//   console.log(GoogleFit.isAuthorized, 'BOOOLEAN')
// })
const opt = {
  startDate: "2020-01-01T00:00:17.971Z", // required ISO8601Timestamp
  endDate: new Date().toISOString(), // required ISO8601Timestamp
  bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
  bucketInterval: 1, // optional - default 1. 
}
const fetchData = async () => {
  const res = await GoogleFit.getDailyStepCountSamples(opt)
  // console.log(res)
}
export async function signInWithGoogleAsync() {
    try {
      const currentDate = new Date().getTime()
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT,
        iosClientId: IOS_CLIENT,
        scopes: [
          'profile', 
          'email', 
          'https://www.googleapis.com/auth/fitness.activity.read', 
          'https://www.googleapis.com/auth/fitness.body.read', 
          'https://www.googleapis.com/auth/fitness.activity.write',
          'https://www.googleapis.com/auth/fitness.body.write'],
      });
  
      if (result.type === 'success') {

        let userInfoResponse = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, 
        {   
          method: 'POST',
          mode: 'cors',
          headers: 
          {   
            
              Authorization: `Bearer ${result.accessToken}` ,
              "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            "aggregateBy": [{
              "dataTypeName": "com.google.step_count.delta",
              "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
            }],
            "bucketUnit": "DAY",
            "bucketInterval": 1,
            "startTimeMillis": 1604455822683,
            "endTimeMillis": currentDate 
          })
        })
                .then((resp) => resp.json())
                .then((data) => {
                  Alert.alert(result.accessToken)
                  console.log(JSON.stringify(data))
                })
                .catch(err => console.log(JSON.stringify(err)))
          // Alert.alert(JSON.stringify(result.user))
          // Alert.alert(userInfoResponse)
          // console.log(result.accessToken);
          

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }