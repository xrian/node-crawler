/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZType = require('../models/index.js').CZType;

servlet.CZType = CZType;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZType.build(map).save().then(function(result){
		callback(result);
	});
};

servlet.saveByInfo = function(uid,utext,uhref){
	CZType.build({
		'name' : utext,
		'uid' : uid,
		'href' : uhref
	}).save().then(function(result){
		//console.log('数据库保存成功');
	});
};

//根据id查询创建时间
servlet.query = function(callback,map){
	CZQuiz.findAll({
		where : map
	}).then(function(result){
		callback(result);
	});
};

//根据id查询创建时间
servlet.queryByCode = function(callback,code){
	CZQuiz.findAll({
		where : {
			name : code
		}
	}).then(function(result){
		callback(result);
	});
};

module.exports = servlet;
