import { Platform } from 'react-native'
import React from 'react'
import { BottomTabBar, createBottomTabNavigator } from 'react-navigation-tabs'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'
import {createStackNavigator} from 'react-navigation-stack'
import { MainLayout } from '../MainLayout'
import { MainProfileEdit } from '../screens/profile/MainProfileEdit'
import { MainProfileScreen } from '../screens/profile/MainProfileScreen'
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
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { CreateNewUser } from '../screens/profile/CreateNewUser'
import { CreateNewObjects } from '../screens/profile/CreateNewObjects'
import { ObjectScreen } from '../screens/profile/ObjectScreen'
import { CreateNewPost } from '../screens/profile/CreateNewPost'
import { CreateNewComponent } from '../screens/profile/CreateNewAttribute'
import { AttributeSingle } from '../screens/profile//AttributesSingle'
import { CreateNewComponentRank } from '../screens/profile/CreateNewComponentRank'
import { EditComponentRank } from '../screens/profile/EditComponentRank'
import { PostWithComponent } from '../screens/profile/PostWithComponent'
import { MainEmploeeListScreen } from '../screens/MainEmploeeListScreen'

const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? HEADER_FOOTER.MAIN_COLOR : '#fff'
        },
        
        headerTintColor: Platform.OS === 'android' ? '#fff' : HEADER_FOOTER.MAIN_COLOR
    }
}

const PostNavigator = createStackNavigator({
    MainProfile: {
        screen: MainEmploeeListScreen,  
    },
    
}, navigatorOptions)

const FooterNavigator = createStackNavigator({
    qrCode: QRCode
}, navigatorOptions)

const AnalyticsNavigator = createStackNavigator({
    Analytics: GraphPed,
    MainProfile: {
        screen: MainProfileScreen,  
    },
    Profile: {
        screen: MainProfileEdit
    },
    ObjectsBuildings: {
        screen: ObjectsBuilding
    },
    Emploees: {
        screen: EmploeesList
    },
    EmploeeInfo: {
        screen: EmploeeScreen
    },
    CreateUser: {
        screen: CreateNewUser
    },
    CreateObjects: {
        screen: CreateNewObjects
    },
    ObjectInfo: {
        screen: ObjectScreen
    },
    CreatePost: {
        screen: CreateNewPost
    },
    CreateComponent: {
        screen: CreateNewComponent
    },
    ComponentInfo: {
        screen: AttributeSingle
    },
    Components: {
        screen: AttributesList
    },
    CreateComponentRank: {
        screen: CreateNewComponentRank
    },
    EditComponentRank: {
        screen: EditComponentRank
    },
    PostWithComponent: {
        screen: PostWithComponent
    },
    
}, navigatorOptions)
const bottomTabsConfig = {
    Main: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons name="ios-home" size={25} color={info.tintColor}/>,
            tabBarLabel: 'Домой',
        },
        
    },
    Qrcode: {
        screen: FooterNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons name="ios-qr-code" size={25} color={info.tintColor}/>,
            tabBarLabel: 'Обход',
        }
    },
    Analytics: {
        screen: AnalyticsNavigator,
        navigationOptions: {
            tabBarIcon: info => <Ionicons name="ios-analytics" size={25} color={info.tintColor}/>,
            tabBarLabel: 'Аналитика' 
        }
    }
}

const BottomNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(bottomTabsConfig, {
    activeTintColor: '#fff',
    shifting: true,
    barStyle: {
        backgroundColor: HEADER_FOOTER.MAIN_COLOR
    }
}) : createBottomTabNavigator(bottomTabsConfig, {
    tabBarOptions: {
        activeTintColor: HEADER_FOOTER.MAIN_COLOR,
    }
})

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOptions)

const ObjectNavigator = createStackNavigator({
    StatusObject: StatusObject
}, navigatorOptions)

const MainNavigator = createDrawerNavigator({
    MainTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Главная'
        }
    },
    About: {
       screen: AboutNavigator,
       navigationOptions: {
           drawerLabel: 'О нас'
       }
    },
    StatusObject: {
        screen: ObjectNavigator,
        navigationOptions: {
            drawerLabel: 'Состояние объекта'
        }
    }
    
}, {
    contentOptions: {
        activeTintColor: HEADER_FOOTER.MAIN_COLOR,
        labelStyle: {
            fontFamily: 'open-bold'
        }
    }
})

const AuthStack = createStackNavigator({Mainscreen: MainScreen}, navigatorOptions)

export const AppNavigation = createAppContainer(
    createAnimatedSwitchNavigator({
        App: MainNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'Auth',
        transition: (
            <Transition.Together>
              <Transition.Out
                type="scale"
                durationMs={750}
                interpolation="easeIn"
              />
              <Transition.In type="scale" durationMs={800} />
            </Transition.Together>
          ),
    }
    )
    )