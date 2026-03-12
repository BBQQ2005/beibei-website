# Vercel 部署指南 - 贝贝豆沟通网站

## 🚀 快速部署步骤（5分钟完成）

### 第一步：创建GitHub仓库

1. 访问 https://github.com
2. 登录您的GitHub账号
3. 点击右上角 "+" → "New repository"
4. 填写仓库信息：
   - Repository name: `beibei-website`
   - Description: `贝贝豆 - 主人专属赚钱AI助手沟通平台`
   - 选择 Public（公开）
   - 不勾选 "Initialize this repository with a README"
5. 点击 "Create repository"

### 第二步：上传代码到GitHub

在终端中执行以下命令：

```bash
# 进入项目目录
cd /Users/qiu/.openclaw/workspace/beibei-website

# 添加GitHub远程仓库
git remote add origin https://github.com/您的用户名/beibei-website.git

# 推送代码
git branch -M main
git push -u origin main
```

**注意**：将 `您的用户名` 替换为您的GitHub用户名。

### 第三步：Vercel部署

1. 访问 https://vercel.com
2. 使用GitHub账号登录
3. 点击 "Add New..." → "Project"
4. 导入 `beibei-website` 仓库
5. 配置部署：
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. 点击 "Deploy"

### 第四步：访问您的网站

部署完成后，您将获得：
- 主域名：`beibei-website.vercel.app`
- 备用域名：`beibei-website-您的用户名.vercel.app`

## 🌐 自定义域名（可选）

### 免费域名选项：
1. **Freenom** (https://www.freenom.com)
   - 提供免费域名：.tk, .ml, .ga, .cf, .gq
   - 注册示例：`beibei-ai.tk`

2. **在Vercel绑定域名**：
   - 进入项目 → Settings → Domains
   - 输入您的域名
   - 按照提示配置DNS

### DNS配置示例（Freenom）：
```
类型    名称        值
CNAME   www        cname.vercel-dns.com
A       @          76.76.21.21
```

## 🔧 环境配置

### 创建 `vercel.json` 优化配置：
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

## 📱 访问您的网站

### 部署完成后：
1. **主地址**：https://beibei-website.vercel.app
2. **备用地址**：https://beibei-website-您的用户名.vercel.app

### 测试功能：
1. 打开聊天界面
2. 发送测试消息
3. 使用快捷指令
4. 检查响应式布局

## 🔄 自动更新

### 每次代码更新后：
```bash
# 本地修改代码后
git add .
git commit -m "更新描述"
git push origin main
# Vercel会自动重新部署
```

## 📊 监控和统计

Vercel提供免费监控：
- 访问统计
- 性能分析
- 错误日志
- 部署历史

## 🛡️ 安全性

### 自动包含：
- HTTPS/SSL 证书
- DDoS 防护
- 全球CDN
- 自动备份

## 💰 成本说明

### 完全免费套餐包括：
- 每月100GB带宽
- 无限请求
- 自动SSL证书
- 自定义域名支持
- 团队协作功能

### 升级选项（如需）：
- Pro计划：$20/月（更多功能）
- Enterprise：定制方案

## 🚨 故障排除

### 常见问题：

1. **部署失败**：
   - 检查 `package.json` 配置
   - 查看Vercel部署日志
   - 确保依赖安装成功

2. **网站无法访问**：
   - 检查域名DNS配置
   - 等待DNS传播（最多48小时）
   - 清除浏览器缓存

3. **功能异常**：
   - 检查浏览器控制台错误
   - 验证API连接
   - 测试不同浏览器

### 技术支持：
- Vercel文档：https://vercel.com/docs
- GitHub支持：https://github.com
- 本项目问题反馈：在GitHub仓库提交Issue

## 🎯 成功部署检查清单

- [ ] GitHub仓库创建成功
- [ ] 代码推送完成
- [ ] Vercel项目导入成功
- [ ] 首次部署完成
- [ ] 网站可以正常访问
- [ ] 所有功能正常工作
- [ ] 移动端适配正常
- [ ] SSL证书生效（显示🔒）

## 📞 获取帮助

如果遇到问题：
1. 查看本指南对应章节
2. 检查Vercel部署日志
3. 在GitHub仓库提交Issue
4. 联系技术支持

---

**恭喜！** 您的贝贝豆专属沟通网站已准备好部署。按照上述步骤，5分钟内即可拥有一个完全免费、全球可访问的专业网站。

💰 **贝贝豆随时为您服务！**