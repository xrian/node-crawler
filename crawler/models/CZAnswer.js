"use strict";

module.exports = function(sequelize,Sequelize){
	var CZAnswer = sequelize.define(
		'CZAnswer',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '知乎回答表id'
			},
			'pid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '旧记录id'
			},
			'quizId' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'field' : 'quiz_id',
				'comment' : '问题id'
			},
			'aid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎中的记录id'
			},
			'href' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '访问地址'
			},
			'token' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '回答标记id'
			},
			'tokenUrl' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'field' : 'token_url',
				'comment' : 'html书签,跳转到回答的地方'
			},
			'userId' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'field' : 'user_id',
				'comment' : '回答用户id'
			},
			'name' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '用户名'
			},
			'ucode' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '用户代码'
			},
			'detail' : {
				'type' : Sequelize.TEXT,
				'allowNull': true,
				'comment' : '回答详情'
			},
			'agree' : {
				'type' : Sequelize.STRING(20),
				'allowNull': true,
				'comment' : '赞同数'
			},
			'comment' : {
				'type' : Sequelize.STRING(20),
				'allowNull': true,
				'comment' : '评论数'
			},
			'create' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'comment' : '评论数'
			},
			'update' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'comment' : '评论数'
			},
			'remark' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '备注'
			},
			'party_id' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'defaultValue' : 1,
				'comment' : '机构id'
			},
			'app_id' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'defaultValue' : 1,
				'comment' : '应用id'
			}
		},{
			comment : '知乎中的回答表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_answer', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZAnswer;
}
