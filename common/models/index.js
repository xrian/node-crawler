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



module.exports = db;

