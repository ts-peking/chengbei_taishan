/**
 * @file LOG测试页
 * @author savuer
 */
/* global wx getApp Page */

// logs.js
const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database({
    env: app.globalData.databaseEnv
}); // 初始化数据库

Page({
    data: {
        logs: []
    },
    onLoad() {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log));
            })
        });
    },

    getTestDataBase() {
        db.collection('testdatabase').orderBy('vipid', 'desc').get({
            success(res) {
                console.log('getTestDataBase', res.data);
            },
            fail(err) {
                console.log('error', err);
            }
        });
    },

    addTestDataBase() {
        let params = {
            '_personalcardid': '123',
            '_realname': '测试3',
            '_selectteamid': 1,
            '_vipid': 1319
        };
        db.collection('testdatabase').add({
            data: params,
            success(res) {
                console.log('getTestDataBase', res);
            },
            fail(err) {
                console.log('error', err);
            }
        });
    },

    cloudGetOpenid() {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid);
                app.globalData.openid = res.result.openid;
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err);
            }
        });
    }
});
