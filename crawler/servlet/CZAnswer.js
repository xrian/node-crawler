/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZAnswer = require('../models/index.js').CZAnswer;

servlet.CZAnswer = CZAnswer;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZAnswer.build(map).save().then(function(result){
		logger.info('保存CZAnswer表成功');
		callback(result);
	}).catch(function(err){
		logger.error('保存回答表出错:'+err);
	});
};

//根据问题id查询全部回答
servlet.queryByQuiz = function(callback, quizId){
	CZAnswer.findAll({
		where : {
			quizId : quizId
		}
	}).then(function(result){
		callback(null,result);
	}).catch(function(err){
		logger.error('根据问题id查询回答出错:'+err);
	});
};

module.exports = servlet;