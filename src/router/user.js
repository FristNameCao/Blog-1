const { login } = require('../constructor/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data?.username) {
                return new SuccessModel('登录成功')
            } else {
                return new ErrorModel('登录失败或用户不存在')
            }
            // res.cookie('username', data.username, { maxAge: 1000 * 60 * 60 * 24 * 7 })
            // res.cookie('password', data.password, { maxAge: 1000 * 60 * 60 * 24 * 7 })
            // res.cookie()
        })
        // if (result) {
        //     return new SuccessModel('登录成功')
        // }
        // return new ErrorModel('登录失败')
    }
}
module.exports = handleUserRouter