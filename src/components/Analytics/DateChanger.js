import React from 'react';
import {View} from 'react-native'
import Svg, {Circle} from 'react-native-svg';

export const DateChanger = ({period, height}) => {

    const color = {
        darkred: 'darkred',
        red: 'red',
        lightgreen: 'lightgreen',
        green: 'green',
    }

    const data = [
        {
            date: '20-10-2020',
            value: 4.5
        },
        {
            date: '21-10-2020',
            value: 3.7
        },
        {
            date: '22-10-2020',
            value: 2.5
        },
        {
            date: '23-10-2020',
            value: 1.7
        }
    ]

    
    const getColorForCircle = (idx) => {
        if (idx < data.length) {
            if (data[idx].value >=1 && data[idx].value < 2) {
                return 'darkred'
            } else if (data[idx].value >=2 && data[idx].value < 3) {
                return 'red'
            } else if (data[idx].value >=3 && data[idx].value < 4) {
                return 'lightgreen'
            } else if (data[idx].value >= 4 && data[idx].value <= 5) {
                return 'green'
            }
        }
        return 'gray'

    } 

    const calculateCircle = (period) => {
        let circleCount = 24
        if (period === 'today') {
            circleCount = 24
        } else if (period === 'week') {
            circleCount = 7
        } else if (period === 'month') {
            circleCount = 31
        } else if (period === 'year') {
            circleCount = 12
        }
        const circleResult = []
        for (let i = 0; i < circleCount; i++) {
            circleResult.push(
                <Circle 
                onPress={(event) => console.log(event.currentTarget.validAttributes, ' Circle touch')}
                cx={(height / 3.4) * (i + 1)} 
                cy={height / 2} 
                r={4} 
                stroke={getColorForCircle(i)} 
                strokeWidth={2}
                aramzanak={i}/> 
            )
        }
        return circleResult
    }

    return (
        <Svg>
            {calculateCircle(period)}
        </Svg>)
}