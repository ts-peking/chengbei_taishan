const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
    personalInfo: {},
    openId: '',
    teamIdMap: ['其他', '泰山橙北', '泰山橙南', '泰山橙通', '泰山壹柒', '泰山零八'],
  },

  onLoad:function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        openId: app.globalData.openid,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }   
    this.initUserInfo() 
  },
  initUserInfo:function() {
    if (!this.data.hasUserInfo) { console.log('未获得授权'); return }
    let self = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    })
    console.log(this.data.openId)
    db.collection('userinfo').where({ _openid: this.data.openId}).get({
      success: function(res) {
        console.log(res.data)
        self.setData({
          personalInfo: res.data[0]
        })
        wx.hideToast()
      },
      fail: function(err) {
        console.log('error', err)
        wx.hideToast()
      }
    })    
  },
  myActivity:function() {
    return
    wx.navigateTo({
      url:'/pages/login/login'
    })    
  },
  editInfo:function() {
    wx.navigateTo({
      url:'/pages/login/login?openId=' + this.data.openId
    })
  }
})