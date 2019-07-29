# chengbei_taishan(球迷通小程序)
一个由鲁能泰山北京球迷会会员开发的足球活动报名小程序

## 必要条件
* 基于原生微信小程序开发语言、框架进行编写
* 涉及小程序开发技术文档
	* [微信小程序框架参考文档](https://developers.weixin.qq.com/miniprogram/dev/reference/)
	* [微信小程序组件参考文档](https://developers.weixin.qq.com/miniprogram/dev/component/)
	* [微信小程序API参考文档](https://developers.weixin.qq.com/miniprogram/dev/api/)
	* [微信小程序云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
* 开发工具
	* 微信开发者工具

## 使用
## 发布

> 本项目未配置云函数全局变量，需要修改部分文件的环境变量才可正常访问和使用

### 涉及本地修改
* app.js
  * wx.cloud.init()  // 云函数全局环境变量
  * globalData.databaseEnv  // 云数据库全局环境变量
* cloudfunctions
  * docadd -> index.js -> cloud.database()
  * docupdata -> index.js -> cloud.database()

## 支持和版本变化
* `1.0.0版本`
	* 创建小程序欢迎页完成首次提交和审核
* `1.1.0版本`
	* 增加个人信息页面
	* 增加活动列表页，完成踢球活动列表正常展示
	* 增加活动详情页，完成活动报名请假等必要流程
	* 增加个人主页
	* 完成所有页面和数据在微信云开发平台的绑定
	* 完成微信云开发平台必要环境，云函数的搭建

## 其他部分
### 如何提交Issue或需求？
* [请点击这里提交](https://github.com/ts-peking/chengbei_taishan/issues)

### 如何提交代码？
* 请在[开源地址](https://github.com/ts-peking/chengbei_taishan) fork 代码后提交 pull request
* 管理员注：请遵循必要的开发和提交规范进行 pull request

### 如何参与版本开发？
* 该项目暂时只针对鲁能泰山北京球迷会内部使用，开发团队暂时仅限于协会会员。
* 鲁能泰山北京球迷协会会员请直接联系1311号会员。
* 如果您是一位非会员，我们非常感谢您的积极参与，但是非常抱歉我们不能给您开放权限。
* 如果您也是一位在京鲁蜜，但是未加入协会，请直接微博私信 `鲁能泰山北京球迷会` 获取入会方式后联系开发人员。组织欢迎您的加入！