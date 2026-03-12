import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: '主人，欢迎来到贝贝豆专属沟通平台！💰', sender: 'beibei', time: '刚刚' },
    { id: 2, text: '我是您的赚钱AI助手贝贝豆，随时为您服务。', sender: 'beibei', time: '刚刚' }
  ])
  const [inputText, setInputText] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'master',
      time: '刚刚'
    }

    setMessages([...messages, newMessage])
    setInputText('')

    // 模拟贝贝豆回复
    setTimeout(() => {
      const responses = [
        '收到主人的指令！贝贝豆正在分析...',
        '明白！我会立即处理这个问题。',
        '好的主人，这是我的建议...',
        '正在为您搜索相关信息...'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const beibeiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'beibei',
        time: '刚刚'
      }
      
      setMessages(prev => [...prev, beibeiMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* 导航栏 */}
      <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">贝贝豆</h1>
              <p className="text-sm opacity-90">主人专属赚钱AI助手</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
              {isConnected ? '🟢 已连接' : '🔴 连接中...'}
            </div>
            <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition">
              设置
            </button>
          </div>
        </div>
      </nav>

      {/* 主聊天区域 */}
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 聊天头部 */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
            <h2 className="text-2xl font-bold">与贝贝豆对话</h2>
            <p className="opacity-90">专属赚钱AI助手，24/7为您服务</p>
          </div>

          {/* 消息列表 */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'master' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.sender === 'master'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
                      : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold">
                      {message.sender === 'master' ? '👑 主人' : '🤖 贝贝豆'}
                    </span>
                    <span className="text-xs opacity-70">{message.time}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的指令或问题...（按Enter发送，Shift+Enter换行）"
                className="flex-1 border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="3"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="self-end px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                发送
              </button>
            </div>
            
            {/* 快捷指令 */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setInputText('分析今天的股市行情')}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                📈 股市分析
              </button>
              <button
                onClick={() => setInputText('有什么赚钱机会推荐？')}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                💰 赚钱机会
              </button>
              <button
                onClick={() => setInputText('查看投资组合建议')}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                📊 投资建议
              </button>
              <button
                onClick={() => setInputText('帮我分析一下康宁的股价')}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
              >
                🏢 个股分析
              </button>
            </div>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="font-bold text-lg mb-2">投资管理</h3>
            <p className="text-gray-600">实时跟踪投资组合，提供个性化建议</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="font-bold text-lg mb-2">市场分析</h3>
            <p className="text-gray-600">深度分析市场趋势，把握赚钱机会</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="font-bold text-lg mb-2">安全私密</h3>
            <p className="text-gray-600">专属沟通渠道，保护您的隐私和数据</p>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">贝贝豆 · 主人专属赚钱AI助手</p>
          <p className="text-gray-400 mt-2">24/7 全天候服务 · 实时沟通 · 专业分析</p>
          <div className="mt-6 flex justify-center space-x-6">
            <span className="text-gray-400">© 2026 贝贝豆系统</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">版本 1.0.0</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">仅供主人使用</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App