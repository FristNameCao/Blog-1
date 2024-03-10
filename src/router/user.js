const { login } = require('../constructor/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        console.log(result)
        if (result) {
            return new SuccessModel('登录成功')
        }
        return new ErrorModel('登录失败')
    }
}
module.exports = handleUserRouter