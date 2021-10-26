import React from 'react';
import { useDispatch } from 'react-redux';
import {StyleSheet, Modal, View, Text, Pressable, Image, Alert} from 'react-native'

export const ModalForRemove = ({TEXT_TITLE, TEXT_ACTION, remove, modalVisible, setModalVisible, myObject, isOnline, componentRankAll, updateComponentRank}) => {
    const dispatch = useDispatch()

    const removeHandler = () => {
      Alert.alert(
          `Подтверждение действия "${TEXT_TITLE}"`,
          `${TEXT_ACTION}  ${myObject.name} ?`,
          [
            
            {
              text: "Отменить",
              
              style: "cancel",
              onPress() {
                setModalVisible(!modalVisible)
              }
            },
            { text: "Удалить", style: 'destructive', onPress() {
              
              setModalVisible(!modalVisible)
              if (componentRankAll !== undefined && updateComponentRank !== undefined) {
                dispatch(updateComponentRank(componentRankAll.filter(e => e.id !== myObject.id), componentRankAll.length -1, count=1))
              }
               dispatch(remove(myObject.id))
            } 
          }
          ],
          { cancelable: false }
        )
        
  
  }

    return <Modal
    animationType='fade'
    transparent={true}
    visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{TEXT_TITLE}</Text>
          <Text style={styles.modalText}>
            <Text>{TEXT_ACTION} </Text>
            <Text style={{fontWeight: 'bold'}}>{myObject.name}</Text>
            <Text> ?</Text>
            </Text>
            <View style={{alignSelf: 'center'}}>
            <Image source={{uri: myObject.img}} style={isOnline?.filter(el => el == myObject.id).length ? {borderRadius: 50, borderWidth: 1, width: 60, height: 60, borderColor: 'rgba(0, 255, 0, 1)'} : {borderRadius: 50, borderWidth: 1, width: 60, height: 60, borderColor: 'rgba(255, 0, 0, 1)'}}/>
            </View>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Pressable
            style={({ pressed }) => [styles.button, pressed ? styles.buttonClosePressed : styles.buttonClose ]}
            onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Отменить</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.button, pressed ? styles.buttonDeletePressed : styles.buttonDelete]}
            onPress={removeHandler}>
              <Text style={styles.textStyle}>Удалить</Text>
          
          </Pressable>
          </View>
        </View>
      </View>
  </Modal>
}

const styles = StyleSheet.create({
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding:35,
        paddingBottom: 10,
    
        shadowColor: '#000',
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
      buttonClosePressed: {
        backgroundColor: '#000'
      },
      buttonClose: {
        backgroundColor: '#303f9f',
      },
      buttonDeletePressed: {
        backgroundColor: 'green',
      },
      buttonDelete: {
        backgroundColor: 'red',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center'
      },
      modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold'
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      }
})