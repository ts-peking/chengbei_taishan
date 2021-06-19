/**
 * @file 更新云数据库 云函数
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
 * 更新 指定dbId 指定docId 中的数据
 *
 * @param {Object} event 参数包含小程序端调用传入的 data event = {dbId: dbId, // 数据库ID docId: docId, // 数据库数据ID data: data // 存储的数据库集合}
 * @param {Object} context context
 * @return {Function}
 */
exports.main = async (event, context) => {
    try {
        return await db.collection(event.dbId).doc(event.docId).update({
                // data 传入需要局部更新的数据
                data: event.data,
                success(res) {
                    console.log('docupdata成功', res);
                },
                fail(err) {
                    console.log('docupdata失败', err);
                }
            });
    }
    catch (e) {
        console.error(e);
    }
};
