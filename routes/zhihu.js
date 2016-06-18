/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var router = express.Router();
var zhihuController = require('../crawler/controller/zhihu.js');
var peopleController = require('../crawler/controller/user.js');
var quizController = require('../crawler/controller/quiz.js');

var followController = require('../crawler/controller/follow.js');

router.all('/',function(req,res,next){
	zhihuController.login(req,res,next);
});

router.all('/index',function(req,res,next){
	zhihuController.index(req,res,next);
});

router.all('/type',function(req,res,next){
	zhihuController.type(req,res,next);
});

router.all('/tags',function(req,res,next){
	zhihuController.tags(req,res,next);
});

router.all('/test',function(req,res,next){
	peopleController.peopleInfo('Barachan',function(){
		console.log('最后一行代码');
	});
	res.send('好艰难,别报错啊');
});

router.all('/people',function(req,res,next){
//调用peopleController.peopleInfo()方法,传入知乎个人详细信息url即可爬取信息到数据库
//	peopleController.peopleInfo('https://www.zhihu.com/people/he-shi-jun/about');
	peopleController.peopleInfo('http://localhost:3000');
	res.send('111111111111111');
});
//
router.all('/testRE',function(req,res,next){
	peopleController.getPeopleInfo();
	res.send('2222222222');
});

router.all('/config',function(req,res,next){
	peopleController.configMap();
	res.send('2222222222');
});

router.all('/quiz',function(req,res,next){
//	quizController.index('28387118');
	quizController.crawlerQuiz();
	res.send('2222222222');
});

router.all('/main',function(req,res,next){
	quizController.main(req,res,next);
	res.send('33333333333');
});

router.all('/follow',function(req,res,next){
	var map = {
		start:0,
		offset:0
	};
	followController.quizFollowNext(map,'41220946');
	res.send('33333333333');
});

module.exports = router;


