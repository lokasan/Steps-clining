import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native'
import { BasicStatEmploee } from '../components/BasicStatEmploee';
import { Rank, Cycle, QRIcon, StepsIcon } from '../components/ui/imageSVG/circle';

export const BasicStatEmploeeDetail = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flexDirection: 'row', marginVertical: 20, flexWrap: 'nowrap'}}>
                    <BasicStatEmploee color='red' max={100} percentage={110} svgRender={Rank} navigation={navigation } width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={50} delay={600} duration={600} svgRender={Cycle} navigation={navigation}  width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={80} delay={650} duration={650} svgRender={QRIcon} navigation={navigation} width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={1000} percentage={1234} delay={700} duration={700} svgRender={StepsIcon} navigation={navigation} width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={100} percentage={110} svgRender={Rank} navigation={navigation } width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={50} delay={600} duration={600} svgRender={Cycle} navigation={navigation}  width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={80} delay={650} duration={650} svgRender={QRIcon} navigation={navigation} width_svg={24} height_svg={25}/>
                    <BasicStatEmploee color='red' max={1000} percentage={1234} delay={700} duration={700} svgRender={StepsIcon} navigation={navigation} width_svg={24} height_svg={25}/>
            </View>
        </SafeAreaView>
    )
}

const styles = {
    center: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    }
}