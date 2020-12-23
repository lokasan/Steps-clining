import React, { useEffect } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { Footer } from '../../components/ui/Footer'
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { getEmploeesList } from '../../dataBaseRequests/dataBaseRequests'
import { ComponentCard } from '../../components/ComponentCard'
import { DATA } from '../../testData'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import {loadComponent} from '../../store/actions/component'



export const AttributesList = ( {navigation}) => {
    const openComponentHandler = component => {
        navigation.navigate('ComponentInfo', {componentId: component.id, componentName: component.name})
    }
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadComponent())
    }, [dispatch])

    const componentAll = useSelector(state => state.component.componentAll)
    console.log(componentAll, 'Алл сотрудники');
    return <View style={{flex: 1, backgroundColor: '#000'}}>
    <View style={styles.container, styles.centers}>
    <View style={styles.menuCard}>
        <FlatList 
        data={componentAll} 
        keyExtractor={component => component.id.toString()} 
        renderItem={({item}) => <ComponentCard component={item} onOpen={openComponentHandler}/>}
                />
    </View>
    </View>
    {/* <Footer/> */}
    </View>
}

AttributesList.navigationOptions = ({navigation}) => {

    return {headerTitle: 'Компоненты',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-add-circle-outline'
    onPress={() => navigation.navigate('CreateComponent')}
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