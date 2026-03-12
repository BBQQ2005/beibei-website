# Railway快速部署手册

## 🚂 5分钟完成WebSocket服务器部署

### **第一步：访问Railway**
1. 打开：https://railway.app
2. 点击 **"Start a New Project"**
3. 使用GitHub账号登录

### **第二步：选择部署方式**
1. 选择 **"Deploy from GitHub repo"**
2. 授权Railway访问GitHub仓库

### **第三步：选择仓库**
1. 在仓库列表中找到：`BBQQ2005/beibei-website`
2. 点击 **"Deploy"**

### **第四步：配置项目**
部署完成后，进入项目设置：

#### **A. 启动命令**
1. 点击 **"Settings"** 标签
2. 找到 **"Start Command"**
3. 设置为：`npm run server`

#### **B. 环境变量**
1. 点击 **"Variables"** 标签
2. 添加变量：
   ```
   KEY: PORT
   VALUE: 3001
   ```
3. 点击 **"Add"**

#### **C. 域名查看**
1. 点击 **"Settings"** 标签
2. 找到 **"Domains"**
3. 复制提供的域名

### **第五步：获取连接信息**
部署完成后，您会获得：

#### **WebSocket地址：**
```
wss://[项目名称].up.railway.app
```

#### **HTTP地址：**
```
https://[项目名称].up.railway.app
```

### **第六步：配置前端连接**
在Vercel项目设置中：

1. 进入Vercel项目：`beibei-website`
2. 点击 **"Settings"** → **"Environment Variables"**
3. 添加变量：
   ```
   VITE_WS_URL=wss://[你的railway地址].up.railway.app
   ```
4. 点击 **"Save"**
5. 重新部署Vercel项目

## 🔧 手动部署命令（备用）

如果Railway网页部署遇到问题，可以使用CLI：

```bash
# 1. 安装Railway CLI
npm i -g @railway/cli

# 2. 登录
railway login

# 3. 初始化项目
railway init

# 4. 链接到现有项目或创建新项目
railway link

# 5. 部署
railway up
```

## 🚨 故障排除

### **问题1：部署失败**
```
解决方案：
1. 检查Railway日志：项目页面 → Logs
2. 验证启动命令：应为 `npm run server`
3. 检查环境变量：PORT=3001
```

### **问题2：WebSocket连接失败**
```
解决方案：
1. 验证Railway服务状态
2. 检查防火墙设置
3. 测试连接：wss://地址
```

### **问题3：内存不足**
```
解决方案：
1. Railway免费套餐：512MB内存
2. 优化代码减少内存使用
3. 考虑升级套餐
```

## 📊 Railway免费套餐详情

### **包含：**
- ✅ 5美元/月免费额度
- ✅ 512MB内存
- ✅ 1GB磁盘空间
- ✅ 无限项目
- ✅ 自定义域名
- ✅ 自动HTTPS

### **用量估算：**
- WebSocket服务器：~0.5美元/月
- 剩余额度：4.5美元/月（可用于其他服务）

## 🔗 重要链接

- **Railway控制台**：https://railway.app/dashboard
- **项目部署**：https://railway.app/new
- **文档**：https://docs.railway.app
- **状态监控**：https://status.railway.app

## 🎯 部署完成验证

### **测试WebSocket服务器：**
```bash
# 使用curl测试HTTP服务
curl https://[项目名称].up.railway.app

# 预期输出：贝贝豆WebSocket服务器运行中
```

### **测试前端连接：**
1. 访问：https://beibei-website.vercel.app
2. 发送测试消息
3. 验证实时通信

## 💡 专业建议

1. **启用自动缩放**：根据负载自动调整资源
2. **设置健康检查**：确保服务高可用
3. **配置监控告警**：实时掌握服务状态
4. **定期备份**：重要数据定期备份

## 📞 技术支持

- **Railway Discord**：https://discord.gg/railway
- **GitHub Issues**：提交部署问题
- **邮件支持**：support@railway.app

---

**部署时间**：约5-10分钟  
**难度**：简单 ⭐⭐  
**成本**：完全免费（使用免费额度）  

💰 **贝贝豆随时为您提供部署支持！**