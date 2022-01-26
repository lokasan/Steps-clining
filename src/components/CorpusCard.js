import React, {Fragment, useState} from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import { useDispatch } from 'react-redux'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { removeCorpus } from '../store/actions/corpus'
import { clearObjectState, loadObjectById } from '../store/actions/object'
import { loadPost, clearPost } from '../store/actions/post'
import { ModalForRemove } from './ui/ModalForRemove'

export const CorpusCard = ({corpus, onOpen}) => {
    const TEXT_TITLE = 'Удаление объекта'
    const TEXT_ACTION = 'Вы уверены, что хотите удалить объект'
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()
    const removeHandler = (corpus) => {
        Alert.alert(
            "Удаление объекта",
            "Вы уверены, что хотите удалить объект " + corpus.name + ' ?',
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress() {
                
                dispatch(removeCorpus(corpus.id))
              } 
            }
            ],
            { cancelable: false }
          )
          
    }
    return <Fragment>
    <ModalForRemove TEXT_TITLE={TEXT_TITLE} TEXT_ACTION={TEXT_ACTION} remove={removeCorpus}  modalVisible={modalVisible} setModalVisible={setModalVisible} myObject={corpus} />
    <TouchableOpacity activeOpacity={0.7} onPress={() => {
        dispatch(clearObjectState())
        dispatch(loadObjectById(corpus.id))
        onOpen(corpus)
        }} onLongPress={() => setModalVisible(true)}>
    <View style = {styles.actionMenu}>
        <Image style = {styles.image} source = {{uri: corpus.img}}/>
        <View  style = {styles.privateData}>
            <View>    
                <Text style = {{color: '#fff'}}>{corpus.name}</Text>
            </View>
            <View>
                <Text style = {{color: '#fff'}}>{corpus.address}</Text>
            </View>
        </View>
        <ArrowRight/>
    </View>
    </TouchableOpacity>
    </Fragment>
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