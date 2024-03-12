const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileNmae = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 创建read Sream
const readStream = fs.createReadStream(fileNmae)

// 创建 readline 对象

const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0
let Edg = 0
// 逐行读取
rl.on('line', (lineData) => {
    if (!lineData) {
        return
    }

    // 记录总行数
    sum++
    const arr = lineData.split(' -- ')
    // 记录 chrome 浏览器的行数
    if (arr[2] && arr[2].indexOf('Chrome') > 0 && arr[2].indexOf('Edg') < 0) {
        chromeNum++
    }
    console.log('!arr[2].indexOf', arr[2].indexOf('Edg'))
    if (arr[2] && arr[2].indexOf('Edg') > 0) {
        Edg++
    }
})

// 监听读取完成
rl.on('close', () => {
    console.log('总行数：', sum)
    console.log('Edg总行数：', Edg)
    console.log('Chrome 浏览器的行数：', chromeNum)
    console.log('Chrome 浏览器的占比：', +chromeNum / sum)
    console.log('Edg 浏览器的占比：', +chromeNum / Edg)
})