let config = require("config");

/**
 * 默认的配置数据
 */
const def = {
    /**
     * 数据库配置
     */
    db: {
        /**
         * 普通类型的配置
         */
        data: {
            database: "test",
            usr: "root",
            pwd: "root",
            host: "127.0.0.1",
            port: '3306',
            dialect: 'mysql',
            pool: { //连接池设置
                max: 5, //最大连接数
                min: 0, //最小连接数
                idle: 10000
            },
        },
    },
    env: process.env.NODE_ENV || "development",
}

config = Object.assign({}, def, config);
config.dev = config.env === "development";
module.exports = config;