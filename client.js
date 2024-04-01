let socket;
let heartbeatInterval;

function startWebSocket() {
  // 创建一个WebSocket连接
  socket = new WebSocket('ws://10.20.212.199:9503/webSocket');

  // 连接打开时，开始心跳检测
  socket.onopen = function (event) {
    // 检查连接是否已经建立
    if (socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket连接已经建立');
    } else {
      console.log('WebSocket连接尚未建立');
    }
    startHeartbeat();
  };

  // 监听消息
  socket.onmessage = function (event) {
    console.log('Client received a message:', event.data);
  };

  // 监听Socket的关闭
  socket.onclose = function (event) {
    console.log('WebSocket closed:', event);
    stopHeartbeat();
    // 尝试重新连接
    startWebSocket();
  };

  // 监听错误
  socket.onerror = function (error) {
    console.error('WebSocket Error:', error);
  };
}

// 开始心跳检测
function startHeartbeat() {
  heartbeatInterval = setInterval(function () {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send('heartbeat');
    }
  }, 5000); // 每5秒发送一次心跳
}

// 停止心跳检测
function stopHeartbeat() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
}

// 开始WebSocket连接
startWebSocket();
