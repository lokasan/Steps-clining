import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import { Footer } from '../../components/ui/Footer'
import {ProfileQRCode, ObjectsIcon, UserIcon, Attributes, ArrowRight} from '../../components/ui/imageSVG/circle'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
export const MainProfileScreen = ({navigation}) => {
    const exitHandler = () => {
        Alert.alert(
            "Выход из системы",
            "Вы уверены, что хотите выйти из системы ?",
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Выйти", style: 'destructive', onPress: () => {navigation.popToTop()} }
            ],
            { cancelable: false }
          )
    }
    
    return <View style={{flex: 1, backgroundColor: '#000'}}>
        {/* <ScrollView> */}
        <View style={styles.container, styles.center}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.userCard}>
                <View>
                    <Image style={{height: 150, width: 150}} source={require('../../images/6.jpg')}/>
                </View>
                <View style={styles.privateData}>
                    <View style={styles.textStyle}>
                        <Text style={styles.textStyleLine}>Стив Джобс</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.textStyleLine}>SteveJobs@icloud.me</Text>
                    </View>
                    <View>
                        <Text style={{color: '#fff', textAlign:'center'}}>Администратор</Text>
                    </View>
                
                </View>
               
            </View>
            </TouchableOpacity>
        <View style={styles.menuCard}>
        <TouchableOpacity>
            <View style={styles.actionMenu}>
            
                <ProfileQRCode/>
                <Text style={{color: '#fff'}}>QR-код для входа</Text>
                
                <ArrowRight/>
                
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ObjectsBuildings')}>
            <View style={styles.actionMenu}>
                <ObjectsIcon/>
                <Text style={{color: '#fff'}}>Объекты</Text>
                <ArrowRight/>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Emploees')}>
            <View style={styles.actionMenu}>
                <UserIcon/>
                <Text style={{color: '#fff'}}>Сотрудники</Text>
                <ArrowRight/>
                
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Components')}>
            <View style={styles.actionMenu}>
                <Attributes/>
                <Text style={{color: '#fff'}}>Компоненты</Text>
                <ArrowRight/>
            </View>
            </TouchableOpacity>
        </View>
        </View>
        {/* </ScrollView> */}
        <TouchableOpacity onPress={exitHandler}><Text style={{color: 'red', textAlign: 'center', paddingBottom: 10}}>Выйти из системы</Text></TouchableOpacity>
        {/* <Footer/> */}
    </View>
    
}

MainProfileScreen.navigationOptions = {
    headerTitle: 'Профиль'
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        // paddingHorizontal: '18%',
        flex: 1,
        // height: '89%'
      },
    userCard: {
        // flex: 1,
        // top: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // height: '25%',
        borderBottomWidth: 0.3,
        borderColor: '#fff',
        width: '100%',
        backgroundColor: '#1C1B1B'
    },
    menuCard: {
        // padding: 4,
        marginTop: 50,
        // borderBottomWidth: 0.3,
        borderTopWidth: 0.4,
        borderColor: '#fff',
        width: '100%',
        backgroundColor: '#1C1B1B'
    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    textStyle: {
        color: '#fff', 
        borderBottomWidth: 0.5, 
        borderColor: '#fff'
    },
    textStyleLine: {
        color: '#fff'
    },
    actionMenu: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 0.3,
        
        
        borderColor: '#fff'

    }
})