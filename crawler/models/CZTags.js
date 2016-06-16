"use strict";

module.exports = function(sequelize,Sequelize){
	var CZTags = sequelize.define(
		'CZTags',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '标签表id'
			},
			'pid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '旧记录id'
			},
			'typeId' : {
				'type' : Sequelize.STRING(64),
				'field' : 'type_id',
				'allowNull': false,
				'comment' : '旧记录id'
			},
			'name' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '类别名'
			},
			'uid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '知乎中的记录id'
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
			'pic' : {
				'type' : Sequelize.STRING(300),
				'allowNull': true,
				'comment' : '图片地址'
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
			comment : '知乎中的标签表,根据类别表获得',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_tags', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZTags;
}
