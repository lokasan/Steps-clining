import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { clearBypassUsersDetail, getImageBypassUserOfPost, getImageBypassUserOfPostCount, loadBypassUsersDetail } from '../../store/actions/bypass';
import { showLoaderBypassRank } from '../../store/actions/bypassRank';
import {msToTime} from '../../utils/msToTime';
import { PostDetail } from './PostDetail';
export const Post = ({user_id, period, monthRange, 
    showUserDetailInfoOrUnshow, flagArrayUsersDetail, setFlagArrayUsersDetail, setMonthRange, 
    setModalVisibleDay, choseDateCurrentRef, setModalVisibleRank, 
    bypassKeyByValueRef, bypassPhotoPostIdRef, bypassPhotoEmailRef, DATA_IMAGE_BYPASS_RANK}) => {
    const existsComponents = useRef([])
    const DATA_USER_WITH_TBR_DETAIL = useSelector(state => state.bypass.userWithTbrDetail)
    const [openedPostInOpenedUserOfBuilding, setOpenedPostInOpenedUserOfBuilding] = useState([])
    const POSTS_LIST = useSelector(state => state.post.postAll)
    const DATA_USER_DETAIL = useSelector(state => state.bypass.bypassUsersList)
    const choisePost = useRef('')
    

    const createTextComponent = (item, index) => {
        let createdComponent = []
        const uniqueComponent = {}
        let valueOfKeyComponent = []
        if (item?.data?.length !== 0) {
        item.data.map(el => {
            Object.keys(el).map(key => {
                if (!isNaN(Number(key))) {
                    if (!uniqueComponent.hasOwnProperty(key)) {
                        uniqueComponent[key] = el[key]
                    }
                }
            })
        })
            
          valueOfKeyComponent.push(...Object.values(uniqueComponent))
          valueOfKeyComponent.map(el => createdComponent.push(<Text style ={styles.beastAndBad}>{el}</Text>))
           
          existsComponents.current = valueOfKeyComponent
          valueOfKeyComponent = []
        }
        return createdComponent
      }
    const CreateTextComponentWithRatingPost = ({item}) => {
        const createdElements = []
        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }
        for (let cmp of existsComponents.current) {
            let keyByValue = getKeyByValue(item, cmp)
            if (keyByValue) {
              // console.log(item.is_image)
              createdElements.push(<TouchableOpacity onPress={() => {
                bypassKeyByValueRef.current = keyByValue
                bypassPhotoPostIdRef.current = item.post_id
                bypassPhotoEmailRef.current = item.email
                dispatch(showLoaderBypassRank())
                dispatch(getImageBypassUserOfPostCount(period, keyByValue, item.post_id, item.email))
                dispatch(getImageBypassUserOfPost(period, keyByValue, item.post_id, item.email, DATA_IMAGE_BYPASS_RANK.length))
                setModalVisibleRank(true)
                
              }} disabled={ +item[keyByValue + 'count_bad_rank'] ? false : true}>
                <Text style={+item[keyByValue + 'count_bad_rank'] ? {...styles.beastAndBad, color: '#e4a010'} : 
              {...styles.beastAndBad, color: "black"}}>{`${item[keyByValue + '_rank']}`}
                </Text></TouchableOpacity>)
            } else {
              createdElements.push(<Text style = {styles.beastAndBad}>-</Text>)
            }
          }  
        return createdElements
    }
    const CreateViewDataComponentPost = ({item, index}) => {
        const createViewData = []
        if (item?.data?.length !== 0) {
            item.data.forEach((el, idx) => {
                createViewData.push(<View>
                    <TouchableOpacity onPress = {() => showUserDetailInfoOrUnshow(idx, item)}>
                    <Image 
                    style={{
                      width: 20, 
                      height: 20, 
                      marginLeft: 22, 
                      marginTop: 11, 
                      borderRadius: 50}} source={{uri: POSTS_LIST.map(els => {
                      if (els.id === item?.data[idx]?.post_id) {
                        return els.img
                      }
                      }).join('')}}/>
                    </TouchableOpacity>
                    <Text style={styles.beastAndBad}>{item.data[idx].avg_rank_post}</Text>
                    <Text style={styles.beastAndBad}>{item.data[idx].count_bypass}</Text>
                    <Text style={styles.beastAndBad}>{msToTime(item.data[idx].time_bypasses)}</Text>
                    <Text style={styles.beastAndBad}>{msToTime(item.data[idx].avg_bp_by_bp)}</Text>
                    <Text style={styles.beastAndBad}>{item.data[idx].cleaner}</Text>
                    <CreateTextComponentWithRatingPost item={item?.data[idx]} />
                    </View>)
            })
        }
        return createViewData
    }
    const ItemPost = ({item, index}) => {
        let textComponent = createTextComponent(item)

        
        return (
            <View style={flagArrayUsersDetail.length && flagArrayUsersDetail.map(el => item.data
                .map(elD => el.email === elD.email && el.post === elD.post_name))
              .map(res => res.indexOf(true) !== -1? true : false)
              .indexOf(true) !== -1 && period !== 'today' ? {display: 'none'} : {...styles.itemUD}}>
                {/* {textCmpt(item.data)} */}
                <View style={styles.wrapperFirstLine}>
                    <View>
                        <View style={styles.wrapperFirstLine}>
                            <View>
                            </View>
                        </View>
                        <View style={styles.wrapperSecondLine}>
                            <View>
                                <Text style={styles.beastAndBad}>Пост</Text>
                                <Text style={styles.beastAndBad}>Средний балл</Text>
                                <Text style={styles.beastAndBad}>Кол-во обходов</Text>
                                <Text style={styles.beastAndBad}>Время обходов</Text>
                                <Text style={styles.beastAndBad}>Время между обх.</Text>
                                <Text style={styles.beastAndBad}>Уборщик</Text>
                                {textComponent}
                            </View>
                            <ScrollView 
                                vertical={false}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{display: 'flex', flexDirection: 'row', width: '65%'}}>
                                <CreateViewDataComponentPost item={item}/>
                                </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const renderItem = ({item, index}) => {
        return <>
                <ItemPost item={item} index={index} />
               {flagArrayUsersDetail.map(el => item.data
                    .map(elD => el.email === elD.email && el.post === elD.post_name))
                    .map(res => res.indexOf(true) !== -1 ? true : false)
                    .indexOf(true) !== -1 && period !== 'today' ? 
                    <PostDetail 
                    period={period} 
                    monthRange={monthRange} 
                    user={item.data} 
                    setFlagArrayUsersDetail={setFlagArrayUsersDetail}
                    flagArrayUsersDetail={flagArrayUsersDetail}
                    setMonthRange={setMonthRange}
                    setModalVisibleDay={setModalVisibleDay}
                    choseDateCurrentRef={choseDateCurrentRef}
                    /> : null}
               </>
    }
    console.log(DATA_USER_WITH_TBR_DETAIL, 'DATA_USER_WITH_TBR_DETAIL')
    return (
        <>
        <FlatList
        data={[{id: String(Date.now()), data: DATA_USER_WITH_TBR_DETAIL.filter(el => el.user_id === user_id)}]}
        renderItem={renderItem}
        keyExtractor={item => item.id}>

        </FlatList>
        </>
    )
}

const styles = StyleSheet.create({
    itemUD: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
        // flexGrow: 0,
        marginHorizontal: '5%',
        marginVertical  : 5,
        borderRadius    : 15,
        shadowColor     : "#000000",
        shadowOffset    : {
          width : 0,
          height: 6,
        },
         shadowOpacity: 0.30,
         shadowRadius : 4.65,
      },
      beastAndBad: {
        fontSize   : 10,
        paddingLeft: 22,
        paddingTop : 11,
        fontFamily: 'open-bold'
    },
    wrapperFirstLine: {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    wrapperSecondLine: {
         flexDirection: 'row',
         alignItems   : 'center'
    },
})