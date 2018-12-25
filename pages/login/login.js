const app = getApp();
const util = require('../../utils/util.js');

Page({
	data: {
		avator: '',
		realName: '张三',
		sex: [{ value: '男', checked: false},{ value: '女', checked: false},{ value: '其他', checked: false}],
		selectSex: '',
		teamArray: ['橙北', '橙南', '橙通'],
		selectTeam: '橙北',
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
            title: '别急，换头像还在开发中。。。',
            showCancel: false,
        });		
	},
	finishUserInfo:function() {
		let data = {
			realName: this.realName,
			sex: this.selectSex,
			teamName: this.selectTeam,
		}
		console.log(data)

		//测试用参数
		// wx.request({
		//     url:"http:// 47.105.193.164/mobileInterf/saveUser",
		//     method:'POST',
		//     data:{
		//         telnum: '18516905286',
		//         realName: '张晓斌',
		//         homeTown: '山东德州',
		//         occupation: '程序猿',
		//         sex: '男',
		//         residence: '北京朝阳',
		//         teamId: '1234',
		//         teamName: '橙北'
		//     },
		//     dataType: 'json',
		//     success:function(res){
		//     	if (res) {
		//     		console.log(red)
		// 	        wx.navigateTo({
		// 		        url:'/pages/activity/activity',
		// 		        success:function(){
		// 		        },
		// 		        fail:function(){
		// 		        }
		// 		    })  
		//     	}
		//     },
		//     fail:function(res){
		//         console.log(res)
		//     }
	 //    })		
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