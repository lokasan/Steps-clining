

export const updateStateChart = (time, period) => async dispatch => {
    dispatch({
        type: 'UPDATE_STATE_CHART',
        payload: {time, period}
    })
}

export const initializationChart = (period, start_time, end_time) => async dispatch => {
    dispatch({
        type: 'INITIALIZATION_CHART',
        payload: {period, start_time, end_time}
    })
}