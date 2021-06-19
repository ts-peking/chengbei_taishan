/**
 * @file 工具函数库
 * @author savuer
 */

/**
 * 十以下数字+0
 *
 * @param {number} n 初始数字
 * @return {string} 结果
 */
const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

/**
 * 格式化时间: 时间戳->时间
 *
 * @param {number} date 时间戳
 * @return {string} '' 年月日时分秒
 */
const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

/**
 * 格式化时间: 时间->时间戳
 *
 * @param {string} date 时间
 * @return {number} timestamp 时间戳
 */
const backformatTime = date => {
    if (!date) {
        return;
    }

    date = date.substring(0, 16);
    date = date.replace(/-/g, '/');
    let timestamp = new Date(date).getTime();
    return timestamp;
};

module.exports = {
    formatTime: formatTime,
    backformatTime: backformatTime
};
