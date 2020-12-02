import React, { useEffect } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { Footer } from '../../components/ui/Footer'
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { getEmploeesList } from '../../dataBaseRequests/dataBaseRequests'
import { EmploeeCard } from '../../components/EmploeeCard'
import { DATA } from '../../testData'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import {loadEmploeeDouble} from '../../store/actions/empDouble'



export const EmploeesList = ( {navigation}) => {
    const openEmploeeHandler = emploee => {
        navigation.navigate('EmploeeInfo', {emploeeId: emploee.id, emploeeName: emploee.name})
    }
    let result = getEmploeesList().then()
    // получаю пустой промис исправить ошибку
    console.log(result, 'раскрыл');
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadEmploeeDouble())
    }, [dispatch])

    const emploeeAll = useSelector(state => state.empDouble.empAll)
    console.log(emploeeAll, 'Алл сотрудники');
    return <View style={{flex: 1, backgroundColor: '#000'}}>
    <View style={styles.container, styles.centers}>
    <View style={styles.menuCard}>
        <FlatList 
        data={emploeeAll} 
        keyExtractor={emploee => emploee.id.toString()} 
        renderItem={({item}) => <EmploeeCard emploee={item} onOpen={openEmploeeHandler}/>}
                />
    </View>
    </View>
    {/* <Footer/> */}
    </View>
}

EmploeesList.navigationOptions = ({navigation}) => {

    return {headerTitle: 'Сотрудники',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-person-add'
    onPress={() => navigation.navigate('CreateUser')}
    />
  </HeaderButtons>}
}

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