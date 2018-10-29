/**
 * 1.启动数据库连接
 * 2.检测模型对象
 */
const Data = require("../db/data");
const Sequelize = require('sequelize');
const debug = require("debug")("webcore:init");

/**
 * 转化类型
 * @param {*} typestr 
 */
function getType(typestr) {
    if (typestr.indexOf("int") === 0) return Sequelize.INTEGER;
    if (typestr.indexOf("varchar") === 0) return Sequelize.STRING;
    if (typestr.indexOf("text") === 0) return Sequelize.TEXT;
    if (typestr.indexOf("tinyint") === 0) return Sequelize.TINYINT;
    if (typestr.indexOf("date") === 0) return Sequelize.DATE;
    if (typestr.indexOf("time") === 0) return Sequelize.TIME;
}
/**
 * 获取表信息
 * @param {*} name 
 */
async function getInfo(name) {
    let data = await Data.showTable(name);
    data = data[0];
    let model = {}
    data.forEach(item => {
        const key = item.Field;
        if (key === "id") {
            model[key] = {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            }
        } else {
            model[key] = {
                type: getType(item.Type),
                defaultValue: item.Default
            }
        }
    });
    Data.connection.define(name, model, {
        freezeTableName: true,
    });
    return model;
}

async function init() {
    //查询所有表
    const list = await Data.TableList();
    let que = [];
    list.forEach(item => {
        que.push(getInfo(item["Tables_in_" + Data.connection.config.database]));
    });
    await Promise.all(que);
    debug("查询表结构并导入到Sequelize");

}
module.exports = init;