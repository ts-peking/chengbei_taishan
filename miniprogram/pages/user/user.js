const util = require('../../utils/util.js')
const app = getApp()

Page({
  data:{
    userInfo: {},
    hasUserInfo: false,
  },

  onLoad:function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }    
  },
  myActivity:function() {
    return
    wx.navigateTo({
      url:'/pages/login/login'
    })    
  },
  editInfo:function() {
    return
    wx.navigateTo({
      url:'/pages/login/login'
    })
  }
})