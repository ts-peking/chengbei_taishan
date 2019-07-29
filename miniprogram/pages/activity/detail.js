const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
  /**
   * 页面的初始数据
   */
  data:{
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    detailId: '', // 13dba11c5d2b4091078d64010d194747
    submitCheck: true,//true不可发布活动，仅用于报名与查看; false可发布活动
    activityData: {
      title: '',
      location: '',
      startDate: '',
      startTime: '',
      endTime: '',
      price: '',
      activityNum: '',
      creatorPhone: '',
      description: '',
    },
    activityLog: {
      // leave: [], 请假
      // submit: [], 报名
      // undetermined: [] 待定
    },
    openId: '', 
    personalInfo: {} 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.detailId = options.id
    // 检查userInfo
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    }else {
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    // 检查openId
    if (app.globalData.openid) {
      this.setData({
        openId: app.globalData.openid
      })
    }else {
      this.getOpenId()
    }
    if (!options) {
      this.setData({
        submitCheck: false,
      })
    }
    this.initDetailData()
    this.initActivityLog()
  },
  getUserInfo: function(e) {
    if (e.detail && !e.detail.userInfo) { return }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })   
  },
  getOpenId: function() {
    if (app.globalData.openid) {
      this.setData({
        openId: app.globalData.openid
      })
    }
    let self = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid detail: ', res.result.openid)
        app.globalData.openid = res.result.openid
        self.setData({
          openId: app.globalData.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })    
  },
  // 初始化详情数据
  initDetailData: function() {
    let self = this
    db.collection('activityList').doc(this.data.detailId).get({
      success: function(res) {
        for(let item in self.data.activityData) {
          self.setData({
            ['activityData.' + item]: res.data[item]
          })
        }
      },
      fail: function(err) {
        console.log('error', err)
      }
    })    
  },
  initActivityLog: function() {
    let self = this
    db.collection('activityLog').doc(this.data.detailId).get({
      success: function(res) {
        self.setData({
          activityLog: res.data
        })
        console.log('activityLog', res.data)
      },
      fail: function(err) {
        console.log('error', err)
      }
    })
  },
  initUserInfo: function(status) {
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
          self.updataLog(status)
        }else {
          wx.showModal({
            title: '请填写个人资料',
            content: '您暂未在小程序中提交个人资料，填写后才可报名',
            confirmText: '前往填写',
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url:'/pages/login/login'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
                return false
              }
            }
          })
        }
        wx.hideToast()
      },
      fail: function(err) {
        console.log('error', err)
        wx.hideToast()
        return false
      }
    })    
  },
  changeStatus: function(e) {
    let status = e.currentTarget.dataset.status
    this.initUserInfo(status)
  },
  updataLog: function(status) {
    wx.showToast({
      title: '操作中',
      icon: 'loading',
      mask: true
    })    
    let logList = this.data.activityLog
    let personalInfo = this.data.personalInfo
    for(let item in logList) {
      console.log(logList[item])
      if (item == '_id') { continue }
      for(let i=0, len=logList[item].length; i<len; i++){
        if (logList[item][i] && logList[item][i]._openid && logList[item][i]._openid == this.data.openId) {
          console.log(logList[item][i])
          logList[item].splice(i,1)
        }
      }
    }
    logList[status].push(personalInfo)
    delete logList._id
    console.log('logList', logList)
    let data = {
      dbId: 'activityLog',
      docId: this.data.detailId,
      data: logList
    }
    let self = this
    wx.cloud.callFunction({
      name: 'docupdata',
      data: data,
      success: function (res) {
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
        self.initActivityLog()
        wx.hideToast()
      },
      fail:function(err){
        console.error(err)
        wx.showToast({
          title: '操作失败',
          icon: 'none',
          mask: true,
          duration: 1000
        })
        wx.hideToast()
      }
    })
  },
  goToActivity: function(id) {
    console.log(id)
    let url = id ? `/pages/submit/submit?id=${id}` : '/pages/activity/activity' 
    wx.navigateTo({
      url: url,
      success:function(){
      },
      fail:function(){
      }
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角转发
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll: function () {

  },

  /**
   * 当前是 tab 页时，点击 tab 时触发
   */
  onTabItemTap: function(item) {

  },
})