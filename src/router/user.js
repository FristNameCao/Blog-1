const { login } = require('../constructor/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')




const handleUserRouter = (req, res) => {
    const method = req.method
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = login(username, password)
        return result.then(data => {
            if (data?.username) {
                req.session.username = data.username
                req.session.realname = data.realname

                // 同步到redis
                set(req.sessionId, req.session)
                return new SuccessModel('登录成功')
            } else {
                return new ErrorModel('登录失败或用户不存在')
            }
        })
    }

    // 登录验证
    // if (method === 'GET' && req.path === '/api/user/isLogin') {
    //     if (req.session?.username) {
    //         return Promise.resolve(
    //             new SuccessModel({
    //                 session: req.session
    //             })
    //         )
    //     } else {
    //         return Promise.resolve(new ErrorModel('未登录'))
    //     }

    // }
}
module.exports = handleUserRouter