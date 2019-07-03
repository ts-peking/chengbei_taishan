Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		date: '2018-12-13',
		submitCheck: false,//true不可发布活动，仅用于报名与查看; false可发布活动
		activityData: {
			title: '橙南VS橙北',
			location: '中国地质大学',
			startDate: '2019-06-24',
			startTime: '16:00',
			endTime: '18:00',
			price: 'AA制',
			activityNum: '100人',
			creatorPhone: 18512345678,
			description: '这是备注',
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!options) {
			this.setData({
				submitCheck: false
			})
		}
	},
	bindDataChange:function(e) {
		let params = e.currentTarget.dataset.params
		this.setData({
	    ['activityData.' + params]: e.detail.value
		})
		console.log(this.data.activityData)
	},
	bindDateChange: function(e) {
		this.setData({
	    date: e.detail.value
		})
	},
	changeStatus: function(e) {
		console.log(e.currentTarget.dataset);
	},
	submitActivity: function(e) {
		console.log(this.data.activityData)
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