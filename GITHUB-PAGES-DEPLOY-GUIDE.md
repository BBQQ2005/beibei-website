# GitHub Pages 部署指南 - 贝贝豆沟通网站

## 🆓 完全免费部署方案

### 优势：
- 100% 免费，无任何限制
- 使用 `username.github.io` 免费域名
- 自动HTTPS/SSL
- 简单易用，适合初学者

## 🚀 部署步骤

### 第一步：准备GitHub仓库

1. **创建特殊命名仓库**：
   - 仓库名必须为：`您的用户名.github.io`
   - 例如：如果您的GitHub用户是 `BBQQ2025`
   - 仓库名应为：`BBQQ2025.github.io`

2. **创建仓库**：
   - 访问 https://github.com/new
   - Repository name: `您的用户名.github.io`
   - Description: `贝贝豆 - 主人专属AI助手`
   - 选择 Public
   - 不初始化README（我们将上传现有代码）

### 第二步：配置项目支持GitHub Pages

1. **安装gh-pages工具**：
```bash
cd /Users/qiu/.openclaw/workspace/beibei-website
npm install --save-dev gh-pages
```

2. **修改package.json**：
在 `package.json` 中添加以下配置：

```json
{
  "homepage": "https://您的用户名.github.io",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**注意**：将 `您的用户名` 替换为实际的GitHub用户名。

### 第三步：上传代码到GitHub

```bash
# 进入项目目录
cd /Users/qiu/.openclaw/workspace/beibei-website

# 初始化Git（如果尚未初始化）
git init

# 添加GitHub远程仓库
git remote add origin https://github.com/您的用户名/您的用户名.github.io.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial deploy of Beibei website"

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 第四步：部署到GitHub Pages

```bash
# 构建并部署
npm run deploy
```

这个命令会：
1. 构建生产版本到 `dist` 文件夹
2. 将构建结果推送到 `gh-pages` 分支
3. 自动配置GitHub Pages

### 第五步：启用GitHub Pages

1. 访问您的GitHub仓库：`https://github.com/您的用户名/您的用户名.github.io`
2. 点击 "Settings" → "Pages"
3. 确认配置：
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` → `/ (root)`
4. 点击 "Save"

## 🌐 访问您的网站

### 主域名：
- **https://您的用户名.github.io**

### 示例：
- 如果用户名为 `BBQQ2025`
- 访问：`https://bbqq2025.github.io`

### 等待时间：
- 首次部署后需要1-10分钟生效
- 后续更新立即生效

## 🔧 高级配置

### 自定义域名（可选）：
1. 在域名注册商处购买域名
2. 在仓库Settings → Pages中设置Custom domain
3. 配置DNS记录：
   ```
   类型  名称  值
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   您的用户名.github.io
   ```

### 自动部署工作流：
创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📱 功能测试清单

部署完成后测试：
- [ ] 网站可访问：https://您的用户名.github.io
- [ ] HTTPS/SSL正常工作（显示🔒）
- [ ] 聊天界面正常显示
- [ ] 消息发送功能正常
- [ ] 响应式布局正常（手机/电脑）
- [ ] 所有链接正常工作

## 🛠️ 故障排除

### 常见问题：

1. **404错误**：
   - 检查仓库名称是否正确
   - 确认gh-pages分支存在
   - 等待几分钟让GitHub Pages生效

2. **样式丢失**：
   - 检查构建路径配置
   - 确保 `homepage` 字段正确
   - 清除浏览器缓存

3. **部署失败**：
   ```bash
   # 清理重新部署
   rm -rf node_modules package-lock.json
   npm install
   npm run deploy
   ```

4. **自定义域名问题**：
   - 检查DNS配置
   - 等待DNS传播（最多48小时）
   - 在GitHub Pages设置中重新保存域名

### 查看部署状态：
- 仓库 → Actions：查看部署日志
- 仓库 → Settings → Pages：查看Pages状态
- 访问 https://您的用户名.github.io 测试

## 🔄 更新网站

### 日常更新流程：
```bash
# 1. 修改代码
# 2. 提交更改
git add .
git commit -m "更新描述"
git push origin main

# 3. 重新部署
npm run deploy
```

### 自动更新（推荐）：
使用上面的GitHub Actions工作流，每次push到main分支会自动部署。

## 📊 GitHub Pages限制

### 免费套餐包括：
- 每个仓库1GB存储空间
- 每月100GB带宽
- 自动构建和部署
- 自定义域名支持
- HTTPS强制启用

### 限制：
- 不支持服务器端代码（纯静态）
- 构建时间限制10分钟
- 不支持WebSocket等实时协议（需要额外服务）

## 🎯 贝贝豆网站优化建议

### 针对GitHub Pages：
1. **减小构建体积**：
   - 优化图片资源
   - 使用代码分割
   - 启用Gzip压缩

2. **改善加载速度**：
   - 使用CDN加载库文件
   - 实现懒加载
   - 优化首屏渲染

3. **增强功能**：
   - 添加Service Worker缓存
   - 实现离线功能
   - 添加PWA支持

## 💰 成本总结

### 完全免费：
- GitHub Pages：免费
- 域名：`username.github.io` 免费
- SSL证书：GitHub自动提供
- 带宽：每月100GB免费

### 可选付费：
- 自定义域名：$10-15/年
- 更多存储：GitHub Pro $4/月

## 📞 支持资源

- GitHub Pages文档：https://pages.github.com
- Vite部署指南：https://vitejs.dev/guide/static-deploy
- React路由配置：https://create-react-app.dev/docs/deployment

---

**完成！** 您的贝贝豆网站现在可以通过GitHub Pages全球访问。这是一个完全免费、稳定可靠的解决方案。

💰 **主人，您的专属AI助手网站已准备就绪！**