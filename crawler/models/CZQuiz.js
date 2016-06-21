"use strict";

module.exports = function(sequelize,Sequelize){
	var CZQuiz = sequelize.define(
		'CZQuiz',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '知乎问题表id'
			},
			'pid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '旧记录id'
			},
			'uid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎中的记录id'
			},
			'href' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '访问地址'
			},
			'name' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '标题'
			},
			'cid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : 'count的值'
			},
			'detail' : {
				'type' : Sequelize.TEXT,
				'allowNull': true,
				'comment' : '问题详情'
			},
			'rid' : {
				'type' : Sequelize.STRING(20),
				'allowNull': true,
				'comment' : '问题描述详情id'
			},
			'comment' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '评论数'
			},
			'follow' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎中的记录id'
			},
			'answer' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '关注该问题的人数'
			},
			'remark' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '备注'
			},
			'app_id' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'defaultValue' : 1,
				'comment' : '应用id'
			}
		},{
			comment : '知乎中的问题表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_quiz', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZQuiz;
}
