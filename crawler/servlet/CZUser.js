/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var servlet={};
var CZUser = require('../models/index.js').CZUser;

servlet.CZUser = CZUser;

/**
 * 通用的保存方法
 * @param callback
 * @param map
 */
servlet.save = function(callback,map){
	CZUser.build(map).save().then(function(result){
		callback(result);
	});
};

/**
 * 传入用户知乎唯一编码,查询uc_z_ser表是否已经存在该用户
 * @param callback
 * @param code
 */
servlet.queryByCode = function(callback,code){
	CZUser.findOne({
		where : {
			ucode : code
		}
	}).then(function(result){
		callback(result);
	});
}

module.exports = servlet;