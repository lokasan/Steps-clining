import React, { useState, useEffect, useRef, Fragment } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert, Animated, Dimensions} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { Extrapolate } from 'react-native-reanimated'
import {useDispatch, useSelector} from 'react-redux'
import { clearComponentRank, loadComponentRank } from '../store/actions/componentRank'
import { componentClear, removeComponent } from '../store/actions/component'
import { clearPostWithComponent, deleteComponentToPostLink } from '../store/actions/postWithComponent'
import { updateBypassRank } from '../store/actions/bypassRank'
import { finishedBypass, getSingleUserStat } from '../store/actions/bypass'
import { loadFinishedBypassComponents } from '../store/actions/bypassRank'
import { loadPostWithComponent } from '../store/actions/postWithComponent'
import { PhotoPickerBypass } from './PhotoPickerBypass'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator'
import { ModalPostsDone } from './ui/ModalPostsDone'


const  { width }                      = Dimensions.get("window");
const  CARD_ASPECT_RATIO              = 1324 / 863;
const  CARD_WIDTH                     = 200
const  CARD_HEIGHT                    = 200
export const MARGIN                   = 16
export const HEIGHT                   = CARD_HEIGHT + MARGIN * 2
const  { height: wHeight }            = Dimensions.get("window")
const  height                         = wHeight - 64
export const ComponentsRankBypassCard = ({index, y, item, navigation, post, bypassRankId, componentsValid, target, componentRankAll, setModalVisibleCompleteCycle}) => {
    const dispatch = useDispatch()
    
    let components         = useSelector(state => state.postWithComponent.postWithComponentAll)
    let componentsFinished = useSelector(state => state.bypassRank.bypassComponents)
    const componentReload = JSON.parse(JSON.stringify(componentRankAll))
    const postId         = post.id
    const {bypassId}       = useSelector(state => state.bypass.bypassNumber)
    const userId = useSelector(state => state.empDouble.empAll.filter(e => e.status === 1))
  
    const position       = Animated.subtract( index * HEIGHT, y)
    const isDisappearing = -HEIGHT
    const isLeft         = 0
    const isRight        = height - HEIGHT
    const isAppearing    = height
    const [modalVisible, setModalVisible] = useState(false)
    const translateY     = Animated.add(Animated.add(y, y.interpolate({
        inputRange      : [0, 0.0001 + index * HEIGHT],
        outputRange     : [0, -index * HEIGHT],
        extrapolateRight: "clamp"
    })),
        position.interpolate({
            inputRange : [isRight, isAppearing],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: "clamp"
        })
    )
    const scale = position.interpolate({
        inputRange : [isDisappearing, isLeft, isRight, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp"
    })
    const opacity = position.interpolate({
        inputRange : [isDisappearing, isLeft, isRight, isAppearing],
        outputRange: [0.5, 1, 1, 0.5]
    })
    const [image, setImage] = useState([])
    async function askForPermissions() {
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
        )
        if (status !== 'granted') {
            Alert.alert('Ошибка. Вы не дали прав на создание фото')
            return false
        }
        return true
    
    }
    const compressedImage = async (img) => {
        const manipResult = await manipulateAsync(
            img.uri,
            [
                {
                    resize: {height: 1024, width: 1024}
                }],
            {compress: 0.37, format: SaveFormat.JPEG}
        )
        // console.log(manipResult)
        setImage([{id: myId, image: manipResult.uri}])
    }
    const takePhoto = async () => {
        const hasPermissions = await askForPermissions()
        if (!hasPermissions) {
            return 
        }
        const img = await ImagePicker.launchCameraAsync({
            qulity: 0.7,
            allowsEditing: true,
            aspect: [4, 3]
        })
        myId = String(Date.now())
        if (img.uri) {
            await compressedImage(img)
            // setImage([{
            // id: myId,
            // image: img.uri}])
        }
        
        setModalVisible(true)
        
        // console.log(img)
    }
    return (<Fragment>
        
        <PhotoPickerBypass 
            userId={userId} 
            target={target} 
            componentsFinished={componentsFinished} 
            components={components}
            dispatch={dispatch} 
            bypassId={bypassId} 
            bypassRankId={bypassRankId} 
            post={post}
            itemComponentRank={item} 
            image={image} 
            setImage={setImage} 
            navigation={navigation} 
            modalVisible={modalVisible}
            setModalVisibleCompleteCycle={setModalVisibleCompleteCycle} 
            setModalVisible={setModalVisible} />
        <Animated.View    style         = {[styles.card]} key = {String(item.id)}>
        <TouchableOpacity activeOpacity = {0.5} onPress       = {() => {
                // console.log(item.id, " Я Улетаю в базу", ' ', bypassRankId)
                // console.log(componentReload, 'Component Reload')
                maxElement = componentReload.filter(el => el.rank == Math.max(...componentReload.map(e => e.rank))  ? el : null)
                minElement = componentReload.filter(el => el.rank == Math.min(...componentReload.map(e => e.rank))  ? el : null)
                if (maxElement.length) {
                    if (maxElement[0].id === item.id || minElement[0].id === item.id) {
                        takePhoto()
                    } else {
                        dispatch(updateBypassRank(item.id, bypassRankId))
                        dispatch(clearComponentRank())
                        navigation.navigate('BypassScreen', {element: post, goBackQRScreen: target})
                    }
                }
                
                // dispatch(updateBypassRank(item.id, bypassRankId))
                // dispatch(clearComponentRank())
                // console.log(componentsFinished.length, '===', components.length, 'общая длина')
                if ((componentsFinished.length + 1) === components.length && !(maxElement[0].id === item.id || minElement[0].id === item.id)) {
                    // console.log(bypassId, "я байпас")
                    // dispatch(updateBypassRank(item.id, bypassRankId))
                    dispatch(finishedBypass(1, bypassId)) 
                    
                    dispatch(getSingleUserStat(userId[0].id))
                    target()
                    dispatch(clearPostWithComponent())
                    // navigation.navigate('QRCode')
                    setModalVisibleCompleteCycle(true)
                } else if(modalVisible) {navigation.navigate('BypassScreen', {element: post, goBackQRScreen: target})}
                
            }}>
            <Image style = {styles.image} source = {{uri: item.img}}/>
            </TouchableOpacity>
            
            <Text style = {{textAlign: 'center'}}>{item.name}</Text>
            
        </Animated.View>
        </Fragment>
    )
}
const styles = StyleSheet.create({
    emploee: {
        marginBottom: 15,
        overflow    : 'hidden'
    },
    card: {
        flex         : 1,
        flexDirection: 'row',
        
        marginVertical  : MARGIN/2,
        marginHorizontal: MARGIN/2,
        // alignSelf: "center"
    },
    image: {
    
        width       : 100,
        height      : 100,
        borderRadius: 25
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems     : 'center',
        width          : '100%'
    }, 
    title: {
        color     : '#fff',
        fontFamily: 'open-regular'
    },
    actionMenu: {
        paddingTop       : 10,
        paddingLeft      : 40,
        paddingBottom    : 10,
        flexDirection    : 'row',
        alignItems       : 'center',
        justifyContent   : 'space-between',
        borderBottomWidth: 0.3,
        
        
        borderColor: '#fff'

    },
    privateData: {
        flexDirection : 'column',
        justifyContent: 'space-evenly'
    },
})