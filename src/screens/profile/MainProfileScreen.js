import React, {useEffect} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import { Footer } from '../../components/ui/Footer'
import {useDispatch, useSelector} from 'react-redux'
import {ProfileQRCode, ObjectsIcon, UserIcon, Attributes, ArrowRight} from '../../components/ui/imageSVG/circle'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { loadEmploeeDouble, updateUser } from '../../store/actions/empDouble'
import { getPostAll } from '../../store/actions/post';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { clearObjectState } from '../../store/actions/object'
export const MainProfileScreen = ({navigation}) => {
    let resultNo = {
        surname: 'no',
        name: 'no',
        lastname: 'no',
        email: 'no',
        position: 'no',
        privileg: 0
    }
    let privileg = resultNo
    dispatch = useDispatch()
    
    // if (typeof result !== 'object') {
    //     result = resultNo
    // }
    // privileg = result.privileg
    // useEffect(() =>{
    //     dispatch(loadEmploeeDouble())
    //     dispatch(getPostAll())
    // }, [])
    let result = useSelector(state => state.empDouble.empAll.find(e => e.status === 1))
    const allPostResult = useSelector(state => state.post.postAlls)
    const emploeeAll   = useSelector(state => state.empDouble.empAll)
    let   tempPrivileg = false
    // console.log(emploeeAll, 'Алл сотрудники');
    
        if (result.status && result.privileg && result.privileg > 1) {
            tempPrivileg = true
        }
    
    async function calculate() {
        let html = `<head>
        <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
      </head>
      <body>
        <div style="display: flex; flex-direction: row; justify-content: space-around; flex-wrap: wrap;">`
        for (let el of allPostResult) {
            // console.log(el);
            // const data = await FileSystem.readAsStringAsync(el.img, {
            //     encoding: FileSystem.EncodingType.Base64,
            // });

            // const imageData = 'data:image/png;base64,' + data
            // html += `<h1> ${el.name} </h1>
            // <div>
            // <img src="${imageData}" width="100%"/>
            // </div>`;
            
            html += `
            <div style="width: 20%; box-sizing: border-box;">
            <div style="text-align: center;">
            <img src="${el.qrcode_img}" width='76px' height='76px'/>
            
            <h1 style="font-size: 12px;"> ${el.name} </h1>
            </div>
            </div>`
            ;
        }
        html += `</div>
        </body>`
        return html
        
        
    }
    async function execute() {
        let html = await calculate()
        
        const { uri } = await Print.printToFileAsync({ html });
        Sharing.shareAsync(uri);
      }
    const exitHandler = async () => {
        Alert.alert(
            "Выход из системы",
            "Вы уверены, что хотите выйти из системы ?",
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Выйти", style: 'destructive', onPress: () => {
                //   Alert.alert(result)
                dispatch(updateUser(result))

                  navigation.navigate('Auth')
                  
                } }
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
                    <Image style={{height: 150, width: 150}} source={{uri: result.img}}/>
                </View>
                <View style={styles.privateData}>
                    <View style={styles.textStyle}>
                        <Text style={styles.textStyleLine}>{`${result.surname} ${result.name} ${result.lastname}`}</Text>
                    </View>
                    <View style={styles.textStyle}>
                        <Text style={styles.textStyleLine}>{result.email}</Text>
                    </View>
                    <View>
                        <Text style={{color: '#fff', textAlign:'center'}}>{result.position}</Text>
                    </View>
                
                </View>
               
            </View>
            </TouchableOpacity>
        {tempPrivileg && <View style={styles.menuCard}>
        <TouchableOpacity onPress={execute}>
            <View style={styles.actionMenu}>
                <ProfileQRCode/>
                <Text style={{color: '#fff'}}>Отправить список QR-кодов</Text>
                <ArrowRight/>  
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                // dispatch(clearObjectState())
                navigation.navigate('CorpusesBuilding')
                }}>
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
        }
        </View>
        {/* </ScrollView> */}
        <TouchableOpacity onPress={exitHandler}>
            <Text 
            style={{color: 'red', textAlign: 'center', paddingBottom: 10}}
            >Выйти из системы</Text>
            </TouchableOpacity>
        {/* <Footer/> */}
    </View>
    
}

MainProfileScreen.navigationOptions = {
    headerTitle: 'Профиль',
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