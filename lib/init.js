/**
 * 1.启动数据库连接
 * 2.检测模型对象
 */
const Data = require("../db/data");
const Sequelize = require('sequelize');
const debug = require("debug")("webcore:init");
const Models = require("./models");
const utils = require("../common/utils");

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
                type: utils.getType(item.Type),
                defaultValue: item.Default
            }
        }
    });
    Data.connection.define(name, model, {
        freezeTableName: true,
    });
    Models.set(name, model);
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