/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZQuiz = require('../models/index.js').CZQuiz;

servlet.CZQuiz = CZQuiz;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZQuiz.build(map).save().then(function(result){
		logger.info('保存CZQuiz表成功');
		callback(result);
	});
};

module.exports = servlet;