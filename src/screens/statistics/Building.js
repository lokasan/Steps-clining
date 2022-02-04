import React, {useCallback} from 'react';
import {View, FlatList, ScrollView, TouchableOpacity, Text, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'

export const Building = ({}) => {
    const DATA_OBJECTS_LIST = useSelector(state => state.bypass.bypassGetter)
    const renderItem = useCallback(({ item, index }) => {
          
        return <><Item item = {item} index = {index}/>
        {flagArrayObjectDetail.indexOf(item.title) !== -1 ? <Animated.FlatList 
        showsVerticalScrollIndicator = {false}
        data = {[{id: String(Date.now()), data: DATA_OBJECT_DETAIL.filter(el => el.object_name === item.title )}]} 
        renderItem={renderItemObjectDetails} 
        keyExtractor={item => item.id}/> : null}
        { flagArrayObjects.indexOf(item.title) !== -1 
        ? (stateChartInnerRef.posts ? <Animated.FlatList 
        showsVerticalScrollIndicator = {false}
        data = {DATA_POSTS} renderItem={renderItemPosts}
        keyExtractor={keyExtractors} 
        listKey={String(Date.now())}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        /> : (stateChartInnerRef.employee 
          ? <User 
          period={period} 
          building_id={activeBuildingRef.current.building_id}
          monthRange={monthRange}
          showUserDetailInfoOrUnshow={showUserDetailInfoOrUnshow}
          setModalVisibleDay={setModalVisibleDay}
          flagArrayUsersDetail={flagArrayUsersDetail}
          setFlagArrayUsersDetail={setFlagArrayUsersDetail}
          setMonthRange={setMonthRange}
          choseDateCurrentRef={choseDateCurrentRef}
          setModalVisibleRank={setModalVisibleRank}
          bypassKeyByValueRef={bypassKeyByValueRef}
          bypassPhotoPostIdRef={bypassPhotoPostIdRef}
          bypassPhotoEmailRef={bypassPhotoEmailRef}
          DATA_IMAGE_BYPASS_RANK={DATA_IMAGE_BYPASS_RANK}
          /> : (stateChartInnerRef.components 
            ? <Attribute

              /> : null ))) 
        : null}</>
       
      })
    
    return (
        <Animated.FlatList showsVerticalScrollIndicator={false}
          style={{marginTop: 15}} data={DATA_OBJECTS_LIST} onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true}
          )} renderItem={renderItem} keyExtractor={item => item.id}/>
    )
}