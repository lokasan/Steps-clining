import { Platform, Button, View, TextInput, TouchableOpacity, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'
import {createStackNavigator} from '@react-navigation/stack'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import { MainLayout } from '../MainLayout'
import { MainProfileEdit } from '../screens/profile/MainProfileEdit'
import { MainProfileScreen } from '../screens/profile/MainProfileScreen'
import { CorpusesBuilding } from '../screens/profile/CorpusesBuilding'
import { ObjectsBuilding } from '../screens/profile/ObjectsBuilding'
import { AttributesList } from '../screens/profile/AttributesList'
import { EmploeesList } from '../screens/profile/EmploeesList'
import { HEADER_FOOTER } from '../theme'
import { MainScreen } from '../screens/mainsreen'
import { AboutScreen } from '../screens/AboutScreen'
import { StatusObject } from '../screens/StatusObject'
import { QRCode } from '../screens/qrcode'
import { GraphPed } from '../components/GraphPed'
import { EmploeeCard } from '../components/EmploeeCard'
import {Ionicons} from '@expo/vector-icons'
import { EmploeeScreen } from '../screens/profile/EmploeeScreen'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { CreateNewUser } from '../screens/profile/CreateNewUser'
import { CreateNewObjects } from '../screens/profile/CreateNewObjects'
// import { CorpusScreen } from '../screens/profile/CorpusScreen'
import { ObjectScreen } from '../screens/profile/ObjectScreen'
import { CorpusScreen } from '../screens/profile/CorpusScreen'
import { CreateNewPost } from '../screens/profile/CreateNewPost'
import { CreateNewComponent } from '../screens/profile/CreateNewAttribute'
import { AttributeSingle } from '../screens/profile//AttributesSingle'
import { CreateNewComponentRank } from '../screens/profile/CreateNewComponentRank'
import { EditComponentRank } from '../screens/profile/EditComponentRank'
import { PostWithComponent } from '../screens/profile/PostWithComponent'
import { MainEmploeeListScreen } from '../screens/MainEmploeeListScreen'
import { BypassScreen } from '../screens/BypassScreen'
import { ComponentsRankScreen } from '../screens/ComponentsRankScreen'
import { BasicStatEmploeeDetail } from '../screens/BasicStatEmploeeDetail'
import { EmployeePersonalScreen } from '../screens/EmployeePersonalScreen'
import { CreateNewCorpus } from '../screens/profile/CreateNewCorpus'
import { LoadingScreen } from '../screens/LoadingScreen'
import {NavigationContainer} from '@react-navigation/native'
import { Authorization } from '../components/Authorization'
import { useSelector } from 'react-redux'
import * as SQLite from 'expo-sqlite'


const navigatorNewOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? HEADER_FOOTER.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : HEADER_FOOTER.MAIN_COLOR
}


const FooterStack = createStackNavigator()
const FooterNavigator = () => {
    return (
        <FooterStack.Navigator screenOptions={navigatorNewOptions}>
            <FooterStack.Screen name="QRCode" component={QRCode} options={{title: 'Сканер'}}/>
            <FooterStack.Screen name="BypassScreen" component={BypassScreen} options={({route}) => ({title: route.params.element.name})}/>
            <FooterStack.Screen name="ComponentsRankScreen" component={ComponentsRankScreen} options={({route}) => ({title: route.params.item.name})}/>
        </FooterStack.Navigator>
    )
}

const PostStack = createStackNavigator()
const PostNavigator = () => {
    return (
        <PostStack.Navigator screenOptions={navigatorNewOptions}>
            <PostStack.Screen name="MainProfile" 
            component={MainEmploeeListScreen} 
            options={(route) => ({title: '', 
            // headerLeft: () => (
            //     <TextInput
            //       style={{
            //         height: 40,
            //         margin: 12,
            //         width: '180%',
            //         borderWidth: 1,
            //         padding: 10,
            //         borderRadius: 10,
            //       }}
            //       onChangeText={route.params.testFuncFor}
            //       placeholder='Поиск сотрудника'/>
            //   ),
            })}/>
            <PostStack.Screen name="EmployeeScreen" component={EmployeePersonalScreen}/>
            <PostStack.Screen name="StatMainDetail" component={BasicStatEmploeeDetail}/>
        </PostStack.Navigator>
    )
}

const AnalyticsStack = createStackNavigator()
const AnalyticsNavigator = () => {
    return (
        <AnalyticsStack.Navigator screenOptions={navigatorNewOptions}>
            <AnalyticsStack.Screen 
                name="Analytics" 
                component={GraphPed} 
                options={({navigation}) => ({title: 'Состояние объекта', headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item 
                title='Private Account'
                iconName='ios-person'
                onPress={() => navigation.navigate('MainProfile')}
                />
            </HeaderButtons>})}/>
            <AnalyticsStack.Screen 
                name="CorpusDetailAnalytics" 
                component={StatusObject} 
                options={({route, navigation}) => ({title: route.params.corpusName, headerRight: () => 
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                            <Item 
                            title='Private Account'
                            iconName='ios-person'
                            onPress={() => navigation.navigate('MainProfile')}
                            />
                        </HeaderButtons>
                        <HeaderButtons HeaderButtonComponent = {AppHeaderIcon}>
                            <Item
                            title='Filter Object'
                            iconName='ios-options'
                            onPress={() => route.params.openModalFilter()}
                            />
                        </HeaderButtons>
                    </View>
                })}/>
            <AnalyticsStack.Screen name="MainProfile" component={MainProfileScreen} options={{title: 'Профиль'}}/>
            <AnalyticsStack.Screen name="Profile" component={MainProfileEdit}/>
            <AnalyticsStack.Screen 
                name="CorpusesBuilding" 
                component={CorpusesBuilding} 
                options={({navigation}) => ({title: 'Объекты', headerRight: () => 
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item 
                        title='AddNewUser'
                        iconName='ios-add-circle-outline'
                        onPress={() => navigation.navigate('CreateCorpus')}
                        />
                    </HeaderButtons>
                })}/>
            <AnalyticsStack.Screen name="ObjectsBuildings" component={ObjectsBuilding}/>
            <AnalyticsStack.Screen name="Emploees" component={EmploeesList} options={({navigation}) => ({title: 'Сотрудники', headerRight: () => 
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item 
                        title='AddNewUser'
                        iconName='ios-person-add'
                        onPress={() => navigation.navigate('CreateUser')}
                        />
                    </HeaderButtons>
                })}/>
            <AnalyticsStack.Screen name="EmploeeInfo" component={EmploeeScreen} options={({route}) => ({title: route.params.emploeeName})}/>
            <AnalyticsStack.Screen name="CreateUser" component={CreateNewUser} options={{title: 'Создание пользователя'}}/>
            <AnalyticsStack.Screen name="CreateCorpus" component={CreateNewCorpus} options={{title: 'Создание объекта'}}/>
            <AnalyticsStack.Screen name="CreateObjects" component={CreateNewObjects} options={({route}) => ({title: route.params.corpusName})}/>
            <AnalyticsStack.Screen 
                name="CorpusInfo" 
                component={CorpusScreen} 
                options={({route, navigation}) => ({title: route?.params?.corpusName, headerRight: () => 
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item 
                        title='AddNewUser'
                        iconName='ios-add-circle-outline'
                        onPress={() => navigation.navigate('CreateObjects', {corpusId: 'corpusId' in route.params ? route.params.corpusId : null, corpusName: route?.params?.corpusName})}
                        />
                    </HeaderButtons>
                })}/>
            <AnalyticsStack.Screen 
                name="ObjectInfo" 
                component={ObjectScreen} 
                options={({route, navigation}) => ({title: route?.params?.objectName, headerRight: () => 
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item 
                        title='AddNewUser'
                        iconName='ios-add-circle-outline'
                        onPress={() => navigation.navigate('CreatePost', {objectId: route.params.objectId, objectName: route.params.objectName})}
                        />
                    </HeaderButtons>
                })}/>
            <AnalyticsStack.Screen name="CreatePost" component={CreateNewPost} options={({route}) => ({title: route.params.objectName})}/>
            <AnalyticsStack.Screen name="CreateComponent" component={CreateNewComponent} options={{title: 'Создание компонента'}}/>
            <AnalyticsStack.Screen 
                name="ComponentInfo" 
                component={AttributeSingle} 
                options={({route, navigation}) => ({title: route.params.componentName, headerRight: () => 
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item 
                        title='AddNewUser'
                        iconName='ios-add-circle-outline'
                        onPress={() => navigation.navigate('CreateComponentRank', {componentName: route.params.componentName, componentId: route.params.componentId})}
                        />
                </HeaderButtons>
            })}/>
            <AnalyticsStack.Screen 
                name="Components" 
                component={AttributesList} 
                options={({navigation}) => ({title: 'Компоненты', headerRight: () => 
                    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item 
                        title='AddNewUser'
                        iconName='ios-add-circle-outline'
                        onPress={() => navigation.navigate('CreateComponent')}
                        />
                    </HeaderButtons>
                })}/>
            <AnalyticsStack.Screen name="CreateComponentRank" component={CreateNewComponentRank} options={({route}) => ({title: route.params.componentName})}/>
            <AnalyticsStack.Screen name="EditComponentRank" component={EditComponentRank} options={({route}) => ({title: route.params.componentRank.name})}/>
            <AnalyticsStack.Screen name="PostWithComponent" component={PostWithComponent} options={({route}) => ({title: route.params.post.name})}/>
        </AnalyticsStack.Navigator>
    )
}

const BottomTab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator()

const BottomNavigator = () => {
    return (
        <BottomTab.Navigator screenOptions={{...navigatorNewOptions, tabBarActiveTintColor: HEADER_FOOTER.MAIN_COLOR}}>
            <BottomTab.Screen name="Main" component={PostNavigator} options={{
                title: 'Главная',
                headerShown: false,
                tabBarLabel: 'Домой',
                tabBarIcon: info => <Ionicons name="ios-home" size={25} color={info.color}/>
            }}/>
            <BottomTab.Screen name="Qrcode" component={FooterNavigator} options={{
                title: 'Обход',
                headerShown: false,
                tabBarLabel: 'Обход',
                tabBarIcon: info => <Ionicons name="ios-qr-code" size={25} color={info.color}/>
            }}/>
            <BottomTab.Screen name="Analytics-Nav" component={AnalyticsNavigator} options={{
                tabBarLabel: 'Аналитика', 
                headerShown: false, 
                tabBarIcon: info => <Ionicons name="ios-analytics" size={25} color={info.color}/>
            }}/>
        </BottomTab.Navigator>
    )
}


const AuthorizationStack = createStackNavigator()
const AuthStack = () => {
    return (
        <AuthorizationStack.Navigator screenOptions={navigatorNewOptions}>
            <AuthorizationStack.Screen name="NSClean Авторизация" component={MainScreen}/>
        </AuthorizationStack.Navigator>
    )
}

export const AppNavigation = () => {
    const [isLoading, setIsLoading] = useState(true)
    const db = SQLite.openDatabase('dbas.db')
    const [user, setUser] = useState({isLogin: false})
    const isLogin = useSelector(state => state.authentication.isLogin)
    useEffect(() => {
        async function buildQ ()  {
        
            return new Promise(resolve => {
            db.transaction((tx) => { 
                tx.executeSql('select * from user_local where status=1', [], (_, { rows }) => {
                // console.log(JSON.stringify(rows),'напечатал из бд');
                // myKey.isStatus = rows.length !== 0 ? JSON.stringify(rows._array[0]['status']) : 0
                // myKey.id = rows.length !== 0 ? JSON.stringify(rows._array[0]['id']) : 0
                // console.log(rows['_array'])
                setUser({isLogin: rows.length !== 0 ? JSON.stringify(rows._array[0]['status']) : 0})
                resolve()   
                setIsLoading(false)         
            }                                
                )                               
            })
            })
            
        }
        buildQ()
    }, [])
    // dispatch({type: 'SIGN_IN', paylad: {isLogin: true}})
    
    return (
        <NavigationContainer>
            {(user.isLogin || isLogin ? <BottomNavigator/> : <AuthStack/>)}
        </NavigationContainer>
        )
}