const { exec, escpape } = require("../db/mysql")
const { genPassword } = require("../utils/cryp")
const login = ((username, password) => {

    username = escpape(username)
    // 生成加密密码
    password = genPassword(password)
    password = escpape(password)
    console.log(password)
    const sql = `select username,realname from 
    users where username = ${username} and password = ${password}; `
    return exec(sql).then((rows) => {
        return rows[0] || {}
    })
    // if(username === 'caozhi' && password === '123456'){
    //     console.log('登录成功')
    //     return true
    // }
    // return false
})

module.exports = {
    login
}