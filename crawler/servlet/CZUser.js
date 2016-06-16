/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').logger;
var servlet={};
var CZUser = require('../models/index.js').CZUser;

servlet.CZUser = CZUser;

servlet.save = function(callback,map){
	CZUser.build(map).save().then(function(result){
		logger.info('保存CZUser用户表成功');
		callback(result);
	});
};

module.exports = servlet;