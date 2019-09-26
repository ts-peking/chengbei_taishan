// games.js
const app = getApp()
import Wxml2Canvas from '../../utils/wxml2canvas.js'

Page({
  /**
   * 页面的初始数据
   */
  data:{
    bgUrl: '',
    // borderUrlList: [
    //   '/assets/img/head1.png',
    //   '/assets/img/head2.png',
    //   '/assets/img/head3.png',
    //   '/assets/img/head4.png'
    // ],
    borderUrlList: [],
    borderUrl: '/assets/img/head1.png',
    borderIndex: 0,
    resultUrl: '',
    hasUserInfo: false,
    openId: '',
    userInfo: {},
    showModel: false,
    drawCanvas: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        openId: app.globalData.openid,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    this.getBorderCloudImage()
    this.getCloudImage()
    setTimeout(() => {
        this.drawCanvasPanel();
    }, 1500)    
  },
  // 获取用户信息
  getUserInfo: function(e) {
    if (e.detail && !e.detail.userInfo) { return }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取云存储库背景图片
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
          title: '访问人数太多了，请稍后再试',
          icon: 'none',
          mask: true,
        })
      }
    })
  },
  getBorderCloudImage: function() {
    let self = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    wx.cloud.getTempFileURL({
      fileList: ['cloud://prodenv-2sbjk.7072-prodenv-2sbjk-1259441852/head1.png', 'cloud://prodenv-2sbjk.7072-prodenv-2sbjk-1259441852/head3.png', 'cloud://prodenv-2sbjk.7072-prodenv-2sbjk-1259441852/head4.png'],
      success: res => {
        console.log(res)
        let list = []
        res.fileList.forEach(item => {
          list.push(item.tempFileURL)
        })
        self.setData({
          borderUrlList: list
        })
        wx.hideToast()
      },
      fail: err => {
        wx.hideToast()
        wx.showToast({
          title: '访问人数太多了，请稍后再试',
          icon: 'none',
          mask: true,
        })
      }
    })    
  },
  // 切换边框
  changeBorder: function(e) {
    let changeStatus = e.currentTarget.dataset.type
    let index = this.data.borderIndex
    let self = this
    switch (changeStatus) {
      case 'next':
        if (this.data.borderIndex < this.data.borderUrlList.length-1) {
          index++
          this.setData({
            borderIndex: index
          })
        }else {
          wx.showToast({
            title: '已经是最后一张了~~',
            icon: 'none',
            mask: true,
            duration: 800
          })
        }
        break
      case 'previous':
        if (this.data.borderIndex > 0) {
          index--
          this.setData({
            borderIndex: index
          })
        }else {
          wx.showToast({
            title: '已经是第一张了~~',
            icon: 'none',
            mask: true,
            duration: 800
          })          
        }
        break
      default:
        console.log('切换按钮出错了')
    }
  },
  // 生成canvas图像
  drawCanvasPanel: function() {
    console.log(111)
    let self = this
    this.data.drawCanvas = new Wxml2Canvas({
      width: 320,
      height: 320,
      element: 'canvas-map',
      background: '#fff',
      progress (percent) {
        // console.log('percent', percent)
      },      
      finish(res) {
        self.setData({
          resultUrl: res,
          showModel: true
        })
        console.log('finish', res)
      },
      error (err) {
        console.log('err', err)
      }
    });

    // let data = {
    //   list: [{
    //     type: 'wxml',
    //     class: '.games-avator .draw',
    //     limit: '.games-avator',
    //     x: 0,
    //     y: 0
    //   }]
    // }
    // drawCanvas.draw(data);    
  },
  drawCanvas: function() {
    let data = {
      list: [{
        type: 'wxml',
        class: '.games-avator .draw',
        limit: '.games-avator',
        x: 0,
        y: 0
      }]
    }
    this.data.drawCanvas.draw(data)
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