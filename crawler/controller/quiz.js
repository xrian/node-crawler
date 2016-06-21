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
var entities = new Entities();    //解决中文乱码的对象
var controller={};

var CZUser = require('../servlet/CZUser.js');
var CZQuiz = require('../servlet/CZQuiz.js');
var CZQuizTags = require('../servlet/CZQuizTags.js');
var CZAnswer = require('../servlet/CZAnswer.js');
var CZList = require('../servlet/CZList.js');
var CZError = require('../servlet/CZError.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;
var followController = require('./follow.js');

var quizArray = new Array();
var peopleArray = new Array();

var quizCode = 'zhihu_quiz_url';


//传入问题id,执行定向抓取知乎问题
function oneQuiz(quizId){
	async.series([
		function(callback){ delQuizRecord(callback,quizId);},		//先删除数据库中与该问题相关的数据
		function(callback){ openQuizUrl(callback,quizId); },
		function(callback){ followController.quizFollowUser(callback,quizId); }
	],function(err,result){
		logger.info('程序结束:'+err);
		logger.info('程序结束,返回结果:'+result);
	});
}
controller.oneQuiz = oneQuiz;


/**
 * 根据问题id异步删除该问题相关记录
 * @param callback	回调函数
 * @param quizId    问题id
 */
function delQuizRecord(callback,quizId){
	async.parallel([
		function(callback){delQuiz(callback,quizId);},
		function(callback){delAnswer(callback,quizId);},
		function(callback){delQuizTags(callback,quizId);}
	],function(err, results){
		if(err) logger.error('异步根据问题id删除数据库数据出错:' + err);
		logger.info('删除数据完毕:' + quizId );
		//执行回调函数,表明该方法结束,执行下一个方法
		callback(null);
	});
}



/**
 * 打开指定问题详情页面,获取返回后的html
 * @param callback
 * @param quizId
 */
function openQuizUrl(callback,quizId){
	var configMap = _systemConfig.configMap;
	var uri = configMap[quizCode] + '';
	uri = uri.replace('@id',quizId);
	superagent.get(uri).set(cookies).end(function(err,result){
		logger.info('请求知乎一次:' + uri );
		var stateus = result.status+'';
		if(err){
			console.error('superagent打开问题url报错:' + err);
			console.error('url:' + uri + '  返回码:' + stateus);
			callback(null);
			return false;
		}
		if(stateus.indexOf('4') === 0||stateus.indexOf('5') === 0){
			logger.error('地址uri:' + uri + ' 返回状态码:' + result.status);
			logger.error('result.body.message:' + result.body.message);
			callback(null);
			return false;
		}else {
			//防止发生意外,截取数据出错导致服务停止,try-catch处理
			try{
				var $ = cheerio.load(result.text);
				//抓取问题标签保存到c_z_quie_tags表中
				$('.zm-tag-editor.zg-section>div>a').each(function(item){
					var _this = $(this);
					CZQuizTags.saveByHtml(_this,quizId);
				});
				//保存问题到c_z_quiz表
				CZQuiz.saveByHtml($,uri,quizId);
				//保存当前页面该问题的回答,如果用户不是匿名,将用户编码存到list表
				$('#zh-question-answer-wrap > div').each(function(item){
					analyzeAnswerHtml($(this),quizId);
				});
				var params = {
					"url_token": quizId,
					"pagesize": 10,
					"offset": $('#zh-question-answer-wrap > div').length
				};
				console.log('post集合map:' + params.toString());
				ajaxAnswer(callback,params);		//获取下一页回答,如果获取的json数据msg为空则执行callback(null);
			}catch(e){
				logger.error('superagent请求成功,返回html截取保存try-catch出错:' + e);
				logger.error('地址uri:' + uri + ' 返回状态码:' + result.status);
				CZError.save(function(){},{
					type : '错误',
					filname : __filename,
					uid : uri,
					maybe : '获取问题页面内容出错,截取数据try-catch出错',
					msg : e+''
				});
				callback(null);
			}
		}
	});
}
controller.openQuizUrl = openQuizUrl;


/**
 * 使用post方式请求知乎服务器获取下一条数据
 * @param callback
 * @param map
 */
function ajaxAnswer(callback,map){
	var configMap = _systemConfig.configMap;
	var uri = configMap['zhihu_answer_next_url'];
	superagent.post(uri)
		.set(cookies)
		.send(qs.stringify({method:'next',params:JSON.stringify(map),_xsrf:configMap['_xsrf']}))
		.end(function(err,result){
			logger.info('请求知乎一次:' + uri );
			var status = result.status + '';
			if(err){
				logger.error('获取回答下一页内容报错:'+err);
				logger.error('返回状态码status:' + status + 'map内容:'+map.toString());
				return false;
			}
			if(status.indexOf('4') === 0||status.indexOf('5') === 0){
				logger.error('获取回答下一页内容map:' + map.toString() + ' 返回状态码:' + result.status);
				logger.error('result.body.message:' + result.body.message);
			}else {
				try{
					var jsonObj = JSON.parse(result.text);
					if(jsonObj.msg!=null && jsonObj.msg != ''){
						var array = jsonObj.msg;
						for(var j=0;j<array.length;j++) {
							var $ = cheerio.load(array[j]);
							var $this = $('div.zm-item-answer');
							analyzeAnswerHtml($this,map.url_token);
						}
						map.offset=map.offset+10;
						ajaxAnswer(callback,map);
					}else{
						//该问题下一页访问完毕
						callback(null);
						logger.info('该问题爬取结束,内容map:' + map.toString());
						return false;
					}
				}catch(e){
					//try-catch出错
					logger.info('try-catch爬取问题出错了');
					callback(null);
				}
			}
		});

}

/**
 * 根据html内容,截取回答数据
 * @param $this   jQuery执行each函数后的$(this)
 * @param quizId	问题id
 */
function analyzeAnswerHtml($this,quizId){
	var answerMap = {};
	answerMap.quizId = quizId;
	answerMap.aid = $this.attr('data-aid');
	answerMap.href = $this.children('link[itemprop=url]').attr('href');
	answerMap.tokenUrl = $this.children('a.zg-anchor-hidden').attr('name');
	answerMap.token = $this.attr('data-atoken');
	answerMap.name = $this.children('div.zm-item-rich-text.expandable.js-collapse-body').attr('data-author-name');
	var ucode = $this.children('div.answer-head').children('div.zm-item-answer-author-info').children('a.zm-item-link-avatar.avatar-link').attr('data-tip')+'';
	if(ucode&&ucode!='undefined'){
		answerMap.ucode = (ucode).substring(4);
	}
	answerMap.create = $this.attr('data-created');
	answerMap.detail = entities.decode($this.children('div.zm-item-rich-text.expandable.js-collapse-body').children('div.zm-editable-content.clearfix').html());
	answerMap.agree = $this.children('div.zm-votebar').children('button.up').children('span.count').text();
	var comment = $this.children('div.zm-item-meta.answer-actions.clearfix.js-contentActions').children('div').children('a.meta-item.toggle-comment.js-toggleCommentBox').text().replace(/[^0-9]+/ig,"");
	if(comment){
		answerMap.comment = comment;
	}else{
		answerMap.comment = 0;
	}
	answerMap.create = $this.attr('data-created');
	answerMap.update = $this.children('div.zm-item-meta.answer-actions').children('div.zm-meta-panel').children('a.answer-date-link.meta-item').text();
	CZAnswer.save(function(answerMap){
	},answerMap);
}


/**
 * 根据问题id,删除answer表数据
 * @param quizId 问题id
 */
function delQuiz(callback,quizId){
	CZQuiz.CZQuiz.destroy({
		where :{
			uid : quizId
		}
	}).then(function(result){
		callback(null);
	});
}

/**
 * 根据问题id,删除answer表数据
 * @param quizId 问题id
 */
function delAnswer(callback,quizId){
	CZAnswer.CZAnswer.destroy({
		where :{
			quizId : quizId
		}
	}).then(function(result){
		callback(null);
	});
}

/**
 * 根据问题id,删除quiz_tags表数据
 * @param quizId 问题id
 */
function delQuizTags(callback,quizId){
	CZQuizTags.CZQuizTags.destroy({
		where :{
			quizId : quizId
		}
	}).then(function(result){
		callback(null);
	});
}

module.exports = controller;
