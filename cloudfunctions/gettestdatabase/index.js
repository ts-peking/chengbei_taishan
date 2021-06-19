/**
 * @file 云函数: get 获取testdatabase
 * @desc 使用文件: ; 用途: 获取数据; 部署: 在 cloud-functions/gettestdatabase 文件夹右击选择 “上传并部署”
 * @author savuer
 */

const cloud = require('wx-server-sdk');

cloud.init();

exports.main = (event, context, result) => {

    // 获取 WX Context (微信调用上下文)，包括 OPENID、APPID、及 UNIONID（需满足 UNIONID 获取条件）
    const wxContext = cloud.getWXContext();

    return {
        event,
        wxContext
    };
};
