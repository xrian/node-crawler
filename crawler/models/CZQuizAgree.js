"use strict";

module.exports = function(sequelize,Sequelize){
	var CZQuizAgree = sequelize.define(
		'CZQuizAgree',
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
			'type' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '点赞类型'
			},
			'answer' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '问题id'
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
			'user' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '回答用户id'
			},
			'time' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '点赞时间'
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
			comment : '知乎中的点赞表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_quiz_agree', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZQuizAgree;
}
