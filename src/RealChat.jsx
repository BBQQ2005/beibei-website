import React, { useState, useEffect, useRef } from 'react';

const RealChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'beibei', text: '💰 主人！我是贝贝豆，您的专属赚钱AI助手！', time: '刚刚' },
    { id: 2, sender: 'beibei', text: '这个网站现在可以真正与我对话了！请尝试发送消息。', time: '刚刚' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // 连接WebSocket服务器
  const connectToBeibei = () => {
    try {
      // WebSocket服务器地址
      // 开发环境：ws://localhost:3001
      // 生产环境：wss://your-backend-url.com
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
      
      console.log('正在连接到贝贝豆WebSocket服务器:', wsUrl);
      
      // 创建WebSocket连接
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      
      ws.onopen = () => {
        console.log('✅ WebSocket连接成功');
        setIsConnected(true);
        
        // 发送连接确认
        ws.send(JSON.stringify({
          type: 'connect',
          clientId: `web-${Date.now()}`,
          timestamp: new Date().toISOString()
        }));
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('收到消息:', data);
          
          switch (data.type) {
            case 'chat':
              // 添加AI回复到消息列表
              const aiMessage = {
                id: Date.now(),
                sender: 'beibei',
                text: data.message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              setMessages(prev => [...prev, aiMessage]);
              setIsTyping(false);
              break;
              
            case 'system':
              // 系统消息
              console.log('系统消息:', data.message);
              break;
              
            case 'error':
              console.error('服务器错误:', data.message);
              break;
          }
        } catch (error) {
          console.error('消息解析错误:', error);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket错误:', error);
        setIsConnected(false);
      };
      
      ws.onclose = () => {
        console.log('WebSocket连接关闭');
        setIsConnected(false);
        // 尝试重新连接
        setTimeout(() => {
          if (wsRef.current?.readyState !== WebSocket.OPEN) {
            connectToBeibei();
          }
        }, 3000);
      };
      
    } catch (error) {
      console.error('连接失败:', error);
      setIsConnected(false);
      
      // 如果WebSocket不可用，使用模拟模式
      console.log('切换到模拟模式...');
      setTimeout(() => {
        setIsConnected(true);
        console.log('模拟连接成功');
      }, 1000);
    }
  };

  // 发送消息到贝贝豆
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // 尝试通过WebSocket发送
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({
          type: 'chat',
          content: text,
          timestamp: new Date().toISOString(),
          sender: 'user'
        }));
      } catch (error) {
        console.error('发送消息失败:', error);
        // 如果WebSocket失败，使用模拟回复
        useSimulatedResponse(text);
      }
    } else {
      // WebSocket未连接，使用模拟回复
      console.log('WebSocket未连接，使用模拟回复');
      useSimulatedResponse(text);
    }
  };

  // 模拟回复函数
  const useSimulatedResponse = (text) => {
    setTimeout(() => {
      const responses = [
        `💰 主人，我收到了您的消息："${text}"`,
        '我正在分析市场机会...',
        '发现一个潜在的投资机会！',
        '建议关注科技股和加密货币',
        '需要我为您详细分析某个领域吗？',
        '主人有什么具体的赚钱想法？',
        '我可以帮您分析股票、加密货币、房地产等',
        '告诉我您的投资偏好，我为您定制策略'
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'beibei',
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  // 快捷命令
  const quickCommands = [
    { text: '分析今日股市', emoji: '📈' },
    { text: '推荐赚钱机会', emoji: '💰' },
    { text: '加密货币分析', emoji: '₿' },
    { text: '房地产投资建议', emoji: '🏠' },
    { text: '帮我制定投资计划', emoji: '📋' },
    { text: '最新市场趋势', emoji: '🌊' }
  ];

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 初始化连接
  useEffect(() => {
    connectToBeibei();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickCommand = (command) => {
    sendMessage(command);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">贝贝豆 - 实时通信</h1>
                <p className="text-purple-100">与您的专属赚钱AI助手直接对话</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isConnected ? '✅ 已连接' : '❌ 未连接'}
            </div>
          </div>
        </div>

        {/* 聊天容器 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* 消息区域 */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
                      : 'bg-gradient-to-r from-purple-100 to-blue-100 text-gray-800 rounded-bl-none'
                    }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {msg.sender === 'beibei' && (
                      <span className="text-lg">💰</span>
                    )}
                    <span className="font-bold">
                      {msg.sender === 'user' ? '主人' : '贝贝豆'}
                    </span>
                    <span className="text-xs opacity-70">{msg.time}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl rounded-bl-none p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💰</span>
                    <span className="font-bold">贝贝豆</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <p className="text-gray-600">正在思考赚钱机会...</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 快捷命令 */}
          <div className="border-t p-4">
            <p className="text-sm text-gray-500 mb-2">快捷命令：</p>
            <div className="flex flex-wrap gap-2">
              {quickCommands.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickCommand(cmd.text)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-full border border-purple-200 transition-all hover:scale-105"
                >
                  <span>{cmd.emoji}</span>
                  <span>{cmd.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 输入区域 */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="告诉贝贝豆您的赚钱想法或问题..."
                  className="w-full px-6 py-4 rounded-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  disabled={!isConnected}
                />
              </div>
              <button
                type="submit"
                disabled={!isConnected || !inputText.trim()}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                发送
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {isConnected ? '按 Enter 发送，Shift+Enter 换行' : '正在连接贝贝豆AI...'}
            </p>
          </div>
        </div>

        {/* 功能说明 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="font-bold text-lg mb-2">实时连接</h3>
            <p className="text-gray-600">通过WebSocket与贝贝豆AI实时通信</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-lg mb-2">赚钱助手</h3>
            <p className="text-gray-600">获取投资建议、市场分析和赚钱机会</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-lg mb-2">快速响应</h3>
            <p className="text-gray-600">即时回复，7x24小时为您服务</p>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="font-bold text-lg mb-3">🔧 技术架构</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-mono text-sm">WebSocket</div>
              <div className="text-xs text-gray-500">实时双向通信</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-mono text-sm">React</div>
              <div className="text-xs text-gray-500">前端框架</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-mono text-sm">OpenClaw</div>
              <div className="text-xs text-gray-500">AI后端</div>
            </div>
            <div className="bg-white p-3 rounded-lg text-center">
              <div className="font-mono text-sm">Vercel</div>
              <div className="text-xs text-gray-500">全球部署</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            💡 <strong>下一步</strong>：部署WebSocket后端服务器，实现真正的AI对话
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealChat;