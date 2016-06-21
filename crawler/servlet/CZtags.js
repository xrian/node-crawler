/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZTags = require('../models/index.js').CZTags;

servlet.CZTags = CZTags;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZTags.build(map).save().then(function(result){
		logger.info('保存CZTags表成功');
		callback(result);
	});
};

servlet.saveByInfo = function(name,uid,fid,href,pic,brief,typeId,pid){
	CZTags.build({
 	 'typeId' : typeId,
 	 'name' : name,
 	 'uid' : uid,
 	 'fid' : fid,
 	 'href' : href,
 	 'pic' : pic,
 	 'brief' : brief,
 	 'pid' : pid
  }).save().then(function(result){});
};


//根据id查询创建时间
servlet.query = function(callback,map){
	CZTags.findAll({
		where : map
	}).then(function(result){
		callback(result);
	});
};


module.exports = servlet;
