/**
 * @file 云函数模板文件
 * @author savuer
 */

const cloud = require('wx-server-sdk');

// 初始化 cloud
cloud.init();

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * @param {Object} event 参数包含小程序端调用传入的 data
 * @param {Object} context context
 * @return {Object} {} 涉及用户信息的返回值
 */
exports.main = (event, context) => {
    // 可执行其他自定义逻辑
    // console.log 的内容可以在云开发云函数调用日志查看

    // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
    const wxContext = cloud.getWXContext();

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    };
};
