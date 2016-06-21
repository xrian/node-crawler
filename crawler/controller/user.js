/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var async = require('async');
var qs = require('querystring');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();    //解决中文乱码的对象
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
var cookies = require('../../utils/zhihu.js');
var servlet={};

var CZUser = require('../servlet/CZUser.js');
var CZError = require('../servlet/CZError.js');
var CZList = require('../servlet/CZList.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;
var aboutCode = 'zhihu_people_about_url';

/**
 * 回调金字塔的威力( ｀д′)
 * 查询list表中符合条件的数据放入数组中,循环处理
 */
function getPeopleInfo(){
	var configMap = _systemConfig.configMap;
	CZList.queryAllByCode(function(peopleList){
		var peopleArray = new Array();
		for(var i = 0;i<peopleList.length;i++){
			peopleArray.push(peopleList[i].uid);
		}
		logger.info('个人中心id:'+peopleArray);
		async.eachSeries(peopleArray,function(item,callback){
			setTimeout(function() {
				CZUser.queryByCode(function (userFindOne) {
					if (!userFindOne) {
						peopleInfo(item, callback);
					} else {
						logger.warn('该用户已存在,删除list表内容:' + item);
						CZList.delByCode(callback, item, aboutCode);
					}
				}, item);
			},configMap['zhihu_get_time'] + 0);
		},function(err){
			logger.error('oops,出错了!!!'+err);
//			main();
		});
	},aboutCode);
}

/**
 * 传入用户的个人中心详细页面url,截取内容并且保存到数据库中
 * @param uri
 */
function peopleInfo(userCode,callback){
	var configMap = _systemConfig.configMap;
	var uri = configMap[aboutCode] + '';
	uri = uri.replace('@id',userCode);
	superagent.get(uri).set(cookies).end(function(err,result){
		var stateus = result.status+'';
		if(err){
			logger.error('superagent抓取知乎用户详细信息出错:' + err);
			logger.error('url:' + uri + '  返回状态码:' + stateus);
			callback(null);
			return false;
		}
		if(stateus.indexOf('4') === 0||stateus.indexOf('5') === 0){
			logger.error('地址uri:' + uri + '  返回状态码:' + result.status);
			logger.error('result.body.message:' + result.body.message);
			callback(null);
		}else {
			//防止出现意外,导致服务停止,try-catch处理
			try {
				logger.info('用户个人中心地址' + uri);
				var cZUser = crawlerPeopleAbout(result,uri);
				CZUser.save(function (re) {
					//爬取字符串完成后,删除list表的数据,防止重复爬取
					CZList.delByCode(callback,userCode,aboutCode);
				}, cZUser);
			} catch (e) {
				logger.error('出错的html:'+result.text);
				console.dir(e);
				console.error('错误'+e);
				CZError.save(function(){},{
					type : '错误',
					filname : __filename,
					uid : uri,
					maybe : '获取用户详细页面内容出错,截取数据try-catch出错',
					msg : e+''
				});
				callback(null);
			}
		}
	});
}

/**
 * 传入superagent抓取成功后的返回值
 * 返回存有相应数据的map
 * @param result  superagent返回值
 * @param uri     抓取的页面
 * @returns {{}}
 */
var crawlerPeopleAbout = function(result,uri){
	var cZUser = {};
	var $ = cheerio.load(result.text);
	var rule = /data-name=\"current_people\">(\S*)<\/script/;
	var uid = JSON.parse(regexStr(result.text, rule));
	cZUser.uid = uid[3];
	cZUser.ucode = uid[1];
	cZUser.href = uri;
	cZUser.name = $('.title-section.ellipsis a').text();
	cZUser.avatar = $('.zm-profile-header-main .body img').attr('src');
	cZUser.brief = $('.title-section.ellipsis span').text();
	var describe = $('.zm-profile-header-main .body  .info-wrap .description span').html();
	if (describe && describe.length>0) cZUser.describe = entities.decode(describe);
	if ($('.gender .icon-profile-female').length == 1) {
		cZUser.sex = '女';
	} else if ($('.gender .icon-profile-male').length == 1) {
		cZUser.sex = '男';
	} else {
		cZUser.sex = '未知';
	}
	var followees = $('.zu-main-sidebar .zm-profile-side-following .item:nth-child(1)').children('strong').text();
	cZUser.followees = followees;
	var followers = $('.zu-main-sidebar .zm-profile-side-following .item:nth-child(2)').children('strong').text();
	cZUser.followers = followers;
	var columns = $('.zm-profile-side-columns').prev('.zm-profile-side-section-title').children('a').children('strong').html();
	if (columns) {
		cZUser.columns = columns;
	}
	var topics = $('.zm-profile-side-topics').prev('.zm-profile-side-section-title').children('a').children('strong').html();
	if (topics) {
		cZUser.topics = (topics+'').replace(/[^0-9]+/ig,"");
	}
	cZUser.agree = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(3)').children('strong').text();
	cZUser.thanks = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(5)').children('strong').text();
	cZUser.asks = $('.profile-navbar a:nth-child(2) .num').text();
	cZUser.answers = $('.profile-navbar a:nth-child(3) .num').text();
	cZUser.posts = $('.profile-navbar a:nth-child(4) .num').text();
	cZUser.view = $('div.zg-wrap.zu-main.clearfix > div.zu-main-sidebar .zm-profile-side-section span.zg-gray-normal strong').text();
	var weibo = $('.weibo-wrap a').attr('href');
	if (weibo) cZUser.weibo = weibo;
	cZUser.location = $('div.zu-main-content > div > div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div > div:nth-child(1) > span.info-wrap > span.location.item a').text();
	cZUser.business = $('div.zu-main-content > div > div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div > div:nth-child(1) > span.info-wrap > span.business.item > a').text();
	cZUser.employment = $('div.zu-main-content > div > div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div.items > div:nth-child(2) > span.info-wrap > span.employment.item').text();
	cZUser.positions = $('div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div.items > div:nth-child(2) > span.info-wrap > span.position.item > a').text();
	var education = $('body > div.zg-wrap.zu-main.clearfix > div.zu-main-content > div > div.ProfileCard.zm-profile-details-wrap > div.zm-profile-section-list.zm-profile-details > div:nth-child(4) > div > div').html();
	if (education) cZUser.education = education;
	cZUser.educationExtra = $('body > div.zg-wrap.zu-main.clearfix > div.zu-main-content > div > div.ProfileCard.zm-profile-details-wrap > div.zm-profile-section-list.zm-profile-details > div:nth-child(4) > div > div > div > div ').children().eq(2).text();
	cZUser.collect = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(7)').children('strong').text().replace(/[^0-9]+/ig,"");
	cZUser.share = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(9)').children('strong').text();
	var marked = $('.zm-profile-header-marked .zg-link-litblue-normal').text();
	cZUser.marked = marked;
	return cZUser;
}

/**
 * 正则截取数据
 * @param str   待截取的字符串
 * @param rule  正则表达式
 * @returns {*} 如果成功,则返回字符串,如果失败则为''
 */
function regexStr(str,rule){
	var subStr=str.match(rule);
	try{
		if(subStr){
			return subStr[1];
		}else{
			return '';
		}
	}catch(e){
		logger.info('字符串:' + str + ' 正则' + rule + '正则截取报错:' + e);
		return '';
	}
}



module.exports.peopleInfo = peopleInfo;
module.exports.getPeopleInfo = getPeopleInfo;