"use strict";


module.exports = function(sequelize,Sequelize){
	var CZUser = sequelize.define(
		'CZUser',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '知乎用户表id'
			},
			'pid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '上次记录id'
			},
			'uid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎uri访问id'
			},
			'ucode' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎用户唯一编码'
			},
			'href' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '访问地址'
			},
			'name' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '用户名'
			},
			'avatar' : {
				'type' : Sequelize.STRING(300),
				'allowNull': true,
				'comment' : '头像url'
			},
			'brief' : {
				'type' : Sequelize.STRING(300),
				'allowNull': true,
				'comment' : '用户一句话描述'
			},
			'describe' : {
				'type' : Sequelize.STRING(1000),
				'allowNull': true,
				'comment' : '详细说明'
			},
			'sex' : {
				'type' : Sequelize.STRING(10),
				'allowNull': true,
				'defaultValue' : '未知',
				'comment' : '性别'
			},
			'followees' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '关注了多少人'
			},
			'followers' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '多少人关注'
			},
			'columns' : {
				'type' : Sequelize.STRING(200),
				'allowNull': true,
				'comment' : '关注了多少专栏'
			},
			'topics' : {
				'type' : Sequelize.STRING(200),
				'allowNull': true,
				'comment' : '关注了多少话题'
			},
			'agree' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '收获多少赞同'
			},
			'thanks' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '收获多少感谢'
			},
			'asks' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '多少个提问'
			},
			'answers' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '多少个回答'
			},
			'posts' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '多少篇文章'
			},
			'view' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '多少人浏览主页'
			},
			'weibo' : {
				'type' : Sequelize.STRING(200),
				'allowNull': true,
				'comment' : '微博地址'
			},
			'location' : {
				'type' : Sequelize.STRING(1000),
				'allowNull': true,
				'comment' : '目前所在地'
			},
			'business' : {
				'type' : Sequelize.STRING(1000),
				'allowNull': true,
				'comment' : '行业'
			},
			'employment' : {
				'type' : Sequelize.STRING(1000),
				'allowNull': true,
				'comment' : '公司'
			},
			'positions' : {
				'type' : Sequelize.STRING(1000),
				'allowNull': true,
				'comment' : '职业'
			},
			'education' : {
				'type' : Sequelize.TEXT,
				'allowNull': true,
				'comment' : '教育经历'
			},
			'educationExtra' : {
				'type' : Sequelize.STRING(1000),
				'allowNull': true,
				'field' : 'education_extra',
				'comment' : '专业'
			},
			'share' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '被分享次数'
			},
			'collect' : {
				'type' : Sequelize.INTEGER,
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '收藏次数'
			},
			'marked' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'defaultValue' : 0,
				'comment' : '被编辑收录回答次数'
			},
			'remark' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '备注'
			},
			'app_id' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'defaultValue' : 1,
				'comment' : '应用id'
			},
			'party_id' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'defaultValue' : 1,
				'comment' : '机构id'
			}
		},{
			comment : '知乎用户表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_user', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZUser;
}
