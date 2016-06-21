/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();    //解决中文乱码的对象
var servlet={};
var CZQuiz = require('../models/index.js').CZQuiz;

servlet.CZQuiz = CZQuiz;

/**
 * 保存方法
 * @param callback  回调函数
 * @param map       参数集合
 */
servlet.save = function(callback,map){
	CZQuiz.build(map).save().then(function(result){
		callback(result);
	});
};

/**
 * 使用superagent打开URL,接收到正确返回文本后,调用该方法,解析html保存数据到数据库
 * @param $ 传入cheerio.load(result.text)
 * @param uri 访问的地址
 * @param quizId 问题id
 */
servlet.saveByHtml = function($,uri,quizId){
	var map = {};
	map.uid = quizId;
	map.href = uri;
	var title = $('#zh-question-title > h2').text();
	map.name = title.substring(0,title.length-2);
	map.cid = $('#zh-single-question-page  div.zu-main-content > div > meta[itemprop=visitsCount]').attr('content');
	map.detail = entities.decode($('#zh-question-detail > div').html());
	map.rid = $('#zh-question-detail').attr('data-resourceid');
	var comment = $('#zh-question-meta-wrap > div.zm-meta-panel > a.toggle-comment.meta-item').text().replace(/[^0-9]+/ig,"");
	if(comment){
		map.comment = comment;
	}else{
		map.comment = '0';
	}
	var answer = $('#zh-question-answer-num').attr('data-num');
	if(answer){
		map.answer = answer;
	}else{
		map.answer = '0';
	}
	map.follow = $('#zh-question-side-header-wrap > div.zh-question-followers-sidebar > div.zg-gray-normal > a > strong').text();
	servlet.save(function(result){
//		servlet.delByCode(null,quizId,quizCode);
	},map);
};


//根据id查询创建时间
servlet.query = function(callback,map){
	CZQuiz.findAll({
		where : map
	}).then(function(result){
		callback(result);
	});
};


//根据id查询创建时间
servlet.delByCode = function(callback,map){
	CZQuiz.destroy({
		where : map
	}).then(function(result){
		//callback(map.uid);
	});
};

module.exports = servlet;
