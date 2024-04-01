// 引入ws模块
const WebSocket = require('ws');

// 创建一个WebSocket服务器，监听8080端口
const wss = new WebSocket.Server({ port: 8080 });

// 当有新的客户端连接时，触发'connection'事件
wss.on('connection', ws => {
  // 对于每个连接的客户端，监听它发送的'message'事件
  ws.on('message', message => {
    // 当收到消息时，打印出来
    console.log('received: %s', message);
    // 向客户端发送一条消息
    ws.send(message);
  });
});
