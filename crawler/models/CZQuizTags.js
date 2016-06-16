"use strict";

module.exports = function(sequelize,Sequelize){
	var CZQuizTags = sequelize.define(
		'CZQuizTags',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '问题标签表id'
			},
			'quizId' : {
				'type' : Sequelize.STRING(64),
				'field' : 'quiz_id',
				'allowNull': false,
				'comment' : '问题id'
			},
			'name' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '标签名'
			},
			'fid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '关注知乎该标签所需要的ID'
			},
			'href' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '访问地址'
			},
			'brief' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '简介'
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
			comment : '知乎中的问题标签表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_quiz_tags', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZQuizTags;
}
