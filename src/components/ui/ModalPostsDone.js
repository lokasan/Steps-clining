import React, {useState, useEffect} from 'react'
import {View, Modal, Text, StyleSheet, Pressable, Dimensions, SafeAreaView, ScrollView} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { getBypassMapCompleteCycle } from '../../store/actions/bypass'
const {width, height} = Dimensions.get("window")

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
      <SafeAreaView>
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
                <View style={renderPostsCompleteCycle.length ? styles.modalView : [styles.modalView, {justifyContent: 'center'}]}>
                    {renderPostsCompleteCycle.length 
                    ?
                    <><Text style={{fontSize: 20, marginBottom: 20}}>Вам осталось обойти следующие посты для завершения цикла:</Text>
                    <View><ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} showsVerticalScrollIndicator={false}>{renderPostsCompleteCycle}</ScrollView></View></>
                    : <Text style={{fontSize: 20}}>Вы завершили цикл</Text>}
                    
                    <Pressable
                    style={({pressed}) => pressed ? [styles.button, styles.buttonOpen] : [styles.button, styles.buttonClose]}
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
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
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
      elevation: 5,
      width: width,
      height: height,
    },
    button: {
      width,
      padding: 10,
      elevation: 2, 
      position: 'absolute',
      height: 60,
      bottom: 0,
      left: 0,
      justifyContent: 'center'
    },
    buttonOpen: {
      backgroundColor: "black",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20
    },
    modalText: {
      marginBottom: 15,
      fontSize: 18,
    }
  });