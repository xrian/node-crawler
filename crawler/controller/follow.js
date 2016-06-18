/**
 * Created by public on 2016/6/18.
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
var quizFollowersCode = 'zhihu_quiz_followers_next_url';

var CZUser = require('../servlet/CZUser.js');
var CZQuizFollow = require('../servlet/CZQuizFollow.js');
var CZQuiz = require('../servlet/CZQuiz.js');
var CZQuizTags = require('../servlet/CZQuizTags.js');
var CZAnswer = require('../servlet/CZAnswer.js');
var CZList = require('../servlet/CZList.js');
var CZError = require('../servlet/CZError.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;


function quizFollowNext(map,quizId){
	var peopleArray = new Array();
	var configMap = _systemConfig.configMap;
	var uri = configMap[quizFollowersCode] + '';
	uri = uri.replace('@id', quizId);
	map._xsrf = configMap['_xsrf'];
	superagent.post(uri)
		.set(cookies)
		.send(qs.stringify(map))
		.end(function(err,result){
			console.log('集合数据是什么'+JSON.stringify(map));
			var status = result.status + '';
			if(err){
				logger.error('获取回答下一页内容报错:'+err);
				logger.error('返回状态码status:' + status + 'map内容:'+map.toString());
				return false;
			}
			if(status.indexOf('4') === 0||status.indexOf('5') === 0){
				logger.error('获取回答下一页内容map:' + map.toString() + ' 返回状态码:' + result.status);
				logger.error('result.body.message:' + result.body.message);
			}else{
				//截取到返回的东西
				try{
					var jsonObj = JSON.parse(result.text);
					var array = jsonObj.msg;
					var num = array[0];
					if(num>0){
						var $ = cheerio.load(array[1]);
						$('.zm-profile-card.zm-profile-section-item').each(function(item, element){
							var map = {_this : $(this),quizId : quizId};
							peopleArray.push(map)
						});
						async.eachLimit(peopleArray, 3, function(item,callback){
							saveFollow(callback,item);
						},function(err){
							console.log('err++++++++++' + err);
							if(err){
								logger.error('获取问题关注用户列表,截取用户信息保存出错:' + err);
							}
							if(err=='undefined'||!err){
								map.offset = map.offset + num;
								console.log('下一轮截取' + err);
								quizFollowNext(map,quizId);
							}
						});
					}else{
						logger.info('该问题关注用户抓取完毕:'+quizId);
						return false;
					}
				}catch(e){
					logger.error('问题' + quizId + '抓取数据,try-catch出错:'+ e);
				}
			}
		});
}

function saveFollow(callback,map){
	var name = map._this.children('.zm-list-content-medium').children('h2').children('a').text();
	var code = map._this.children('.zm-list-content-medium').children('h2').children('a').attr('data-tip');
	if(code){
		code = (code+'').substring(4);
		CZQuizFollow.queryByUid(function(result,callback){
			console.log('这里是什么类型?'+typeof callback);
			if(!result){
				CZQuizFollow.save(function(result){
					CZList.save(function(){},{
						uid : result.uid,
						code : 'zhihu_people_about_url'
					});
				},{
					quizId : map.quizId,
					name : name,
					uid : code
				});
				callback(null);
			}else{
				callback('查询到以前的记录了');
			}
		},{
			quizId : map.quizId,
			uid : code
		},callback);
	}else{
		callback(null);
	}
}

controller.quizFollowNext = quizFollowNext;
module.exports = controller;
