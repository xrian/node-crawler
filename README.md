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

使用方法
-
在mysql数据库建立node-crawler数据库,字符集为utf8 - utf8_general_ci导入根目录sql文件<br>
打开[网页😊](https://www.zhihu.com/topic),使用开发者工具network功能,往下翻会自动加载下一页,找到TopicFeedList这个请求,将cookie和请求参数总的_xsrf复制出来<br>
将cookie填到config/zhihu.json中的cookie中,在数据库执行
UPDATE `node-crawler`.`_system_config` SET `val`='_xsrf' WHERE `id`='1466042978';(其中_xsrf就是刚刚复制出来的值)<br>
打开控制台,进入项目文件夹根目录,npm install,完成后node bin/www既可启动

文件目录说明
-
bin
>www     启动文件
common   公共目录
>models
>>_systemConfig.js    _system_config表的实体
>servlet
>>_systemConfig.js    一些常用操作_system_config表的方法
config      配置文件
crawler     爬虫代码
>controller     主要逻辑代码目录
>models         实体
>servlet        模型
logs        日志文件
node_modules    插件列表
public    静态资源
routes    路由
utils     工具类
views     试图文件