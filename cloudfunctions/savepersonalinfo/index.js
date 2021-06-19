/**
 * @file 云函数: 保存用户个人信息
 * @desc 使用文件: pages/login; 用途: 存储会员个人信息; 部署: 在 cloud-functions/savepersonalinfo 文件夹右击选择 “上传并部署”
 * @author savuer
 */

const cloud = require('wx-server-sdk');

cloud.init();

exports.main = (event, context) => {
    console.log(event);
    let {
        userInfo,
        realName,
        selectTeamId,
        vipId,
        personalCardId
    } = event;
    console.log(context);
    let params = {
        avator: userInfo.avator,
        realName: realName,
        selectTeamId: selectTeamId,
        vipId: vipId,
        personalCardId: personalCardId
    };
    console.log('personalInfo', params);

    // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
    const wxContext = cloud.getWXContext();

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID
    };
};
