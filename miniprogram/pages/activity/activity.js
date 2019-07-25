const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
	data: {
    statusMap: {
        'apply':'可报名',
        'registered':'已报名',
        'finished':'已结束',
        'underway':'进行中'
    },
    statusClassMap: {
        'apply':'background-color: #f47920;',
        'registered':'background-color: #dfdfdf; color: #f47920;',
        'finished':'background-color: #dfdfdf; color: #fff;',
        'underway':'background-color: #f47920;'     
    },
    selectTab: 'play',
    watchGameList: [
        // {
        //     activityImg: '',
        //     activityName: '鲁能VS国安',
        //     activityLocation: '北京工人体育场',
        //     activityPoi: '',//留作接入腾讯地图
        //     activityDate: 1543759535822,
        //     activityPrice: '100元',
        //     activityStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中
        // }
    ],
    activityList: [],
    pageSize: 10,
    pageNum: 0,
    status: '',
    noMoreList: false,
    touchMove: false
	},
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: "活动页面"
    })
    wx.hideShareMenu()
    this.initActivityList()
  },
  onReachBottom: function() {
    this.data.pageNum++
    this.initActivityList()
  },
  initActivityList:function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    let self = this
    db.collection('activityList').limit(this.data.pageSize).skip(this.data.pageSize * this.data.pageNum).orderBy('submitTime', 'desc').get({
      success: function(res) {
        let listData = res.data
        listData.forEach(item => {
          let status = self.initStatus(item)
          item.status = status
        })
        self.setData({
          activityList: [...self.data.activityList, ...listData]
        })
        console.log(self.data.activityList)
        wx.hideToast()
      },
      fail: function(err) {
        console.log('error', err)
        wx.hideToast()
      }
    })    
  },
  initWatchGameList: function() {
  },
  initStatus: function(item) {
    let startDate = `${item.startDate} ${item.startTime}`,
        endDate = `${item.startDate} ${item.endTime}`,
        currentDate = util.formatTime(new Date())
    if (startDate > currentDate) { return 'apply' }
    else if (currentDate > endDate) { return 'finished' }
    else if (endDate > currentDate && currentDate > startDate) { return 'underway' }
    else { return '' }    
  },
  bindTouchMove:function() {
    this.setData({
      touchMove: true
    })
  },
  bindTouchEnd:function() {
    this.setData({
      touchMove: false
    })
  },
  // initStatusBack: function(item) {
  //   let startDate = `${item.startDate} ${item.startTime}`,
  //       endDate = `${item.startDate} ${item.endTime}`,
  //       startTimeStamp = util.backformatTime(startDate),
  //       endTimeStamp = util.backformatTime(endDate),
  //       currentStamp = new Date().getTime()
  //   if (startTimestamp > currentStamp) { return 'apply' }
  //   else if (currentStamp > endTimeStamp) { return 'finished' }
  //   else if (endTimeStamp > currentStamp && currentStamp > startTimeStamp) { return 'underway' }
  //   else { return '' }
  // },
  editActivity: function () {
    let editType = this.data.selectTab
    switch (editType) {
      case 'play': {
        // wx.redirectTo({
        //   url: '/pages/submit/submit?editType=' + editType
        // })
        wx.navigateTo({
          url:'/pages/submit/submit?editType=' + editType,
        })
        break
      }
      case 'match': {
        wx.showModal({
          title: '发布活动',
          content: '发布观球活动暂未开发',
          showCancel: false
        })
        break
      }
      default: {}
    }
  },
  bindSelectTab: function (e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      selectTab: type
    })
  },
  goIndex:function() {
    wx.navigateTo({
      url:'/pages/index/index',
    })    
  },
  goLogin:function(e) {
    wx.navigateTo({
      url:'/pages/user/user',
    })
  },
  goActivityDetail:function(e) {
    let activityId = e.currentTarget.dataset.item._id
    wx.navigateTo({
      url:'/pages/activity/detail?id=' + activityId,
    })
  },
});