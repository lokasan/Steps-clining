import React from 'react'
import { View, StyleSheet, ImageBackground, Text, Image, TouchableOpacity, Alert} from 'react-native'
import {ArrowRight} from '../components/ui/imageSVG/circle'
import { removePost } from '../store/actions/post'

export const PostCard = ({post, navigation}) => {
    const removeHandler = (post) => {
        Alert.alert(
            "Удаление поста",
            "Вы уверены, что хотите удалить пост " + post.name + ' ?',
            [
              
              {
                text: "Отменить",
                
                style: "cancel"
              },
              { text: "Удалить", style: 'destructive', onPress() {
                
                dispatch(removePost(post.id, post.building_id))
              } 
            }
            ],
            { cancelable: false }
          )
          
    }
    return <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('PostWithComponent', {post})} onLongPress={() => removeHandler(post)}>
    <View style={styles.actionMenu}>
    
        <Image style={styles.image} source={{uri: post.img}}/>
        <View style={styles.privateData}>
        <View>    
<Text style={{color: '#fff'}}>{post.name}</Text>
</View>
<View>
<Text style={{color: '#fff'}}>{post.description}</Text>
</View>
</View>
        
        
        <ArrowRight/>
        
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
        paddingTop: 10,
        paddingLeft: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderBottomWidth: 0.3,
        
        
        borderColor: '#fff'

    },
    privateData: {
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
})
// Создать функцию, которая запускает переход к экрану с наполнением поста компонентами по нажатию на элемент
// Компоненты в посте должны иметь прозрачность opacity, если они не закреплены за постом 
// ( и не иметь свойство, если закреплены )
// Связь постов и компонентов реализовать через component_with_post_table
// Логика реализуется через сравнение компонентов, которые присутствуют в таблице
