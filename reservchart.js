<Svg width={400} height={400} viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
        <VictoryChart 
            containerComponent={
                <VictoryZoomContainer 
                    zoomDomain={{x: [10, 16]}} 
                    zoomDimension='x'
                    
                /> 
                
            }
            
            standalone={false}
            >
          <VictoryGroup >
            <VictoryBar  data={
                [
                    {x: 10, y: 6000},
                    {x: 11, y: 6500},
                    {x: 12, y:6800},
                    {x: 13, y: 6000},
                    {x: 14, y: 6500},
                    {x: 15, y:6800, label: 'A'},
                    {x: 16, y: 6000},
                    {x: 17, y: 6500},
                    {x: 18, y:6800},
                    {x: 19, y: 6000},
                    {x: 20, y: 6500},
                    {x: 21, y:6800},
                    {x: 22, y: 6500},
                    {x: 23, y:6800},
                    {x: 24, y: 6500},
                    {x: 25, y:6800},
                    {x: 26, y: 6500},
                    {x: 27, y:6800}
                ]
                } 
                
                style={
                    {
                        data: {
                            fill: ({ datum }) => datum.y < 6500 ? "red" : "green"
                        }
                    }
                }
                events={[
                    {
                      target: "data",
                      eventHandlers: {
                        onPress: () => {
                            return [{
                                target: 'labels',
                                mutation: (props) => {
                                    console.log(props)
                                    return props.text === props.datum._y ?
                                    null : {text: props.datum._y}
                                }
                            }]
                        }
                      }
                    }
                  ]}
                >
              
            </VictoryBar>
          </VictoryGroup>
          
        </VictoryChart>
        </Svg>