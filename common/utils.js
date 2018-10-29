/**
 * 自定义的工具库
 */
const config = require("./config");

module.exports = {
    /**
     * 日志输出
     */
    log(...args) {
        if (!config.dev) return;
        console.log("\x1B[32m%s\x1B[39m", ...args);
    }
}