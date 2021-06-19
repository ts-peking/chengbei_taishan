/**
 * @file 创建云数据库中数据 云函数
 * @author savuer
 */

const cloud = require('wx-server-sdk');

// 初始化 cloud
cloud.init();
// 全局云数据库环境ID  测试环境 'taishanchengbei' 生产环境 'prodenv-2sbjk'
const db = cloud.database({
    env: 'prodenv-2sbjk'
});

/**
 * 更新 指定dbId 中的数据
 *
 * @param {Object} event 参数包含小程序端调用传入的 data event = {dbId: dbId, // 数据库ID data: data // 存储的数据库集合}
 * @param {Object} context context
 * @return {Function}
 */
exports.main = async (event, context) => {
    console.log('docadd', event);
    try {
        return await db.collection(event.dbId).add({
            // data 传入需要局部更新的数据
            data: event.data,
            success(res) {
                console.log('add成功', res.data);
            },
            fail(err) {
                console.log('add失败', err);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
};
