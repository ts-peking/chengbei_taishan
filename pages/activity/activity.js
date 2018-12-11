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
        selectTab: 'match',
        activityList: [
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
        playList: [
            {
                playId: 123,
                playName: '中国地质大学踢球局',
                playLocation: '中国地质大学',
                playPoi: '',//留作接入腾讯地图
                playStartDate: 1543759535822,
                playEndDate: 1543759535822,
                playPrice: '100元',
                playStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中                
            },
            {
                playId: 223,
                playName: '中国地质大学踢球局',
                playLocation: '中国地质大学',
                playPoi: '',//留作接入腾讯地图
                playStartDate: 1543759535822,
                playEndDate: 1543759535822,
                playPrice: '100元',
                playStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中                
            },            
            {
                playId: 323,
                playName: '中国地质大学踢球局',
                playLocation: '中国地质大学',
                playPoi: '',//留作接入腾讯地图
                playStartDate: 1543759535822,
                playEndDate: 1543759535822,
                playPrice: '100元',
                playStatus: 'apply',//报名状态：apply.可报名，registered，已报名，finished.已结束，underway.进行中                
            }            
        ],
        pageSize: 10,
        pageNum: 0,
        status: '',
	},
    onLaunch: function () {
    	
    },
    onShow: function () {
		wx.setNavigationBarTitle({
	        title: "活动页面"
	    });     	
      	console.log('这是活动页面');

    },
    onHide: function () {
      	
    },
    initActivityList:function() {
        var req = {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            // status: this.status       
        }
        wx.request({
            url:"http://47.105.193.164/mobileInterf/queryActivityList",
            method:'POST',
            data: req,
            dataType: 'json',
            success:function(res){
                //拿到活动列表赋值
                console.log(res)
            },
            fail:function(res){
                console.log(res)
            }
        })
    },
    selectMatch: function (e) {
        this.setData({
            selectTab : 'match'
        })
    },
    selectPlay: function (e) {
        this.setData({
            selectTab : 'play'
        })
    },
    goPlayDetail:function(e) {
        var playId = e.currentTarget.dataset.item.playId
        wx.navigateTo({
            url:'/pages/submit/submit?playId=' + playId,
            success:function(){
            },
            fail:function(){
            }
        })  
    },
    goActivityDetail:function(e) {
        var activityId = e.currentTarget.dataset.item.activityId
        wx.navigateTo({
            url:'/pages/submit/submit?activityId=' + activityId,
            success:function(){
            },
            fail:function(){
            }
        })          
    }    
});