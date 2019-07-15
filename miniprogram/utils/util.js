const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const backformatTime = date => {
  console.log(date)
  if (!date) { return }
  date = date.substring(0,16)
  date = date.replace(/-/g,'/')
  let timestamp = new Date(date).getTime()
  return timestamp
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  backformatTime: backformatTime
}
