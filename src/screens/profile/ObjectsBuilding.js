import React, { useEffect } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { ObjectCard } from '../../components/ObjectCard'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { loadObject } from '../../store/actions/object'

export const ObjectsBuilding = ({navigation}) => {
    const openObjectsHandler = object => {
        navigation.navigate('ObjectInfo', {objectId: object.id, objectName: object.name})
    }
    // let result = getEmploeesList().then()
    // // получаю пустой промис исправить ошибку
    // console.log(result, 'раскрыл');
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadObject())
    }, [dispatch])

    const objectsAll = useSelector(state => state.object.objAll)
    console.log(objectsAll, 'Алл сотрудники');
    return <View style={{flex: 1, backgroundColor: '#000'}}>
    <View style={styles.container, styles.centers}>
    <View style={styles.menuCard}>
        <FlatList 
        data={objectsAll} 
        keyExtractor={object => object.id.toString()} 
        renderItem={({item}) => <ObjectCard object={item} onOpen={openObjectsHandler}/>}
                />
    </View>
    </View>
    {/* <Footer/> */}
    </View>
}

ObjectsBuilding.navigationOptions = ({navigation}) => {
return {
    headerTitle: 'Объекты',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-add-circle-outline'
    onPress={() => navigation.navigate('CreateObjects')}
    />
  </HeaderButtons>
}}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
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
        borderTopWidth: 0,
        borderColor: '#fff',
        width: '100%',
        backgroundColor: '#1C1B1B'
    },
})