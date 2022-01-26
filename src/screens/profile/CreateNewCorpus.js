import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView, Image, Button, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../../components/AppHeaderIcon'
import { AppCard } from '../../components/ui/AppCard'
import { HEADER_FOOTER } from '../../theme'
import {useDispatch} from 'react-redux'
import { addEmploee } from '../../store/actions/empDouble'
import { addObject } from '../../store/actions/object'
import { PhotoPicker } from '../../components/PhotoPicker'
import findTrashSymbolsInfo from '../../utils/findTrashSymbolsInfo'
import { addCorpus } from '../../store/actions/corpus'
import  MapView, { Callout, Circle, Marker }  from 'react-native-maps'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { YMaps, SearchControl } from 'react-yandex-maps'
export const CreateNewCorpus= ({navigation}) => {
    const [pin, setPin] = useState({
      latitude: 55.7522,
      longitude: 37.6156
    })
    const [region, setRegion] = useState({
      latitude: 55.7522,
      longitude: 37.6156,
      latitudeDelta: 0.000002,
      longitudeDelta: 0.0025,
    })
    const initialRegion = {
      latitude: 55.7522,
      longitude: 37.6156,
      latitudeDelta: 0.000002,
      longitudeDelta: 0.0025,
    }
    const dispatch = useDispatch()
    
    const [name, setName]               = useState('')
    const [address, setAddress]         = useState('')
    const [coords, setCoords] = useState('')
    const [description, setDescription] = useState('')
    const [borderBottomColor, setBorderBottomColor] = useState({
      name    : false,
    })

    const imgRef           = useRef()
    const imgExtensionsRef = useRef()
    const photoPickHandler = uri => {
      imgRef.current = uri
      imgExtensionsRef.current = '.' + uri.split('.')[uri.split('.').length - 1]
    }
    const createCorpusHandler = () => {
      const corpus = {
        name,
        address,
        coords: pin.latitude + ':' + pin.longitude,
        description,
        img: imgRef.current,
        extensions: imgExtensionsRef.current,
        
      }
      dispatch(addCorpus(corpus))
      navigation.navigate('CorpusesBuilding')
    }
    return                    <ScrollView style = {styles.wrapper}>
    <TouchableWithoutFeedback onPress           = {() => Keyboard.dismiss()}>
            <View>
        <Text style = {styles.title}>Создание нового объекта</Text>
        <AppCard>
        <Text style={{color: 'red'}}>{findTrashSymbolsInfo(name).status !== 200 ?
        `Некорректные символы: ${Array
          .from(new Set(findTrashSymbolsInfo(name).error))
          .join('')}` :
        ''}</Text>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Название объекта'
        value        = {name}
        onChangeText = {(text) => {
          findTrashSymbolsInfo(text).status !== 200 ?
          setBorderBottomColor({...borderBottomColor, name: false}) : 
          setBorderBottomColor({...borderBottomColor, name: true})
          setName(text)
          
        }}/>
        
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Адрес объекта'
        value        = {address}
        onChangeText = {setAddress}/>
        <TextInput
        style        = {styles.textarea}
        placeholder  = 'Описание'
        value        = {description}
        onChangeText = {setDescription}/>
        {/* <GooglePlacesAutocomplete
      placeholder='Search'
      debounce={400}
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance"
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setRegion({latitude: details.geometry.location.lat, 
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.000002,
          longitudeDelta: 0.0025,})
      }}
      query={{
        key: 'AIzaSyDQ_FLKGSLRDRjTUMGfjYv2Pc2R0rK20mU',
        language: 'en',
        components: "country:ru",
        types: "establishment",
        location: `${region.latitude}, ${region.longitude}`
      }
      }
      styles={{container: {flex: 0, position: "relative", width: "100%", zIndex: 100},
    listView: {backgroundColor: "white"}}}
    /> */}
        <MapView 
        initialRegion={initialRegion}
        style={{height: 300}}
        provider="google">
          <Marker 
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
          pincolor="red"/>
          <Marker coordinate={pin}
            pinColor="black"
            draggable={true}
            onDragStart={e => {
              console.log('Drag Start', e.nativeEvent.coordinates)
            }}
            onDragEnd={e => {
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              })
            }}>
              <Callout><Text>{description}</Text></Callout>
            </Marker>
            <Circle 
            center={pin}
          radius={25}
            ></Circle>
        </MapView>
        </AppCard>
        {/* <YMaps>
        <SearchControl options={{ float: 'right' }} />
        </YMaps> */}
        <PhotoPicker onPick = {photoPickHandler}/>
        
     <Button 
     title    = 'Создать объект'
     onPress  = {createCorpusHandler}
     color    = {HEADER_FOOTER.MAIN_COLOR}
     disabled = {!name || !address || !description || !borderBottomColor.name}/>
      </View>
      </TouchableWithoutFeedback>
    </ScrollView>
}
CreateNewCorpus.navigationOptions = ({navigation}) => ({
    headerTitle: 'Новый объект'
})

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize      : 20,
        textAlign     : 'center',
        fontFamily    : 'open-regular',
        marginVertical: 10
    },
    textarea: {
        top              : -10,
        height           : 60,
        borderColor      : 'gray',
        borderBottomWidth: 1
    }
})