const app = getApp();
const util = require('../../utils/util.js');

Page({
	data: {
		avator: '',
		realName: '张三',
		sex: [{ value: '男', checked: false},{ value: '女', checked: false},{ value: '其他', checked: false}],
		selectSex: '',
		teamArray: ['橙北', '橙南', '橙通', '其他'],
		selectTeam: '其他',
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
		// 测试用参数
		// wx.request({
		//     url:"http://47.105.193.164/mobileInterf/login",
		//     method:'POST',
		//     data:{
		//         telnum: '15510297181',
		//         pwd: '111111'
		//     },
		//     dataType: 'json',
		//     success:function(res){
		//         console.log(res)
		//     },
		//     fail:function(res){
		//         console.log(res)
		//     }
	 //    })		
		wx.showModal({
            title: '谁叫你点的，乱点什么。。呸。。',
            showCancel: false,
        });		
	},
	finishUserInfo:function() {
		let params = {
			userInfo: this.userInfo,
		  	realName: this.realName,
		  	selectTeamId: this.teamIdMap[this.selectTeam],
		  	vipId: this.vipId,
		  	personalCardId: this.personalCardId
		}
		console.log(params)
		
		wx.showModal({
            title: '别急，注册还在开发中。。。',
            showCancel: false,
        });	
        		
	},
	radioChange:function(e) {
		this.selectSex = e.detail.value
	},
	bindPickerChange:function(e) {
		this.setData({
			index: e.detail.value
		})
		this.selectTeam = this.data.teamArray[e.detail.value];
	},
	inputRealName:function(e) {
		this.realName = e.detail.value;
	}
})