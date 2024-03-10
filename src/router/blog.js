const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../constructor/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const method = req.method  //请求方法 get post
    const id = req.query.id
    // console.log('req',method)
    // console.log('req.body',req.body)
    // console.log('req.path ',req.path )
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author, keyword)
        // return new SuccessModel(listData)
        const result = getList(author, keyword)
        return result.then(listData => {
            const list = listData.filter(item => {
                if (item.state === 1) {
                    return item
                }
            })

            return new SuccessModel(list)
        })
    }

    // 博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            if (data?.state === 1) {
                return new SuccessModel(data)
            }
            if (data?.state === 0) {
                return new ErrorModel('博客已删除,需要恢复请联系管理员')
            }
            return new ErrorModel('博客不存在，请先建立博客')
        }).catch(err => {
            console.log(err)
            return new ErrorModel('博客详情获取失败')
        })
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const data = req.body
        // return new SuccessModel(newBlog(data))
        // req.body.author = 'caozhi呀'
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel({ id: data.insertId })
        })

    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        console.log('result', result)
        return result.then(data => {
            if (data) {

                return new SuccessModel('更新博客成功')
            }
            return new ErrorModel('更新博客失败')
        })
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = deleteBlog(id, req.body.author)

        return result.then(result => {
            console.log('result', result)
            if (result) {
                return new SuccessModel('删除博客成功')
            }
            return new ErrorModel('删除博客失败')

        })
    }
}

module.exports = handleBlogRouter
