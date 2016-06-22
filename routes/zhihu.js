/**
 * Created by xrain on 16/6/5.
 */

var express = require('express');
var router = express.Router();
var peopleController = require('../crawler/controller/user.js');
var quizController = require('../crawler/controller/quiz.js');
var mainController = require('../crawler/controller/main.js');
var followController = require('../crawler/controller/follow.js');

//    localhost:3000/zhihu/chance?q=待爬取问题id
//爬取指定问题信息
router.all('/chance',function(req,res,next){
	var q = req.query.q;
	var num = parseInt(q);
	if(typeof num === "number"){
		quizController.oneQuiz(q);
		res.send('正在爬取,请稍等几分钟');
	}else{
		res.send('请在浏览器输入正确的参数.?q=问题id ');
	}
});

//已经爬取的问题列表
router.get('/list',function (req, res, next) {
	mainController.queryAllQuiz(req, res, next);
});

//查看指定问题的回答
router.get('/by',function (req, res, next) {
	mainController.queryAllAnswer(req, res, next);
});

//查看关注该问题的用户列表
router.get('/followList',function (req, res, next) {
	mainController.queryAllFollow(req, res, next);
});

module.exports = router;
