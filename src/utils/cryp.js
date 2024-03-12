const crypto = require('crypto')
// 密匙
const SECRET_KEY = 'wjiol_8776#'

// md5 加密
function md5(str) {
    const md5 = crypto.createHash('md5')
    return md5.update(str).digest('hex')
}

// 加密函数
function genPassword(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}
module.exports = {
    genPassword
}