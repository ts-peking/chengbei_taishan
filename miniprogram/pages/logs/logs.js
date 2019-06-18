//logs.js
const util = require('../../utils/util.js')
const db = wx.cloud.database() // 初始化数据库
const app = getApp()

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

  getTestDataBase: function() {
    // const db = wx.cloud.database() // 初始化数据库
    db.collection('testdatabase').orderBy('vipid', 'desc').get({
      success: function(res) {
        console.log('getTestDataBase', res.data)
      },
      fail: function(err) {
        console.log('error', err)
      }
    })
  },

  addTestDataBase: function() {
    let params = {
      personalCardId: '123',
      realName: '测试3',
      selectTeamId: 1,
      vipId: 1319
    }
    db.collection('testdatabase').add({
      data: params,
      success: function(res) {
        console.log('getTestDataBase', res)
      },
      fail: function(err) {
        console.log('error', err)
      }
    })    
  },

  cloudGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },  
})
