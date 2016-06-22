/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var router = express.Router();
var peopleController = require('../crawler/controller/user.js');
var quizController = require('../crawler/controller/quiz.js');
var mainController = require('../crawler/controller/main.js');
var followController = require('../crawler/controller/follow.js');

router.all('/chance',function(req,res,next){
	console.log('进来了蛮');
	var q = req.query.q;
	var num = parseInt(q);
	if(typeof num === "number"){
		quizController.oneQuiz(q);
		res.send('正在爬取,请稍等几分钟');
	}else{
		res.send('请在浏览器输入正确的参数.?q=问题id ');
	}
});

router.get('/list',function (req, res, next) {
	mainController.queryAllQuiz(req, res, next);
});

router.get('/by',function (req, res, next) {
	mainController.queryAllAnswer(req, res, next);
});

router.get('/followList',function (req, res, next) {
	mainController.queryAllFollow(req, res, next);
});

module.exports = router;
