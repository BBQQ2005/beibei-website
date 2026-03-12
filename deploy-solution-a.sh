#!/bin/bash

# 贝贝豆网站 - 方案A一键部署脚本
# Vercel + Railway 完整实时通信系统

echo "💰 贝贝豆网站 - 方案A部署脚本"
echo "================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查工具
check_tools() {
    echo "🔧 检查必要工具..."
    
    local missing_tools=()
    
    if ! command -v git &> /dev/null; then
        missing_tools+=("git")
    fi
    
    if ! command -v node &> /dev/null; then
        missing_tools+=("node")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing_tools+=("npm")
    fi
    
    if [ ${#missing_tools[@]} -gt 0 ]; then
        echo -e "${RED}❌ 缺少必要工具: ${missing_tools[*]}${NC}"
        echo "请先安装这些工具后再运行脚本。"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 所有必要工具已安装${NC}"
}

# 显示部署步骤
show_deployment_steps() {
    echo ""
    echo -e "${BLUE}🚀 方案A部署步骤${NC}"
    echo "=================="
    echo ""
    echo -e "${YELLOW}第一步：GitHub代码推送${NC}"
    echo "  ✅ 已完成"
    echo ""
    echo -e "${YELLOW}第二步：Vercel前端部署${NC}"
    echo "  1. 访问: https://vercel.com/dashboard"
    echo "  2. 找到 'beibei-website' 项目"
    echo "  3. 点击 'Redeploy' 或等待自动部署"
    echo "  4. 获得前端地址: https://beibei-website.vercel.app"
    echo ""
    echo -e "${YELLOW}第三步：Railway后端部署${NC}"
    echo "  1. 访问: https://railway.app"
    echo "  2. 使用GitHub登录"
    echo "  3. 新建项目 → Deploy from GitHub"
    echo "  4. 选择 'BBQQ2005/beibei-website'"
    echo "  5. 配置:"
    echo "     - 启动命令: npm run server"
    echo "     - 环境变量: PORT=3001"
    echo "  6. 获得WebSocket地址: wss://*.up.railway.app"
    echo ""
    echo -e "${YELLOW}第四步：配置连接${NC}"
    echo "  1. 在Vercel项目设置中添加环境变量:"
    echo "     VITE_WS_URL=wss://你的railway地址"
    echo "  2. 重新部署Vercel项目"
    echo ""
    echo -e "${YELLOW}第五步：测试系统${NC}"
    echo "  1. 访问前端网站"
    echo "  2. 测试实时聊天功能"
    echo "  3. 验证WebSocket连接"
}

# 检查GitHub仓库状态
check_github_repo() {
    echo ""
    echo -e "${BLUE}🔍 检查GitHub仓库状态${NC}"
    
    local repo_url="https://github.com/BBQQ2005/beibei-website"
    
    if curl -s -I "$repo_url" | head -1 | grep -q "200"; then
        echo -e "${GREEN}✅ GitHub仓库可访问: $repo_url${NC}"
    else
        echo -e "${RED}❌ GitHub仓库无法访问${NC}"
        echo "请确保仓库已创建且公开。"
    fi
}

# 生成部署配置文件
generate_deploy_config() {
    echo ""
    echo -e "${BLUE}📁 生成部署配置文件${NC}"
    
    # 创建部署配置目录
    DEPLOY_CONFIG_DIR="/tmp/beibei-deploy-config"
    mkdir -p "$DEPLOY_CONFIG_DIR"
    
    # 生成Railway配置文件
    cat > "$DEPLOY_CONFIG_DIR/railway.toml" << 'EOF'
[build]
builder = "nixpacks"
buildCommand = "npm install"

[deploy]
startCommand = "npm run server"
healthcheckPath = "/"
healthcheckTimeout = 60

[[services]]
port = 3001
protocol = "tcp"

[environments.production]
NODE_ENV = "production"
PORT = "3001"
EOF
    
    # 生成Vercel环境变量文件
    cat > "$DEPLOY_CONFIG_DIR/vercel-env.txt" << 'EOF'
# Vercel环境变量配置
VITE_WS_URL=wss://your-railway-url.up.railway.app
NODE_ENV=production
EOF
    
    echo -e "${GREEN}✅ 部署配置文件已生成: $DEPLOY_CONFIG_DIR${NC}"
    echo "  - railway.toml: Railway部署配置"
    echo "  - vercel-env.txt: Vercel环境变量"
}

# 显示快速链接
show_quick_links() {
    echo ""
    echo -e "${BLUE}🔗 快速链接${NC}"
    echo "=========="
    echo ""
    echo -e "${YELLOW}GitHub仓库:${NC}"
    echo "  https://github.com/BBQQ2005/beibei-website"
    echo ""
    echo -e "${YELLOW}Vercel部署:${NC}"
    echo "  https://vercel.com/new"
    echo "  https://vercel.com/dashboard"
    echo ""
    echo -e "${YELLOW}Railway部署:${NC}"
    echo "  https://railway.app"
    echo "  https://railway.app/new"
    echo ""
    echo -e "${YELLOW}前端访问:${NC}"
    echo "  https://beibei-website.vercel.app"
    echo ""
    echo -e "${YELLOW}部署文档:${NC}"
    echo "  DEPLOYMENT.md - 完整部署指南"
    echo "  RAILWAY-DEPLOY.md - Railway专项指南"
}

# 显示下一步操作
show_next_steps() {
    echo ""
    echo -e "${BLUE}🎯 下一步操作${NC}"
    echo "=========="
    echo ""
    echo "1. 立即访问Vercel并重新部署前端"
    echo "2. 访问Railway部署WebSocket后端"
    echo "3. 配置环境变量连接前后端"
    echo "4. 测试完整的实时通信系统"
    echo ""
    echo -e "${GREEN}💡 提示:${NC} 所有部署文档已在项目中，随时参考。"
}

# 主函数
main() {
    echo -e "${BLUE}💰 贝贝豆实时通信系统部署${NC}"
    echo "=================================="
    echo ""
    
    check_tools
    check_github_repo
    show_deployment_steps
    generate_deploy_config
    show_quick_links
    show_next_steps
    
    echo ""
    echo -e "${GREEN}🎉 部署准备完成！${NC}"
    echo "💰 贝贝豆随时为您提供部署支持！"
    echo ""
    echo "如需帮助，请随时联系贝贝豆助手。"
}

# 运行主函数
main