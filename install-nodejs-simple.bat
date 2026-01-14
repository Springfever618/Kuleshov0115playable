@echo off
chcp 65001 >nul
echo ====================================
echo Node.js 简化安装脚本
echo ====================================

echo 这个脚本将指导您安装 Node.js
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
    echo.
    echo 现在您可以运行 setup-and-start.bat 来设置项目
    pause
    exit /b 0
)

echo ❌ 未检测到 Node.js 安装
echo.
echo ====================================
echo 安装步骤：
echo ====================================
echo.
echo 1. 打开浏览器访问以下地址：
echo    https://nodejs.org/
echo.
echo 2. 在网站上找到并点击 "LTS" 版本的下载按钮
echo    （通常是绿色的按钮，显示版本号）
echo.
echo 3. 下载完成后，双击运行安装程序
echo.
echo 4. 在安装向导中：
echo    - 点击 "Next"
echo    - 接受许可协议
echo    - 保持默认安装路径
echo    - 点击 "Next" 直到安装完成
echo.
echo 5. 安装完成后，重启此脚本进行验证
echo.
echo ====================================
echo.

set /p choice="安装完成后按 Y 重新检查，或按其他键退出: "
if /i "%choice%"=="Y" goto :check_install
if /i "%choice%"=="y" goto :check_install

echo 安装取消。如需重新运行，请再次执行此脚本。
pause
exit /b 1

:check_install
echo.
echo 正在验证安装...
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ 仍未检测到 Node.js
    echo 请确保安装完成并重启了命令提示符
    echo.
    echo 如果问题持续，请：
    echo 1. 检查 PATH 环境变量
    echo 2. 尝试重启计算机
    echo 3. 重新运行安装程序
    pause
    exit /b 1
) else (
    echo ✅ Node.js 安装成功！
    echo 版本信息：
    node --version
    npm --version
    echo.
    echo 现在您可以运行以下脚本：
    echo - setup-and-start.bat (完整设置和打包)
    echo - start.bat (直接启动项目)
    pause
)