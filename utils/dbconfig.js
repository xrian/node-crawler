// "use strict";

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = require(path.join(__dirname, '..', 'config', 'db.json')); //__dirname获取当前文件绝对路径.根据路径获取json文件
var db={};

var sequelize = new Sequelize(config.database,config.username,config.password,config.options);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
