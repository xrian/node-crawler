/**
 * Created by zs199 on 2016/5/20.
 */
var express = require('express');
var app = express();
var fs = require('fs');
var log4js = require('log4js');
var path = require('path');

var filePath = path.join(__dirname, '..', 'config', 'log4js.json');
var log4js_config =JSON.parse(fs.readFileSync(filePath, "utf8"));
log4js.configure(log4js_config);
var logger = log4js.getLogger(__dirname);


//配合express用的方法
exports.use = function(app) {
	//页面请求日志, level用auto时,默认级别是WARN
	app.use(log4js.connectLogger(logger, {level:'ALL', format:':method :url'}));
}

exports.logger = logger;
exports.log4js = log4js;