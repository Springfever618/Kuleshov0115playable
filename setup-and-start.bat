@echo off
chcp 65001 >nul
echo ====================================
echo 正在检查环境...
echo ====================================

REM 检查 Node.js 和 npm 是否已安装
where node >nul 2>nul
if errorlevel 1 (
    echo.
    echo [错误] 未找到 Node.js！
    echo.
    echo 请先安装 Node.js：
    echo.
    echo 快速安装（推荐）：
    echo 运行同目录下的 install-nodejs.bat 脚本
    echo.
    echo 手动安装：
    echo 1. 访问官网：https://nodejs.org/
    echo 2. 下载并安装 LTS 版本
    echo 3. 安装完成后重新运行此脚本
    echo.
    echo 或者使用 nvm-windows：
    echo https://github.com/coreybutler/nvm-windows/releases
    echo.
    pause
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo.
    echo [错误] 未找到 npm！
    echo.
    echo npm 通常随 Node.js 一起安装。
    echo 请确保您安装了完整的 Node.js 版本。
    echo.
    pause
    exit /b 1
)

echo Node.js 和 npm 已安装 ✓
echo.

REM 显示版本信息
echo 版本信息：
echo Node.js 版本：
node --version
echo npm 版本：
npm --version
echo.

echo ====================================
echo 正在设置项目...
echo ====================================

REM 创建 .env 文件 (使用 Node.js 确保 UTF-8 编码)
if exist create-env.js (
    node create-env.js
) else (
    echo 使用备用方法创建环境变量文件...
    echo GEMINI_API_KEY=AIzaSyDNDk5hp6d6vhnO9uKHtm_BCJqYW_xDGzk > .env
    echo GEMINI_API_KEY=AIzaSyDNDk5hp6d6vhnO9uKHtm_BCJqYW_xDGzk > .env.local
)
echo 环境变量文件已创建

REM 安装依赖
echo.
echo ====================================
echo 正在安装依赖...
echo ====================================
call npm install
if errorlevel 1 (
    echo 依赖安装失败！
    pause
    exit /b 1
)

REM 打包项目
echo.
echo ====================================
echo 正在打包项目...
echo ====================================
call npm run build
if errorlevel 1 (
    echo 打包失败！
    pause
    exit /b 1
)

echo.
echo ====================================
echo 打包成功！
echo ====================================
echo.
echo 环境变量文件已配置: .env 和 .env.local
echo API Key: AIzaSyDNDk5hp6d6vhnO9uKHtm_BCJqYW_xDGzk
echo.
echo 要启动项目，请运行: start.bat
echo 或者使用命令: npm run dev
echo.
pause
