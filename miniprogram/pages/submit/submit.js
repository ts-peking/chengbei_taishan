const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		submitCheck: false,//true不可发布活动，仅用于报名与查看; false可发布活动
		activityData: {
			title: '',
			location: '',
			startDate: '',
			startTime: '14:00',
			endTime: '18:00',
			price: '',
			activityNum: '',
			creatorPhone: null,
			description: '',
			submitTime: new Date().getTime()
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
	},
	// todo：全局封装setData
	bindDataChange:function(e) {
		let params = e.currentTarget.dataset.params
		this.setData({
	    ['activityData.' + params]: e.detail.value
		})
	},
	bindDateChange: function(e) {
		this.setData({
	    date: e.detail.value
		})
	},
	addImage: function() {
		wx.showModal({
      title: '谁叫你点的，乱点什么。。呸。。',
      showCancel: false,
	  });			
	},
	submitActivity: function(e) {
		let self = this
		console.log(this.data.activityData)
		db.collection('activityList').add({
      data: this.data.activityData,
      success: function(resp) {
        console.log('submitActivity', resp)
        self.addActivityLog(resp._id)
				wx.showModal({
		      content: '发布成功',
		      cancelText: '查看活动',
		      confirmText: '确定',
		      success: function(res) {
		      	if (res.confirm) {
		      		console.log('跳转到活动列表')
				      self.goToActivity()
				    } else if (res.cancel) {
				      console.log('跳转到活动详情')
				      self.goToActivity(resp._id)
				    }
		      }
			  })
      },
      fail: function(err) {
        wx.showToast({
				  title: '活动发布失败,请稍后重新提交',
				  duration: 2000
				})
        console.log(err)
      }
    })		
	},
	addActivityLog: function(id) {
		console.log('logid', id)
		let data = {
      dbId: 'activityLog',
      data: {
        _id: id,
        submit: [],
        leave: [],
        undetermined: []
      }
    }
		wx.cloud.callFunction({
      name: 'docadd',
      data: data,
      success: function (res) {
        console.log('addlog', res)
      },
      fail:function(err){
        console.error(err)
      }
    })
	},
	goToActivity: function(id) {
		let url = id ? `/pages/activity/detail?id=${id}` : '/pages/activity/activity' 
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