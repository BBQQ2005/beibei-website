# Railway WebSocket服务器部署指南

## 🚂 Railway 部署步骤

### **第一步：创建Railway账号**
1. 访问：https://railway.app
2. 使用GitHub登录
3. 完成注册

### **第二步：新建项目**
1. 点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 选择 `BBQQ2005/beibei-website` 仓库

### **第三步：配置部署**
1. **构建命令**：留空（Railway会自动检测）
2. **启动命令**：`npm run server`
3. **环境变量**：
   ```
   PORT=3001
   NODE_ENV=production
   ```

### **第四步：获取部署地址**
部署完成后，Railway会提供：
- **WebSocket地址**：`wss://your-project-name.up.railway.app`
- **HTTP地址**：`https://your-project-name.up.railway.app`

## 🔧 配置前端连接

### **更新前端环境变量**
在Vercel项目设置中，添加环境变量：
```
VITE_WS_URL=wss://your-project-name.up.railway.app
```

### **或修改前端代码**
在 `RealChat.jsx` 中更新WebSocket地址：
```javascript
const wsUrl = 'wss://your-project-name.up.railway.app';
```

## 📊 Railway免费套餐

### **包含资源：**
- **5美元免费额度**（每月）
- **512MB内存**
- **1GB磁盘空间**
- **无限项目**
- **自定义域名**

### **用量估算：**
- WebSocket服务器：约0.5-1美元/月
- 剩余额度可用于其他服务

## 🚨 故障排除

### **常见问题：**

1. **部署失败**
   ```bash
   # 检查日志
   railway logs
   
   # 重新部署
   railway up
   ```

2. **WebSocket连接失败**
   - 检查Railway服务状态
   - 验证环境变量
   - 检查防火墙设置

3. **内存不足**
   - 优化代码
   - 减少并发连接
   - 升级套餐

## 🔗 相关链接

- **Railway文档**：https://docs.railway.app
- **WebSocket示例**：https://docs.railway.app/examples/websocket
- **环境变量配置**：https://docs.railway.app/deploy/variables

## 💡 优化建议

1. **启用自动缩放**：根据负载自动调整资源
2. **设置健康检查**：确保服务可用性
3. **配置监控**：实时查看服务状态
4. **使用CDN**：加速静态资源

## 📞 技术支持

- **Railway Discord**：https://discord.gg/railway
- **GitHub Issues**：提交问题报告
- **文档搜索**：https://docs.railway.app

---

**注意**：Railway免费套餐足够运行WebSocket服务器。如果流量增加，可以考虑升级到付费套餐。