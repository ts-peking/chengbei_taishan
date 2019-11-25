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
      this.initUserInfo()
    }else {
      wx.showToast({
        title: '请授权后访问',
        icon: 'loading',
        mask: true,
        duration: 1000
      })      
    }
  },
  getUserInfo:function(e) {
    if (e.detail && !e.detail.userInfo) { return }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      openId: app.globalData.openid,
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.initUserInfo()
  },
  initUserInfo:function() {
    if (!this.data.hasUserInfo) { console.log('未获得授权'); return }
    let self = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    console.log('openId', this.data.openId)
    db.collection('userInfo').where({ _openid: this.data.openId}).get({
      success: function(res) {
        if (res.data && res.data.length>0) {
          self.setData({
            personalInfo: res.data[0]
          })
        }else {
          wx.showModal({
            title: '请填写个人资料',
            content: '您暂未在小程序中提交个人资料，请及时提交',
            confirmText: '前往填写',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url:'/pages/login/login'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        wx.hideToast()
      },
      fail: function(err) {
        console.log('error', err)
        wx.hideToast()
      }
    })
  },
  goIndex:function() {
    wx.navigateTo({
      url:'/pages/index/index',
    })    
  },
  goActivity:function(e) {
    wx.navigateTo({
      url:'/pages/activity/activity',
    })
  },
  editActivity:function() {
    wx.navigateTo({
      url:'/pages/submit/submit',
    })
  },
  myActivity:function() {
    wx.showModal({
      title: '暂未开发',
      content: '如果需要更改已发布的活动信息，请主动联系泰山北京球迷会1311号会员进行手动更改',
      showCancel: false
    })
  },
  editInfo:function() {
    wx.navigateTo({
      url:'/pages/login/login?openId=' + this.data.openId
    })
  },
  goInvest: function() {
    wx.navigateTo({
      url:'/pages/investigation/investigation'
    })    
  },
  goGames: function() {
    wx.navigateTo({
      url:'/pages/games/games'
    })    
  }
})