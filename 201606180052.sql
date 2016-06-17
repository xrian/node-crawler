/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.7.13-log : Database - node-crawler
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`node-crawler` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `node-crawler`;

/*Table structure for table `_system_config` */

DROP TABLE IF EXISTS `_system_config`;

CREATE TABLE `_system_config` (
  `id` varchar(64) NOT NULL COMMENT '系统配置表id',
  `name` varchar(100) DEFAULT NULL COMMENT '说明',
  `type` varchar(32) DEFAULT NULL COMMENT '类型(数字,文本,长文本,网址)',
  `val` varchar(500) DEFAULT NULL COMMENT '值',
  `code` varchar(64) DEFAULT NULL COMMENT '编码',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_system_config` */

insert  into `_system_config`(`id`,`name`,`type`,`val`,`code`,`remark`,`app_id`,`party_id`,`created_at`,`updated_at`,`deleted_at`) values ('1466043078','知乎主页,域名','uri','https://www.zhihu.com/','zhihu_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043178','知乎问题链接,@id替换为相应的问题id','uri','https://www.zhihu.com/question/@id','zhihu_quiz_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043278','知乎回答超链接,@id替换为相应的问题id,@token替换为token_id','uri','https://www.zhihu.com/question/@id#answer-@token','zhihu_quiz_token_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043378','知乎用户个人中心详细页面,@id替换为相应的问题id,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/about','zhihu_people_about_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043478','知乎用户关注了哪些用户列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/followees','zhihu_people_followees_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043578','知乎用户粉丝列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/followers','zhihu_people_followers_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043678','知乎用户关注专栏,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/columns/followed','zhihu_people_columns_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043778','知乎用户话题专栏,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/topics','zhihu_people_topics_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043878','知乎用户被收录的回答列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/answers/marked','zhihu_people_marked_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466043978','知乎用户提问列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/asks','zhihu_people_asks_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044078','知乎用户回答列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/answers','zhihu_people_answer_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044178','知乎用户文章列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/posts','zhihu_people_posts_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044278','知乎用户收藏列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/collections','zhihu_people_collections_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044378','知乎用户公共编辑列表,@id替换为用户编码','uri','https://www.zhihu.com/people/@id/logs','zhihu_people_logs_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044478','知乎用户个人中心,@id替换为用户编码','uri','https://www.zhihu.com/people/@id','zhihu_people_url','get','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL),('1466044578','知乎爬虫多少毫秒抓取一次','num','1000','zhihu_get_time','单位(毫秒)','1','1','2016-06-16 10:11:49','2016-06-16 10:11:52',NULL);

/*Table structure for table `c_z_answer` */

DROP TABLE IF EXISTS `c_z_answer`;

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
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_answer` */

insert  into `c_z_answer`(`id`,`pid`,`quiz_id`,`aid`,`href`,`token`,`token_url`,`user_id`,`name`,`ucode`,`detail`,`agree`,`comment`,`create`,`update`,`remark`,`app_id`,`party_id`,`created_at`,`updated_at`,`deleted_at`) values ('3d54a835-2380-4ec8-9b17-2c55e9dd0f65',NULL,'47533656','38049549','/question/47533656/answer/106461981','106461981','answer-38049549',NULL,'BeCoDeR','becoder','\n聊天记录里那个HR回复的挺好，“OK, 那算了”，一拍俩散，对于学生节省了时间和精力，对于企业来说不仅节省了时间精力，还节约了后续更多无谓的招聘成本。<br><br>但是，把聊天记录Post到知乎来，太多余了。<br><br>首先，做为一个已经离开校园10多年，面过招过N多毕业生的用人经理，我不觉得这个学生有什么不妥的。<br><br>其次招聘本身就是一个不断筛选的过程，做为HR唯一目标就是找到并招来企业需要的人，在过程中必然要筛掉那些不适合企业的候选人，可能是因为技能不适合也可能是因为性格不适合，薪资期望不匹配也是一个重要的原因。<br><br>但是这些都是很正常的啊，HR的确是有权利去筛掉候选人，但是，HR可没权利去评价候选人，你觉得候选人要价高或者性格不符合企业文化，干净利落得回绝对方就行了。跑到网上专门开个Topic把候选人评头论足或者口诛笔伐一番，真的会有什么社会意义么?更不会让人感觉这个HR有多专业。\n','121','8','1466154816','发布于 昨天 17:13',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('72ee6de0-4335-47fb-97e3-bc22a6d5a99e',NULL,'47533656','38045981','/question/47533656/answer/106453067','106453067','answer-38045981',NULL,'宋黎','song-li-58','\n挺正常的嘛<br>你觉得能给到这些就邀来谈谈<br>你觉得给不了这些就不邀嘛<br><br>我挺喜欢这种能明确自己价值的\n','173','2','1466151858','发布于 昨天 16:24',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('81eb673f-9568-4c53-a410-d6d378b8af1c',NULL,'47533656','38049314','/question/47533656/answer/106461408','106461408','answer-38049314',NULL,'匿名用户',NULL,'\n问你价格，你说面议<br>我说价格，你说我狂妄<br><noscript><img src=\"https://pic3.zhimg.com/9a391942e5e294560757a8576bd534e2_b.jpg\" data-rawwidth=\"220\" data-rawheight=\"220\" class=\"content_image\" width=\"220\"></noscript><img src=\"//zhstatic.zhihu.com/assets/zhihu/ztext/whitedot.jpg\" data-rawwidth=\"220\" data-rawheight=\"220\" class=\"content_image lazy\" width=\"220\" data-actualsrc=\"https://pic3.zhimg.com/9a391942e5e294560757a8576bd534e2_b.jpg\"><br><br>员工和公司的平等的，为什么到谈工资的时候，好像你施舍给人工作岗位一样呢？别人不感激不行？<br><br>买东西（买人为你工作），你问价格。<br>我出价格，这不正常情况吗？<br><br>价格谈不拢，就算了，难道大家买东西的时候，都要讨论一番\n','79','10','1466154602','编辑于 昨天 17:12',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('99dc1bc9-0992-4ca9-a6a6-9f64da147fdb',NULL,'47533656','38048480','/question/47533656/answer/106459309','106459309','answer-38048480',NULL,'漭漭','shemangmang','\n提前告知底线，避免浪费双方的时间，很好。<br>美中不足的是表达过于直接，稍欠考虑，不考虑对方感受，不过瑕不掩瑜。\n','7','7','1466153889','发布于 昨天 16:58',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('ac11b988-3a9e-4eda-9531-8bbacc53389b',NULL,'47533656','38053086','/question/47533656/answer/106470581','106470581','answer-38053086',NULL,'vczh','excited-vczh','\n我觉得这样很好啊。猎头来挖的时候我也是先问他能给多少钱，反正还没见过可以让我放弃拿绿卡回去的价格。于是直接就拒绝了。\n','43','12','1466158096','编辑于 昨天 18:15',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('b96af34e-b8bf-45da-b6a7-e97eea83b46c',NULL,'47533656','38048585','/question/47533656/answer/106459572','106459572','answer-38048585',NULL,'王小苦','wang-xiao-ku-96','\n我去,找工作都不能谈钱了?那咱谈点什么?<br><br>为了联盟?\n','163','29','1466153972','发布于 昨天 16:59',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('b9e34144-1136-4e71-8f46-18cee484b63c',NULL,'47533656','38064603','/question/47533656/answer/106499200','106499200','answer-38064603',NULL,'择日投降','jonasan','\n挺正常的呀，初中毕业生你会给他机会面试吗。既然你对人家有要求，人家为什么不对你有要求。幸苦打工不就是养家糊口吗，难道给你白白做贡献。<br><br>很多人都有这种想法，一般不说出来或者表达得委婉些而已。只是这个小孩没社会经验，把这事情说出来了。\n','0','0','1466172326','发布于 昨天 22:05',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('ba9a5cfa-034c-4c02-80ae-93157266a0c2',NULL,'47533656','38070344','/question/47533656/answer/106513122','106513122','answer-38070344',NULL,'Right','123456789-97','\n我是一名在校大学生，已经经历过校招实习的过程，我人生中第一次见到某司hr，让我感到比较操蛋的是一个hr 同时面对面面试3个人，问的有些问题根本不想让第三者，甚至是第二者知道好吧(手动滑稽)， 当hr提到关于转正后的薪资时候我就说了一下我的期望值(或许是我没有资本，还比较狂妄),然后当我走出门的时候就收到没通过的信息(手动微笑)。我自以为面试和被面试者都是公平的，可现实就呵呵了，不论是哪个公司，尤其是应届毕业生，只要被面试者主动提出薪资话题就觉得面试者太狂妄了(可能是我比较狂妄吧)，然后搞个大新闻，再把被面试者批判一番来宣扬自己的高尚，面试者的狂妄。我可能会为了我所中意的公司降低我的标准，但是我不会为了一个没有诚意的公司来浪费时间，或许可能会面临毕业就失业的可能，但是我愿意这样做。对，我就是这么有棱角，还不愿意打磨(滑稽)。\n','2','0','1466178305','发布于 昨天 23:45',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('c3ec65d1-2456-4c50-8fd1-27e65554e816',NULL,'47533656','38053956','/question/47533656/answer/106472732','106472732','answer-38053956',NULL,'超超呆','chaochaodai','\nHR本来想装逼 说那算了<br>结果人家学生根本不理会 直接去了更好的公司\n','3','0','1466159031','发布于 昨天 18:23',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('f06883ef-1cf9-46b8-ac3f-893899b2a972',NULL,'47533656','38065365','/question/47533656/answer/106501084','106501084','answer-38065365',NULL,'鲁小夫','Rufus','\n泻药。<br><br>非常正常，条件没谈妥就过去面试是浪费时间，不然去了干嘛呢，面试个好几轮，花掉一两天，最后一谈待遇对不上，这不白瞎吗？<br><br>难道你们公司的招聘人员都很闲吗？\n','4','3','1466173178','编辑于 昨天 22:51',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL);

/*Table structure for table `c_z_error` */

DROP TABLE IF EXISTS `c_z_error`;

CREATE TABLE `c_z_error` (
  `id` varchar(64) NOT NULL COMMENT '需要爬取的问题id',
  `type` varchar(64) DEFAULT NULL COMMENT '类别(错误,警告,提示)',
  `filename` varchar(64) DEFAULT NULL COMMENT '文件名',
  `uid` varchar(64) DEFAULT NULL COMMENT 'id',
  `maybe` varchar(200) DEFAULT NULL COMMENT '可能的原因',
  `msg` varchar(2000) DEFAULT NULL COMMENT '错误内容',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_error` */

/*Table structure for table `c_z_follow` */

DROP TABLE IF EXISTS `c_z_follow`;

CREATE TABLE `c_z_follow` (
  `id` varchar(64) NOT NULL COMMENT '关注表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `user` varchar(64) DEFAULT NULL COMMENT 'czuser用户id',
  `follow` varchar(64) DEFAULT NULL COMMENT '粉丝czuser用户id',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_follow` */

/*Table structure for table `c_z_list` */

DROP TABLE IF EXISTS `c_z_list`;

CREATE TABLE `c_z_list` (
  `id` varchar(64) NOT NULL COMMENT '需要爬取的问题id',
  `type` varchar(64) DEFAULT NULL COMMENT '类别',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎中的id',
  `code` varchar(64) DEFAULT NULL COMMENT '代码,根据代码去配置表取链接,再用id替换',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_list` */

insert  into `c_z_list`(`id`,`type`,`uid`,`code`,`href`,`remark`,`app_id`,`party_id`,`created_at`,`updated_at`,`deleted_at`) values ('01f84554-7904-4d29-84f6-e69f50fbf368',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('0ddf72e6-44aa-45ed-afb3-0e99fefff1c6',NULL,'wang-shuang-87-99','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('0ecc83d4-141f-4be1-bd81-2ddde00356c5',NULL,'tony-he-33','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('1','1','dzj668','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:43:10','2016-06-17 16:43:12','2016-06-17 11:15:02'),('11','1','hwb986','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:43:10','2016-06-17 16:43:12','2016-06-17 11:15:12'),('11204b1b-206c-4f83-9c98-4e16aac47f43',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:55','2016-06-17 16:16:55',NULL),('1235cb84-a219-4278-acca-b5895ec4e163',NULL,'shemangmang','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('18391e32-6414-4edc-914c-84274b6b6d34',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:09','2016-06-17 16:22:09',NULL),('1a78a599-1f02-48a2-86cc-65aac93e1184',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('2','1','Barachan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:43:10','2016-06-17 16:43:12','2016-06-17 11:15:22'),('21158c2e-015e-4c4e-a2fd-54a8d2ae065e',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('225bf337-7ba9-49b2-9661-6fc131efabd5',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('25869c16-bed9-4618-ae79-67bd8dc7a871',NULL,'tony-he-33','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('26d73780-caef-4858-a3fb-01b1a26df65b',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('27032327-05ad-48c4-b516-3b66538b8ab3',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:09','2016-06-17 16:22:09',NULL),('2903e9c3-6621-467c-a3fe-a9f8bbc88f0d',NULL,'jirim','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('2fe91e9f-048e-41a8-9bc4-1560470d6819',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54',NULL),('3','1','deng-de-zheng','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:43:10','2016-06-17 16:43:12','2016-06-17 11:15:33'),('34bf3678-6204-4945-b101-a58d4dea2e2d',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54',NULL),('36042de1-4868-4b39-a13c-24eac8799761',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('38e47f50-e48c-4d51-867b-1a7dedc302d3',NULL,'shemangmang','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('3bf2507f-3502-4a5c-8d6c-70562145db6b',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('3c3c5a99-979e-4683-8025-55e6c78f93a2',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('3cf2497c-fb8f-48e6-be36-0011714aa702',NULL,'tony-he-33','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('3dd1c8bb-656e-4bec-acb2-39a650de6e9a',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('3ebaa104-d9be-476f-a3d5-227a7409fe4d',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54',NULL),('3f23169b-ea87-4333-b47c-9cfda5cec41d',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('4','1','sun-ji-cheng-4','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:43:10','2016-06-17 16:43:12','2016-06-17 11:15:44'),('426b3480-b3ab-4674-a2a1-1de96c8083cd',NULL,'SuchenChinese','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('441e6a39-ecc0-4705-afa8-5814ed44058f',NULL,'shemangmang','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:08','2016-06-17 16:22:08',NULL),('4707feb2-df45-4933-9cc2-e14eb05fb885',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('4f3e6ea4-2e28-4e80-96b5-312aa049b7fe',NULL,'leonfacin','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('51166b13-2782-4143-a338-096ec0ab0a42',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('56f4ed46-9627-424e-94f3-d9cff67f2d60',NULL,'tony-he-33','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:55','2016-06-17 16:16:55',NULL),('67125e53-353f-431c-bd68-c7e26cc7ece8',NULL,'chaochaodai','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('6715f7e0-efbd-46f8-81c1-9cd58b401474',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('7233ddd3-8fdb-40a2-85d0-3edc60a61cbe',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('73771bd0-26ed-44d6-a688-139ba96429e0',NULL,'shemangmang','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('7869368f-9684-4367-a921-41f7461c33c5',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:09','2016-06-17 16:22:09',NULL),('7d49ccc1-f6d9-43c0-afa2-3a8b169aac6e',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('7daccc4c-4135-40e2-8f40-6ae5944e7b4e',NULL,'huang-he-72-41','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('86234ec4-9775-427c-b88e-6be8d50344c2',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('89788eb7-a989-47bb-9ab8-e68373780c89',NULL,'wen-wen-96-41','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('8d14b201-3442-4614-b544-39e9b766cf05',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('93104375-6213-4fec-92c0-efd1031832a6',NULL,'hou-shi-ying-90','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('98ae7f07-c303-40a8-b069-96cd9af336d4',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('9ed6b4ad-40e4-4144-b470-d24c75b26b29',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('a61470dd-ff80-4b9e-83ad-bf3e210d25ef',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('a647c2c0-bbd5-49cf-96a3-c95b811c2618',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:09','2016-06-17 16:22:09',NULL),('a760c01e-b244-4e01-bf0f-b65ba929b096',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:08','2016-06-17 16:22:08',NULL),('aca14ff4-839a-4036-bceb-8b3288ccb51f',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:55','2016-06-17 16:16:55',NULL),('adaafd29-04c4-468f-aecc-640f50bb433a',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('adbe0371-57be-4767-bbbf-59b2bf3b7445',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('b0723823-8d83-4795-99d6-937d9bed4c88',NULL,'chaochaodai','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('b9ac7bdb-c0cf-41a0-851f-b44085bd6d9d',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54',NULL),('bddab352-0cd7-4dd4-b8bd-0f21e4695c4f',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('bee6e181-ce98-4840-ac8a-a040319c9f04',NULL,'jiang-qing-feng-28','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('c0eea6e0-95ec-4726-a742-04d2ba7c8316',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:08','2016-06-17 16:22:08',NULL),('c6ce986e-d9c5-4c60-a5b8-2fbd4c6db91e',NULL,'shemangmang','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('d27a4790-a322-4bac-995b-2d202093f3a2',NULL,'tony-he-33','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:09','2016-06-17 16:22:09',NULL),('d3aa7e72-8ff7-43c8-b409-f39b01a3a6fd',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('da70a02e-335b-4671-adc8-699dc4a9e5b9',NULL,'123456789-97','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('e0197c5c-7c6d-4705-a281-641df0ff91c5',NULL,'Rufus','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('e0f57ce8-4818-411b-a51f-dd2d2e610020',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('e314cdf5-b2f4-4384-b4d2-c63aa0b93a29',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34',NULL),('e61422a4-8a8a-469b-b176-4e7618010e59',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('e625331e-3f8c-4240-a7ab-9dcfc5918fcd',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('eaf063c0-264e-49d7-95ef-3cc30c16d593',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('f1b18b1e-6e41-4797-9145-139b3b1e5a0d',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:22:08','2016-06-17 16:22:08',NULL),('f247f0ad-faae-4147-8be0-08ab9b8bb290',NULL,'shemangmang','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54',NULL),('f8924f69-a707-4f1c-8183-582b393ade5b',NULL,'jonasan','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:16:55','2016-06-17 16:16:55',NULL),('f8c7310f-bc0b-4310-a399-02f90719189a',NULL,'becoder','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('fb6c85ba-3477-4ff8-a0bd-87631c19d8f8',NULL,'song-li-58','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:23:24','2016-06-17 16:23:24',NULL),('fca77c7c-5b51-4622-a57e-faf4fbbe9ded',NULL,'wang-xiao-ku-96','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:19:57','2016-06-17 16:19:57',NULL),('fd60e5f3-0764-4a5f-8cbf-58be71ed9db3',NULL,'excited-vczh','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25',NULL),('ffaa4c96-f658-41c1-9995-855220037bb8',NULL,'Zeon-Ridden','zhihu_people_about_url',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL);

/*Table structure for table `c_z_quiz` */

DROP TABLE IF EXISTS `c_z_quiz`;

CREATE TABLE `c_z_quiz` (
  `id` varchar(64) NOT NULL COMMENT '知乎问题表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎url访问id',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `name` varchar(100) DEFAULT NULL COMMENT '标题',
  `cid` varchar(64) DEFAULT NULL COMMENT '<meta itemprop="visitsCount" content="1191417">',
  `detail` text COMMENT '详情',
  `rid` varchar(64) DEFAULT NULL COMMENT 'data-resourceid="707751"',
  `comment` varchar(20) DEFAULT NULL COMMENT '评论数量',
  `follow` varchar(20) DEFAULT NULL COMMENT '关注人数',
  `answer` varchar(20) DEFAULT NULL COMMENT '回答数量',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_quiz` */

insert  into `c_z_quiz`(`id`,`pid`,`uid`,`href`,`name`,`cid`,`detail`,`rid`,`comment`,`follow`,`answer`,`remark`,`app_id`,`party_id`,`created_at`,`updated_at`,`deleted_at`) values ('b8d2f8dc-05d3-4188-bbd3-fc0cdf6a06a2',NULL,'47533656','https://www.zhihu.com/question/47533656','\n\n如何对待“工资待遇xxxx以下我是不会去的”面试人员？','1','\n<p>昨天我们公司去某学校招聘，今天就一位学生的情况与负责招聘的HR进行了讨论，觉得是一个挺有意思的案例，发到这里来和大家一起探讨。<br></p><p>（我是有看法的，但是先不写出来以避免误导，晚一点会补充）</p><p>OK,现在开始补充了，大家可以看我的回答（<a href=\"https://www.zhihu.com/question/47533656/answer/106467331\" class=\"internal\"><span class=\"invisible\">https://www.</span><span class=\"visible\">zhihu.com/question/4753</span><span class=\"invisible\">3656/answer/106467331</span><span class=\"ellipsis\"></span></a>)</p><br><p>有人说把这个问题发到知乎是小题大做，是求安慰，其实真不是啊，我们只是觉得有一个挺有意思的问题，值得从更多的人那里学到知识和经验。</p><img src=\"https://pic3.zhimg.com/d8059ca137056bf3b1f479317daaaba6_b.png\" data-rawwidth=\"343\" data-rawheight=\"123\" class=\"content_image\">…\n<a href=\"javascript:;\" class=\"toggle-expand\">显示全部</a>\n','11228381','11','235','133',NULL,'1','1','2016-06-17 16:43:38','2016-06-17 16:43:38',NULL),('ce4261cf-c970-4292-b9b7-3e9d9d205ba0',NULL,'47533656','https://www.zhihu.com/question/47533656','\n\n如何对待“工资待遇xxxx以下我是不会去的”面试人员？','1','\n<p>昨天我们公司去某学校招聘，今天就一位学生的情况与负责招聘的HR进行了讨论，觉得是一个挺有意思的案例，发到这里来和大家一起探讨。<br></p><p>（我是有看法的，但是先不写出来以避免误导，晚一点会补充）</p><p>OK,现在开始补充了，大家可以看我的回答（<a href=\"https://www.zhihu.com/question/47533656/answer/106467331\" class=\"internal\"><span class=\"invisible\">https://www.</span><span class=\"visible\">zhihu.com/question/4753</span><span class=\"invisible\">3656/answer/106467331</span><span class=\"ellipsis\"></span></a>)</p><br><p>有人说把这个问题发到知乎是小题大做，是求安慰，其实真不是啊，我们只是觉得有一个挺有意思的问题，值得从更多的人那里学到知识和经验。</p><img src=\"https://pic3.zhimg.com/d8059ca137056bf3b1f479317daaaba6_b.png\" data-rawwidth=\"343\" data-rawheight=\"123\" class=\"content_image\">…\n<a href=\"javascript:;\" class=\"toggle-expand\">显示全部</a>\n','11228381','11','236','134',NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL);

/*Table structure for table `c_z_quiz_agree` */

DROP TABLE IF EXISTS `c_z_quiz_agree`;

CREATE TABLE `c_z_quiz_agree` (
  `id` varchar(64) NOT NULL COMMENT '知乎点赞表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `type` varchar(64) DEFAULT NULL COMMENT '点赞类型',
  `answer` varchar(64) DEFAULT NULL COMMENT 'czanswer回答id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎回答id',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `user` varchar(64) DEFAULT NULL COMMENT 'czuser用户id',
  `time` varchar(100) DEFAULT NULL COMMENT '点赞时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_quiz_agree` */

/*Table structure for table `c_z_quiz_follow` */

DROP TABLE IF EXISTS `c_z_quiz_follow`;

CREATE TABLE `c_z_quiz_follow` (
  `id` varchar(64) NOT NULL COMMENT '标签表id',
  `quiz_id` varchar(64) DEFAULT NULL COMMENT '问题id',
  `name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `uid` varchar(64) DEFAULT NULL COMMENT '用户id',
  `href` varchar(500) DEFAULT NULL COMMENT '用户个人中心地址',
  `brief` varchar(300) DEFAULT NULL COMMENT '标签简介',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_quiz_follow` */

/*Table structure for table `c_z_quiz_log` */

DROP TABLE IF EXISTS `c_z_quiz_log`;

CREATE TABLE `c_z_quiz_log` (
  `id` varchar(64) NOT NULL COMMENT '知乎问题表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎url访问id',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `name` varchar(64) DEFAULT NULL COMMENT '标题',
  `cid` varchar(64) DEFAULT NULL COMMENT '<meta itemprop="visitsCount" content="1191417">',
  `detail` varchar(300) DEFAULT NULL COMMENT '简介',
  `rid` varchar(64) DEFAULT NULL COMMENT 'data-resourceid="707751"',
  `handle` varchar(500) DEFAULT NULL COMMENT '操作',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_quiz_log` */

/*Table structure for table `c_z_quiz_tags` */

DROP TABLE IF EXISTS `c_z_quiz_tags`;

CREATE TABLE `c_z_quiz_tags` (
  `id` varchar(64) NOT NULL COMMENT '标签表id',
  `quiz_id` varchar(64) DEFAULT NULL COMMENT '问题id',
  `name` varchar(64) DEFAULT NULL COMMENT '类别名',
  `fid` varchar(64) DEFAULT NULL COMMENT '关注知乎该标签所需要的ID',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `brief` varchar(300) DEFAULT NULL COMMENT '标签简介',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_quiz_tags` */

insert  into `c_z_quiz_tags`(`id`,`quiz_id`,`name`,`fid`,`href`,`brief`,`remark`,`app_id`,`party_id`,`created_at`,`updated_at`,`deleted_at`) values ('01bf8928-a7b2-45cd-b7d2-9fb99fff1d5e','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:25:45','2016-06-17 16:25:45','2016-06-17 16:29:16'),('0725a907-4ee3-4773-a586-774a6cb7bff9','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:29:16','2016-06-17 16:29:16','2016-06-17 16:30:14'),('0989c18e-9e39-4a02-8a15-43d437be8331','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('0beabff3-59b8-491d-b831-49687a1eba16','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:38:51','2016-06-17 16:38:51','2016-06-17 16:43:38'),('15d5108f-ee20-4e75-b428-193ac9592b77','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25','2016-06-17 16:16:54'),('29d47564-43ef-4351-adf6-dd40f8f132a2','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:34:57','2016-06-17 16:34:57','2016-06-17 16:37:22'),('35eab72d-4b0b-4f3b-8b9d-61bb7fb0b853','31539758','\n蒙古\n','19602805','/topic/19602805',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('364d12a1-e31c-444c-972f-e2d19ad731bb','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:23:23','2016-06-17 16:23:23','2016-06-17 16:25:34'),('3f37ae2b-03a1-49fc-a4ef-01ed4b19453a','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:30:14','2016-06-17 16:30:14','2016-06-17 16:30:14'),('412658d2-723a-4208-8678-b10427e7a353','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:25:45','2016-06-17 16:25:45','2016-06-17 16:29:16'),('424b0ae3-a003-4601-9741-5f92f9eb5ec4','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:19:56','2016-06-17 16:19:56','2016-06-17 16:22:08'),('4d930dd7-2260-4713-9129-792629dc0a70','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:29:16','2016-06-17 16:29:16','2016-06-17 16:30:14'),('62528553-a4c4-4abf-a529-b8efdc00df3b','31539758','\n室友矛盾\n','19920977','/topic/19920977',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('638c0858-9f7b-4343-b6df-1c09df567413','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:38:16','2016-06-17 16:38:16','2016-06-17 16:38:51'),('657a87fe-7d80-47fc-8ed9-9f182de246e5','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54','2016-06-17 16:19:56'),('75e2b8c0-1572-4642-ba64-107245c7827d','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:44:58','2016-06-17 16:44:58',NULL),('7e159abe-adb7-437f-b870-d368dbbd8f09','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34','2016-06-17 16:25:34'),('82d83548-ee54-4c5b-ab5e-fbd2a090ac90','31539758','\n室友\n','19733504','/topic/19733504',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('87eddf88-e903-46f9-a6e8-1901f6e12b49','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:43:37','2016-06-17 16:43:37','2016-06-17 16:44:58'),('9170ce06-0b12-46b1-a3ea-2c428e95a622','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:34:57','2016-06-17 16:34:57','2016-06-17 16:37:22'),('95274d01-9661-4e5c-8851-483eed4a290e','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:37:22','2016-06-17 16:37:22','2016-06-17 16:38:16'),('9d41d7f0-9f36-4a69-9389-5867dbb0ca34','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:23:23','2016-06-17 16:23:23','2016-06-17 16:25:34'),('a7e5d907-f5f3-42f6-885d-4116db24af36','31539758','\n室友关系\n','19712093','/topic/19712093',NULL,NULL,'1','1','2016-06-17 15:37:49','2016-06-17 15:37:49',NULL),('b15947db-8360-45f4-98a9-340557c6924d','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:11:25','2016-06-17 16:11:25','2016-06-17 16:16:54'),('b24e57dd-d838-4185-a2fa-1103a6516867','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:38:16','2016-06-17 16:38:16','2016-06-17 16:38:51'),('b34b9947-61e1-4c06-8f5d-6cd6fac1986a','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:16:54','2016-06-17 16:16:54','2016-06-17 16:19:56'),('b57cb2bd-5353-43a2-a54a-d5f8c3ca0390','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:22:08','2016-06-17 16:22:08','2016-06-17 16:23:24'),('bf4c13f1-2c5b-408f-812d-1212efc30f45','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:43:37','2016-06-17 16:43:37','2016-06-17 16:44:58'),('c6ba67c0-8aa2-4c4e-aa87-a15b0c348abf','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:38:51','2016-06-17 16:38:51','2016-06-17 16:43:38'),('c7e84c2d-f163-4f23-b561-cb8a9de182e2','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:30:14','2016-06-17 16:30:14','2016-06-17 16:30:14'),('c8a9834a-8301-49f5-9a49-fd9ff7e07c84','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:19:56','2016-06-17 16:19:56','2016-06-17 16:22:08'),('d8323b4d-18de-4556-8ce3-d466adb2f13e','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:37:22','2016-06-17 16:37:22','2016-06-17 16:38:16'),('e4af9a3f-0302-4ad9-bbb6-3c6338d8a062','47533656','\n程序员\n','19552330','/topic/19552330',NULL,NULL,'1','1','2016-06-17 16:25:34','2016-06-17 16:25:34','2016-06-17 16:25:34'),('faced92e-88c0-4cce-aba2-52648f8880a2','47533656','\n工资待遇\n','19774000','/topic/19774000',NULL,NULL,'1','1','2016-06-17 16:22:08','2016-06-17 16:22:08','2016-06-17 16:23:24');

/*Table structure for table `c_z_tags` */

DROP TABLE IF EXISTS `c_z_tags`;

CREATE TABLE `c_z_tags` (
  `id` varchar(64) NOT NULL COMMENT '标签表id',
  `type_id` varchar(64) DEFAULT NULL COMMENT '类别id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `name` varchar(64) DEFAULT NULL COMMENT '类别名',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎id',
  `fid` varchar(64) DEFAULT NULL COMMENT '关注知乎该标签所需要的ID',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `pic` varchar(500) DEFAULT NULL COMMENT '图片地址',
  `brief` varchar(300) DEFAULT NULL COMMENT '标签简介',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_tags` */

/*Table structure for table `c_z_type` */

DROP TABLE IF EXISTS `c_z_type`;

CREATE TABLE `c_z_type` (
  `id` varchar(64) NOT NULL,
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `name` varchar(64) DEFAULT NULL COMMENT '类别名',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎id',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_type` */

/*Table structure for table `c_z_user` */

DROP TABLE IF EXISTS `c_z_user`;

CREATE TABLE `c_z_user` (
  `id` varchar(64) NOT NULL COMMENT '知乎问题表id',
  `pid` varchar(64) DEFAULT NULL COMMENT '上次记录id',
  `uid` varchar(64) DEFAULT NULL COMMENT '知乎url访问id',
  `ucode` varchar(64) DEFAULT NULL COMMENT '知乎用户唯一编码',
  `href` varchar(500) DEFAULT NULL COMMENT '访问地址',
  `name` varchar(64) DEFAULT NULL COMMENT '用户名',
  `avatar` varchar(300) DEFAULT NULL COMMENT '头像',
  `brief` varchar(300) DEFAULT NULL COMMENT '用户个性签名',
  `describe` varchar(1000) DEFAULT NULL COMMENT '描述',
  `sex` varchar(12) DEFAULT NULL COMMENT '性别',
  `followees` int(20) DEFAULT NULL COMMENT '关注人数',
  `followers` int(20) DEFAULT NULL COMMENT '多少人关注',
  `columns` varchar(200) DEFAULT NULL COMMENT '关注了多少专栏',
  `topics` varchar(200) DEFAULT NULL COMMENT '关注了多少话题',
  `agree` int(20) DEFAULT NULL COMMENT '多少个赞同',
  `thanks` int(20) DEFAULT NULL COMMENT '多少个感谢',
  `asks` int(20) DEFAULT NULL COMMENT '多少个提问',
  `answers` int(20) DEFAULT NULL COMMENT '多少个回答',
  `posts` int(11) DEFAULT NULL COMMENT '多少篇文章',
  `view` int(11) DEFAULT NULL COMMENT '主页被多少人浏览',
  `weibo` varchar(300) DEFAULT NULL COMMENT '微博是否显示,显示会是微博地址',
  `location` varchar(500) DEFAULT NULL COMMENT '地址',
  `business` varchar(300) DEFAULT NULL COMMENT '行业',
  `employment` varchar(200) DEFAULT NULL COMMENT '公司',
  `positions` varchar(200) DEFAULT NULL COMMENT '职业',
  `education` text COMMENT '教育',
  `education_extra` varchar(200) DEFAULT NULL COMMENT '学校专业',
  `share` int(12) DEFAULT NULL COMMENT '被分享次数',
  `collect` int(11) DEFAULT NULL COMMENT '收藏次数',
  `marked` varchar(500) DEFAULT NULL COMMENT '被编辑收录回答次数',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `app_id` varchar(32) DEFAULT NULL COMMENT '应用id',
  `party_id` varchar(32) DEFAULT NULL COMMENT '机构id',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `c_z_user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
