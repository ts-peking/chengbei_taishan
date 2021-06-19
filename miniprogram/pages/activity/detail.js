/**
 * @file 活动详情页
 * @author savuer
 */

/* global wx getApp Page */

const app = getApp();
const db = wx.cloud.database({
    env: app.globalData.databaseEnv
});

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        hasUserInfo: false,
        detailId: '',
        submitCheck: true, // true不可发布活动，仅用于报名与查看; false可发布活动
        activityData: {
            title: '',
            location: '',
            startDate: '',
            startTime: '',
            endTime: '',
            price: '',
            activityNum: '',
            creatorPhone: '',
            description: ''
        },
        activityLog: {
            // leave: [], 请假
            // submit: [], 报名
            // undetermined: [] 待定
        },
        openId: '',
        personalInfo: {}
    },
    onLoad(options) {
        this.data.detailId = options.id;
        // 检查userInfo
        if (app.globalData.userInfo) {
            this.setData({
                hasUserInfo: true
            });
        }
        else {
            app.userInfoReadyCallback = res => {
                app.globalData.userInfo = res.userInfo;
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            };
        }
        // 检查openId
        if (app.globalData.openid) {
            this.setData({
                openId: app.globalData.openid
            });
        }
        else {
            this.getOpenId();
        }
        if (!options) {
            this.setData({
                submitCheck: false
            });
        }

        this.initDetailData();
        this.initActivityLog();
    },
    getUserInfo(e) {
        if (e.detail && !e.detail.userInfo) {
            return;
        }

        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    getOpenId() {
        if (app.globalData.openid) {
            this.setData({
                openId: app.globalData.openid
            });
        }

        let self = this;
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success(res) {
                app.globalData.openid = res.result.openid;
                self.setData({
                    openId: app.globalData.openid
                });
            },
            fail(err) {
                console.error('[云函数] [login] 调用失败', err);
            }
        });
    },
    // 初始化详情数据
    initDetailData() {
        let self = this;
        db.collection('activityList').doc(this.data.detailId).get({
            success(res) {
                for (let item in self.data.activityData) {
                    self.setData({
                        ['activityData.' + item]: res.data[item]
                    });
                }
            },
            fail(err) {
                console.log('error', err);
            }
        });
    },
    initActivityLog() {
        let self = this;
        db.collection('activityLog').doc(this.data.detailId).get({
            success(res) {
                self.setData({
                    activityLog: res.data
                });
                console.log('activityLog', res.data);
            },
            fail(err) {
                console.log('error', err);
            }
        });
    },
    initUserInfo(status) {
        let self = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            mask: true
        });
        db.collection('userInfo').where({
            '_openid': this.data.openId
        }).get({
            success(res) {
                if (res.data && res.data.length > 0) {
                    self.setData({
                        personalInfo: res.data[0]
                    });
                    self.updataLog(status);
                }
                else {
                    wx.showModal({
                        title: '请填写个人资料',
                        content: '您暂未在小程序中提交个人资料，填写后才可报名',
                        confirmText: '前往填写',
                        success(res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/login/login'
                                });
                            }
                            else if (res.cancel) {
                                console.log('用户点击取消');
                                return false;
                            }

                        }
                    });
                }
                wx.hideToast();
            },
            fail(err) {
                console.log('error', err);
                wx.hideToast();
                return false;
            }
        });
    },
    changeStatus(e) {
        let status = e.currentTarget.dataset.status;
        this.initUserInfo(status);
    },
    updataLog(status) {
        wx.showToast({
            title: '操作中',
            icon: 'loading',
            mask: true
        });
        let logList = this.data.activityLog;
        let personalInfo = this.data.personalInfo;
        for (let item of logList) {
            if (item === '_id') {
                continue;
            }

            for (let i = 0, len = logList[item].length; i < len; i++) {
                if (logList[item][i] && logList[item][i]._openid && logList[item][i]._openid === this.data.openId) {
                    logList[item].splice(i, 1);
                }

            }
        }
        logList[status].push(personalInfo);
        delete logList._id;
        let data = {
            dbId: 'activityLog',
            docId: this.data.detailId,
            data: logList
        };
        let self = this;
        wx.cloud.callFunction({
            name: 'docupdata',
            data: data,
            success(res) {
                wx.showToast({
                    title: '操作成功',
                    icon: 'success',
                    mask: true,
                    duration: 1000
                });
                self.initActivityLog();
                wx.hideToast();
            },
            fail(err) {
                console.error(err);
                wx.showToast({
                    title: '操作失败',
                    icon: 'none',
                    mask: true,
                    duration: 1000
                });
                wx.hideToast();
            }
        });
    },
    goToActivity(id) {
        let url = id ? `/pages/submit/submit?id=${id}` : '/pages/activity/activity';
        wx.navigateTo({
            url
        });
    }
});
