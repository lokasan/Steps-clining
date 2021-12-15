import React from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { ArrowTrand } from '../../components/toolkitComponents/ArrowTrand';
import { msToTime } from '../../utils/msToTime';

export const Attribute = ({  }) => {
    const DATA_COMPONENT = useSelector(state => state.bypass.componentForBuilding)
    const Component = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => {}}>
            <View style={styles.item}
            // added functionality for viewed element
            >
                <View style={styles.wrapperFirstLine}>
                    <View>
                        <View style={styles.wrapperFirstLine}>
                            <View>
                                <Text style={styles.headTitle}>
                                    {`${item.component_name}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '50%'}}>
                        <View 
                        style = {styles.sticker}>
                            <View style = {styles.toolkitPad}>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{item.avg_rank_component.toFixed(1)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{item.count_bypass}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>{msToTime(item.time_bypasses_component)}</Text>
                                </View>
                                <View style = {styles.alignElementsCenter}>
                                    <Text style = {styles.textStyleInToolkit}>-</Text>
                                </View>
                                <ArrowTrand item={item}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        )
    }
    const renderItem = ({ item, index }) => {
        return <Component item={item} index={index} />
    }

    return (
        <FlatList
        showsVerticalScrollIndicator = {false}
        data = {DATA_COMPONENT}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        listKey={String(Date.now())}  
        ></FlatList>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
        // flexGrow: 0,
        marginHorizontal: '5%',
        marginVertical  : 5,
        height          : 30,
        borderRadius    : 15,
        shadowColor     : "#000000",
        shadowOffset    : {
          width : 0,
          height: 6,
        },
         shadowOpacity: 0.30,
         shadowRadius : 4.65,
    },
    wrapperFirstLine: {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    headTitle: {
        fontSize   : 14,
        paddingLeft: 22,
        paddingTop : 11,
    },
    sticker: {
        borderTopLeftRadius   : 0,
        borderTopRightRadius  : 15,
        shadowColor           : "#000000",
        height: '100%', 
        backgroundColor: 'black', 
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 15, 
        shadowOffset : 
        {
        width : 0,
        height: 0,
        }, 
        shadowRadius: 0,
        elevation: 0
    },
    toolkitPad: {
        paddingTop    : 10,
        paddingLeft   : 10,
        paddingRight  : 10,
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    alignElementsCenter: {
        alignItems: 'center',
    },
    textStyleInToolkit: {
        color     : '#ffffff',
        fontSize  : 10,
        paddingTop: 0,
    }

})