# node-crawler
简单的node知乎爬虫
已实现功能
  1.根据问题id,获取该问题的描述信息.
  2.根据问题id,获取该问题的全部回答.
  3.根据问题id,获取关注该问题的用户id,昵称.
  4.根据用户id,获取该用户的详细信息.
  5.可以获取知乎的全部主题,并且可以根据主题获取全部的子标签
使用mysql数据库存储数据
主要使用模块express,ejs,superagent,cheerio,async,log4js,sequelize
