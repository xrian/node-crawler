"use strict";

module.exports = function(sequelize,Sequelize){
	var CZError = sequelize.define(
		'CZError',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : 'id'
			},
			'type' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '类型(提示,警告,错误)'
			},
			'filename' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '文件名'
			},
			'uid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '录id'
			},
			'maybe' : {
				'type' : Sequelize.STRING(200),
				'allowNull': true,
				'comment' : '可能的原因'
			},
			'msg' : {
				'type' : Sequelize.STRING(2000),
				'allowNull': true,
				'comment' : '错误提示'
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
			comment : '错误表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_error', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZError;
}
