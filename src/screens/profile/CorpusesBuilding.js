import React, { useEffect, useMemo, useCallback } from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { CorpusCard } from '../../components/CorpusCard'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { loadCorpus } from '../../store/actions/corpus'

export const CorpusesBuilding = ({navigation}) => {
    const openCorpusHandler = corpus => {
        navigation.navigate('CorpusInfo', {corpusId: corpus.id, corpusName: corpus.name})
    }
    // let result = getEmploeesList().then()
    // // получаю пустой промис исправить ошибку
    // console.log(result, 'раскрыл');
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCorpus())
    }, [dispatch])
    
    const corpuses = useSelector(state => state.corpus.corpusAll)
    const loading = useSelector(state => state.corpus.loading)
    
    if (loading) {
        return <View style={styles.center}>
            <ActivityIndicator color="#0000ff"/>
        </View>
    }
    
    return <View style={{flex: 1, backgroundColor: '#000'}}>
    <View style={styles.container, styles.centers}>
    
        <FlatList style={styles.menuCard}
        data={corpuses} 
        keyExtractor={corpus => corpus.id.toString()} 
        renderItem={({item}) => <CorpusCard corpus={item} onOpen={openCorpusHandler}/>}
                />
    
    </View>
    {/* <Footer/> */}
    </View>
}

CorpusesBuilding.navigationOptions = ({navigation}) => {
return {
    headerTitle: 'Объекты',
    headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
    <Item 
    title='AddNewUser'
    iconName='ios-add-circle-outline'
    onPress={() => navigation.navigate('CreateCorpus')}
    />
  </HeaderButtons>
}}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1B1B'
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