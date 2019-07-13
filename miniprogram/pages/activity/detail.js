const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
  /**
   * 页面的初始数据
   */
  data:{
    detailId: 'f1006ad85d2995a4068921711326a4c7',
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
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    if (!options) {
      this.setData({
        submitCheck: false
      })
    }
    this.initDetailData()
    this.initActivityLog()
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
    db.collection('activityLog').doc(this.data.detailId).get({
      success: function(res) {
        console.log('activittyLog', res.data)
      },
      fail: function(err) {
        console.log('error', err)
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