import React, { useEffect, useRef, useState } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { Footer } from '../components/ui/Footer'
import {Pressable, View, Text, Switch, StyleSheet, FlatList, Alert, TextInput, Platform, Image, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { getEmploeesList } from '../dataBaseRequests/dataBaseRequests'
import { EmploeeCard } from '../components/EmploeeCard'
import { DATA } from '../testData'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import { MyPedometer }from '../components/MyPedometer'
import { getPostAll, loadPost } from '../store/actions/post'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants';
import { loadComponentRank } from '../store/actions/componentRank'
import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { loadObject } from '../store/actions/object'
import { loadComponent } from '../store/actions/component'
import { getUsersServer } from '../store/actions/empDouble'
import { BasicStatEmploee } from '../components/BasicStatEmploee'
import { Cycle, QRIcon, Rank, StepsIcon } from '../components/ui/imageSVG/circle'
import { getSingleUserStat, getUsersBasicStat, getBypassMapCompleteCycle } from '../store/actions/bypass'
import DateTimePicker from '@react-native-community/datetimepicker'
import { ModalPostsDone } from '../components/ui/ModalPostsDone'
// import {loadEmploeeDouble} from '../../store/actions/empDouble'



export const MainEmploeeListScreen = ( {navigation}) => {
    const loading                   = useSelector(state => state.post.loading)
    const emploeeAll   = useSelector(state => state.empDouble.empAll)
    let   buildings                 = useSelector(state => state.object.objAll)
    let   components                = useSelector(state => state.component.componentAll)
    let   posts                     = useSelector(state => state.post.postAll)
    
    let userStat = useSelector(state => state.bypass.userSingleStat)
    let usersBasicStat = useSelector(state => state.bypass.usersBasicStat)
    
    const [date, setDate] = useState(Platform.OS === 'ios' ? new Date(new Date().getTime() - (new Date().getTime()) % (24 * 60 * 60 * 1000) - (3 * 60 * 60 * 1000)) : new Date(new Date().getTime() - (new Date().getTime()) % (24 * 60 * 60 * 1000)));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      let start_time = currentDate.getTime()
      // Alert.alert(String(currentDate.getTime()))
      start_time = Platform.OS === 'ios' ? start_time : start_time - (start_time) % (24 * 60 * 60 * 1000) - (3 * 60 * 60 * 1000)
      dispatch(getUsersBasicStat(start_time, start_time))
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
    const isOnline = useSelector(state => state.empDouble.isOnlineEmp)
    // console.log('MYOF', isOnline)
    const [pushToken, setPushToken] = useState()
    const dispatch = useDispatch()
    // console.log('buildings', buildings)
    
    useEffect(() => {
        registerForPushNotificationsAsync()
        // console.log("USEEFFECT BUILDINGS INFO", buildings)
        for (let el of buildings) {
          
            dispatch(loadPost(el.id)) 
          }
        for (let el of components) {
          dispatch(loadComponentRank(el.id))
        }
        for (let el of posts) {

          dispatch(loadPostWithComponent(el.id))
        }
    }, [])
    // useEffect(() => {
    //   console.log("USEEFFECT BUILDINGS INFO", buildings)
    //   for (el of buildings) {
        
    //     dispatch(loadPost(el.id)) 
    //   }
    // }, [buildings])
  
    // useEffect(() => {
    //   for (el of components) {
    //     dispatch(loadComponentRank(el.id))
    //   }
    // }, [components])
  
    // useEffect(() => {
    //   for (el of posts) {
    //     dispatch(loadPostWithComponent(el.id))
    //   }
    // }, [posts])
   
    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let   finalStatus                = existingStatus;
          if (existingStatus !== 'granted') {
            const { status }  = await Notifications.requestPermissionsAsync();
                  finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          // console.log(token, ' TOKEN');
          setPushToken(token)
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name            : 'default',
            importance      : Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor      : '#FF231F7C',
          });
        }
        };
    const openEmploeeHandler = emploee => {
        navigation.navigate('EmployeeScreen', {emploeeId: emploee.id, emploeeName: emploee.name})
    }
    // let result = getEmploeesList().then()
    
    // получаю пустой промис исправить ошибку
    // console.log(result, 'раскрыл');
    
    // useEffect(() => {
    //     dispatch(loadEmploeeDouble())
    // }, [dispatch])
    let serfIdUser = 0
    
    let   tempPrivileg = false
    for (let i of emploeeAll) {
      console.log(`name: ${i.name} surname: ${i.surname} lastname: ${i.lastname}`)
        if (i.status && i.privileg) {
            tempPrivileg = true
            console.log(i.name, ' <--- Is name', ' status: ', i.status, ' privileg ', i.privileg)
        }
        if (i.status) {
          serfIdUser = i.id
        }
    }
    const [searchUser, onChangeSearchUser] = useState('')
    useEffect(() => {
      dispatch(getUsersServer())
      dispatch(getPostAll())
      dispatch(getUsersBasicStat())
      navigation.setParams({test: showDatepicker, access: true, searchUser, onChangeSearchUser: onChangeSearchUser, testFuncFor: testFuncFor})
        // dispatch(loadObject()),
        // dispatch(loadComponent())
        
    }, [])
  
  // const [serfIdUser, setSerfIdUser] = useState(0)
  const [isEnabled, setIsEnabled] = React.useState(false);
  const isOnlineRef = useRef([])
  let emplServer = useSelector(state => state.empDouble.empServer)
  // if (emplServer.length && usersBasicStat.length) {
  //   emplServer = emplServer.map(el => {
  //     if (usersBasicStat.find(els => els.id === el.id)) {
  //         return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
  //     } else {
  //         return el
  //     }
  // })
  // }
  const [employee, setEmployee] = useState([])
  useEffect(() => {
    isOnlineRef.current = isOnline
    if (isEnabled) {
      setEmployee(emplServer.filter(({id}) => isOnlineRef.current.includes(id)).map(el => {
        if (usersBasicStat.find(els => els.id === el.id)) {
            return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
        } else {
            return el
        }
    }))
    } else {
      setEmployee(emplServer.map(el => {
        if (usersBasicStat.find(els => els.id === el.id)) {
            return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
        } else {
            return el
        }
    }))
    }
    
  }, [emplServer, setEmployee, isOnline, usersBasicStat])
  
  
  const toggleSwitch = () => {
    refreshEl()
    setIsEnabled(previousState => !previousState)
    if (!isEnabled) {
      setEmployee(emplServer.filter(({id}) => isOnlineRef.current.includes(id)).map(el => {
        if (usersBasicStat.find(els => els.id === el.id)) {
            return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
        } else {
            return el
        }
    }))
    } else {
      setEmployee(emplServer.map(el => {
        if (usersBasicStat.find(els => els.id === el.id)) {
            return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
        } else {
            return el
        }
    }))
    }
  };
  const inputTxt = text => {
    if (isEnabled) {
      setEmployee(emplServer.filter(({id}) => isOnlineRef.current.includes(id)).map(el => {
        if (usersBasicStat.find(els => els.id === el.id)) {
            return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
        } else {
            return el
        }
    }).filter(el => el.name.toLowerCase().indexOf(text.toLowerCase()) === 0 || 
    el.lastname.toLowerCase().indexOf(text.toLowerCase()) === 0 || 
    el.surname.toLowerCase().indexOf(text.toLowerCase()) === 0))
    } else {
      setEmployee(emplServer.map(el => {
        if (usersBasicStat.find(els => els.id === el.id)) {
            return ({...el, ...usersBasicStat.find(els => els.id === el.id)})
        } else {
            return el
        }
    }).filter(el => el.name.toLowerCase().indexOf(text.toLowerCase()) === 0 || 
      el.lastname.toLowerCase().indexOf(text.toLowerCase()) === 0 || 
      el.surname.toLowerCase().indexOf(text.toLowerCase()) === 0))
    }

    
    return onChangeSearchUser(text)}
  function testFuncFor(text) {
    console.log(text)
  }
  const myText = useRef()
    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <TextInput
            style={{
              height: 40,
              margin: 12,
              width: '180%',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
            onChangeText={inputTxt}
            value={searchUser}
            placeholder='Поиск сотрудника'/>
        ),
        headerRight: () => (
          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}/>
        ),
      });
    }, [navigation, isEnabled, emplServer, searchUser]);
    useEffect(() => {
      if (serfIdUser) {
        dispatch(getSingleUserStat(serfIdUser))
      }
      
    }, [serfIdUser])
    const [refresh, setRefresh] = useState(false)
    const refreshEl = () => {
      let start_time = date.getTime()
      // Alert.alert(String(currentDate.getTime()))
      dispatch(getUsersBasicStat(Platform.OS === 'ios' ? start_time : start_time - (start_time) % (24 * 60 * 60 * 1000) - (3 * 60 * 60 * 1000)))
      setRefresh(true)
    }
    return <View style = {{flex: 1}}>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
        />
      )}
    {/* <Image source      = {{uri: 'https://www.alllessons.ru/wp-content/uploads/files/hello_html_m25c160ca.jpg'}} style = {StyleSheet.absoluteFillObject} blurRadius = {15}/> */}
    { loading ? 
        <View              style = {styles.center}>
        <ActivityIndicator size  = "small" color = "#0000ff"/>
        </View>: null }
    {tempPrivileg ?
        <FlatList 
        data         = {employee}
        keyExtractor = {emploee => emploee.id.toString()}
        renderItem   = {({item}) => <EmploeeCard emploee={item} onOpen={openEmploeeHandler} isOnline={isOnline}/>}
        refreshing={false}
        onRefresh={refreshEl}
                /> : <><Text style={styles.textDate}>Ваши данные на сегодня</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center'}}>
                  <BasicStatEmploee width_svg={24} height_svg={25} color='red' max={3} percentage={userStat[0]?.avg_rank} svgRender={Rank} navigation={navigation}/>
                  <BasicStatEmploee width_svg={24} height_svg={25} color='red' max={2}  percentage={userStat[0]?.cycle_bypass} delay={600} duration={600} svgRender={Cycle} navigation={navigation}/>
                  <BasicStatEmploee width_svg={24} height_svg={25} color='red' max={24}  percentage={userStat[0]?.count_bypass}delay={650} duration={650} svgRender={QRIcon} navigation={navigation}/>
                  
                  {/* <BasicStatEmploee width_svg={24} height_svg={25} color='red' max={1000} percentage={1234} delay={700} duration={700} svgRender={StepsIcon} navigation={navigation}/> */}
                  </View></>}
    
    
    {/* <Footer/> */}
    {/* <MyPedometer/> */}
    
    </View>
}

MainEmploeeListScreen.navigationOptions = ({route, navigation}) => {
    return {headerTitle: '',
    headerRight: () => route.params.access ? <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='Private Account'
    iconName='ios-calendar'
    onPress={() => route.params.test()}
    />
  </HeaderButtons> : null,
    headerLeft: () => <HeaderButtons HeaderButtonComponent = {AppHeaderIcon}>
    <Item 
    title    = 'toogle'
    iconName = 'ios-menu'
    onPress  = {() => navigation.toggleDrawer()}
    />
    </HeaderButtons>}
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: '180%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  textDate: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#303f9f'
},
    center: {
        flex          : 1,
        justifyContent: 'center',
        alignItems    : 'center',
        // backgroundColor: '#000'
    },
    centers: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        padding: 10
    },
    container: {
        flex: 1
    },
    menuCard: {
        // padding: 4,
        // marginTop: 50,
        // borderBottomWidth: 0.3,
        // borderTopWidth: 0,
        borderColor: '#fff',
        width      : '100%',
        // backgroundColor: '#1C1B1B'
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
})