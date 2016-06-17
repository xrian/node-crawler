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
var entities = new Entities();    //�����������Ķ���
var controller={};

var CZUser = require('../servlet/CZUser.js');
var CZQuiz = require('../servlet/CZQuiz.js');
var CZQuizTags = require('../servlet/CZQuizTags.js');
var CZAnswer = require('../servlet/CZAnswer.js');
var CZList = require('../servlet/CZList.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;
var userController = require('./user.js');

var quizArray = new Array();
var peopleArray = new Array();

/**
 * ������
 * @param req
 * @param res
 * @param next
 */
function main(req,res,next){
	var configMap = _systemConfig.configMap;
	//��ѯCZList��ȫ��δɾ��������id,����������
	CZList.CZList.findAll({
		where :{
			code : 'zhihu_quiz_url'
		}
	}).then(function(result){
		for(var i = 0;i<result.length;i++){
			quizArray.push(result[i].uid);
		}
		logger.info('����id:'+quizArray);
		//ѭ������,ִ��ͬһ����
		async.eachSeries(quizArray,function(item,callback){
			setTimeout(function(){
				index(item);
				CZList.del(function(){
					logger.info('ɾ��list������id�ɹ�');
				},{
					where : { uid : item }
				});
				callback(null);
			},configMap['zhihu_get_time'] + 0);
		},function(err){
			logger.info('oops,������!!!'+err);
			getPeopleInfo();
		});
	});
}

/**
 * �ص�������������( ��ա�)
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
		logger.info('��������id:'+peopleArray);
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
							logger.info('ɾ��list���û�id�ɹ�');
						},{
							where : { uid : item }
						});
						callback(null);
					}else{
						logger.warn('����peopleArray�������������,��ѯc_z_user�Ƿ���ڸ��û�,�û��Ѵ���:' + userFindOne.id);
						callback(null);
					}
				}).catch(function(err){
					logger.error('����peopleArray�������������,��ѯc_z_user�Ƿ���ڸ��û�,��ѯ����:' + err);
				});
			},configMap['zhihu_get_time'] + 0);
		},function(err){
			logger.error('oops,������!!!'+err);
			main();
		});
	});
}

function index(quizId){
	var configMap = _systemConfig.configMap;
	var uri = configMap['zhihu_quiz_url'] + '';
	uri = uri.replace('@id',quizId);
	logger.info('��ȡ��url:'+uri);
	superagent.get(uri).set(cookies).end(function(err,result){
		if(err) logger.error(err);
		var $ = cheerio.load(result.text);
		//���������ǩ��c_z_quie_tags����
		$('.zm-tag-editor.zg-section>div>a').each(function(item){
			var map = {};
			map.quizId = quizId;
			map.name = $(this).text();
			map.fid = $(this).attr('href').substring(7);
			map.href = $(this).attr('href');
			CZQuizTags.save(function(){
				logger.info('����quiz_tags')
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
				logger.info('���������ɹ�:'+result.id);
			}catch(e){
				logger.error('�������,�����');
			}
		},map);
//		console.log('δִ��?');
//		console.log($('#zh-question-answer-wrap > div').html());
//		logger.info(result.text);
		$('#zh-question-answer-wrap > div').each(function(item){
//			console.log('����ѭ������');
			var answerMap = {};
			answerMap.quizId = quizId;
			answerMap.aid = $(this).attr('data-aid');
			answerMap.href = $(this).children('link[itemprop=url]').attr('href');
			answerMap.tokenUrl = $(this).children('a.zg-anchor-hidden').attr('name');
			answerMap.token = $(this).attr('data-atoken');
//			console.log($(this).children('div.zm-item-answer-author-info').text());
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
				logger.info('����ش��ɹ�');
			},answerMap);
			var userMap = {user:'�û�',code:'zhihu_people_about_url'};
			if(answerMap.ucode){
				userMap.uid = answerMap.ucode;
				CZList.save(function(){
					logger.info('����ش��������id��list��һ��:');
				},userMap);
			}
			//console.log('ѭ��һ��');
		});

	});
}

controller.index = index;
controller.main = main;
module.exports = controller;
