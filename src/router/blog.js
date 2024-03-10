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
        const listData = getList(author, keyword)
        return new SuccessModel(listData)

    }

    // 博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const data = getDetail(id)
        return new SuccessModel(data)
    }

    // 新建博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const data = req.body
        return new SuccessModel(newBlog(data))

    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id)
        console.log('result',result)
        if(result){
            return new SuccessModel('更新成功')
        }
        return  new ErrorModel('更新博客失败')
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = deleteBlog(id)
        if(result){
            return new SuccessModel('删除成功')
        }
        return new ErrorModel('删除博客失败')
    }
}

module.exports = handleBlogRouter
