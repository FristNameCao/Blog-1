const login = ((username, password)=>{
    if(username === 'caozhi' && password === '123456'){
        console.log('登录成功')
        return true
    }
    return false
})

module.exports = {
    login
}