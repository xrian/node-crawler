/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZList = require('../models/index.js').CZList;

servlet.CZList = CZList;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZList.build(map).save().then(function(result){
		callback(result);
	});
};

/**
 * 通用的删除方法,根据map内容删除数据
 * @param callback
 * @param map
 */
servlet.del = function(callback,map){
	CZList.destroy(map).then(function(result){
		if(callback){
			callback();
		}
	}).catch(function(err){
		logger.error('爬取【' + map.where.uid + '】用户信息结束,删除c_z_list表数据,删除失败:' + err);
	});
};

/**
 * 根据uid和code删除c_z_list表中数据
 * @param callback
 * @param map
 */
servlet.delByCode = function(callback, uid, code ){
	CZList.destroy({
		where :{
			uid : uid,
			code : code
		}
	}).then(function(result){
		if(callback){
			callback(null);
		}
	}).catch(function(err){
		logger.error('爬取【' + uid + '】用户信息结束,删除c_z_list表数据,删除失败:' + err);
	});
};

/**
 * 查询CZList表全部数据
 * @param callback
 * @param map
 */
servlet.queryAll = function(callback,map){
	CZList.findAll(map).then(function(result){
		callback(result);
	});
};

/**
 * 查询CZList表全部数据
 * @param callback
 * @param map
 */
servlet.queryAllByCode = function(callback,code){
	CZList.findAll({
		where : {
			code : code
		}
	}).then(function(result){
		callback(result);
	});
};

module.exports = servlet;