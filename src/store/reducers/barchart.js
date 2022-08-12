
const initialState = {
    barchart: []
}
function generateChartOfArray(end_time, period) {
    const data = []
    if (period === 'today') {
      console.log(new Date(end_time))
      for (let i = 23; i >= 0; i--) {
        data.push({
        date: new Date(end_time).setHours(new Date(end_time).getHours() - i),
        rank: Math.random() * 5
        })
    }
    }
    if (period === 'week') {
      for (let i = 6; i >= 0; i--) {
          data.push({
          date: new Date(end_time).setDate(new Date(end_time).getDate() - i),
          rank: Math.random() * 5
          })
      }
    }
    if (period === 'month') {
      for (let i = 30; i >= 0; i--) {
          data.push({
          date: new Date(end_time).setDate(new Date(end_time).getDate() - i),
          rank: Math.random() * 5
          })
      }
    }
    if (period === 'year') {
      for (let i = 11; i >= 0; i--) {
          data.push({
          date: new Date(end_time).setMonth(new Date(end_time).getMonth() - i),
          rank: Math.random() * 5
          })
      }
    }
      
    return data
   
  }
  function initializationChart(period, start_time, end_time) {
    switch (period) {
      case 'today': return (
        [{
          id: 'AnalyticsChart',
          data: [{
            id: String(Math.random()),
            data: generateChartOfArray(end_time, period)
          }]
        }]
      )
      case 'week': return (
        [{ 
          id: 'AnalyticsChart',
          data: [{
            id: String(Math.random()),
            data: generateChartOfArray(end_time, period)
          }]
      }])
      case 'month': return (
        [{ 
          id:'AnalyticsChart',
          data: [{
            id: String(Math.random()),
            data: generateChartOfArray(end_time, period)
          }]
      }])
      case 'year': return (
        [{ 
          id: 'AnalyticsChart',
          data: [{
            id: String(Math.random()),
            data: generateChartOfArray(end_time, period)
          }]
      }])
    }
  }
export const barchartReducer = (state = initialState, action) => { 
    switch (action.type) {
        case 'UPDATE_STATE_CHART': {
            const res = initializationChart(action.payload.period, action.payload.time, action.payload.time)
            console.log(res, 'initialization results')
            return {barchart: [...res]}
        }
        case 'INITIALIZATION_CHART': {
            const res = initializationChart(action.payload.period, action.payload.start_time, action.payload.end_time)
            console.log(res, 'initialization results')
            return {barchart: [...res]}
        }
        default: return state
    }
    
}