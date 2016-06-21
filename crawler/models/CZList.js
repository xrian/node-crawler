"use strict";

module.exports = function(sequelize,Sequelize){
	var CZList = sequelize.define(
		'CZList',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '待爬取id'
			},
			'type' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '类型'
			},
			'uid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎记录id'
			},
			'code' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '编码,system_config表code '
			},
			'href' : {
				'type' : Sequelize.STRING(500),
				'allowNull': true,
				'comment' : '访问地址'
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
			comment : '需要爬取链接id',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_list', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZList;
}
