# node-crawler
# 简单的node知乎爬虫
已实现功能<br>
- 
  1.根据问题id,获取该问题的描述信息.[这网页的内容](https://www.zhihu.com/question/26792975)<br>
  2.根据问题id,获取该问题的全部回答.[这网页的内容](https://www.zhihu.com/question/26792975)<br>
  3.根据问题id,获取关注该问题的用户id,昵称.[这网页的内容](https://www.zhihu.com/question/26792975/followers)<br>
  4.根据用户id,获取该用户的详细信息.[这网页的内容](https://www.zhihu.com/people/wo-de-dai-ma-bei-mao-chi-liao/about)<br>
  5.可以获取知乎的全部主题,并且可以根据主题获取全部的子标签.[这网页的内容](https://www.zhihu.com/topic)<br>
使用mysql数据库存储数据<br>
主要使用模块express,ejs,superagent,cheerio,async,log4js,sequelize<br>

项目说明
-
项目使用MVC设计思想,分为三层<br>
* 模型层是crawler/models文件夹和crawler/servlet文件夹下文件<br>
* 视图层views目录下文件<br>
* 控制器层是crawler/controller和routes目录下文件<br>
<br>
因为使用sequelize作为ORM框架,crawler/models目录存放的是对应数据库表结构,crawler/index.js文件加载进内存<br>
crawler/servlet中包含了对单个数据表操作的方法<br>
crawler/controller中是各个功能的具体实现代码,而routes只是做路由跳转功能,可以看到已经实现的方法<br>
_system_config是系统配置表,会在系统启动成功后将该表数据加载到内存中.<br>
- 
刚开始学node的时候,看到sequelize这框架不错,但是资料太少,就想写个爬虫玩玩,熟悉下node以及sequelize,但是写到一半发现这东西实用性不高,所以只实现了爬虫的基础功能,没实现太多逻辑功能.
只是抓取到数据,保存到数据库,直接将数据库数据显示在页面(似乎是知乎对图片做了防盗链处理,会显示很多空白区域),页面只是几个div循环输出,很丑😭OTZ

使用方法
-
在mysql数据库建立node-crawler数据库,字符集为utf8 - utf8_general_ci导入根目录sql文件<br>
打开[网页](https://www.zhihu.com/topic),使用开发者工具network功能,往下翻会自动加载下一页,找到TopicFeedList这个请求,将cookie和请求参数总的_xsrf复制出来<br>
将cookie填到config/zhihu.json中的cookie中,在数据库执行
UPDATE `node-crawler`.`_system_config` SET `val`='_xsrf' WHERE `id`='1466042978';(其中_xsrf就是刚刚复制出来的值)<br>
打开控制台,进入项目文件夹根目录<br>npm install<br>完成后<br>node bin/www<br>既可启动<br>
<br>
爬取数据  http://localhost:3000/zhihu/chance?q=问题id<br>
查看爬取后的内容  http://localhost:3000/zhihu/list<br>
文件目录说明
-
```
bin
  www       启动文件
common      公共目录
  models
    _systemConfig.js     _system_config表的实体
  servlet
    _systemConfig.js    一些常用操作_system_config表的方法
config      配置文件
crawler     爬虫代码
  controller     主要逻辑代码目录
  models         实体
  servlet        模型
logs        日志文件
node_modules    插件列表
public      静态资源
routes    路由<br>
utils     工具类<br>
views     视图文件<br>
```
表说明
-
c_z_answer  保存用户回答<br>
c_z_error   保存报错信息<br>
c_z_follow  (没用到)<br>
c_z_list    (没用到)<br>
c_z_quiz    保存问题信息<br>
c_z_quiz_agree  (没用到)<br>
c_z_quiz_follow  保存关注问题的用户<br>
c_z_quiz_tags   保存问题的标签<br>
c_z_tags   保存知乎的标签<br>
c_z_type   保存主题<br>
c_z_user   保存知乎的用户（没用到)<br>


其他
-
crawler/controller下的文件是主要功能实现代码<br>
follow.js实现的是根据问题id获取关注该问题的用户<br>
login.js是在网上找的模拟登录知乎的方法,不过我没用到<br>
main.js主要是爬取后,查询数据,将数据显示到页面的方法<br>
quiz.js实现的是抓取问题详情页并将数据保存到数据库总<br>
tags.js实现了将问题详情页总问题标签保存到数据库中.还有爬取知乎全部主题,并且根据主题获取该主题下全部的子标签<br>
user.js实现的是根据用户唯一code(该code用户可以修改一次,并不是知乎数据库表中的主键)获取用户详情页的信息<br>
<br>
如果想改进,可以先获取子标签,再获取该标签下的问题列表,爬取问题信息,获取到回答问题和关注问题的用户,然后再获取用户详细信息.
也就是加几个逻辑就行.我发现我如果这样做,如果爬取频率太高可能会被封ip,如果频率低,那爬数据效率又慢.所以就放弃了
