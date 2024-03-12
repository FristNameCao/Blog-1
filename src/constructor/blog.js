const { exec, escpape } = require('../db/mysql')
const xss = require('xss')

// 获取博客列表
const getList = (author, keyword) => {

    author = escpape(author)
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author=${author} `
    }
    if (keyword) {
        sql += `and title like '%${escpape(keyword)}%' `
    }

    sql += `order by createtime desc;`
    console.log(sql)
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
    blogData.author = escpape(blogData.author)
    blogData.title = escpape(xss(blogData.title))
    blogData.content = escpape(xss(blogData.content))

    console.log('blogData', blogData)
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author

    const sql = `insert into blogs(title,content,createtime,author) 
    values(${title},${content},'${createtime}',${author});`
    const rows = await exec(sql)
    return rows
})

// 更新博客
const updateBlog = (id, blogData = {}) => {

    blogData.author = escpape(blogData.author)
    blogData.title = escpape(xss(blogData.title))
    blogData.content = escpape(xss(blogData.content))

    if (id) {
        const title = blogData.title
        const content = blogData.content
        const createtime = Date.now()
        const author = blogData.author
        const sql = `update blogs set title=${title},
        content=${content},createtime='${createtime}',
        author=${author} where id=${id};`
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
    const authorEscpape = escpape(author)

    if (!id && !authorEscpape) {
        return false
    }
    const sql = `update blogs set state=0 where id=${id} and author=${authorEscpape};`
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