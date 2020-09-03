export const lastDayForMonth = {
    'monthList': [
      {'01': 31},
      {'02': (y=new Date().getFullYear()) => {
        if (y % 4 != 0 || (y % 100 == 0 && y % 400 != 0)) 
          return 28
        return 29
      }},
      {'03': 31},
      {'04': 30},
      {'05': 31},
      {'06': 30},
      {'07': 31},
      {'08': 31},
      {'09': 30},
      {'10': 31},
      {'11': 30},
      {'12': 31}
    ],
    'digitMonthToTextMonth': [
      {'01': 'Январь'},
      {'02': 'Февраль'},
      {'03': 'Март'},
      {'04': 'Апрель'},
      {'05': 'Май'},
      {'06': 'Июнь'},
      {'07': 'Июль'},
      {'08': 'Август'},
      {'09': 'Сентябрь'},
      {'10': 'Октябрь'},
      {'11': 'Ноябрь'},
      {'12': 'Декабрь'}
    ]
    }