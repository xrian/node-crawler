/**
 * Created by xrain on 16/6/7.
 * 该类返回知乎的cookies，来源：config文件夹下的知乎.json
 */

var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname,'..','config','zhihu.json');
var cookies = JSON.parse(fs.readFileSync(filePath, "utf8"));

module.exports = cookies;
