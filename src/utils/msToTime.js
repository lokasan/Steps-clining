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
export default correctedTime