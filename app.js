const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

// POST 请求处理
const getPostData = (req) => {
    const promise = new Promise(async (resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
        }
        let postData = ''
        await req.on('data', chunk => {
            postData = postData + chunk.toString()

        })
        await req.on('end', () => {
            if (!postData) {
                resolve({})
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}


const serverHandle = async (req, res) => {
    // 设置响应头 返回格式JSON
    res.setHeader('Content-type', 'application/json')

    // 获取请求路径处理path
    const url = req.url
    req.path = url.split('?')[0]

    //解析query参数 
    req.query = querystring.parse(url.split('?')[1])

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
            res.end(JSON.stringify(blogData))
        })
        return
    }

    // 处理user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
        res.end(JSON.stringify(userData))
        return
    }
    // 未命中,404
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()


}

module.exports = serverHandle