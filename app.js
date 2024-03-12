const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const { access } = require('./src/utils/logs')

// 过期时间设置
const getCookieExpries = () => {
    const d = new Date()
    d.setTime(d.getTime() + (1000 * 60 * 60 * 24))
    return d.toGMTString()
}

// 解析session
// const SESSION_DATA = {}

// POST 请求处理
const getPostData = (req) => {
    const promise = new Promise(async (resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        await req.on('data', chunk => {
            postData = postData + chunk.toString()

        })
        await req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}


const serverHandle = async (req, res) => {

    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置响应头 返回格式JSON
    res.setHeader('Content-type', 'application/json')

    // 获取请求路径处理path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query参数 
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieString = req.headers.cookie || ''
    cookieString.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析 session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // console.log('userId', userId)
    // if (!userId) {
    //     needSetCookie = true
    //     userId = `${Date.now()} _ ${Math.random()}`
    //     // 初始化redis中的session值
    //     // if (!SESSION_DATA[userId]) {
    //     //     SESSION_DATA[userId] = {}
    //     //     console.log('SESSION_DATA', SESSION_DATA)
    //     // }
    // }


    debugger
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()} _ ${Math.random()}`
        // 初始化redis中的session值
        set(userId, {})
    }

    // 获取 session
    req.sessionId = userId
    await get(req.sessionId).then(sessionData => {
        if (sessionData === null) {
            // 初始化redis中的session值
            set(req.sessionId, {})
            // 设置session
            req.session = {}
        } else {
            req.session = sessionData
        }
    })


    // 处理post data
    const postData = await getPostData(req)
    // 处理路由
    req.body = postData
    // 处理blog路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //     res.end(JSON.stringify(blogData))
    //     return
    // }



    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
        blogResult.then(blogData => {
            if (needSetCookie) {
                // 操作cookie
                res.setHeader(
                    'Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpries()}`
                )
            }
            res.end(JSON.stringify(blogData))
        })
        return
    }

    // 处理user路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //     res.end(JSON.stringify(userData))
    //     return
    // }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
        userResult.then(userData => {
            if (needSetCookie) {
                // 操作cookie
                res.setHeader(
                    'Set-Cookie', `userid=${userId};  path=/; httpOnly; expires=${getCookieExpries()}`
                )
            }
            res.end(JSON.stringify(userData))
        })
        return
    }
    // 未命中,404
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()


}

module.exports = serverHandle