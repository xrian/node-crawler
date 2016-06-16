/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').logger;
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
		console.log('保存CZQuizTags表成功');
		callback(result);
	});
};

module.exports = servlet;