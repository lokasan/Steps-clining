export const msToTime = (duration) => {

    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours   = Math.floor((duration / (1000 * 60 * 60)));

    return correctedTime(hours, minutes, seconds);
  }
function correctedTime(hours, minutes, seconds) {
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return isNaN(hours) ? "" : hours + ":" + minutes + ":" + seconds
}
export const timeToFormat = (timeString) => {
    const h = timeString.split(':')[0]
    if (h > 99 && h < 999) {
      return h + "Ч"
    }
    if (h > 999 && h < 999999) {
      return ~~(h / 1000) + 'К'
    }
    if (h > 999999 && h < 999999999) {
      return ~~(h  / 1000000) + 'M'
    }
    return timeString
  }
  export const countFormat = (value) => {
    if (value > 999 && value < 999999) {
      return ~~(value / 1000) + 'К'
    }
    if (value > 999999 && value < 999999999) {
      return ~~(value  / 1000000) + 'M'
    }
    return value
  }
export default correctedTime
