const env = process.env.NODE_ENV //环境变量

// 配置
let MYSQL_CONF


if (env === 'development') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'qq123456',
        database: 'myblog'
    }

}

if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'qq123456',
        database: 'myblog'
    }

}

module.exports = {
    MYSQL_CONF
}