const app = getApp();
const util = require('../../utils/util.js');

Page({
	data: {
		avator: '',
		realName: '',
		sex: [{ value: '男', checked: true},{ value: '女', checked: false},{ value: '其他', checked: false}],
		selectSex: '男',
		teamArray: ['橙北', '橙南', '橙通', '其他'],
		selectTeam: '橙北',
		teamIdMap: {
			'橙北' : 1,
			'橙南' : 2,
			'橙通' : 3,
			'其他' : 0
		},
		selectTeamId: 0,
		vipId: '',
		personalCardId: '',
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
            title: '谁叫你点的，乱点什么。。呸。。',
            showCancel: false,
        });		
	},
	finishUserInfo:function() {
		let params = {
			userInfo: this.data.userInfo,
		  	realName: this.data.realName,
		  	sex: this.data.selectSex,
		  	selectTeamId: this.data.teamIdMap[this.data.selectTeam],
		  	vipId: this.data.vipId,
		  	personalCardId: this.data.personalCardId
		}
		console.log(params)
		
		wx.showModal({
            title: '别急，注册还在开发中。。。',
            showCancel: false,
        });	
        		
	},
	radioChange:function(e) {
		this.setData({
			selectSex: e.detail.value
		})
	},
	bindVipId:function(e) {
		this.setData({
			vipId: parseInt(e.detail.value)
		})
	},
	bindPersonalCardId:function(e) {
		this.setData({
			personalCardId: parseInt(e.detail.value)
		})
	},
	bindPickerChange:function(e) {
		this.setData({
			index: e.detail.value,
			selectTeam: this.data.teamArray[e.detail.value]
		})
	},
	inputRealName:function(e) {
		this.setData({
			realName: e.detail.value
		})
	}
})