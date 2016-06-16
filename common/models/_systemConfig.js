"use strict";

module.exports = function(sequelize,Sequelize){
	var _systemConfig = sequelize.define(
		'_systemConfig',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '系统配置表id'
			},
			'name' : {
				'type' : Sequelize.STRING(100),
				'allowNull': true,
				'comment' : '说明'
			},
			'type' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'comment' : '该记录类型'
			},
			'val' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '值'
			},
			'code' : {
				'type' : Sequelize.STRING(64),
				'allowNull': false,
				'comment' : '编码'
			},
			'remark' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '备注'
			},
			'party_id' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'comment' : '机构id'
			},
			'app_id' : {
				'type' : Sequelize.STRING(32),
				'allowNull': true,
				'comment' : '应用id'
			}
		},{
			comment : '系统配置表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : '_system_config', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return _systemConfig;
}
