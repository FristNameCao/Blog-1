const fs = require('fs')
const path = require('path')


// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n') // 关键代码
}

// 生成write Stream
function createWriteStream(filename) {
    const fileFileName = path.join(__dirname, '../', '../', 'logs', filename)
    const writeStream = fs.createWriteStream(fileFileName, { flags: 'a' })
    return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}


module.exports = {
    // 获取日志文件路径
    access
}
