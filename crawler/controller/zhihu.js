/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var moment = require('moment');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url=require('url');
var qs=require('querystring');
var router = express.Router();
var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);

var cookies = require('../../utils/zhihu.js');
var zhihulogin = require('./login.js');

var uri = 'https://cnodejs.org';

var controller={};

var zhihuUri = 'https://www.zhihu.com';

controller.login=function(req,res,next){
	console.log('开始爬取知乎');
	superagent.get(uri).end(function(err,result){
		// 如果报错，进入错误方法
		if(err){
			return next(err);
		}

		var $ = cheerio.load(result.text);
		$('.cell .topic_title').each(function(item){
			console.log('!!!'+$(this).attr('title'));
			var uri2 = uri + $(this).attr('href');
			superagent.get(uri2).end(function(err,result2){
				var $ = cheerio.load(result2.text);
				console.log('获取的第'+item+'个帖子内容'+$('.topic .markdown-text p').text());
			});
		});
		res.send('post登录博客账号');
	});
}


controller.index = function(req,res,next){

	superagent.post("https://www.zhihu.com/node/TopicsPlazzaListV2")
		.set(cookies)
		.send("method=next&params=%7B%22topic_id%22%3A253%2C%22offset%22%3A40%2C%22hash_id%22%3A%225fbd865a449252165a9ea53143041327%22%7D&_xsrf=9078810dcc168a405e05e09f9f429b0c")
		.end(function(err,result){
			if(err){
				return next(err);
			}
			console.log('访问状态码：'+result.status);
			console.log(result.text);

			//superagent.get(zhihuUri+'/people/zhang-song-99-38').end(function(err,result2){
			//	console.log(result2.text);
			//});
		});
	res.send('hha');
};

var cZType = require('../models/index.js').CZType;
var cZTags = require('../models/index.js').CZTags;
var _systemConfig = require('../../common/models/index.js')._systemConfig;

controller.type = function(req,res,next){
	var typeUrl;
	_systemConfig.findOne({
		attributes : ['val'],
		where : {
			code : 'zhihu_type_url'
		}
	}).then(function(res){
		typeUrl = res;
		superagent.get(typeUrl.val).set(cookies)
			.end(function(err,result){
				if(err) return next(err);
				var $ = cheerio.load(result.text);
				//获取到标签的内容和id
				$('.zu-main-content .zm-topic-cat-main>li').each(function(item,element){
					var uid = $(this).attr('data-id');
					var uhref = $(this).children('a').attr('href');
					var utext = $(this).children('a').text();
					cZType.findOne({
						attributes : ['id','name','uid'],
						where : {
							uid : uid
						},
						order : 'created_at desc'
					}).then(function(result){
						if(result != null){
							if(utext !== result.name){
								saveCZType(cZType,uid,utext,uhref);
							}
						}else{
							saveCZType(cZType,uid,utext,uhref);
						}
					});
				});
		});
	});

	//superagent.post("https://www.zhihu.com/node/TopicsPlazzaListV2")
	//	.set(cookies)
	//	.send("method=next&params=%7B%22topic_id%22%3A253%2C%22offset%22%3A40%2C%22hash_id%22%3A%225fbd865a449252165a9ea53143041327%22%7D&_xsrf=9078810dcc168a405e05e09f9f429b0c")
	//	.end(function(err,result){
	//		if(err){
	//			next(err);
	//		}
	//		console.log('访问状态码：'+result.status);
	//		console.log(result.text);
	//	});
	res.send('hha');
};

controller.tags = function(req,res,next){
	//设置查询参数
	var params = {
		"topic_id":253,
		"offset":20,
		"hash_id":"5fbd865a449252165a9ea53143041327"
	};
	//查询到网站域名,应该去数据库取
	var tagsUrl = url.resolve(zhihuUri,'/node/TopicsPlazzaListV2');
	console.log(tagsUrl);
	//循环取出数据库已存储的类别,爬取知乎该类别下全部的标签
	cZType.findAll({
		attributes : ['id','name','uid']
	}).then(function(result){
//		for(var i=0;i<result.length;i++){
		var typeModel = result[0];
			params.topic_id=typeModel.uid;
			params.offset=0;
			//爬取数据
			paqu(tagsUrl,params,typeModel);
//		}
		res.send('hhhhhhh');
	});
};

controller.test = function(req,res,next){
	//测试urlencode编码
/*	var params = {
		"topic_id":253,
		"offset":20,
		"hash_id":"5fbd865a449252165a9ea53143041327"
	};
	console.log(qs.stringify({method:'next',params:JSON.stringify(params),_xsrf:'82b8a9c627d535791eeca538bf498227'}));
	console.log(JSON.stringify(params));
	console.log(encodeURI("http://www.w3school.com.cn/My first/"));*/

	//测试解析json数据
	var aa={"r":0,	"msg": ["<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19633026\">\n<img src=\"https:\/\/pic3.zhimg.com\/c27611a1daf49fa062c9eabfb990ad36_xs.jpg\" alt=\"\u4e16\u754c\u7535\u5b50\u7ade\u6280\u5927\u8d5b (WCG)\">\n<strong>\u4e16\u754c\u7535\u5b50\u7ade\u6280\u5927\u8d5b (WCG)<\/strong>\n<\/a>\n<p>\u4e16\u754c\u7535\u5b50\u7ade\u6280\u5927\u8d5b\uff08World Cyber Games\uff0cWCG\uff09\u2026<\/p>\n\n<a id=\"t::-27710\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19825391\">\n<img src=\"https:\/\/pic2.zhimg.com\/c5c3b3c6a783ff2e548c174560b15dc5_xs.png\" alt=\"\u7089\u77f3\u4f20\u8bf4\uff08Hearthstone\uff09\">\n<strong>\u7089\u77f3\u4f20\u8bf4\uff08Hearthstone\uff09<\/strong>\n<\/a>\n<p>\u300a\u7089\u77f3\u4f20\u8bf4\uff1a\u9b54\u517d\u82f1\u96c4\u4f20\u300b\uff08\u82f1\u8bed\uff1aHearthstone: He\u2026<\/p>\n\n<a id=\"t::-93852\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19575365\">\n<img src=\"https:\/\/pic1.zhimg.com\/be5661094_xs.jpg\" alt=\"\u89d2\u8272\u626e\u6f14\u6e38\u620f\uff08RPG\uff09\">\n<strong>\u89d2\u8272\u626e\u6f14\u6e38\u620f\uff08RPG\uff09<\/strong>\n<\/a>\n<p>\u89d2\u8272\u626e\u6f14\u6e38\u620f\uff08RPG\uff09\u662f\u4e00\u79cd\u6e38\u620f\u7c7b\u578b\uff0c\u5728\u6e38\u620f\u4e2d\uff0c\u73a9\u5bb6\u626e\u6f14\u865a\u62df\u4e16\u2026<\/p>\n\n<a id=\"t::-8391\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19606664\">\n<img src=\"https:\/\/pic3.zhimg.com\/0ceaa4ebcd13fb8e573dd4d71c1b5a3a_xs.jpg\" alt=\"iOS \u6e38\u620f\u5f00\u53d1\">\n<strong>iOS \u6e38\u620f\u5f00\u53d1<\/strong>\n<\/a>\n<p>iOS \u6e38\u620f\u5f00\u53d1\uff0c\u662f\u673a\u9047\u4e5f\u662f\u6311\u6218<\/p>\n\n<a id=\"t::-18861\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19797703\">\n<img src=\"https:\/\/pic3.zhimg.com\/258c33786_xs.jpg\" alt=\"Clash of Clans\">\n<strong>Clash of Clans<\/strong>\n<\/a>\n<p>Clash of Clans \u662f\u4e00\u4e2a iOS \u4e0e Androi\u2026<\/p>\n\n<a id=\"t::-82933\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19570973\">\n<img src=\"https:\/\/pic3.zhimg.com\/c42d63c36_xs.jpg\" alt=\"\u5fb7\u5dde\u6251\u514b\">\n<strong>\u5fb7\u5dde\u6251\u514b<\/strong>\n<\/a>\n<p>\u5fb7\u514b\u8428\u65af\u6251\u514b\u5168\u79f0\u4e3aTexas Hold\u2019em\uff0c\u4e2d\u6587\u7b80\u79f0\u4e3a\u5fb7\u5dde\u6251\u2026<\/p>\n\n<a id=\"t::-6925\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19575364\">\n<img src=\"https:\/\/pic1.zhimg.com\/c81468cd4c955783c895b0bcbdfc1770_xs.jpg\" alt=\"\u9b54\u517d\u4e89\u9738\uff1a\u4eba\u7c7b\u4e0e\u517d\u4eba\">\n<strong>\u9b54\u517d\u4e89\u9738\uff1a\u4eba\u7c7b\u4e0e\u517d\u4eba<\/strong>\n<\/a>\n<p>\u300a\u9b54\u517d\u4e89\u9738\uff1a\u4eba\u7c7b\u4e0e\u517d\u4eba\u300b\u662f\u4e00\u6b3e\u66b4\u96ea\u5a31\u4e50\u516c\u53f8\u5f00\u53d1\u5e76\u53d1\u884c\u7684\u5373\u65f6\u6218\u7565\u2026<\/p>\n\n<a id=\"t::-8390\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19598367\">\n<img src=\"https:\/\/pic1.zhimg.com\/49df43ff4_xs.jpg\" alt=\"Minecraft\">\n<strong>Minecraft<\/strong>\n<\/a>\n<p>\u300aMinecraft\u300b\u662f\u4e00\u6b3e\u6765\u81ea\u745e\u5178\u7684\u6c99\u76d2\u5efa\u9020\u72ec\u7acb\u6e38\u620f\uff0c\u73a9\u5bb6\u53ef\u2026<\/p>\n\n<a id=\"t::-16053\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19551202\">\n<img src=\"https:\/\/pic2.zhimg.com\/486317de65d82aa84dceb301bc245745_xs.jpg\" alt=\"\u5728\u7ebf\u793e\u4ea4\u6e38\u620f\">\n<strong>\u5728\u7ebf\u793e\u4ea4\u6e38\u620f<\/strong>\n<\/a>\n<p>\u793e\u4ea4\u6e38\u620f\uff08Social game\uff09 \u53c8\u540d\u63d2\u4ef6\u6e38\u620f\uff0c\u82f1\u6587\u5168\u79f0\u4e3a \u2026<\/p>\n\n<a id=\"t::-324\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19584076\">\n<img src=\"https:\/\/pic1.zhimg.com\/7db73b3d9320a45a2cb2d70825a3c1c4_xs.jpg\" alt=\"\u56fd\u9645\u8c61\u68cb\">\n<strong>\u56fd\u9645\u8c61\u68cb<\/strong>\n<\/a>\n<p>\u56ef\u9645\u8c61\u68cb\uff0c\u53c8\u79f0\u6b27\u6d32\u8c61\u68cb\u6216\u897f\u6d0b\u68cb\uff0c\u662f\u4e00\u79cd\u4e8c\u4eba\u5bf9\u5f08\u7684\u6218\u7565\u68cb\u76d8\u6e38\u620f\u3002\u2026<\/p>\n\n<a id=\"t::-11263\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19551632\">\n<img src=\"https:\/\/pic3.zhimg.com\/895e848716aad5f32f7acb85e9734d5a_xs.jpg\" alt=\"iPad \u6e38\u620f\">\n<strong>iPad \u6e38\u620f<\/strong>\n<\/a>\n<p><\/p>\n\n<a id=\"t::-474\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19598161\">\n<img src=\"https:\/\/pic2.zhimg.com\/c65016f4d_xs.jpg\" alt=\"\u4ed9\u5251\u5947\u4fa0\u4f20\uff08\u6e38\u620f\uff09\">\n<strong>\u4ed9\u5251\u5947\u4fa0\u4f20\uff08\u6e38\u620f\uff09<\/strong>\n<\/a>\n<p>\u300a\u4ed9\u5251\u5947\u4fa0\u4f20\u300b\u7cfb\u5217\u662f\u7531\u4e2d\u56fd\u53f0\u6e7e\u5927\u5b87\u8d44\u8baf\u80a1\u4efd\u6709\u9650\u516c\u53f8\u5236\u4f5c\u53d1\u884c\u7684\u4e2d\u2026<\/p>\n\n<a id=\"t::-15984\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19632626\">\n<img src=\"https:\/\/pic2.zhimg.com\/2f2a296ef17973de62ac64320ac58bd1_xs.jpg\" alt=\"\u6697\u9ed1\u7834\u574f\u795e 3\">\n<strong>\u6697\u9ed1\u7834\u574f\u795e 3<\/strong>\n<\/a>\n<p>\u300a\u6697\u9ed1\u7834\u574f\u795e 3\uff08Diablo \u2162\uff09\u300b\u662f\u52a8\u4f5c\u89d2\u8272\u626e\u6f14\u6e38\u620f\u300a\u6697\u9ed1\u2026<\/p>\n\n<a id=\"t::-27564\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19573896\">\n<img src=\"https:\/\/pic2.zhimg.com\/f4a933e01_xs.jpg\" alt=\"\u661f\u9645\u4e89\u9738 2\">\n<strong>\u661f\u9645\u4e89\u9738 2<\/strong>\n<\/a>\n<p>\u300a\u661f\u9645\u4e89\u9738 II\uff08StarCraft II\uff09\u300b\u662f\u66b4\u96ea\u51fa\u54c1\u7684\u4e00\u6b3e\u2026<\/p>\n\n<a id=\"t::-7900\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19552393\">\n<img src=\"https:\/\/pic3.zhimg.com\/c878e4bb99c7cbf918963db05fbf243e_xs.jpg\" alt=\"\u4efb\u5929\u5802 (Nintendo)\">\n<strong>\u4efb\u5929\u5802 (Nintendo)<\/strong>\n<\/a>\n<p>\u4efb\u5929\u5802 (Nintendo) \u662f\u5386\u53f2\u4e0a\u6700\u957f\u5bff\u7684\u7535\u89c6\u6e38\u620f\u5e73\u53f0\u516c\u53f8\u2026<\/p>\n\n<a id=\"t::-729\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19555407\">\n<img src=\"https:\/\/pic1.zhimg.com\/a78f49b9ac4cd236272a6d13e6cf460c_xs.jpg\" alt=\"\u684c\u9762\u6e38\u620f\">\n<strong>\u684c\u9762\u6e38\u620f<\/strong>\n<\/a>\n<p>\u684c\u4e0a\u6e38\u620f\uff08\u82f1\u8bed\uff1aTabletop game\u6216Table gam\u2026<\/p>\n\n<a id=\"t::-1725\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19555035\">\n<img src=\"https:\/\/pic4.zhimg.com\/a76ed0583_xs.jpg\" alt=\"\u9b54\u517d\u4e89\u9738 3\">\n<strong>\u9b54\u517d\u4e89\u9738 3<\/strong>\n<\/a>\n<p>\u9b54\u517d\u4e89\u9738 3 \u662f\u4e00\u6b3e\u5373\u65f6\u6218\u7565\u6e38\u620f\uff0c\u66b4\u96ea\u516c\u53f8\u51fa\u54c1\u7684\u300a\u9b54\u517d\u4e89\u9738\u300b\u7cfb\u2026<\/p>\n\n<a id=\"t::-1609\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19555550\">\n<img src=\"https:\/\/pic3.zhimg.com\/ecbb1b718aaea4fa489ed4460c85ad12_xs.jpg\" alt=\"\u72ec\u7acb\u5f00\u53d1\u8005\">\n<strong>\u72ec\u7acb\u5f00\u53d1\u8005<\/strong>\n<\/a>\n<p><\/p>\n\n<a id=\"t::-1772\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19554188\">\n<img src=\"https:\/\/pic1.zhimg.com\/f1ba4d1438b42150a08798c6572db35c_xs.jpg\" alt=\"\u6e38\u620f\u516c\u53f8\">\n<strong>\u6e38\u620f\u516c\u53f8<\/strong>\n<\/a>\n<p><\/p>\n\n<a id=\"t::-1324\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>","<div class=\"item\"><div class=\"blk\">\n<a target=\"_blank\" href=\"\/topic\/19561656\">\n<img src=\"https:\/\/pic1.zhimg.com\/e24448c4eb7d781238ddf835b92be7d4_xs.jpg\" alt=\"\u6e38\u620f\u8bbe\u8ba1\u5e08\">\n<strong>\u6e38\u620f\u8bbe\u8ba1\u5e08<\/strong>\n<\/a>\n<p><\/p>\n\n<a id=\"t::-3815\" href=\"javascript:;\" class=\"follow meta-item zg-follow\"><i class=\"z-icon-follow\"><\/i>\u5173\u6ce8<\/a>\n\n<\/div><\/div>"]};
	var array = aa.msg;
//	console.dir(array);
	for(var i=0;i<array.length;i++){
		console.log(array[i]);
		var $ = cheerio.load(array[i]);
		var chref = $('a[target=_blank]').attr('href');
		var cpic = $('.item img').attr('src');
		var title = $('.item strong').attr('src');
		var jianjie = $('.item p').attr('src');
		var ccc=/topic\/(\S*)"/;
		var urlid = regexStr(array[i],ccc);
		ccc=/t::-(\S*)"/;
		var fid = regexStr(array[i],ccc);
	}
//	console.log(array);
//	var ccccccc=/id(\S*)ff/;
//	regexStr("iid0000ffr",ccccccc);
		res.send('hhhhhhh');
};

module.exports = controller;

function paqu(tagsUrl,params,typeModel){
	superagent.post(tagsUrl).set(cookies)
		.send(qs.stringify({method:'next',params:JSON.stringify(params),_xsrf:'82b8a9c627d535791eeca538bf498227'}))
		.end(function(err,result){
			if(err) return next(err);
			var jsonObj = JSON.parse(result.text);
			if(jsonObj.msg!=null && jsonObj.msg != ''){
				var array = jsonObj.msg;
				for(var j=0;j<array.length;j++) {
					chooic(array,j, typeModel);
				}
				params.offset=params.offset+20;
				paqu(tagsUrl,params,typeModel);
			}else{
				return false;
			}
		});
}

function chooic(array,j,typeModel){
		var $ = cheerio.load(array[j]);
		var chref = $('a[target=_blank]').attr('href');
		var cpic = $('.item img').attr('src');
		var title = $('.item strong').text();
		var brief = $('.item p').text();
		var ccc=/topic\/(\S*)"/;
		var uid = regexStr(array[j],ccc);
		ccc=/t::-(\S*)"/;
		var fid = regexStr(array[j],ccc);
	saveCZTags(cZTags,title,uid,fid,zhihuUri+chref,cpic,brief,typeModel.id);
		//cZTags.findOne({
		//	where : {
		//		uid : uid
		//	}
		//}).then(function(result){
		//	if(result != null){
		//		if(title !== result.name){
		//			cZTags.destroy({
		//				where : {
		//					id : result.id
		//				}
		//			});
		//			saveCZTags(cZTags,title,uid,fid,zhihuUri+chref,cpic,brief,typeModel.id,result.id);
		//		}
		//	}else{
		//		saveCZTags(cZTags,title,uid,fid,zhihuUri+chref,cpic,brief,typeModel.id);
		//	}
		//});
}

function saveCZType(cZType,uid,utext,uhref){
	cZType.build({
		'name' : utext,
		'uid' : uid,
		'href' : typeUrl.val+uhref
	}).save().then(function(result){
		//console.log('数据库保存成功');
	});
}

function saveCZTags(cZTags,name,uid,fid,href,pic,brief,typeId,pid){
	cZTags.build({
		'typeId' : typeId,
		'name' : name,
		'uid' : uid,
		'fid' : fid,
		'href' : href,
		'pic' : pic,
		'brief' : brief,
		'pid' : pid
	}).save().then(function(result){
		//console.log('数据库保存成功');
	});
}

function regexStr(str,rule){
	var subStr=str.match(rule);
	return subStr[1];
}

