/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZQuizFollow = require('../models/index.js').CZQuizFollow;

servlet.CZQuizFollow = CZQuizFollow;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZQuizFollow.build(map).save().then(function(result){
		callback(result);
	});
};

/**
 * 根据问题id和用户code查询是否存在该记录
 * @param callback
 * @param map
 */
servlet.queryByUid = function(callback,map,back){
	CZQuizFollow.findOne({
		where : map
	}).then(function(result){
		callback(result,back);
	});
};

module.exports = servlet;