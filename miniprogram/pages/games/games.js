// games.js
const app = getApp()
import regeneratorRuntime from "../../utils/runtime.js"
import { getImageInfo, canvasToTempFilePath, saveImageToPhotosAlbum } from "../../utils/wxAsync.js"

Page({
  data:{
    bgUrl: '',
    // borderUrlList: [
    //   '/assets/img/head1.png',
    //   '/assets/img/head3.png',
    //   '/assets/img/head4.png'
    // ],
    borderUrlList: [],
    borderUrl: '/assets/img/head1.png',
    borderIndex: 0,
    avatarUrl: '',
    hasUserInfo: false,
    openId: '',
    userInfo: {},
    showModel: false,
    resSrc: "",  // 最终生成的图片路径
    baseImg: {},
    flagImg: {},
  },

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      let avatar = this.headimgHD(app.globalData.userInfo.avatarUrl)
      this.setData({
        openId: app.globalData.openid,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        avatarUrl: avatar
      })
    }
    this.getBorderCloudImage()
    this.getCloudImage()
    // setTimeout(() => {
      // this.drawCanvasPanel();
    // }, 1500)
  },
  headimgHD: function(imageUrl) {        
    imageUrl = imageUrl.split('/');        //把头像的路径切成数组
    //把大小数值为 46 || 64 || 96 || 132 的转换为0
    if (imageUrl[imageUrl.length - 1] && (imageUrl[imageUrl.length - 1] == 46 || imageUrl[imageUrl.length - 1] == 64 || imageUrl[imageUrl.length - 1] == 96 || imageUrl[imageUrl.length - 1] == 132)) {
        imageUrl[imageUrl.length - 1] = 0;
    }
    imageUrl = imageUrl.join('/')   //重新拼接为字符串
    return imageUrl;
  },
  // 获取用户信息
  getUserInfo: function(e) {
    if (e.detail && !e.detail.userInfo) { return }
    app.globalData.userInfo = e.detail.userInfo
    let avatar = this.headimgHD(e.detail.userInfo.avatarUrl)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      avatarUrl: avatar
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
  // 获取云存储库边框图片
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
  // 获取图片信息
  getWxImageInfo: function(src, name) {
    let self = this
    wx.showToast({
      title: '图片生成中',
      icon: 'loading',
      mask: true
    })
    wx.getImageInfo({
      src: src,
      success: (result) => {
        this.setData({
          [name]: result
        })
        if (name == 'baseImg') {
          wx.hideToast()
          wx.showModal({
            content: '确定生成图片？',
            cancelText: '再换换',
            confirmText: '生成',
            success: function(res) {
              if (res.confirm) {
                self.drawCanvasPanel()
              } else if (res.cancel) {}
            }
          })
        }
      },
      fail: (err) => {
        console.log(err)
        wx.showToast({
          title: '图片获取失败，请重新打开尝试',
          icon: 'fail',
          mask: true,
          duration: 800
        })         
      },
      complete: (com) => {
        console.log('com', com)
      }
    })
  },
  // 展开Model
  showCanvasModel: function() {
    let self = this
    this.getWxImageInfo(this.data.avatarUrl, 'baseImg')
    this.getWxImageInfo(this.data.borderUrlList[this.data.borderIndex], 'flagImg')
  },
  // 隐藏Model
  hideModel: function() {
    this.setData({ showModel:false })
  },
  // 保存图片
  saveImgSrc: function() {
    let self = this
    wx.saveImageToPhotosAlbum({
      filePath: self.data.resSrc,
      success(res) {
        self.setData({ showModel:false })
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          mask: true,
          duration: 1000
        })
      },
      fail(err) {
        wx.showToast({
          title: '保存失败',
          icon: 'fail',
          mask: true,
          duration: 1000
        })        
      }
    })
  },
  // 生成canvas图像
  drawCanvasPanel: function() {
    let self = this
    this.setData({ showModel:true })
    // 设备像素比
    // const { pixelRatio } = wx.getSystemInfoSync()
    // 获取 画布实例
    const baseImg = this.data.baseImg
    const flagImg = this.data.flagImg
    const context = wx.createCanvasContext('firstCanvas')
    // 将canvas的宽度设置中 图片的宽度
    const canvasWidth = "205px"
    // 将canvas的宽度设置中 图片的高度
    const canvasHeight = "205px"
    //  setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）。
    // 因此需要将 描绘 图片的步骤写在回调中，否则 真机调试有bug！
    this.setData({ canvasWidth, canvasHeight }, () => {  
      // 如果个别机型出现图片失败错误，可以加上定时器。
      setTimeout(() => {
        // 先将头像 描绘到画布上
        context.drawImage(baseImg.path, 5, 5, 200, 200)
        // 再把边框 描绘到画布上
        // context.drawImage(flagImg.path, baseImg.width - (pixelRatio * 50), baseImg.height - (pixelRatio * 50), (pixelRatio * 50), (pixelRatio * 50))
        context.drawImage(flagImg.path, 0, 0, 205, 205)
        // context.drawImage(self.data.borderUrlList[self.data.borderIndex], 0, 0, 205, 205)

        context.draw(true, () => {
          // 将 画布生成 成图片
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 960,
            height: 960,
            fileType: 'png',
            quality: 1,
            canvasId: 'firstCanvas',
            success(res) {
              console.log(res.tempFilePath)
              self.setData({ resSrc: res.tempFilePath })
            }
          })
          // 让图片显示 合成后的效果
          // 保存起来，当点击保存图片时调用
        })
      }, 100)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角转发
   */
  onShareAppMessage: function () {},

  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll: function () {},

  /**
   * 当前是 tab 页时，点击 tab 时触发
   */
  onTabItemTap: function(item) {},
})