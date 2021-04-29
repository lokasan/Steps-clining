import React, { useState } from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity} from 'react-native'
import { useDispatch } from 'react-redux'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { createComponentToPostLink, deleteComponentToPostLink } from '../store/actions/postWithComponent'


const createDeleteHandler = (dispatch, postId, component, flag) => {
    if (!flag) {
        dispatch(createComponentToPostLink(postId, component)) 
    } else {
        dispatch(deleteComponentToPostLink(postId, component)) 
    }
}
export const ComponentCardToPost = ({post, component, postWithComponentAll}) => {
    const dispatch = useDispatch()
    
    let flag = false
    console.log(postWithComponentAll)
   
    for (let item of postWithComponentAll) {
        if (item.id === component.id) {
           flag = true
        }
    }
    console.log(flag);
    
    return <TouchableOpacity style={{borderBottomWidth: 0.3, borderColor: '#fff'}} activeOpacity={0.7}  onPress={() => createDeleteHandler(dispatch, post.id, component, flag)}>
    <View style={flag ? styles.actionMenuActive : styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: component.img}}/>
        <View style={styles.privateData}>
           
<Text style={{color: '#fff', marginLeft: 15}}>{component.name}</Text>

</View>
        
        
        
        
    </View>
    </TouchableOpacity>
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
        opacity: 0.3,
        paddingTop: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        
        
    },
    actionMenuActive: {
        opacity: 1,
        paddingTop: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        
        
    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
})