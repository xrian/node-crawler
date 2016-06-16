"use strict";

module.exports = function(sequelize,Sequelize){
	var CZFollow = sequelize.define(
		'CZFollow',
		{
			'id' : {
				'type' : Sequelize.UUID,
				'primaryKey' : true,		//主键
				'unique' : true,				//是否唯一
				'allowNull': false,
				'defaultValue' : Sequelize.UUIDV4,
				'comment' : '知乎关注表id'
			},
			'pid' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '旧记录id'
			},
			'user' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '用户c_z_user表id'
			},
			'follow' : {
				'type' : Sequelize.STRING(64),
				'allowNull': true,
				'comment' : '粉丝c_z_user表id'
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
			comment : '知乎中的关注表',
			timestamps : true,
			paranoid : true,
			deletedAt : 'deleted_at', //删除字段deletedAt别名
			freezeTableName : true,   //是否自定义表名
			tableName : 'c_z_follow', //自定义表名
			underscored : true    //使用驼峰命名法
		}
	);
	return CZFollow;
}
