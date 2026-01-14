@echo off
chcp 65001 >nul
cd /d D:\kuleshov's-experiment
echo ====================================
echo 检查并重新安装 Node.js
echo ====================================

echo 正在检查 Node.js...
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ Node.js 已安装
    node --version
    npm --version
    echo.
    echo 如果您想重新安装，请先卸载现有的 Node.js
    echo 然后重新运行此脚本
    pause
    exit /b 0
) else (
    echo ❌ Node.js 未安装，开始下载...
)

echo 正在下载 Node.js LTS 版本...
powershell -command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile 'node-v20.11.1-x64.msi'"
if %errorlevel% neq 0 (
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

start /wait node-v20.11.1-x64.msi

echo.
echo 安装程序已启动，请完成安装过程。
echo 安装完成后，请关闭此窗口并重新运行环境检查脚本。
echo.
echo 或者，按任意键继续进行环境检查...
pause

REM 清理下载的文件
if exist node-v20.11.1-x64.msi del node-v20.11.1-x64.msi

REM 重新检查安装
echo.
echo 正在验证安装...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 安装可能失败，请重启命令提示符后重试
    echo 或者手动访问 https://nodejs.org/ 进行安装
) else (
    echo ✅ Node.js 安装成功！
    node --version
    npm --version
)

pause