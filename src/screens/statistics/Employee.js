import React, {useCallback, useRef} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { ArrowTrand } from '../../components/toolkitComponents/ArrowTrand';
import { getImageBypassUserOfPost, getImageBypassUserOfPostCount } from '../../store/actions/bypass';
import { showLoaderBypassRank } from '../../store/actions/bypassRank';
import { countFormat, msToTime, timeToFormat } from '../../utils/msToTime';
import { EmployeeDetail } from './EmployeeDetail';

export const Employee = ({DATA_IMAGE_BYPASS_RANK, bypassKeyByValueRef, 
                        bypassPhotoPostIdRef, bypassPhotoEmailRef, period, 
                        setModalVisibleRank, setModalVisible, setModalVisibleDay, showUserDetailInfoOrUnshow, post_name, 
                        flagArrayUsersDetail, choisePostS, monthRange, setMonthRange, choseDateCurrentRef, setFlagArrayUsersDetail}) => {
    const keyExtractors = useCallback(item => item.post_id.toString())
    const USERS_AVERAGE_STAT = useSelector(state => state.bypass.usersAverageStat)
    const USERS_LIST = useSelector(state => state.empDouble.empServer)
    const DATA_USERS_DETAIL = useSelector(state => state.bypass.bypassUsersListDetail)
    const loaderIcon = useSelector(state => state.bypass.loaderIcon)
    const existsComponents = useRef([])
    const dispatch = useDispatch()

    const createTextComponent = (item, index) => {
        let createdComponent = []
        let uniqueComponent = {}
        let valueOfKeyComponent = []
        if (item?.length !== 0) {
          item.map(el => {
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

    const CreateTextComponentWithRatingUsers = ({item}) => {
        let createdElements = []
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
        return createdElements;
    }

    const CreateViewDataComponentUsers = ({item, index}) => {
        const data = {data: USERS_AVERAGE_STAT.filter(el => el.post_name === post_name)}
        return <View>
              <TouchableOpacity onPress = {() => showUserDetailInfoOrUnshow(index, data)}>
              <Image 
              style={{
                width: 20, 
                height: 20, 
                marginLeft: 22, 
                marginTop: 11, 
                borderRadius: 50}} source={{uri: USERS_LIST.map(els => {
                if (els.email === item?.email) {
                  return els.img
                }
                }).join('')}}/>
              </TouchableOpacity>
              <Text style={styles.beastAndBad}>{item.avg_rank}</Text>
              <Text style={styles.beastAndBad}>{countFormat(item.count_bypass)}</Text>
              <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.time_bypass))}</Text>
              <Text style={styles.beastAndBad}>{timeToFormat(msToTime(item.time_bbb))}</Text>
              <Text style={styles.beastAndBad}>{item.cleaner}</Text>
              <CreateTextComponentWithRatingUsers item={item} />
              </View>
          
        
    }
    const MainWindowWithRanking = () => {
        return (
            <FlatList
                data={USERS_AVERAGE_STAT.length ? 
                    USERS_AVERAGE_STAT.filter(el => el.post_name === post_name) : []}
                keyExtractor={keyExtractors}
                renderItem={CreateViewDataComponentUsers}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{display: 'flex', flexDirection: 'row', width: '65%'}}
                />
        )
    }
    const ItemUsers = () => {
        const item = USERS_AVERAGE_STAT.filter(el => el.post_name === post_name)
        let textComponent = createTextComponent(item)
        
          return (<>
          <Animated.View style = {flagArrayUsersDetail.length && flagArrayUsersDetail.map(el => item
            .map(elD => el.email === elD.email && el.post === elD.post_name))
          .map(res => res.indexOf(true) !== -1? true : false)
          .indexOf(true) !== -1 && !loaderIcon  && period !== 'today' ? {display: 'none'} : {...styles.itemUD}}>
           
           <View style = {{...styles.wrapperFirstLine}}>
             <View> 
                 <View style = {styles.wrapperFirstLine}>
                     <View>
                     </View>
                 </View>
                 <View style = {styles.wrapperSecondLine}>
                   <View>
                     <Text style={styles.beastAndBad}>Сотрудник</Text>
                     <Text style={styles.beastAndBad}>Средний балл</Text>
                     <Text style={styles.beastAndBad}>Кол-во обходов</Text>
                     <Text style={styles.beastAndBad}>Время обходов</Text>
                     <Text style={styles.beastAndBad}>Время между обх.</Text>
                     <Text style={styles.beastAndBad}>Уборщик</Text>
                     {textComponent}
                   </View>
                   {MainWindowWithRanking()}
                 </View>
             </View>
             <View style = {{flexDirection: 'column', justifyContent: 'space-between', width: '45%'}}>
           <ArrowTrand item={item}/>
           </View>
           </View>
       </Animated.View>
       {flagArrayUsersDetail.map(el => item
          .map(elD => el.email === elD.email && el.post === elD.post_name))
          .map(res => res.indexOf(true) !== -1 ? true : false)
          .indexOf(true) !== -1 && period !== 'today' ? 
          <EmployeeDetail
            period={period}
            monthRange={monthRange}
            setMonthRange={setMonthRange}
            flagArrayUsersDetail={flagArrayUsersDetail}
            setFlagArrayUsersDetail={setFlagArrayUsersDetail}
            setModalVisible={setModalVisible}
            setModalVisibleDay={setModalVisibleDay}
            choisePostS={choisePostS}
            DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK}
            choseDateCurrentRef={choseDateCurrentRef}
            user={item}
            /> : 
          null}
       </>)
      }

    return (
        <>
            <ScrollView>
                {ItemUsers()}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    beastAndBad: {
        fontSize   : 10,
        paddingLeft: 22,
        paddingTop : 11,
        fontFamily: 'open-bold'
    },
    itemUD: {
        backgroundColor : 'rgba(220, 220, 220, .2)',
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
    wrapperFirstLine: {
        flexDirection : 'row',
        justifyContent: 'space-between',
    },
    wrapperSecondLine: {
         flexDirection: 'row',
         alignItems   : 'center'
    },
})