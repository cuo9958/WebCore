/**
 * 测试各种方式使用库
 */
const debug = require("debug")("test");
const webcore = require("../index");

webcore.Init();

setTimeout(() => {

    //测试普通类型
    //创建对象，背后查询表是否存在
    let data1 = new webcore.Data.Object("test1");

    //是否需要new一个对象
    data1.set("Title", "标题");

    data1.save();

    // //查询类
    // let data2 = webcore.Data.query("test_data");

    // //promise
    // let model2 = data2.get(2);

    // let title = data2.get("title");

    // let model3 = data2.select({
    //     id: 3
    // });

    // let model4 = data2.first({
    //     id: 3
    // });
}, 1000);