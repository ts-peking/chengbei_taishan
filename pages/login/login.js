const app = getApp()

Page({
	data: {
		avator: '',
		realName: '张三',
		sex: [{ value: '男', checked: false},{ value: '女', checked: false},{ value: '其他', checked: false}],
		teamArray: ['橙北', '橙南', '橙通'],
	    index: 0
	},
	onLoad: function () {
		wx.setNavigationBarTitle({
		    title: "完善个人信息"
		});		
		this.setData({
            userInfo: app.globalData.userInfo,
        })		
    	console.log(app);
    },	
	changeAvator:function() {
		wx.showModal({
            title: '别急，换头像还在开发中。。。',
            showCancel: false,
        });		
	},
	finishUserInfo:function() {
			wx.showModal({
            title: '别急，注册还在开发中。。。',
            showCancel: false,
        });			
	},
	radioChange:function(e) {

	},
	bindPickerChange:function(e) {

	}
})