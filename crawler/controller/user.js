/**
 * Created by public on 2016/6/14.
 */

var moment = require('moment');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var qs = require('querystring');
var logger = require('../../utils/log4js.js').logger;
var cookies = require('../../utils/zhihu.js');
var CZList = require('../servlet/CZList.js');
var servlet={};

var CZUser = require('../servlet/CZUser.js');
var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;

/**
 * 传入用户的个人中心详细页面url,截取内容并且保存到数据库中
 * @param uri
 */
function peopleInfo(uri){
	superagent.get(uri).set(cookies).end(function(err,result){
		if(err){
			logger.error(err);
			return false;
		}
		try{
			logger.info('用户个人中心地址'+uri);
			logger.info('result.body'+result.body);
			logger.info('result.status'+result.status);
			logger.info('result.body.message'+result.body.message);
			var cZUser = {};
			var $ = cheerio.load(result.text);
//		logger.info(result.text);
			logger.info('获取用户信息页面成功');
			var rule = /data-name=\"current_people\">(\S*)<\/script/;
			var uid = JSON.parse(regexStr(result.text,rule));
//		console.log(uid);
//		console.log(uid[3]);
			cZUser.uid = uid[3];
			cZUser.ucode = uid[1];
			cZUser.href = uri;
			cZUser.name = $('.title-section.ellipsis a').text();
			cZUser.avatar = $('.zm-profile-header-main .body img').attr('src');
			cZUser.brief = $('.title-section.ellipsis span').text();
			var describe = $('.zm-profile-header-main .body  .info-wrap .description span').html();
			if(describe) cZUser.describe = describe;
			if($('.gender .icon-profile-female').length==1){
				cZUser.sex = '女';
			}else if($('.gender .icon-profile-male').length==1){
				cZUser.sex = '男';
			}else{
				cZUser.sex = '未知';
			}
			var followees = $('.zu-main-sidebar .zm-profile-side-following .item:nth-child(1)').children('strong').text();
			cZUser.followees = followees;
			var followers = $('.zu-main-sidebar .zm-profile-side-following .item:nth-child(2)').children('strong').text();
			cZUser.followers = followers;
			var columns = $('.zm-profile-side-columns').prev('.zm-profile-side-section-title').children('a').children('strong').html();
			if(columns){ cZUser.columns = columns; }
			var topics = $('.zm-profile-side-topics').prev('.zm-profile-side-section-title').children('a').children('strong').html();
			if(topics){ cZUser.topics = topics; }
			cZUser.agree = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(3)').children('strong').text();
			cZUser.thanks = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(5)').children('strong').text();
			cZUser.asks = $('.profile-navbar a:nth-child(2) .num').text();
			cZUser.answers = $('.profile-navbar a:nth-child(3) .num').text();
			cZUser.posts = $('.profile-navbar a:nth-child(4) .num').text();
			cZUser.view = $('div.zg-wrap.zu-main.clearfix > div.zu-main-sidebar .zm-profile-side-section span.zg-gray-normal strong').text();
			var weibo = $('.weibo-wrap a').attr('href');
			if(weibo) cZUser.weibo = weibo;
			cZUser.location = $('div.zu-main-content > div > div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div > div:nth-child(1) > span.info-wrap > span.location.item a').text();
			cZUser.business = $('div.zu-main-content > div > div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div > div:nth-child(1) > span.info-wrap > span.business.item > a').text();
			cZUser.employment = $('div.zu-main-content > div > div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div.items > div:nth-child(2) > span.info-wrap > span.employment.item').text();
			cZUser.positions = $('div.zm-profile-header.ProfileCard > div.zm-profile-header-main > div.body.clearfix > div > div > div.items > div:nth-child(2) > span.info-wrap > span.position.item > a').text();
			var education = $('body > div.zg-wrap.zu-main.clearfix > div.zu-main-content > div > div.ProfileCard.zm-profile-details-wrap > div.zm-profile-section-list.zm-profile-details > div:nth-child(4) > div > div').html();
			if(education) cZUser.education = education;
			cZUser.educationExtra = $('body > div.zg-wrap.zu-main.clearfix > div.zu-main-content > div > div.ProfileCard.zm-profile-details-wrap > div.zm-profile-section-list.zm-profile-details > div:nth-child(4) > div > div > div > div ').children().eq(2).text();
			cZUser.collect = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(7)').children('strong').text();
			cZUser.share = $('.zm-profile-details-reputation .zm-profile-module-desc span:nth-child(9)').children('strong').text();
			var marked = $('.zm-profile-header-marked .zg-link-litblue-normal').text();
			cZUser.marked = marked;
			CZUser.save(function(re){
				//logger.info(re);
			},cZUser);
		}catch(e){
			logger.error(e);
		}
	});
}
//["\u8d3a\u5e08\u4fca","he-shi-jun","https:\/\/pic1.zhimg.com\/da8e974dc_s.jpg","3ec3b166992a5a90a1083945d2490d38"]

//resexStr(sre,new RegExp(str));
function regexStr(str,rule){
	var subStr=str.match(rule);
	if(subStr){
		return subStr[1];
	}else{
		return '';
	}
}

//
function testRE(){
	var str='<script type="text/json" class="json-inline" data-name="current_people">["\u8d3a\u5e08\u4fca","he-shi-jun","https:\/\/pic1.zhimg.com\/da8e974dc_s.jpg","3ec3b166992a5a90a1083945d2490d38"]</script>';
	var aa = /script(\s*)type=\"text\/json\"(\s*)class=\"json-inline\"(\s*)data-name=\"current_people\">(\S*)<\/script/g;
	str = regexStr(str,aa);
	if(str){
		console.log(str);
	}else{
		console.log('报错');
	}
}

//var configMap = require('../../common/servlet/_systemConfig.js').getConfigMap;

function sconfigMap(){
	//console.dir(_systemConfig);
	CZUser.CZUser.findOne({
		where : {
			ucode : 'aaacha-er-si-hai-han'
		}
	}).then(function(userFindOne){
		if(!userFindOne){
			console.log('阿萨德撒就当减肥has京东方');
		}
		if(userFindOne=='null'){
			console.log('1321654654123156341');
		}
		if(userFindOne==null){
			console.log('asdasdasdsadsa');
		}
		console.dir(userFindOne);
		console.log(userFindOne);
	});
//	var map = _systemConfig.configMap;
//	console.log(map['zhihu_question_url']);
}

module.exports.configMap = sconfigMap;
module.exports.peopleInfo = peopleInfo;
module.exports.testRE = testRE;
module.exports.CZUser = CZUser;
