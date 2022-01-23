let dataForChartDouble = null
const db = SQLite.openDatabase('db.db')
    const getChartYear = (days, month, year) => {
      
      return new Promise(resolve => {
        db.transaction(tx => {
          tx.executeSql("select sum(count_step)/? as step, strftime('%m', date_time) as month, strftime('%Y', date_time) as year from step_time where month=? and year=?", [days, month, year.toString()], (_, { rows }) => {
            if (parseInt(JSON.stringify(rows['_array']).replace(/(^.*?:|[a-z""[\],{}])/g, "").split(':')[0]) != isNaN) {
              dataForChartDouble.push({
                x: JSON.stringify(rows['_array']).replace(/(^.*?:|[a-z""[\],{}])/g, "").split(':')[2] + '-' + JSON.stringify(rows['_array']).replace(/(^.*?:|[a-z""[\],{}])/g, "").split(':')[1],
                y: parseInt(JSON.stringify(rows['_array']).replace(/(^.*?:|[a-z""[\],{}])/g, "").split(':')[0]),
              })
              
            }
          
          }
          )
          // console.log(dataForChart)
        })
      
      resolve()
    })
    }
    
    const getMinAndCountYear = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql("select min(strftime('%Y', date_time)) as year from step_time", [], (_, { rows }) => { 
          let minYear = parseInt((JSON.stringify(rows['_array'])).replace(/\D+/g, ""))
          let arrYears = []
          for (let i = minYear; i <= new Date().getFullYear(); i ++) {
            arrYears.push(i)
          }
          resolve(arrYears) //нужен вывод стартового дня и месяца
      })
    })  
  })

    async function printData() {
      dataForChartDouble = []
      let countYear = await getMinAndCountYear
      
      // console.log(`min year: ${countYear}`)
      for (let i = countYear[0]; i <= countYear[countYear.length - 1]; i++) {
        // console.log(`Проход по году ${i}`)
        for (let key of lastDayForMonth.monthList) {
          if (Object.keys(key)[0] === '02') {
            // console.log(`${lastDayForMonth.monthList[1][Object.keys(key)[0]](i)} ${Object.keys(key)[0]} ${i}`)
            // console.log(`[Month: ${Object.keys(key)[0] } Days: ${lastDayForMonth.monthList[1][Object.keys(key)[0]](i)}]`)
            await getChartYear(lastDayForMonth.monthList[1][Object.keys(key)[0]](i), Object.keys(key)[0], i)
          }
          else {
            await getChartYear(Object.values(key)[0], Object.keys(key)[0], i)
            
            // {console.log(`[Month: ${Object.keys(key)[0]} Days: ${Object.values(key)}]`)}
         } // найти способ вывода номера месяца по порядку [найден]
         // перенести в отдельные функции все циклы
        
      }
      
    }
    setTimeout(() => {
      console.log(dataForChartDouble)
    }, 4000)
    }

    const setDataToBase = () => {
      let tmp 
      let tempP
      let saveDataReq = []
      let count = 0
      for (let i = 0; i < 6000; i++) {
        tempP = new Date(2020, 7, 1, 0, count+=10)
        tempP = tempP.getFullYear() + '-' + (tempP.getMonth() + 1) + '-' +tempP.getDate() + ' ' + tempP.getHours() + ':' + tempP.getMinutes()
        tmp = tempP.split(/\-|\ |\:/)
        // console.log('tmp_first_cycle: ', tmp)
        for (let j = 1; j < tmp.length; j++) {
          if (tmp[j].length == 1) {
            tmp[j] = '0' + tmp[j]
            tempP = tmp[0] + '-' + tmp[1] + '-' + tmp[2] + ' ' + tmp[3] + ':' + tmp[4]
            // console.log('tempP second Cycle: ', tempP)
          }
        }
        // console.log('Out Cycle: ', tempP)
        saveDataReq.push(tempP)
        db.transaction(tx => {
        tx.executeSql("insert into step_time (user_id, count_step, date_time, current_time) values (?, ?, ?, ?);", [1, Math.floor(Math.random() * 10000), saveDataReq[i], Date.now()])
        
        })
                
      }  

      db.transaction(tx => {
      tx.executeSql('select * from step_time', [], (_, { rows }) =>
      console.log(JSON.stringify(rows['_array']))
                                    )
              })
    }