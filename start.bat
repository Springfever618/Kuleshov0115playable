@echo off
chcp 65001 >nul
echo ====================================
echo 正在启动项目...
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

REM 检查环境变量文件是否存在，如果不存在则创建
if not exist .env (
    echo 正在创建 .env 文件...
    if exist create-env.js (
        node create-env.js
    ) else (
        echo GEMINI_API_KEY=AIzaSyDNDk5hp6d6vhnO9uKHtm_BCJqYW_xDGzk > .env
        echo GEMINI_API_KEY=AIzaSyDNDk5hp6d6vhnO9uKHtm_BCJqYW_xDGzk > .env.local
    )
)

REM 检查 node_modules 是否存在
if not exist node_modules (
    echo 正在安装依赖...
    call npm install
)

REM 启动开发服务器
echo.
echo 启动开发服务器中...
echo 请在浏览器中访问: http://localhost:3000
echo.
call npm run dev
