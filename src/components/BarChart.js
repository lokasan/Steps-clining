import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native'
import PureChart from 'react-native-pure-chart';

export const BarChart = ({graphData, period}) => {
    return <PureChart 
                data={[
                    {x: '2018-01-01', y: 30},
                    {x: '2018-01-02', y: 200},
                    {x: '2018-01-03', y: 170},
                    {x: '2018-01-04', y: 250},
                    {x: '2018-01-05', y: 10}
                ]} 
                type='bar' 
                xAxisColor={'red'}
                color={'green'}
            yAxisColor={'red'}
            xAxisGridLineColor={'red'}
            yAxisGridLineColor={'red'}
            labelColor={'red'}
            numberOfYAxisGuideLine={10}
                
                height={200}
            />
}