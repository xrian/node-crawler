/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').logger;
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
		logger.info('保存CZList表成功:'+result.id);
		callback(result);
	});
};

servlet.del = function(callback,map){
	try{
		CZList.destroy(map).then(function(result){
			callback();
		}).catch(function(err){
			logger.error('爬取【' + map.where.uid + '】用户信息结束,删除c_z_list表数据,删除失败:' + err);
		});
	}catch(e){
		logger.error('删除错误,莫非是我方法写错了?'+e);
	}
};

/**
 * 查询CZList表全部数据
 * @param callback
 * @param map
 */
servlet.queryByAll = function(callback){
	CZList.findAll({

	}).then(function(result){
		callback(result);
	});
};

module.exports = servlet;