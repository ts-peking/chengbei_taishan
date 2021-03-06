/**
 * @file app.js
 * @author savuer
 */

/* global wx App Page */

App({
    onLaunch() {
        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)

        // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // })
        // // 获取用户信息
        // wx.getSetting({
        //   success: res => {
        //     if (res.authSetting['scope.userInfo']) {
        //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //       wx.getUserInfo({
        //         success: res => {
        //           // 可以将 res 发送给后台解码出 unionId
        //           this.globalData.userInfo = res.userInfo

        //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //           // 所以此处加入 callback 以防止这种情况
        //           if (this.userInfoReadyCallback) {
        //             this.userInfoReadyCallback(res)
        //           }
        //         }
        //       })
        //     }
        //   }
        // })
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        }
        else {
            wx.cloud.init({
                env: 'prodenv-2sbjk',
                traceUser: true
            });
            // 获取openId
            wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                    console.log('[云函数] [login] user openid: ', res.result.openid);
                    this.globalData.openid = res.result.openid;
                },
                fail: err => {
                    console.error('[云函数] [login] 调用失败', err);
                }
            });
        }
    },
    globalData: {
        userInfo: null,
        openid: null,
        databaseEnv: 'prodenv-2sbjk'     // 全局云数据库环境ID  测试环境 'taishanchengbei' 生产环境 'prodenv-2sbjk'
    }
});
