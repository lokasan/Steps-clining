import React, {useCallback, useEffect, useState, Fragment} from 'react'
import {View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView, Alert, FlatList, SafeAreaView, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { DATA } from '../../testData'
import { Footer } from '../../components/ui/Footer'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { HEADER_FOOTER } from '../../theme'
import { removeCopus, loadCorpus } from '../../store/actions/corpus'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { loadPost } from '../../store/actions/post'
import { ObjectCard } from '../../components/ObjectCard'
import { ModalZoomable } from '../../components/ui/ModalZoomable'
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('dbas.db')

export const CorpusScreen = ({route, navigation}) => {
    
    const [zoomable, setZoomable] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCorpus())
    }, [])
    const {corpusId} = route.params
    
    const corpus = useSelector(state => state.corpus.corpusAll.find(e => e.id === corpusId))

    const openObjectsHandler = object => {
        navigation.navigate('ObjectInfo', {objectId: object.id, objectName: object.name})
    }
    // useEffect(() => {
    //     dispatch(loadPost(objectId))
    // }, [])
    const loadObjectForCorpus = useSelector(state => state.object.objectForCorpus)
    const loading = useSelector(state => state.object.loading)
    // const updatedUserPrivileg =  useCallback(() => {
    //   dispatch(updateObject(corpus))
    // }, [dispatch, corpus])
    // console.log(loadObjectForCorpus, ' OBJECT FOR CORPUS')
    if (!corpus) {
      return <View><Text>{corpusId}</Text></View>
    }

    return <Fragment><ScrollView style={{flex: 1, backgroundColor: '#000'}}>
        
        <View style={styles.container}>
    <View style={styles.userCard}>
    <View>
        <TouchableOpacity onPress={() => setZoomable(true)}>
            <Image style={{height: 150, width: 150}} source={{uri: corpus.img}}/>
        </TouchableOpacity>
    </View>
    <View style={styles.privateData}>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{corpus.name}</Text>
        </View>
        <View style={styles.textStyle}>
  <Text style={styles.textStyleLine}>{corpus.description}</Text>
        </View>
    
    </View>
</View>
        {loading ? 
        <SafeAreaView style={styles.center}>
            <ActivityIndicator size="small" color="#0000ff"/>
            </SafeAreaView> :
            <FlatList 
            style={styles.menuCard}
            data={loadObjectForCorpus} 
            keyExtractor={object => object.id.toString()} 
            renderItem={({item}) => <ObjectCard object={item} onOpen={openObjectsHandler}
            horizontal={false}
            />}
                    />}
        
    
</View>


{/* <Footer/> */}
</ScrollView>
<ModalZoomable zoomable={zoomable} setZoomable={setZoomable} pathImg={corpus.img}/>
</Fragment>
}
const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#f9c2ff',
        
    },
    image: {
        width: '100%'
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
        // backgroundColor: '#1C1B1B'
    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '60%'
    },
    textStyle: {
        color: '#fff', 
        borderBottomWidth: 0.5, 
        borderColor: '#fff'
        
    },
    textStyleLine: {
        color: '#fff',
        fontFamily: 'open-regular'
        
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        // paddingHorizontal: '18%',
        // flex: 1,
        // height: '89%'
      },
      radioButton: {
          marginTop: 25
      },
      menuCard: {
        // padding: 4,
        // marginTop: 50,
        // borderBottomWidth: 0.3,
       
        borderTopWidth: 0,
        borderColor: '#fff',
        width: '100%',
        backgroundColor: '#1C1B1B'
    }, 
})
CorpusScreen.navigationOptions = ({route, navigation }) => {
    const name = route.params.corpusName
    const {corpusId} = route.params
    return {
        headerTitle: name,
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item 
        title='AddNewUser'
        iconName='ios-add-circle-outline'
        onPress={() => navigation.navigate('CreateObjects', {corpusId})}
        />
      </HeaderButtons>
    }
}