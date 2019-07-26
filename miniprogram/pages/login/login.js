const app = getApp();
const util = require('../../utils/util.js');
const db = wx.cloud.database({ env: app.globalData.databaseEnv }) // 初始化数据库
// todo: 这个页面是很早以前写的，逻辑有些混乱，我也不愿改了

Page({
	data: {
		avator: '',
		realName: '',
		sex: [{ value: '男', checked: false},{ value: '女', checked: false},{ value: '其他', checked: false}],
		selectSex: '男',
		teamArray: ['其他', '泰山橙北', '泰山橙南', '泰山橙通', '泰山壹柒', '泰山零八'],
		selectTeam: '泰山橙北',
    selectTeamIndex: 0,
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
		editUserInfo: false
	},
	onLoad: function (options) {
		wx.setNavigationBarTitle({
	    title: "完善个人信息"
		})
		this.setData({
      openId: app.globalData.openid,
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  	this.initUserInfo()
  },
	changeAvator:function() {
		wx.showModal({
      title: '谁叫你点的，乱点什么。。呸。。',
      showCancel: false
	  })
	},
	initUserInfo: function() {
		if (!this.data.hasUserInfo) { console.log('未获得授权'); return }
    let self = this
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
		db.collection('userinfo').where({ _openid: this.data.openId}).get({
      success: function(res) {
        console.log(res.data)
        if (res.data && res.data.length>0) {
          let sexArr = self.data.sex
          sexArr.forEach(item => {
          	if (item.value == res.data[0].sex) {
          		item.checked = true
          	}
          })
          self.setData({
            personalCardId: res.data[0].personalCardId,
            realName: res.data[0].realName,
            vipId: res.data[0].vipId,
            selectTeamIndex: res.data[0].selectTeamId,
            selectSex: res.data[0].sex,
          	sex: sexArr,
            editUserInfo: false
          })
        }else {
          console.log(1111)
          self.setData({
            editUserInfo: true
          })
        }
        wx.hideToast()
      },
      fail: function(err) {
        console.log('error', err)
        wx.hideToast()
        wx.showModal({
          title: '获取信息出错',
          content: '获取个人资料出错，请退出小程序后重新打开',
          showCancel: false
        })        
      }
    })
	},
	ruleValidate: function() {
		if (!this.data.realName) { return '请填写真实姓名' }
		if (!this.data.vipId) { return '请填写协会会员号' }
		return false
	},
	// 收集用户信息
	finishUserInfo:function() {
		if (this.ruleValidate()) {
			let errInfo = this.ruleValidate()
			wx.showModal({
	      title: '填写有误',
	      content: errInfo,
	      showCancel: false
	    })
	    return
		}
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
      content: '会员部分信息填写后无法更改，请确认填写正确',
      success (res) {
		    if (res.confirm) {
	        self.sendUserInfo(params)
		    } else if (res.cancel) {
	        console.log('用户点击取消')
		    }
			}
    })
	},
	// 向云端数据库增加用户信息
	sendUserInfo:function(params) {
		wx.showToast({
		  title: '资料提交中。。。',
		  icon: 'loading',
		  mask: true,
		})
    if (true) {}
		db.collection('userinfo').add({
      data: params,
      success: function(res) {
				wx.showToast({
				  title: '资料提交成功',
				  icon: 'success',
				  mask: true,
				  duration: 2000
				})
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
		wx.redirectTo({
			url: '/pages/user/user'
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
			selectTeamIndex: e.detail.value,
			selectTeam: this.data.teamArray[e.detail.value]
		})
	},
	bindRealName:function(e) {
		this.setData({
			realName: e.detail.value
		})
	}
})