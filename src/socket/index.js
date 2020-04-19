const net = require('net');
const chatServer = net.createServer();
const chatList = [];
chatServer.on('connection', (client) => {
  client.write('hi \n');
  chatList.push(client);
  // 监听数据
  client.on('data', (data) => {
    console.log('recieve:', data.toString())
    // 通知个client端
    chatList.forEach(n => {
      n.write(data)
    })
  })
})
chatServer.listen(9000)

// mac 无telnet 命令时，先安装 brew install telnet
// 进入到当前目录，然后运行 telnet localhost 9000