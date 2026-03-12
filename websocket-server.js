// WebSocket 服务器配置
// 用于贝贝豆网站与OpenClaw AI的实时通信

const WebSocket = require('ws');
const http = require('http');
const url = require('url');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('贝贝豆WebSocket服务器运行中\n');
});

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server });

// 客户端连接管理
const clients = new Map();

// 模拟AI回复函数
function generateAIResponse(userMessage, clientId) {
  const responses = [
    `💰 主人，我收到了您的消息："${userMessage}"`,
    '我正在分析市场机会...',
    '发现一个潜在的投资机会！',
    '建议关注科技股和加密货币',
    '需要我为您详细分析某个领域吗？',
    '主人有什么具体的赚钱想法？',
    '我可以帮您分析股票、加密货币、房地产等',
    '告诉我您的投资偏好，我为您定制策略',
    '📈 今日股市分析：科技股表现强劲',
    '💰 赚钱机会：关注新能源和AI领域',
    '₿ 加密货币：比特币突破关键阻力位',
    '🏠 房地产：一线城市核心区域仍有升值空间'
  ];
  
  // 根据消息内容生成相关回复
  if (userMessage.includes('股票') || userMessage.includes('股市')) {
    return '📈 股票分析：建议关注科技龙头股，近期财报表现强劲，估值合理。';
  } else if (userMessage.includes('加密') || userMessage.includes('比特币')) {
    return '₿ 加密货币：比特币在$50,000关键位置，建议分批建仓，注意风险管理。';
  } else if (userMessage.includes('房地产') || userMessage.includes('房子')) {
    return '🏠 房地产：一线城市核心区域仍有投资价值，建议关注新开发区。';
  } else if (userMessage.includes('赚钱') || userMessage.includes('机会')) {
    return '💰 赚钱机会：当前AI、新能源、生物科技是热门赛道，建议分散投资。';
  } else if (userMessage.includes('投资') || userMessage.includes('理财')) {
    return '📊 投资建议：建议配置60%股票、20%债券、10%加密货币、10%现金。';
  }
  
  // 随机回复
  return responses[Math.floor(Math.random() * responses.length)];
}

// 连接处理
wss.on('connection', (ws, req) => {
  const clientId = Date.now().toString();
  const ip = req.socket.remoteAddress;
  
  console.log(`💰 新客户端连接: ${clientId} (IP: ${ip})`);
  
  // 存储客户端
  clients.set(clientId, {
    ws,
    ip,
    connectedAt: new Date(),
    lastActivity: new Date()
  });
  
  // 发送欢迎消息
  const welcomeMessage = {
    type: 'system',
    message: '💰 贝贝豆AI助手已连接！我是您的专属赚钱助手。',
    timestamp: new Date().toISOString(),
    clientId
  };
  
  ws.send(JSON.stringify(welcomeMessage));
  
  // 消息处理
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log(`收到消息 from ${clientId}:`, message);
      
      // 更新最后活动时间
      const client = clients.get(clientId);
      if (client) {
        client.lastActivity = new Date();
      }
      
      // 处理不同类型的消息
      switch (message.type) {
        case 'chat':
          // 模拟AI思考延迟
          setTimeout(() => {
            const aiResponse = {
              type: 'chat',
              sender: 'beibei',
              message: generateAIResponse(message.content, clientId),
              timestamp: new Date().toISOString(),
              isAI: true
            };
            
            ws.send(JSON.stringify(aiResponse));
          }, 500 + Math.random() * 1500);
          break;
          
        case 'command':
          // 处理命令
          const commandResponse = {
            type: 'command',
            command: message.command,
            result: `执行命令: ${message.command}`,
            timestamp: new Date().toISOString()
          };
          
          ws.send(JSON.stringify(commandResponse));
          break;
          
        case 'ping':
          // 心跳响应
          ws.send(JSON.stringify({
            type: 'pong',
            timestamp: new Date().toISOString()
          }));
          break;
      }
      
    } catch (error) {
      console.error('消息处理错误:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: '消息格式错误',
        timestamp: new Date().toISOString()
      }));
    }
  });
  
  // 错误处理
  ws.on('error', (error) => {
    console.error(`客户端 ${clientId} 错误:`, error);
  });
  
  // 连接关闭
  ws.on('close', () => {
    console.log(`客户端 ${clientId} 断开连接`);
    clients.delete(clientId);
  });
});

// 定期清理不活跃的连接
setInterval(() => {
  const now = new Date();
  const inactiveTimeout = 5 * 60 * 1000; // 5分钟
  
  for (const [clientId, client] of clients.entries()) {
    if (now - client.lastActivity > inactiveTimeout) {
      console.log(`清理不活跃客户端: ${clientId}`);
      client.ws.close();
      clients.delete(clientId);
    }
  }
}, 60000); // 每分钟检查一次

// 服务器状态监控
setInterval(() => {
  console.log(`💰 贝贝豆WebSocket服务器状态: ${clients.size} 个活跃连接`);
}, 30000);

// 启动服务器
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`💰 贝贝豆WebSocket服务器启动在端口 ${PORT}`);
  console.log(`💰 访问 http://localhost:${PORT} 查看服务器状态`);
  console.log(`💰 WebSocket 地址: ws://localhost:${PORT}`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('收到关闭信号，正在关闭服务器...');
  
  // 关闭所有客户端连接
  for (const [clientId, client] of clients.entries()) {
    client.ws.close();
  }
  
  wss.close(() => {
    server.close(() => {
      console.log('服务器已关闭');
      process.exit(0);
    });
  });
});

module.exports = { server, wss, clients };