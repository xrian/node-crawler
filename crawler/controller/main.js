/**
 * Created by public on 2016/6/15.
 */
var moment = require('moment');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async  = require('async');
var url = require('url');
var qs = require('querystring');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var cookies = require('../../utils/zhihu.js');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();    
var controller={};

var CZUser = require('../servlet/CZUser.js');
var CZQuizFollow = require('../servlet/CZQuizFollow.js');
var CZQuiz = require('../servlet/CZQuiz.js');
var CZQuizTags = require('../servlet/CZQuizTags.js');
var CZAnswer = require('../servlet/CZAnswer.js');
var CZList = require('../servlet/CZList.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;


//查询出全部未删除的问题
function queryAllQuiz(req, res, next) {
	CZQuiz.CZQuiz.findAll().then(function (result) {
		res.render('list', { result: result });
	});
}
controller.queryAllQuiz = queryAllQuiz;

//根据问题查询出该问题以及该问题的答案
function queryAllAnswer(req, res, next) {
	var configMap = _systemConfig.configMap;
	var quizId = parseInt(req.query.q);
	async.series([
		function(callback){
			CZQuiz.CZQuiz.findOne({
				where : {
					uid : quizId
				}
			}).then(function (result) {
				callback(null,result);
			});
		},		//先删除数据库中与该问题相关的数据
		function(callback){ CZAnswer.queryByQuiz(callback,quizId); }
	],function(err,result){
		if(err){
			console.log(err);
			res.send('oops!查询出错了');
		}else{
			res.render('detail', {quiz : result[0], result: result[1] ,date: result[0].created_at });
		}
	});
}
controller.queryAllAnswer = queryAllAnswer;

//根据问题id查询关注该用户的用户列表
function queryAllFollow(req, res, next) {
	var configMap = _systemConfig.configMap;
	var quizId = parseInt(req.query.q);
	async.series([
		function(callback){
			CZQuiz.CZQuiz.findOne({
				where : {
					uid : quizId
				}
			}).then(function (result) {
				callback(null,result);
			});
		},		//先删除数据库中与该问题相关的数据
		function(callback){
			CZQuizFollow.CZQuizFollow.findAll({
				where : {
					quizId : quizId
				}
			}).then(function (result) {
				callback(null,result);
			});
		}
	],function(err,result){
		if(err){
			console.log(err);
			res.send('oops!查询出错了');
		}else{
			res.render('followList', {quiz : result[0], result: result[1] });
		}
	});
}
controller.queryAllFollow = queryAllFollow;

module.exports = controller;
