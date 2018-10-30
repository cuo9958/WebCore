/**
 * 保存普通类型的数据
 * 根据不同的方法进行不同的预操作
 * 最后全都返回DataObject对象
 */
const db = require("../db/data");
const debug = require("debug")("webcore:data");
const Sequelize = require('sequelize');
const Models = require("./models");
const utils = require("../common/utils");

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
            this.isCreate = false;
        } catch (error) {
            this._define = {};
            this.isCreate = true;
            this.create();
        }
        this.pre_sql = "";
        this._data = {};
    }
    /**
     * 添加表
     */
    async create() {
        const model = {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        }
        this._define = db.connection.define(this.name, model, {
            freezeTableName: true,
        });
        Models.set(this.name, model);
        debug("创建一个新的表", this.name);
    }
    /**
     * 设置属性和值
     * @param {*} key 
     * @param {*} val 
     */
    set(key, val) {
        debug("设置值");
        if (!Models.has(this.name, key)) {
            let model = Models.get(this.name);
            model[key] = {
                type: utils.getType(typeof (val)),
                defaultValue: utils.getDefaultValue(typeof (val))
            }
            db.connection.define(this.name, model, {
                freezeTableName: true,
            });
            this.pre_sql = `alter table ${this.name} add ${key} ${utils.getDBType(typeof(val))} not Null;`;
        }
        if (!this._data) this._data = {};
        this._data[key] = val;
    }
    /**
     * 获取值
     * @param {*} key 
     */
    get(key) {
        console.log("查询")
    }
    /**
     * 保存一次本地数据
     */
    async save() {
        if (this.isCreate) await this._define.sync();
        const model = db.connection.models[this.name];
        if (!model) throw new Error("数据表不存在");
        if (this.pre_sql !== "") await db.connection.query(this.pre_sql);
        if (this._data.id) {
            await db.connection.models[this.name].upsert(this._data);
        } else {
            await db.connection.models[this.name].create(this._data);
        }
    }
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