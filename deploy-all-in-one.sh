#!/bin/bash

# 贝贝豆网站一键部署脚本
# 主人只需运行此脚本即可获得部署链接

echo "💰 贝贝豆网站一键部署脚本"
echo "=========================="

# 检查必要工具
check_tools() {
    echo "🔧 检查系统工具..."
    if ! command -v git &> /dev/null; then
        echo "❌ Git未安装，请先安装Git"
        exit 1
    fi
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js未安装，请先安装Node.js"
        exit 1
    fi
    if ! command -v npm &> /dev/null; then
        echo "❌ npm未安装，请先安装npm"
        exit 1
    fi
    echo "✅ 所有必要工具已安装"
}

# 构建项目
build_project() {
    echo "🏗️  构建项目..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ 项目构建失败"
        exit 1
    fi
    echo "✅ 项目构建成功"
}

# 创建部署包
create_deployment_package() {
    echo "📦 创建部署包..."
    
    # 创建临时目录
    DEPLOY_DIR="/tmp/beibei-website-deploy-$(date +%s)"
    mkdir -p "$DEPLOY_DIR"
    
    # 复制必要文件
    cp -r dist/* "$DEPLOY_DIR/"
    cp netlify.toml "$DEPLOY_DIR/" 2>/dev/null || true
    cp vercel.json "$DEPLOY_DIR/" 2>/dev/null || true
    
    # 创建部署说明
    cat > "$DEPLOY_DIR/README-DEPLOY.md" << EOF
# 贝贝豆网站部署说明

## 🚀 快速部署方法

### 方法1：Netlify Drop（最简单）
1. 访问 https://app.netlify.com/drop
2. 将此文件夹中的所有文件拖入页面
3. 立即获得免费域名：*.netlify.app

### 方法2：Vercel部署
1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择 "Deploy from a folder"
4. 上传此文件夹

### 方法3：GitHub Pages
1. 创建仓库：您的用户名.github.io
2. 上传此文件夹内容
3. 在Settings中启用GitHub Pages

## 🌐 部署后访问
- Netlify: https://*.netlify.app
- Vercel: https://*.vercel.app
- GitHub Pages: https://您的用户名.github.io

## 📞 支持
如有问题，联系贝贝豆助手
EOF
    
    echo "✅ 部署包创建完成：$DEPLOY_DIR"
    echo "📁 包含文件："
    ls -la "$DEPLOY_DIR/"
}

# 提供部署选项
show_deployment_options() {
    echo ""
    echo "🎯 部署选项："
    echo "1. Netlify Drop - 拖拽部署（推荐）"
    echo "2. Vercel - 专业部署"
    echo "3. GitHub Pages - 完全免费"
    echo "4. 所有文件打包下载"
    echo ""
    
    read -p "请选择部署方式 (1-4): " choice
    
    case $choice in
        1)
            echo "🌐 请访问：https://app.netlify.com/drop"
            echo "📁 将 $DEPLOY_DIR 中的文件拖入页面"
            ;;
        2)
            echo "🌐 请访问：https://vercel.com/new"
            echo "📁 选择 'Deploy from a folder' 并上传 $DEPLOY_DIR"
            ;;
        3)
            echo "🌐 请访问：https://github.com/new"
            echo "📁 创建仓库后上传 $DEPLOY_DIR 中的文件"
            ;;
        4)
            echo "📦 部署包位置：$DEPLOY_DIR"
            echo "📋 包含完整的部署说明"
            ;;
        *)
            echo "❌ 无效选择"
            ;;
    esac
}

# 主函数
main() {
    echo "💰 贝贝豆为您服务！"
    check_tools
    build_project
    create_deployment_package
    show_deployment_options
    
    echo ""
    echo "🎉 部署准备完成！"
    echo "💡 提示：如果遇到问题，请查看 $DEPLOY_DIR/README-DEPLOY.md"
    echo "💰 贝贝豆随时为您提供帮助！"
}

# 运行主函数
main