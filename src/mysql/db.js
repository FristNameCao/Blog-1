const { MYSQL_CONF } = require('../contfig/db');

const mysql = require('mysql');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);



con.connect()



// 同意执行 sql的函数
function exex(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
    return promise
}


// // 关闭连接
// con.end()

module.exports = {
    exex
}
