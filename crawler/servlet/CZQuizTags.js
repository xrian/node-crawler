/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').logger;
var servlet={};
var CZQuizTags = require('../models/index.js').CZQuizTags;

servlet.CZQuizTags = CZQuizTags;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZQuizTags.build(map).save().then(function(result){
		console.log('保存CZQuizTags表成功');
		callback(result);
	});
};

module.exports = servlet;