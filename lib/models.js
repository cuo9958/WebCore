/**
 * 记录数据库的各种对象
 */
const data_models = new Map();
module.exports = {
    /**
     * 添加一个对象
     * @param {*} name 
     * @param {*} data 
     */
    set(name, data) {
        data_models.set(name, data);
    },
    /**
     * 是否存在对象，或者是否存在对象的属性
     * @param {*} name 
     * @param {*} key 
     */
    has(name, key) {
        if (key === undefined) return data_models.has(name);
        const data = data_models.get(name);
        if (data === undefined) return null;
        return data[key];
    },
    /**
     * 获取单个的对象
     * @param {*} name 
     */
    get(name) {
        return data_models.get(name);
    }
}