import React from 'react';
import Svg, {Circle, Rect, G} from 'react-native-svg';
import {Dimensions, TouchableOpacity, View, Text, StyleSheet, FlatList, Animated as Animatedes, RefreshControl, SectionList,} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { initializationChart, updateStateChart } from '../../store/actions/barchart';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat, useDerivedValue } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Cursor } from './Cursor';
import { ReText, useVector } from 'react-native-redash';
import { ArLeft, ArRight } from '../ui/imageSVG/circle';


export const BarChart = ({}) => {
    const [period, setPeriod] = React.useState('month')
    const [bypassStat, setBypassStat] = React.useState([])
    const dateCurrentRef = React.useRef()
    const getTimeCurrentDay = new Date() - (new Date() % (24 * 60 * 60 * 1000) + (60 * 60 * 1000 * 24))
    const DATA_BARCHART = useSelector(state => state.barchart.barchart)
    const dispatch = useDispatch()
    const active = useSharedValue(false)
    const selected = useSharedValue(2)
    const style = useAnimatedStyle(() => ({transform: [{translateX: 93 * selected.value}], borderTopRightRadius: selected.value !== 3 ? 0 : 5, borderBottomRightRadius: selected.value !== 3 ? 0 : 5,
      borderTopLeftRadius: selected.value !== 0 ? 0 : 5, borderBottomLeftRadius: selected.value !== 0 ? 0 : 5}))
    const styleMoveToolkit = useAnimatedStyle(() => ({opacity: withTiming(active.value ? 1 : 0)}))
    const styleMainDate = useAnimatedStyle(() => ({opacity: withTiming(active.value ? 0 : 1)}))
    const dotesOnBarOfChart = {
      x: [],
      y: [],
    }
    const translation = useVector()

    const MONTH_ARRAY = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
    ]
    const MONTH_OF_YEAR_ARRAY = [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь'
    ]
    
    const endTimeDateObject = DATA_BARCHART.length && new Date(DATA_BARCHART[0].data[0].data[DATA_BARCHART[0].data[0].data.length - 1].date)
    const startTimeDateObject = DATA_BARCHART.length && new Date(DATA_BARCHART[0].data[0].data[0].date)
    const startTimeDisplayed = DATA_BARCHART.length && `${startTimeDateObject.getDate()} ${MONTH_ARRAY[startTimeDateObject.getMonth()]} ${startTimeDateObject.getFullYear()}`
    const endTimeDisplayed = DATA_BARCHART.length && `${endTimeDateObject.getDate()} ${MONTH_ARRAY[endTimeDateObject.getMonth()]} ${endTimeDateObject.getFullYear()}`
    
    React.useEffect(() => {
      dateCurrentRef.current = getTimeCurrentDay
      console.log('I am here')
      dispatch(initializationChart(period, dateCurrentRef.current, dateCurrentRef.current))
    }, [])

    const dateForBarChart = useSharedValue(0)

    // moch data
    const graphsMenu = [
      {
        label: 'today',
        name: 'сегодня',
        value: 0,
        borderRadius: {
          borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
        },
        data: [],
      },
      {
        label: 'week',
        name: 'неделя',
        value: 1,
        borderRadius: {},
        data: [],
      },
      {
        label: 'month',
        name: 'месяц',
        value: 2,
        borderRadius: {},
        data: [],
      },
      {
        label: 'year',
        name: 'год',
        value: 3,
        borderRadius: {
          borderTopRightRadius: 5, borderBottomRightRadius: 5
        },
        data: [],
      },
    ]

    function dTimePlus(currentTime, period) {
      if (period === 'week') {
        return new Date(currentTime).setDate(new Date(currentTime).getDate() + 7)
      }
      if (period === 'month') {
        return new Date(currentTime).setDate(new Date(currentTime).getDate() + 31)
      }
      if (period === 'year') {
        return new Date(currentTime).setMonth(new Date(currentTime).getMonth() + 12)
      }
    }

    function dTimeMinus(currentTime, period) {
      if (period === 'week') {
        return new Date(currentTime).setDate(new Date(currentTime).getDate() - 7)
      }
      if (period === 'month') {
        return new Date(currentTime).setDate(new Date(currentTime).getDate() - 31)
      }
      if (period === 'year') {
        return new Date(currentTime).setMonth(new Date(currentTime).getMonth() - 12)
      }
    }

    const onEndReached = async () => {
      console.log(new Date(dateCurrentRef.current).toString())
      if (dateCurrentRef.current >= getTimeCurrentDay) return null
      dateCurrentRef.current = dTimePlus(dateCurrentRef.current, period) 
      dispatch(updateStateChart(dateCurrentRef.current, period))
    }

    const onRefreshing = async () => {
      console.log(new Date(dateCurrentRef.current).toString())
      dateCurrentRef.current = dTimeMinus(dateCurrentRef.current, period)
      dispatch(updateStateChart(dateCurrentRef.current, period))
      // setBypassStat(async prevState => ([{...prevState, data: [{id: String(Math.random()), data: [await generateChartOfArray(dateCurrentRef.current, period)]}]}]))
      setRefresh(true)
    }

    const listMenu = () => (
        <View 
      style={{
        height: 30, 
        marginHorizontal: '5%', 
        marginTop: 15, 
        borderRadius: 5, 
        alignItems: 'center', 
        flexDirection: 'row', 
        borderWidth: 1, 
        borderColor: '#dedede'}}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.backgroundSelection, style]} />
          </View>
          
          {graphsMenu.map((graph, index) => {
            return (
              <TouchableOpacity key={graph.label} activeOpacity={1} style={period === graph.label ? 
            {...styles.periodStats, ...graph.borderRadius}: 
            {...styles.periodStats, ...graph.borderRadius}} disabled={period === graph.label ? true : false} 
            onPress={() => {
              selected.value = withTiming(index)
              dispatch(initializationChart(graph.label, getTimeCurrentDay, getTimeCurrentDay))
              active.value = false
              
              setPeriod(graph.label)
              
              }}>
          <View>
              
            <Text style = {period === graph.label ? {color: '#ffffff'} : {color: '#000000'}}>{graph.name.charAt(0).toUpperCase() + graph.name.slice(1)}</Text>
              
          </View>
        </TouchableOpacity>
            )
          })}
      </View>
    )
   
    const scrollXGallery = new Animatedes.Value(0)
    const {width, height} = Dimensions.get("window")
    let position = Animatedes.divide(scrollXGallery, width)
    const barCount = period === 'today' ? 24 : period === 'month' ? 31 : period === 'week' ? 7 :  12
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [refresh, setRefresh] = React.useState(false)

    const GetBarLines = ({item}) => {
        const accessibleWidthForBar = windowWidth / barCount
        const paddingSingleForBar = accessibleWidthForBar * 0.2
        const widthForPadding = paddingSingleForBar * barCount
        const accessibleWidthForBarWithoutPadding = (windowWidth - widthForPadding) / barCount
        const circleElementArray = []

        for (let i = 0; i < barCount; i++) {

            dotesOnBarOfChart.x.push(
                i * (paddingSingleForBar + accessibleWidthForBarWithoutPadding),
                i * (paddingSingleForBar + accessibleWidthForBarWithoutPadding) + ((accessibleWidthForBarWithoutPadding - 4)),
            )
            dotesOnBarOfChart.y.push(
              item.data ? item.data[i]?.rank * 40: 0,
              item.data ? item.data[i]?.rank * 40: 0
            )
            circleElementArray.push(<Rect key={String(Math.random() * 10000)}
                y={200}
                x={i * (paddingSingleForBar + accessibleWidthForBarWithoutPadding)}
                width={accessibleWidthForBarWithoutPadding - 4}
                height={item.data ? -item.data[i]?.rank * 40 : 0}
                stroke="green"
                strokeWidth={2}
            />)
        }
        // console.log(circleElementArray)
        return <Svg  height={223} width={windowWidth}><G>{circleElementArray}</G></Svg>
          
    }
    
    const renderItem = ({item}) => {
      return <>
      <View>
        {GetBarLines({item})}
        <Cursor active={active} dotesOnBarOfChart={dotesOnBarOfChart} translation={translation} barChartArray={DATA_BARCHART} dateForBarChart={dateForBarChart}/>
      </View></>
    }
    const renderItemUser = ({item}) => {

      return <View>{item?.data?.map(el => <Text>{el.rank.toFixed(2) + ' ' + new Date(el.date).toString()}</Text>)}</View>
    }

    const rankOfChart = useDerivedValue(() => (Math.abs(translation.y.value / 40).toFixed(1).toString()))
    const getDateForBar = (dateForBar) => {
      'worklet'
      if (period === 'today') return `${dateForBar.getDate()} ${MONTH_ARRAY[dateForBar.getMonth()]} ${dateForBar.getFullYear()} ${dateForBar.getHours()}`
      if (period === 'week' || period === 'month') return `${dateForBar.getDate()} ${MONTH_ARRAY[dateForBar.getMonth()]} ${dateForBar.getFullYear()}`
      if (period === 'year') return `${MONTH_OF_YEAR_ARRAY[dateForBar.getMonth()]} ${dateForBar.getFullYear()}`
      
    }
    const dateOfChart = useDerivedValue(() => {
      'worklet'
      const dateObj = new Date(dateForBarChart.value)
      return getDateForBar(dateObj)
    })
 
    return (<View>
        {listMenu()}
        <Animated.View style={[{alignItems: 'center'}, styleMainDate]}>
          <Text>{`${startTimeDisplayed} - ${endTimeDisplayed}`}</Text>
          </Animated.View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '5%'}}>
            <TouchableOpacity onPress={() => {
              dateCurrentRef.current = dTimeMinus(dateCurrentRef.current, period)
              dispatch(updateStateChart(dateCurrentRef.current, period))
              active.value = false
            }}>{ArLeft()}</TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (dateCurrentRef.current >= getTimeCurrentDay) return null
              dateCurrentRef.current = dTimePlus(dateCurrentRef.current, period) 
              dispatch(updateStateChart(dateCurrentRef.current, period))
              active.value = false
            }}>{ArRight()}</TouchableOpacity>
          </View>
          <Animated.View style={[styles.toolkit, styleMoveToolkit]}>
          <ReText text={dateOfChart} style={{alingSelf: 'center'}}/>
          <ReText text={rankOfChart} style={{alignSelf: 'center'}}/>
          
        </Animated.View>
        <SectionList
        sections={DATA_BARCHART}
        renderItem={renderItemUser}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section }) => (
          <FlatList 
            style={{width: windowWidth, marginTop: 50, marginBottom: 50, zIndex: 35}}
            data={section.data || []}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            scrollEnabled
            snapToAlignment='center'
            scrollEventThrottle={16}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            onScroll={Animatedes.event(
              [{nativeEvent: {contentOffset: {x: scrollXGallery}}}], { useNativeDriver: false }
            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={-0.20}
            />
        )}
          />
    </View>
    )
}

const styles = StyleSheet.create({
    toolkit: {
      position: 'absolute',
      marginTop: 60,
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#dadfe0', 
      width: '40%', 
      borderRadius: 5, 
      alignSelf: 'center'
    },
    periodStats: {
    // backgroundColor: '#C4C4C4', 
      width         : '25%',
      alignItems    : 'center',
      height        : '100%',
      justifyContent: 'center'
   },
    periodStatsActive: {
      backgroundColor: '#303F9F',
      width          : '25%',
      alignItems     : 'center',
      height         : '100%',
      justifyContent : 'center'
    },
    backgroundSelection: {
      backgroundColor: "#303F9F",
      ...StyleSheet.absoluteFillObject,
      width: 93,
      borderRadius: 5,
    }
})