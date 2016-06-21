/**
 * Created by public on 2016/6/20.
 */

 var moment = require('moment');
 var superagent = require('superagent');
 var cheerio = require('cheerio');
 var async  = require('async');
 var url=require('url');
 var qs=require('querystring');
 var logger = require('../../utils/log4js.js').log4js.getLogger(__filename);
 var cookies = require('../../utils/zhihu.js');
 var Entities = require('html-entities').AllHtmlEntities;
 var entities = new Entities();    //解决中文乱码的对象

 var controller={};
 var _systemConfig = require('../../common/servlet/_systemConfig.js').servlet;
 var CZTags = require('../servlet/CZTags.js');
 var CZType = require('../servlet/CZType.js');


//查询数据库c_z_type表,根据表中数据,获取主题下全部子标签
controller.index = function(){
  CZType.findAll().then(function(result){
    //查询到全部的主题,循环获取主题下面的子标签
    //放止短时间内请求过多,被封ip,一个个执行
    async.eachSeries(result,function(item,callback){
      setParams(item.uid,callback);
    },function(err){
        if(err){
          logger.error('循环获取主题下子标签出错,错误原因:' + err);
        }else{
          logger.info('循环获取主题下子主题完成:'+err);
        }
    });
  });
};


/**
 * 获取知乎中全部的话题(话题,并不是标签)
 * 这些内容基本不会改,所以就写成了一个方法
 */
function getType(){
  var configMap = _systemConfig.configMap;
  var uri = configMap['zhihu_topics_url'];
  superagent.get(uri)
    .set(cookies)
    .end(function(err,result){
      if(err){
				logger.error('获取主题下子主题内容报错:'+err);
				logger.error('返回状态码status:' + status + 'uri内容:'+uri.toString());
				return false;
			}
      if(status.indexOf('4') === 0||status.indexOf('5') === 0){
				logger.error('获取主题下子主题内容uri:' + uri.toString() + ' 返回状态码:' + result.status);
				logger.error('result.body.message:' + result.body.message);
			}else{
        var $ = cheerio.load(result.text);
        //获取到标签的内容和id
        $('.zu-main-content .zm-topic-cat-main>li').each(function(item,element){
          var uid = $(this).attr('data-id');
          var uhref = $(this).children('a').attr('href');
          var utext = $(this).children('a').text();
          CZType.CZType.findOne({
            attributes : ['id','name','uid'],
            where : {
              uid : uid
            },
            order : 'created_at desc'
          }).then(function(result){
            if(!result){
              if(utext !== result.name){
                CZType.saveByInfo(uid,utext,uri+uhref);
              }
            }else{
              CZType.saveByInfo(uid,utext,uri+uhref);
            }
          });
        });
      }
    });
}
controller.setParams = getType;

/**
 * 传入参数,循环获取该主题下的子标签
 * @params configMap 系统配置表map
 * @params params   请求参数
 * @params typeId   主题id
 */
function nextTopics(configMap,params,typeId,callback){
 superagent.post(configMap['zhihu_topics_next_url']).set(cookies)
   .send(qs.stringify({method:'next',params:JSON.stringify(params),_xsrf: configMap['_xsrf'] }))
   .end(function(err,result){
     if(err){
       logger.error('获取主题下下一页子标签内容报错:'+err);
       logger.error('返回状态码status:' + status + 'map内容:'+params.toString());
       callback(null);
       return false;
     }
     if(status.indexOf('4') === 0||status.indexOf('5') === 0){  //返回404或500,进行处理
       logger.error('获取主题下下一页子标签内容map:' + params.toString() + ' 返回状态码:' + result.status);
       logger.error('result.body.message:' + result.body.message);
       callback(null);
       return false;
     }else{
       var jsonObj = JSON.parse(result.text);
       if(jsonObj.msg){ //如果返回的json数据中msg不为空,则解析
         var array = jsonObj.msg;
         for(var j=0;j<array.length;j++) {
           saveTags(array[j], typeId,configMap['zhihu_topics_id_url']);
         }
         params.offset=params.offset+20;  //开始偏移参数+20,继续请求
         nextTopics(configMap,params,typeId);
       }else{   //如果为空则说明该类别下的子标签都获取完毕了
         callback(null);
         return false;
       }
     }
   });
}
controller.nextTopics = nextTopics;

/**
 * 传入主题id,获取该主题下的全部子标签
 */
function setParams(typeId,callback){
  var configMap = _systemConfig.configMap;
  //设置查询参数
  var params = {
   "topic_id":typeId,
   "offset":0,
   "hash_id": configMap['zhihu_hash_id']
  };
  nextTopics(configMap,params,typeId,callback);
};
controller.setParams = setParams;


 /**
  * 根据返回的html截取标签内容保存到数据库
  */
 function saveTags(array,typeId,uri){
 		var $ = cheerio.load(array);
 		var cpic = $('.item img').attr('src');
 		var title = $('.item strong').text();
 		var brief = $('.item p').text();
 		var ccc=/topic\/(\S*)"/;
 		var uid = regexStr(array[j],ccc);
 		ccc=/t::-(\S*)"/;
 		var fid = regexStr(array[j],ccc);
    var chref = uri.replace('@id', fid);
    CZTags.saveByInfo(title,uid,fid,chref,cpic,brief,typeId);
 }



 /**
  * 正则表达式截取字符串
  */
 function regexStr(str,rule){
 	var subStr=str.match(rule);
  if(subStr){
    return subStr[1];
  }else{
    return '';
  }
 }


module.exports = controller;
