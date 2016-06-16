/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').logger;
var servlet={};
var configMap = {};
var _systemConfig = require('../models/index.js')._systemConfig;
servlet._systemConfig = _systemConfig;

servlet.save = function(callback,map){
	_systemConfig.build(map).save().then(function(result){
		console.log('保存CZUser用户表成功');
		callback(result);
	});
};

/**
 * 将systemConfig表中的数据查询出来放入configMap中缓存
 */
function setConfigMap(){
	_systemConfig.findAll({
		order : [['created_at', 'DESC']]
	}).then(function(result){
		for(var i = 0;i<result.length;i++){
			var map = result[i];
			configMap[map.code] = map.val;
		}
		//console.log('预加载完成');
		//console.dir(configMap);
		servlet.configMap = configMap;
	}).catch(function(err){
		console.log('查询_system_config出错:'+err);
	});
};
setConfigMap();

/**
 * 过时的方法
 * @param callback
 */
servlet.getConfigMap = function(callback){
	if(!configMap){
			_systemConfig.findAll({
				order : [['created_at', 'DESC']]
			}).then(function(result){
				var configMap = {};
				for(var i = 0;i<result.length;i++){
					var map = result[i];
					configMap[map.code] = map.val;
				}
				callback(configMap);
			}).catch(function(err){
				console.log('查询_system_config出错:'+err);
			});
	}else{
		callback(configMap);
	}
}

module.exports.servlet = servlet;
