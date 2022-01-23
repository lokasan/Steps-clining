import React, {useState, useEffect} from 'react'
import {View, Modal, Text, StyleSheet, Pressable} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { getBypassMapCompleteCycle } from '../../store/actions/bypass'


export const ModalPostsDone = ({navigation, modalVisible, setModalVisible}) => {
    const postsCompleteCycle = useSelector(state => state.bypass.listPostsInCycleComplete)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getBypassMapCompleteCycle(1639420430898, 1639598921334))
    // }, [])

    const renderPostsCompleteCycle = postsCompleteCycle.filter((el) => !el.is_complete).map(el => {
        return <Text style={styles.modalText}>{el.name}</Text>
    })

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
          
        }}
      >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {renderPostsCompleteCycle.length 
                    ?
                    <><Text>Вам осталось обойти следующие посты для завершения цикла:</Text>
                    {renderPostsCompleteCycle}</>
                    : <Text>Вы завершили цикл</Text>}
                    
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={
                        () => { 
                        setModalVisible(!modalVisible)
                        navigation.navigate('QRCode')
                        }
                    }
                    >
                    <Text style={styles.textStyle}>Закрыть</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });