import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { removeComponentRank, updateComponentRank } from '../store/actions/componentRank'


export const ComponentRankCard = ({componentRank, dispatch, componentRankAll, navigation}) => {
    const removeHandler = () => {
        Alert.alert(
            "Удаление критерия оценки",
            "Вы уверены, что хотите удалить критерий: " + componentRank.name + ' ?',
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress() {
                dispatch(updateComponentRank(componentRankAll.filter(e => e.id !== componentRank.id), componentRankAll.length -1, count=1))
                dispatch(removeComponentRank(componentRank.id))
              } 
            }
            ],
            { cancelable: false }
          )
          
    }
    return <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('EditComponentRank', {componentRank})} onLongPress={removeHandler}>
    <View style={styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: componentRank.img}}/>
        <View style={styles.privateData}>
        <View>    
<Text style={{color: '#fff'}}>{componentRank.name} | {componentRank.rank}</Text>
</View>
<View>

</View>
</View>
        
        
        <ArrowRight/>
        
    </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    emploee: {
        marginBottom: 15,
        overflow: 'hidden'
    },
    image: {
        width: 51,
        height: 51,
        borderRadius: 25
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    }, 
    title: {
        color: '#fff',
        fontFamily: 'open-regular'
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

    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
})