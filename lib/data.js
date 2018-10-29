/**
 * 保存普通类型的数据
 * 根据不同的方法进行不同的预操作
 * 最后全都返回DataObject对象
 */
const db = require("../db/data");
const debug = require("debug")("webcore:data");
const Sequelize = require('sequelize');

/**
 * 数据存储对象
 */
class DataObject {

    constructor(name) {
        debug("创建表对象", name);
        this.name = name;
        //检测是否存在表
        try {
            this._define = db.connection.model(name);
        } catch (error) {
            this._define = {};
            this.create();
        }
    }
    /**
     * 添加表
     */
    create() {
        db.connection.define(this.name, {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
            },
        }, {
            freezeTableName: true,
        });
        this._define = db.connection.model(this.name);
        this._define.sync();
        debug("创建一个新的表", this.name);
    }
    /**
     * 设置属性和值
     * @param {*} key 
     * @param {*} val 
     */
    set(key, val) {
        console.log("设置")
        if (!this._data) this._data = {};
    }
    /**
     * 获取值
     * @param {*} key 
     */
    get(key) {
        console.log("查询")
    }
    save() {}
    select() {}
    first() {
        db.test()
    }
}

/**
 * 接口：
 * 1.自定义数据库
 * 2.添加数据
 * 3.删除数据
 * 4.修改数据
 * 5.查询数据，id、列表等
 */
module.exports = {
    /**
     * 基本类
     */
    Object: DataObject,
    /**
     * 创建一个可以使用的表，会进行字段比较
     * @param {*} name 
     */
    create: async function (name) {

        return new DataObject(name, model);
    },
    query(name) {
        console.log("查询")
        return new DataObject(name);
    },
}