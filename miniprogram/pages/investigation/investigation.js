const app = getApp();
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
  data: {
    activityCount: [
      {name: '0-5次', value: '0-5次'},
      {name: '5-10次', value: '5-10次'},
      {name: '10次以上', value: '10次以上'},
      {name: '挺多的，记不清了', value: '挺多的，记不清了'},
      {name: '挺少的，记不清了', value: '挺少的，记不清了'}
    ],
    leaveReasonList: [
      {name: '工作太忙，周末休息', value: '工作太忙，周末休息'},
      {name: '周末加班，没时间', value: '周末加班，没时间'},
      {name: '周末陪孩子，陪家人', value: '周末陪孩子，陪家人'},
      {name: '球场距离原因', value: '球场距离原因'},
      {name: '自己参加联赛，时间冲突', value: '自己参加联赛，时间冲突'},
      {name: '天气原因', value: '天气原因'},
      {name: '其他', value: '其他'}
    ],
    showTextarea: false,
    submitData: {
      count: '',
      reasons: '',
      otherReason: '',
      advice: ''
    }
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "调查问卷"
    })
  },
  onShareAppMessage: function() {
    return {
      title: '橙北调查问卷',
      path: '/pages/investigation/investigation',
      imageUrl: '/assets/img/logo.png'
    }
  },
  ruleValidate: function() {
    if (!this.data.submitData.count) { return '请填写参加活动次数' }
    if (!this.data.submitData.reasons) { return '请填写原因' }
    if (!this.data.submitData.advice) { return '请填写建议' }
    return false
  },  
  submitInvest: function() {
    wx.showToast({
      title: '提交中',
      icon: 'loading',
      mask: true      
    })
    if (this.ruleValidate()) {
      let errInfo = this.ruleValidate()
      wx.hideToast()
      wx.showModal({
        title: '填写有误',
        content: errInfo,
        showCancel: false
      })
      return
    }    
    let data = {
      dbId: 'investigationList',
      data: this.data.submitData
    }
    console.log(this.data.submitData)
    wx.cloud.callFunction({
      name: 'docadd',
      data: data,
      success: function(res) {
        wx.hideToast()
        wx.showModal({
          title: '提交成功',
          content: '足球真正的魅力不是输赢，而是有它的地方就有兄弟姐妹。\r\n很多年后，当我们老得只能坐在场边，你会发现最怀念的不是踢足球，而是陪你踢球的那群人。',
          showCancel: false,
          confirmText: '前往首页',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/index/index'
              })
            }
          }
        })
      },
      fail:function(err){
        console.error(err)
        wx.hideToast()
        wx.showModal({
          title: '提交失败',
          content: '请重新提交',
          showCancel: false
        })        
      }
    })    
  },
  bindInputChange: function(e) {
    let params = e.currentTarget.dataset.params
    this.setData({
      ['submitData.' + params]: e.detail.value
    })
  },
  radioChange: function(e) {
    this.setData({
      'submitData.count': e.detail.value
    })    
  },
  checkboxChange: function(e) {
    this.setData({
      'submitData.reasons': e.detail.value.join(';')
    })    
    if (e.detail && e.detail.value && e.detail.value.length>0) {
      if (e.detail.value.indexOf('其他')>-1) {
        this.setData({
          showTextarea: true
        })
      } else {
        this.setData({
          showTextarea: false
        })        
      }
    }else {
      this.setData({
        showTextarea: false
      })      
    }
  }
})