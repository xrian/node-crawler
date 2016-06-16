"use strict";

var fs = require('fs');
var path = require('path');
var db = require('../../utils/dbconfig.js');

var sequelize = db.sequelize;
var Sequelize = db.Sequelize;

fs.readdirSync(__dirname)//__dirname,当前文件绝对路径
	.filter(function(file) {
		//如果文件名中没有.且文件名不等于index.js,默认为实体
		return (file.indexOf(".") !== 0) && (file !== "index.js");
	})
	.forEach(function(file) {
		//将实体全部加载到db对象中
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

/**
 * 下面这串有什么用?不知道,查看giuhub上express-example-master项目源码看到的
 */
//Object.keys(db).forEach(function(modelName) {
//	console.log('--------------------------');
//	if ("associate" in db[modelName]) {
//		console.log('key:'+modelName);
//		console.log(db);
//		db[modelName].associate(db);
//		console.log('*********************');
//		console.dir(db[modelName]);
//	}
//});

//设置一对一关系
//var BUserInfo = db.BUserInfo;
//var BUser = db.BUser;
//
//BUser.belongsTo(
//	BUserInfo,{
//		foreignKey: 'info_id'
//	});

module.exports = db;

