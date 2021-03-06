/**
 * @file 提交活动页
 * @author savuer
 */
/* global getApp wx Page */

const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database({
    env: app.globalData.databaseEnv
}); // 初始化数据库

Page({
    data: {
        submitCheck: false, // true不可发布活动，仅用于报名与查看; false可发布活动
        activityData: {
            title: '',
            location: '',
            startDate: util.formatTime(new Date()).substring(0, 10),
            startTime: '14:00',
            endTime: '18:00',
            price: '',
            activityNum: '',
            creatorPhone: null,
            description: '',
            submitTime: new Date().getTime()
        }
    },
    bindDataChange(e) {
        let params = e.currentTarget.dataset.params;
        this.setData({
            ['activityData.' + params]: e.detail.value
        });
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        });
    },
    addImage() {
        wx.showModal({
            title: '谁叫你点的，乱点什么。。呸。。',
            showCancel: false
        });
    },
    ruleValidate() {
        if (!this.data.activityData.title) {
            return '请填写活动名称';
        }

        if (!this.data.activityData.location) {
            return '请填写活动地点';
        }

        if (!this.data.activityData.startDate) {
            return '请填写活动时间';
        }

        if (!this.data.activityData.creatorPhone) {
            return '请填写主办人联系方式';
        }

        return false;
    },
    submitActivity(e) {
        if (this.ruleValidate()) {
            let errInfo = this.ruleValidate();
            wx.showModal({
                title: '填写有误',
                content: errInfo,
                showCancel: false
            });
            return;
        }

        let self = this;
        db.collection('activityList').add({
            data: this.data.activityData,
            success(resp) {
                self.addActivityLog(resp._id);
                wx.showModal({
                    content: '发布成功',
                    cancelText: '查看活动',
                    confirmText: '确定',
                    success(res) {
                        if (res.confirm) {
                            console.log('跳转到活动列表');
                            self.goToActivity();
                        }
                        else if (res.cancel) {
                            console.log('跳转到活动详情');
                            self.goToActivity(resp._id);
                        }

                    }
                });
            },
            fail(err) {
                wx.showToast({
                    title: '活动发布失败,请稍后重新提交',
                    duration: 2000
                });
                console.log(err);
            }
        });
    },
    addActivityLog(id) {
        let data = {
            dbId: 'activityLog',
            data: {
                '_id': id,
                submit: [],
                leave: [],
                undetermined: []
            }
        };
        wx.cloud.callFunction({
            name: 'docadd',
            data: data,
            success(res) {
                console.log('addlog', res);
            },
            fail(err) {
                console.error(err);
            }
        });
    },
    goToActivity(id) {
        let url = id ? `/pages/activity/detail?id=${id}` : '/pages/activity/activity';
        wx.navigateTo({
            url: url
        });
    }
});
