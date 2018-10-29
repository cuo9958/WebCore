/**
 * 加载配置好的数据库:普通sql类型
 * 1.提供各种操作基础函数
 * 2.根据情况选择不同的函数调用
 */
const debug = require("debug")("webcore:data:db");
const log = require("../common/utils").log;
const configs = require("../common/config");
const Sequelize = require('sequelize');

//数据连接状态
// let db_state = false;

const dbconfig = configs.db.data;

let connection = new Sequelize(dbconfig.database, dbconfig.usr, dbconfig.pwd, dbconfig);

log("创建数据库对象");

//验证数据库是否连接正确
// connection.authenticate().then(function () {
//     db_state = true;
// });

module.exports = {
    connection,
    /**
     * 列出所有的表
     */
    TableList() {
        return connection.showAllSchemas();
    },
    /**
     * 显示表字段
     * @param {*} name 
     */
    showTable(name) {
        return connection.query("desc " + name);
    },
}