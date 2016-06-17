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
var userController = require('./user.js');

var quizArray = new Array();
var peopleArray = new Array();

var quizCode = 'zhihu_quiz_url';
/**
 * 主函数
 * @param req
 * @param res
 * @param next
 */
function main(req,res,next){
	var configMap = _systemConfig.configMap;
	//查询CZList表全部数据
	CZList.CZList.findAll({
		where :{
			code : 'zhihu_quiz_url'
		}
	}).then(function(result){
		for(var i = 0;i<result.length;i++){
			quizArray.push(result[i].uid);
		}
		console.log('问题id:'+quizArray);
		async.eachSeries(quizArray,function(item,callback){
			setTimeout(function(){
				index(item);
				CZList.del(function(){
					logger.info('删除list表问题id成功');
				},{
					where : { uid : item }
				});
				callback(null);
			},configMap['zhihu_get_time'] + 0);
		},function(err){
			logger.info('oops,出错了!!!'+err);
			getPeopleInfo();
		});
	});
}

//
function crawlerQuiz(){
	var configMap = _systemConfig.configMap;
	CZList.queryAllByCode(function(quizList){
		for(var i = 0;i<quizList.length;i++){
			quizArray.push(quizList[i].uid);
		}
		logger.info('问题id:'+quizArray);
		async.eachSeries(quizArray,function(item,callback){
			openQuizUrl(item);
			callback(null);
		},function(err){
			//当有一个项目报错或全部执行完会进入到这里
			if(!err||err==null){
				logger.error('oops,问题全部爬取完毕!!!'+err);
				//getPeopleInfo();
			}else{
				logger.error('oops,出错了!!!循环爬取c_z_list表中问题id时抛出异常(callback(err)):'+err);
			}
		});
	},quizCode);
}








/**
 * 回调金字塔的威力( ｀д′)
 */
function getPeopleInfo(){
	var configMap = _systemConfig.configMap;
	CZList.CZList.findAll({
		where :{
			code : 'zhihu_people_about_url'
		}
	}).then(function(peopleList){
		for(var i = 0;i<peopleList.length;i++){
			peopleArray.push(peopleList[i].uid);
		}
		logger.info('个人中心id:'+peopleArray);
		async.eachSeries(peopleArray,function(item,callback){
			setTimeout(function(){
				CZUser.CZUser.findOne({
					where : {
						ucode : item
					}
				}).then(function(userFindOne){
					if(!userFindOne){
						var uri = configMap['zhihu_people_about_url'] + '';
						uri = uri.replace('@id',item);
						userController.peopleInfo(uri);
						CZList.del(function(){
							logger.info('删除list表用户id成功');
						},{
							where : { uid : item }
						});
						callback(null);
					}else{
						logger.warn('根据peopleArray数组里面的数据,查询c_z_user是否存在该用户,用户已存在:' + userFindOne.id);
						callback(null);
					}
				}).catch(function(err){
					logger.error('根据peopleArray数组里面的数据,查询c_z_user是否存在该用户,查询出错:' + err);
				});
			},configMap['zhihu_get_time'] + 0);
		},function(err){
			logger.error('oops,出错了!!!'+err);
			main();
		});
	});
}

function index(quizId){
	var configMap = _systemConfig.configMap;
	var uri = configMap['zhihu_quiz_url'] + '';
	uri = uri.replace('@id',quizId);
	logger.info('爬取的url:'+uri);
	superagent.get(uri).set(cookies).end(function(err,result){
		if(err) logger.error(err);
		var $ = cheerio.load(result.text);
		//保存问题标签到c_z_quie_tags表中
		$('.zm-tag-editor.zg-section>div>a').each(function(item){
			var map = {};
			map.quizId = quizId;
			map.name = $(this).text();
			map.fid = $(this).attr('href').substring(7);
			map.href = $(this).attr('href');
			CZQuizTags.save(function(){
				logger.info('保存quiz_tags')
			},map);
		});
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
		CZQuiz.save(function(result){
			try{
				logger.info('保存问题表成功:'+result.id);
			}catch(e){
				logger.error('保存出错,问题表');
			}
		},map);
		$('#zh-question-answer-wrap > div').each(function(item){
			var answerMap = {};
			answerMap.quizId = quizId;
			answerMap.aid = $(this).attr('data-aid');
			answerMap.href = $(this).children('link[itemprop=url]').attr('href');
			answerMap.tokenUrl = $(this).children('a.zg-anchor-hidden').attr('name');
			answerMap.token = $(this).attr('data-atoken');
			answerMap.name = $(this).children('div.zm-item-rich-text.expandable.js-collapse-body').attr('data-author-name');
			var ucode = $(this).children('div.answer-head').children('div.zm-item-answer-author-info').children('a.zm-item-link-avatar.avatar-link').attr('data-tip')+'';
			if(ucode&&ucode!='undefined'){
				answerMap.ucode = (ucode).substring(4);
			}
			answerMap.create = $(this).attr('data-created');
			answerMap.detail = entities.decode($(this).children('div.zm-item-rich-text.expandable.js-collapse-body').children('div.zm-editable-content.clearfix').html());
			answerMap.agree = $(this).children('button.up').children('span.count').text();
			var comment = $(this).children('a.meta-item.toggle-comment.js-toggleCommentBox').text().replace(/[^0-9]+/ig,"");
			if(comment){
				answerMap.comment = comment;
			}else{
				answerMap.comment = 0;
			}
			answerMap.create = $(this).attr('data-created');
			answerMap.update = $(this).children('a.answer-date-link.meta-item').text();
			CZAnswer.save(function(){
				logger.info('保存回答表成功');
			},answerMap);
			var userMap = {user:'用户',code:'zhihu_people_about_url'};
			if(answerMap.ucode){
				userMap.uid = answerMap.ucode;
				CZList.save(function(){
					logger.info('保存回答问题的人id到list表一次:');
				},userMap);
			}
			//console.log('循环一次');
		});

	});
}

function openQuizUrl(quizId){
	var configMap = _systemConfig.configMap;
	var uri = configMap[quizCode] + '';
	uri = uri.replace('@id',quizId);
	superagent.get(uri).set(cookies).end(function(err,result){
		var stateus = result.status+'';
		if(err){
			console.error('superagent打开url报错:' + err);
			console.error('url:' + uri + '  返回码:' + stateus);
			return false;
		}
		if(stateus.indexOf('4') === 0||stateus.indexOf('5') === 0){
			logger.error('地址uri:' + uri + ' 返回状态码:' + result.status);
			logger.error('result.body.message:' + result.body.message);
		}else {
			//防止发生意外,截取数据出错导致服务停止,try-catch处理
			try{
				var $ = cheerio.load(result.text);
				//保存问题标签到c_z_quie_tags表中
				$('.zm-tag-editor.zg-section>div>a').each(function(item){
					CZQuizTags.delByQuiz(
						(function(_this){     //在回调函数中无法访问到外部的值,建立闭包传值
							var map = {};
							map.quizId = quizId;
							map.name = _this.text();
							map.fid = _this.attr('href').substring(7);
							map.href = _this.attr('href');
							CZQuizTags.save(function(){
								console.log('保存quiz_tags')
							},map);
						})($(this)),
						quizId);
				});
				//保存问题到c_z_quiz表
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
				CZQuiz.save(function(result){
					CZList.delByCode(null,quizId,quizCode);
				},map);

				//保存当前页面该问题的回答,如果用户不是匿名,将用户编码存到list表
				$('#zh-question-answer-wrap > div').each(function(item){
					analyzeAnswerHtml($(this),quizId);
				});

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
			}
		}
	});
}

function ajaxAnswer(){

}

/**
 * 根据html内容,截取回答数据
 * @param $this
 * @param quizId
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
		var userMap = {user:'用户',code:'zhihu_people_about_url'};
		if(answerMap.ucode){
			userMap.uid = answerMap.ucode;
			CZList.save(function(){
				logger.info('保存回答问题的人id到list表一次:');
			},userMap);
		}
	},answerMap);
}

controller.index = index;
controller.main = main;
controller.openQuizUrl = openQuizUrl;
module.exports = controller;
