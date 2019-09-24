// games.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data:{
    bgUrl: '',
    hasUserInfo: false,
    openId: '',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log(111)
      this.setData({
        openId: app.globalData.openid,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    console.log(this.data.hasUserInfo)
    this.getCloudImage()
  },
  getUserInfo: function(e) {
    console.log('e', e)
    if (e.detail && !e.detail.userInfo) { return }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },  
  getCloudImage: function() {
    let self = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    wx.cloud.getTempFileURL({
      fileList: ['cloud://prodenv-2sbjk.7072-prodenv-2sbjk-1259441852/泰山手机壁纸.jpg'],
      success: res => {
        self.setData({
          bgUrl: res.fileList[0].tempFileURL
        })
        wx.hideToast()
      },
      fail: err => {
        wx.hideToast()
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          mask: true,
          duration: 1000
        })
        wx.hideToast()
      }
    })
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