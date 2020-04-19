// const fs = require('fs')
// const buffer = fs.readFileSync(__dirname + '/socket/index.js')
// console.log(buffer.toString())

// Buffer 文件读取是buffer， 文件很大会占用很大的缓存区，多个人操作时，
// 这个很快沾满，故buffer不合适，适合使用Stream
// const b1 = Buffer.from('10')
// const b2 = Buffer.alloc(2, 'aaa')
// console.log(b1, b1.toString())
// console.log(b2)

// Stream demo 复制一张图片 在scr目录下运行node index.js
const fs = require('fs')
const readStream = fs.createReadStream('./06.png');
// 空的流
const writeStream = fs.createWriteStream('./06-1.png');
// 将两个导管连接
readStream.pipe(writeStream);


// // http
// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.write('hello')
//   res.end()
//   // 访问图片 res，req是stream 故可直接使用流
//   fs.createWriteStream('.'+url).pipe(res);
// })
// server.listen(4000)


