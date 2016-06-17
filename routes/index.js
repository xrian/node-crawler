var express = require('express');
var router = express.Router();
var logger = require('../utils/log4js.js').log4js.getLogger(__filename);
/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info('主页主页主页主页主页主页');
  res.render('index', { title: 'Express' });
});

module.exports = router;
