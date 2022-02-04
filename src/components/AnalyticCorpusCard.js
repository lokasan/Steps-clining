import React, {useState, useRef} from 'react';
import {Animated, View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Cycle, Clock, Rank, QRIcon, StepsIcon, PeopleIcon, ArrowRight, TimeBetweenBypass} from './ui/imageSVG/circle'
import {ArrowTrand} from './toolkitComponents/ArrowTrand'
import {useDispatch, useSelector} from 'react-redux'
import { msToTime, timeToFormat, countFormat } from '../utils/msToTime';
import { loadBypassBuildingForCorpus } from '../store/actions/bypass';
export const AnalyticsCorpusCard = ({item, index, navigation}) => {
    const corpusData = useSelector(state => state.corpus.corpusAll)
    const dispatch = useDispatch()
    const shakeAnim = useRef(new Animated.Value(0)).current
    const [indexToAnimate, setIndexToAnimate] = useState(null)
    let imageSrc = '' 
    console.log(corpusData.map(el => {
        if (el.id == item.id) {
            imageSrc = el.img
        }
    }))
    
    const startShake = (index) => {
        Animated.sequence([
            Animated.timing(shakeAnim, {toValue: 10, duration: 100, useNativeDriver: true}),
            Animated.timing(shakeAnim, {toValue: -10, duration: 100, useNativeDriver: true}),
            Animated.timing(shakeAnim, {toValue: 10, duration: 100, useNativeDriver: true}),
            Animated.timing(shakeAnim, {toValue: 0, duration: 100, useNativeDriver: true})
        ]).start()
    }
    return (
        <Animated.View style={index == indexToAnimate 
        ? {...styles.corpus, transform: [{translateX: shakeAnim}]} 
        : {...styles.corpus, transform: [{translateX: 0}]}}>
            <TouchableOpacity onPress={() => {
                setIndexToAnimate(index); 
                startShake(index);
                // dispatch(loadBypassBuildingForCorpus('today', item.id))
                navigation.navigate('CorpusDetailAnalytics', {corpusId: item.id, corpusName: item.name})
                }}>
            <View>
                <Image 
                    style={styles.tinyLogo}
                    source={{uri: imageSrc ? imageSrc : null}}/>
                <View style={{position: 'absolute', alignSelf: 'center', width: '100%', height: '100%', justifyContent: 'space-between'}}>
                    <View style={styles.titleAroundTextView}>
                        <Text style={styles.titleCorpus}>{item.name}</Text>
                    </View>
                    <View style={{width: '100%', backgroundColor: 'rgba(0, 0, 0, .7)', flexDirection: 'row',  padding: 10}}>
                        <View style={{alignItems: 'center'}}>
                        {Rank()}
                            <Text style={styles.textForPic}>{item.avg_rank}</Text>
                        </View>
                            
                        <View style={{alignItems: 'center'}}>
                        {Cycle()}
                            <Text style={styles.textForPic}>{countFormat(item.count_cycle)}</Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                        {TimeBetweenBypass('#fff', 17, 16)}
                            <Text style={styles.textForPic}>{timeToFormat(msToTime(item.time_between_bypass).split(':', 2)?.join(':'))}</Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                        {QRIcon()}
                            <Text style={styles.textForPic}>{countFormat(item.count_bypass)}</Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                        {Clock()}
                            <Text style={styles.textForPic}>{timeToFormat(msToTime(item.time_bypasses).split(':', 2)?.join(':'))}</Text>
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <ArrowTrand item={{trand: 1}}/>
                            <Text style={styles.textForPic}></Text>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    textForPic: {
        color: 'white'
    },
    titleAroundTextView: {
        backgroundColor: 'rgba(0, 0, 0, .7)'
        
    },
    titleCorpus: {
        textAlign: 'center',
        color: 'white',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        width: 160,
        height: 160
    },
    corpus: {
        display: 'flex', 
        justifyContent: 'flex-start',
        // paddingTop: 20,
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 20,
        marginTop: 30, 
        

    }
})