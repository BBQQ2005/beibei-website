# 贝贝豆网站部署指南

## 本地运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

访问：http://localhost:3000

### 3. 构建生产版本
```bash
npm run build
```

## 免费部署选项

### 选项1: Vercel (推荐)
1. 将代码推送到GitHub仓库
2. 访问 https://vercel.com
3. 导入GitHub仓库
4. 自动部署，获得免费域名

### 选项2: GitHub Pages
1. 安装gh-pages：
```bash
npm install --save-dev gh-pages
```

2. 在package.json中添加：
```json
"homepage": "https://[你的用户名].github.io/beibei-website",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. 部署：
```bash
npm run deploy
```

### 选项3: Netlify
1. 将代码推送到GitHub/GitLab
2. 访问 https://netlify.com
3. 拖拽dist文件夹或连接仓库
4. 自动部署

## 自定义域名 (可选)

### 免费域名选项：
1. **Freenom**: 提供免费.tk/.ml/.ga域名
2. **GitHub Pages**: username.github.io
3. **Vercel**: projectname.vercel.app

### 配置步骤：
1. 在域名注册商处添加CNAME记录
2. 在托管平台绑定自定义域名
3. 等待DNS传播（最多48小时）

## 环境变量配置

创建 `.env` 文件：
```env
VITE_APP_TITLE=贝贝豆沟通平台
VITE_WS_URL=wss://your-backend.com
```

## 后续功能扩展

### 实时通信集成
1. **WebSocket服务器**: 使用Socket.io或ws
2. **免费托管**: Railway.app (免费额度)
3. **消息持久化**: Supabase免费层

### 功能增强
1. 用户认证系统
2. 文件上传功能
3. 投资分析工具
4. 市场数据API集成

## 维护建议

1. **定期更新依赖**: `npm update`
2. **监控使用量**: 免费服务通常有限制
3. **备份数据**: 定期导出重要对话
4. **安全更新**: 及时应用安全补丁

## 故障排除

### 常见问题：
1. **构建失败**: 检查Node版本和依赖
2. **部署错误**: 查看平台日志
3. **实时通信断开**: 检查WebSocket连接
4. **样式问题**: 清除浏览器缓存

### 技术支持：
- Vercel文档: https://vercel.com/docs
- GitHub Pages文档: https://pages.github.com
- React文档: https://react.dev