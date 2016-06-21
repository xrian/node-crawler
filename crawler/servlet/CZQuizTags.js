/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
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
		if(callback){
			callback(result);
		}
	});
};

/**
 * 传入参数,解析html后保存
 * @param _this jquery获取each循环后$(this)的值
 * @param quizId 问题id
 */
servlet.saveByHtml = function(_this,quizId){
		var map = {};
		map.quizId = quizId;
		map.name = _this.text();
		map.fid = _this.attr('href').substring(7);
		map.href = _this.attr('href');
	  servlet.save(function(){},map);
};

//destroy
servlet.delByQuiz = function(callback,quiz){
	CZQuizTags.destroy({
		where : {
			quizId : quiz
		}
	}).then(function(result){
		if(callback){
			callback();
		}
	});
};

module.exports = servlet;
