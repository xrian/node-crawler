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
