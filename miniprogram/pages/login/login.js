const app = getApp();
const util = require('../../utils/util.js');
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库

Page({
	data: {
		avator: '',
		realName: '',
		sex: [{ value: '男', checked: true},{ value: '女', checked: false},{ value: '其他', checked: false}],
		selectSex: '男',
		teamArray: ['泰山橙北', '泰山橙南', '泰山橙通', '泰山壹柒', '泰山零八', '其他'],
		selectTeam: '泰山橙北',
		teamIdMap: {
			'泰山橙北' : 1,
			'泰山橙南' : 2,
			'泰山橙通' : 3,
			'泰山壹柒' : 4,
			'泰山零八' : 5,
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
	// 收集用户信息
	finishUserInfo:function() {
		let self = this
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
      title: '确认信息无误提交？',
      content: '会员号信息填写后无法更改，请确认填写正确',
      success (res) {
		    if (res.confirm) {
	        self.sendUserInfo(params)
		    } else if (res.cancel) {
	        console.log('用户点击取消')
		    }
			}
    });
	},
	// 向云端数据库增加用户信息
	sendUserInfo:function(params) {
		wx.showToast({
		  title: '资料提交中。。。',
		  icon: 'loading',
		  mask: true,
		})

		db.collection('userinfo').add({
      data: params,
      success: function(res) {
				wx.showToast({
				  title: '资料提交成功',
				  icon: 'success',
				  mask: true,
				  duration: 2000
				})
        console.log('getTestDataBase', res)
      },
      fail: function(err) {
				wx.showToast({
				  title: '资料提交失败',
				  icon: 'fail',
				  mask: true,
				  duration: 2000
				})         	
        console.log('error', err)
      }
    })
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
	bindRealName:function(e) {
		this.setData({
			realName: e.detail.value
		})
	}
})