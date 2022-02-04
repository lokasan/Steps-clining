import React, { useCallback } from 'react';
import { View, Dimensions, Modal, Text, TouchableOpacity, FlatList, Animated, ActivityIndicator, StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { clearBypassRankImage, clearBypassRankImageCount } from '../../store/actions/bypassRank';
import CarouselItem from './CarouselItem';
import { ArrowRight } from './imageSVG/circle';

export const ModalPhotoOfBypass = ({modalVisible, setModalVisible, onEndReached}) => {
    
    const {width, height} = Dimensions.get("window")
    const loader = <ActivityIndicator color  = "#0000ff"/>
    const scrollXGallery = new Animated.Value(0)
    
    let position = Animated.divide(scrollXGallery, width)
    function getDotesForImage() {
    const data = []
    for (let i = 0; i < COUNT_IMAGE_TO_BYPASS_RANK; i++) {
        let opacity = position.interpolate({
        inputRange: [i - 1, i, i + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp'
        })
        data.push(<Animated.View
        key = {i}
        style = {{opacity, height: 10, width: 10, backgroundColor: '#4d5d53', margin: 8, borderRadius: 5}}
        >
        </Animated.View>)
    }
    return data
    }
    const testCallbackForModalRank = useCallback(() => {
        setModalVisible(false);
        dispatch(clearBypassRankImage())
        dispatch(clearBypassRankImageCount())
      })
    const loaderPhotos = useSelector(state => state.bypassRank.loading)
    const DATA_IMAGE_BYPASS_RANK = useSelector(state => state.bypassRank.bypassRankImage)
    const COUNT_IMAGE_TO_BYPASS_RANK = useSelector(state => state.bypassRank.bypassRankImageCount)
    
    const renderItemImage = useCallback( ({item}) => (<CarouselItem item={item} />))
    const keyExtractorImage = useCallback((_, index) => 'key' + index)
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={modalVisible}
            >
          <View style={{ backgroundColor: '#000', position: 'relative', paddingTop: 30, paddingLeft: '90%'}}>
            <TouchableOpacity onPress={testCallbackForModalRank}>
              <ArrowRight/>
            </TouchableOpacity>
          </View>
    
          <View style={{backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    
          {loaderPhotos ? loader : <><FlatList
            data={DATA_IMAGE_BYPASS_RANK}
            keyExtractor={keyExtractorImage}
            horizontal
            pagingEnabled
            scrollEnabled
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemImage}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollXGallery}}}],
              { useNativeDriver: false}
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.20}/>
          <View style={styles.dotView}>
            {getDotesForImage()}
            </View></>}
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
})