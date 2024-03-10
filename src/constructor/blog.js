const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
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

const getDetail = (id) => {
    return {
        id: 1,
        title: 'Node.js入门教程',
        author: 'Node.js入门教程',
        content: 'Node.js入门教程',
        time: '2018-08-08'
    }
}

const newBlog = ((blogData = {}) => {
    // blogData 是一个博客对象,包含title content 属性
    // console.log('blogData',blogData)
    return {
        id: 3 //表示新建博客,插入到数据表里面的id
    }

})

const updateBlog = (id, blogData = {}) => {
    if (id) {
        return true
    }
    return false
}

const deleteBlog = (id) => {
    if (id) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog,
}