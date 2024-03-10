const { exec } = require('../db/mysql')


// 获取博客列表
const getList = (author, keyword) => {
    console.log('getList', author, keyword)
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    // 返回promise
    return exec(sql)

}

// 获取博客详情
const getDetail = async (id) => {
    let sql = `select * from blogs where id=${id}`
    const rows = await exec(sql)
    return rows[0]
}

// 新建博客
const newBlog = (async (blogData = {}) => {
    // blogData 是一个博客对象,包含title content 属性
    // console.log('blogData',blogData)
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author
    const sql = `insert into blogs(title,content,createtime,author) 
    values('${title}','${content}','${createtime}','${author}');`
    const rows = await exec(sql)
    return rows
})

// 更新博客
const updateBlog = (id, blogData = {}) => {
    if (id) {
        const title = blogData.title
        const content = blogData.content
        const createtime = Date.now()
        const author = blogData.author
        const sql = `update blogs set title='${title}',
        content='${content}',createtime='${createtime}',
        author='${author}' where id=${id};`
        return exec(sql).then(rows => {
            if (rows.affectedRows > 0) {
                return true
            }
            return false
        })
    }
}

// 删除博客
const deleteBlog = (id, author) => {
    console.log('删除博客', id, author)
    if (!id && !author) {
        return false
    }
    const sql = `update blogs set state=0 where id=${id} and author='${author}';`
    return exec(sql).then(rows => {
        if (rows.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
}