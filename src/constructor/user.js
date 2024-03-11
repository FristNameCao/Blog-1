const { exec } = require("../db/mysql")

const login = ((username, password) => {

    const sql = `select username,realname from 
    users where username = '${username}' and password = '${password}'; `
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