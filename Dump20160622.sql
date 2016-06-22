-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: node-crawler
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_system_config`
--

DROP TABLE IF EXISTS `_system_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_system_config` (
  `id` varchar(64) NOT NULL COMMENT '系统配置表id',
  `name` varchar(64) DEFAULT NULL COMMENT '说明',
  `type` varchar(10) DEFAULT NULL COMMENT '类型(数字,文本,长文本,网址)',
  `val` varchar(200) DEFAULT NULL COMMENT '值',
  `code` varchar(32) DEFAULT NULL COMMENT '编码',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_system_config`
--

LOCK TABLES `_system_config` WRITE;
/*!40000 ALTER TABLE `_system_config` DISABLE KEYS */;
INSERT INTO `_system_config` VALUES ('1466042978','_xsrf参数','text','','_xsrf','如果无法模拟登陆需要修改为最新值','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043078','知乎主页,域名','uri','https://www.zhihu.com/','zhihu_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043178','知乎问题链接,@id替换为相应的问题id','uri','https://www.zhihu.com/question/@id','zhihu_quiz_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043278','知乎回答超链接,@id替换为相应的问题id,@token替换为token_id','uri','https://www.zhihu.com/question/@id#answer-@token','zhihu_quiz_token_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043378','知乎用户个人中心详细页面,@id替换为相应的问题id,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/about','zhihu_people_about_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043478','知乎用户关注了哪些用户列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/followees','zhihu_people_followees_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043578','知乎用户粉丝列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/followers','zhihu_people_followers_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043678','知乎用户关注专栏,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/columns/followed','zhihu_people_columns_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043778','知乎用户话题专栏,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/topics','zhihu_people_topics_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043878','知乎用户被收录的回答列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/answers/marked','zhihu_people_marked_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043978','知乎用户提问列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/asks','zhihu_people_asks_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044078','知乎用户回答列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/answers','zhihu_people_answer_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044178','知乎用户文章列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/posts','zhihu_people_posts_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044278','知乎用户收藏列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/collections','zhihu_people_collections_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044378','知乎用户公共编辑列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/logs','zhihu_people_logs_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044478','知乎用户个人中心,@id替换为用户编码','uri','https://www.zhihu.com/people/@id','zhihu_people_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044578','知乎爬虫多少毫秒抓取一次','num','1000','zhihu_get_time','单位(毫秒)','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044678','知乎问题回答,下一页url','uri','https://www.zhihu.com/node/QuestionAnswerListV2','zhihu_answer_next_url','post','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044778','知乎获取关注该问题下一页数据,一页20条','uri','https://www.zhihu.com/question/@id/followers','zhihu_quiz_followers_next_url','post','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044878','知乎话题广场链接','uri','https://www.zhihu.com/topics#','zhihu_topics_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044978','知乎主题问题列表链接@id为子话题id','uri','https://www.zhihu.com/topic/@id/hot','zhihu_topics_id_url','get','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466045078','知乎获取下一标签列表uri','uri','https://www.zhihu.com/node/TopicsPlazzaListV2','zhihu_topics_next_url','post','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL);
/*!40000 ALTER TABLE `_system_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_answer`
--

DROP TABLE IF EXISTS `c_z_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_answer` (
  `id` varchar(64) NOT NULL COMMENT '知乎回答表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `quiz_id` varchar(64) DEFAULT NULL COMMENT '问题id',
  `aid` varchar(64) DEFAULT NULL COMMENT '回答问题的id',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `token` varchar(64) DEFAULT NULL COMMENT '回答标记id',
  `token_url` varchar(200) DEFAULT NULL COMMENT 'html书签,跳转到回答的地方',
  `user_id` varchar(64) DEFAULT NULL COMMENT '用户id',
  `name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `ucode` varchar(64) DEFAULT NULL COMMENT '用户代码',
  `detail` text COMMENT '回答详情',
  `agree` varchar(11) DEFAULT NULL COMMENT '赞同数',
  `comment` varchar(11) DEFAULT NULL COMMENT '评论数',
  `create` varchar(100) DEFAULT NULL COMMENT '发布时间',
  `update` varchar(100) DEFAULT NULL COMMENT '最后修改时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_answer`
--

LOCK TABLES `c_z_answer` WRITE;
/*!40000 ALTER TABLE `c_z_answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_error`
--

DROP TABLE IF EXISTS `c_z_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_error` (
  `id` varchar(64) NOT NULL COMMENT '需要爬取的问题id',
  `type` varchar(64) DEFAULT NULL COMMENT '类别(错误,警告,提示)',
  `filename` varchar(64) DEFAULT NULL COMMENT '文件名',
  `uid` varchar(64) DEFAULT NULL COMMENT 'id',
  `maybe` varchar(200) DEFAULT NULL COMMENT '可能的原因',
  `msg` varchar(2000) DEFAULT NULL COMMENT '错误内容',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_error`
--

LOCK TABLES `c_z_error` WRITE;
/*!40000 ALTER TABLE `c_z_error` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_list`
--

DROP TABLE IF EXISTS `c_z_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_list` (
  `id` varchar(64) NOT NULL COMMENT '需要爬取的问题id',
  `type` varchar(64) DEFAULT NULL COMMENT '类别',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎中的id',
  `code` varchar(64) DEFAULT NULL COMMENT '代码,根据代码去配置表取链接,再用id替换',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_list`
--

LOCK TABLES `c_z_list` WRITE;
/*!40000 ALTER TABLE `c_z_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_quiz`
--

DROP TABLE IF EXISTS `c_z_quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_quiz` (
  `id` varchar(64) NOT NULL COMMENT '知乎问题表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎url访问id',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `name` varchar(64) DEFAULT NULL COMMENT '标题',
  `cid` varchar(64) DEFAULT NULL COMMENT '<meta itemprop="visitsCount" content="1191417">',
  `detail` text COMMENT '详情',
  `rid` varchar(64) DEFAULT NULL COMMENT 'data-resourceid="707751"',
  `comment` varchar(10) DEFAULT NULL COMMENT '评论数量',
  `follow` varchar(10) DEFAULT NULL COMMENT '关注人数',
  `answer` varchar(10) DEFAULT NULL COMMENT '回答数量',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(64) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_quiz`
--

LOCK TABLES `c_z_quiz` WRITE;
/*!40000 ALTER TABLE `c_z_quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_quiz_agree`
--

DROP TABLE IF EXISTS `c_z_quiz_agree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_quiz_agree` (
  `id` varchar(64) NOT NULL COMMENT '知乎点赞表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `type` varchar(64) DEFAULT NULL COMMENT '点赞类型',
  `answer` varchar(64) DEFAULT NULL COMMENT 'czanswer回答id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎回答id',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `user` varchar(64) DEFAULT NULL COMMENT 'czuser用户id',
  `time` varchar(100) DEFAULT NULL COMMENT '点赞时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(64) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_quiz_agree`
--

LOCK TABLES `c_z_quiz_agree` WRITE;
/*!40000 ALTER TABLE `c_z_quiz_agree` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_quiz_agree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_quiz_follow`
--

DROP TABLE IF EXISTS `c_z_quiz_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_quiz_follow` (
  `id` varchar(64) NOT NULL COMMENT '标签表id',
  `quiz_id` varchar(64) DEFAULT NULL COMMENT '问题id',
  `name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `uid` varchar(64) DEFAULT NULL COMMENT '用户id',
  `href` varchar(256) DEFAULT NULL COMMENT '用户个人中心地址',
  `brief` varchar(300) DEFAULT NULL COMMENT '标签简介',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(64) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_quiz_follow`
--

LOCK TABLES `c_z_quiz_follow` WRITE;
/*!40000 ALTER TABLE `c_z_quiz_follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_quiz_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_quiz_tags`
--

DROP TABLE IF EXISTS `c_z_quiz_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_quiz_tags` (
  `id` varchar(64) NOT NULL COMMENT '标签表id',
  `quiz_id` varchar(64) DEFAULT NULL COMMENT '问题id',
  `name` varchar(64) DEFAULT NULL COMMENT '类别名',
  `fid` varchar(64) DEFAULT NULL COMMENT '关注知乎该标签所需要的ID',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `brief` varchar(300) DEFAULT NULL COMMENT '标签简介',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(64) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_quiz_tags`
--

LOCK TABLES `c_z_quiz_tags` WRITE;
/*!40000 ALTER TABLE `c_z_quiz_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_quiz_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_tags`
--

DROP TABLE IF EXISTS `c_z_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_tags` (
  `id` varchar(64) NOT NULL COMMENT '标签表id',
  `type_id` varchar(64) DEFAULT NULL COMMENT '类别id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `name` varchar(64) DEFAULT NULL COMMENT '类别名',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎id',
  `fid` varchar(64) DEFAULT NULL COMMENT '关注知乎该标签所需要的ID',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `pic` varchar(256) DEFAULT NULL COMMENT '图片地址',
  `brief` varchar(300) DEFAULT NULL COMMENT '标签简介',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_tags`
--

LOCK TABLES `c_z_tags` WRITE;
/*!40000 ALTER TABLE `c_z_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_type`
--

DROP TABLE IF EXISTS `c_z_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_type` (
  `id` varchar(64) NOT NULL,
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `name` varchar(64) DEFAULT NULL COMMENT '类别名',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎id',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_type`
--

LOCK TABLES `c_z_type` WRITE;
/*!40000 ALTER TABLE `c_z_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_z_user`
--

DROP TABLE IF EXISTS `c_z_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `c_z_user` (
  `id` varchar(64) NOT NULL COMMENT '知乎问题表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎url访问id',
  `ucode` varchar(64) DEFAULT NULL COMMENT '知乎用户唯一编码',
  `href` varchar(256) DEFAULT NULL COMMENT '访问地址',
  `name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `brief` varchar(300) DEFAULT NULL COMMENT '用户个性签名',
  `describe` varchar(1000) DEFAULT NULL COMMENT '描述',
  `sex` varchar(8) DEFAULT NULL COMMENT '性别',
  `followees` int(10) DEFAULT NULL COMMENT '关注人数',
  `followers` int(10) DEFAULT NULL COMMENT '多少人关注',
  `columns` varchar(200) DEFAULT NULL COMMENT '关注了多少专栏',
  `topics` varchar(200) DEFAULT NULL COMMENT '关注了多少话题',
  `agree` int(10) DEFAULT NULL COMMENT '多少个赞同',
  `thanks` int(10) DEFAULT NULL COMMENT '多少个感谢',
  `asks` int(10) DEFAULT NULL COMMENT '多少个提问',
  `answers` int(10) DEFAULT NULL COMMENT '多少个回答',
  `posts` int(11) DEFAULT NULL COMMENT '多少篇文章',
  `view` int(11) DEFAULT NULL COMMENT '主页被多少人浏览',
  `weibo` varchar(256) DEFAULT NULL COMMENT '微博是否显示,显示会是微博地址',
  `location` varchar(500) DEFAULT NULL COMMENT '地址',
  `business` varchar(300) DEFAULT NULL COMMENT '行业',
  `employment` varchar(200) DEFAULT NULL COMMENT '公司',
  `positions` varchar(200) DEFAULT NULL COMMENT '职业',
  `education` text COMMENT '教育',
  `education_extra` varchar(200) DEFAULT NULL COMMENT '学校专业',
  `share` int(6) DEFAULT NULL COMMENT '被分享次数',
  `collect` int(11) DEFAULT NULL COMMENT '收藏次数',
  `marked` varchar(500) DEFAULT NULL COMMENT '被编辑收录回答次数',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(64) DEFAULT NULL COMMENT '应用id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_z_user`
--

LOCK TABLES `c_z_user` WRITE;
/*!40000 ALTER TABLE `c_z_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `c_z_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-22 15:27:12
