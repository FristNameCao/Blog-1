const redis = require('redis')
const { REDIS_CONF } = require('../contfig/db')

// 创建客户端
const redisClient = redis.createClient({
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
})


redisClient.connect()


redisClient.on('connect', () => {
    console.log('连接成功');
});


async function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    await redisClient.set(key, val, redis.print)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key).then(res => {
            if (res === null) {
                resolve(null)
            }
            try {
                resolve(JSON.parse(res))
            } catch (e) {
                reject(e)
            }
        }).catch(e => {
            reject(e)
        })
    })
}

module.exports = {
    set,
    get
}
