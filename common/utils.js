/**
 * 自定义的工具库
 */
const config = require("./config");
const Sequelize = require('sequelize');

module.exports = {
    /**
     * 日志输出
     */
    log(...args) {
        if (!config.dev) return;
        console.log("\x1B[32m%s\x1B[39m", ...args);
    },
    /**
     * 获取类型
     * @param {*} typestr 
     */
    getType(typestr) {
        if (typestr.indexOf("int") === 0) return Sequelize.INTEGER;
        if (typestr.indexOf("varchar") === 0) return Sequelize.STRING;
        if (typestr.indexOf("text") === 0) return Sequelize.TEXT;
        if (typestr.indexOf("tinyint") === 0) return Sequelize.TINYINT;
        if (typestr.indexOf("date") === 0) return Sequelize.DATE;
        if (typestr.indexOf("time") === 0) return Sequelize.TIME;


        if (typestr.indexOf("number") === 0) return Sequelize.INTEGER;
        if (typestr.indexOf("string") === 0) return Sequelize.STRING;
    },
    /**
     * 获取默认值
     * @param {*} typestr 
     */
    getDefaultValue(typestr) {
        if (typestr.indexOf("number") === 0) return 0;
        if (typestr.indexOf("string") === 0) return "";
    },
    /**
     * 根据类型返回
     * @param {*} typestr 
     */
    getDBType(typestr) {
        if (typestr.indexOf("number") === 0) return "int";
        if (typestr.indexOf("string") === 0) return "varchar(255)";
    }
}