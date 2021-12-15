const findTrashSymbolsInfo = (text) => {
    const result = text.match(/[",'\/\\*<>?:|]/g)

    if (!result) {
      return {
        status: 200,
        message: `${text} В поле ошибок ввода не найдено`,
        error: []
      }
    } else {
      return {
        status: 404,
        message: 'Данные некорректны',
        error: result
      }
    }
  }

export default findTrashSymbolsInfo;