const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
	data: {
    globalData: 'I am global data',
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
        {
            activityImg: '',
            activityName: '鲁能VS国安',
            activityLocation: '北京工人体育场',
            activityPoi: '',//留作接入腾讯地图
            activityDate: 1543759535822,
            activityPrice: '100元',
            activityStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中
        },
        {
            activityImg: '',
            activityName: '鲁能VS权健',
            activityLocation: '海教园体育场',
            activityPoi: '',//留作接入腾讯地图
            activityDate: 1543759535822,
            activityPrice: 'AA制',
            activityStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中
        },
        {
            activityImg: '',
            activityName: '鲁能VS泰达',
            activityLocation: '水滴',
            activityPoi: '',//留作接入腾讯地图
            activityDate: 1548759535822,
            activityPrice: '免费',
            activityStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中
        },
        {
            activityImg: '',
            activityName: '鲁能VS国安',
            activityLocation: '北京工人体育场',
            activityPoi: '',//留作接入腾讯地图
            activityDate: 1543959535822,
            activityPrice: '100元',
            activityStatus: 'registered',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中
        },
        {
            activityImg: '',
            activityName: '鲁能VS河北',
            activityLocation: '廊坊',
            activityPoi: '',//留作接入腾讯地图
            activityDate: 1543759535822,
            activityPrice: 'AA制',
            activityStatus: 'finished',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中
        },
    ],
    activityList: [],
    pageSize: 10,
    pageNum: 1,
    status: '',
	},
  onLoad: function () {
  	wx.setNavigationBarTitle({
      title: "活动页面"
    })
    this.initActivityList()
    
  },
  initActivityList:function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 2000
    })
    let self = this
    db.collection('activityList').limit(10).get({
      success: function(res) {
        let listData = res.data
        listData.forEach(item => {
          let status = self.initStatus(item)
          item.status = status
        })
        self.setData({
          activityList: [...listData]
        })
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
    else if (endDate > currentDate && currentDate > startDate) { return 'apply' }
    else { return '' }    
  },
  initStatusBack: function(item) {
    let startDate = `${item.startDate} ${item.startTime}`,
        endDate = `${item.startDate} ${item.endTime}`,
        startTimeStamp = util.backformatTime(startDate),
        endTimeStamp = util.backformatTime(endDate),
        currentStamp = new Date().getTime()
    if (startTimestamp > currentStamp) { return 'apply' }
    else if (currentStamp > endTimeStamp) { return 'finished' }
    else if (endTimeStamp > currentStamp && currentStamp > startTimeStamp) { return 'apply' }
    else { return '' }
  },
  bindSelectTab: function (e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      selectTab: type
    })
  },
  goActivityDetail:function(e) {
    let activityId = e.currentTarget.dataset.item._id
    // console.log('/pages/activity/detail?id=' + activityId)
    wx.navigateTo({
      url:'/pages/activity/detail?id=' + activityId,
    })      
  },
});