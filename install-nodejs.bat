@echo off
chcp 65001 >nul
echo ====================================
echo Node.js 自动安装脚本
echo ====================================

echo 这个脚本将帮助您安装 Node.js
echo.

REM 检查是否已经安装了 Node.js
where node >nul 2>nul
if not errorlevel 1 (
    echo ✅ Node.js 已经安装！
    echo 版本信息：
    node --version
    npm --version
    echo.
    echo 如果您想重新安装，请先卸载现有的 Node.js
    pause
    exit /b 0
)

echo 正在检测系统架构...
wmic os get osarchitecture | find "64" >nul
if errorlevel 1 (
    echo 检测到 32 位系统
    set NODE_URL=https://nodejs.org/dist/v20.11.1/node-v20.11.1-x86.msi
    set NODE_FILE=node-v20.11.1-x86.msi
) else (
    echo 检测到 64 位系统
    set NODE_URL=https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi
    set NODE_FILE=node-v20.11.1-x64.msi
)

echo.
echo 将下载 Node.js LTS 版本...
echo URL: %NODE_URL%
echo.

REM 检查是否安装了 PowerShell
powershell -command "Get-Host" >nul 2>nul
if errorlevel 1 (
    echo ❌ 需要 PowerShell 来下载文件
    echo 请手动访问 https://nodejs.org/ 下载并安装
    pause
    exit /b 1
)

echo 正在下载 Node.js 安装程序...
powershell -command "& {Invoke-WebRequest -Uri '%NODE_URL%' -OutFile '%NODE_FILE%'}"
if errorlevel 1 (
    echo ❌ 下载失败！
    echo 请手动访问 https://nodejs.org/ 下载并安装
    pause
    exit /b 1
)

echo ✅ 下载完成！
echo.
echo 正在启动安装程序...
echo 请在安装向导中点击"Next"，保持默认设置...
echo.

start /wait %NODE_FILE%

echo.
echo 安装程序已启动，请完成安装过程。
echo 安装完成后，请关闭此窗口并重新运行环境检查脚本。
echo.
echo 或者，按任意键继续进行环境检查...
pause

REM 清理下载的文件
if exist %NODE_FILE% del %NODE_FILE%

REM 重新检查安装
echo.
echo 正在验证安装...
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ 安装可能失败，请重启命令提示符后重试
    echo 或者手动访问 https://nodejs.org/ 进行安装
) else (
    echo ✅ Node.js 安装成功！
    echo 版本信息：
    node --version
    npm --version
)

pause