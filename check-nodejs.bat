@echo off
chcp 65001 >nul
echo ====================================
echo Node.js 环境检查
echo ====================================

echo 正在检查 Node.js 和 npm...
echo.

REM 检查 Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js 未安装
    echo.
    echo 请访问 https://nodejs.org/ 下载并安装 Node.js LTS 版本
    goto :install_guide
) else (
    echo ✅ Node.js 已安装
    echo    版本：
    node --version
)

echo.

REM 检查 npm
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ npm 未安装
    echo.
    echo npm 通常随 Node.js 一起安装，请检查 Node.js 安装是否完整
    goto :install_guide
) else (
    echo ✅ npm 已安装
    echo    版本：
    npm --version
)

echo.
echo ====================================
echo 环境检查完成！所有组件都已正确安装。
echo ====================================
echo.
echo 现在您可以：
echo 1. 双击运行 setup-and-start.bat 进行完整设置
echo 2. 或双击运行 start.bat 直接启动项目
echo.
pause
exit /b 0

:install_guide
echo.
echo ====================================
echo 安装指南
echo ====================================
echo.
echo 方法一：自动安装（推荐）
echo 1. 运行同目录下的 install-nodejs.bat 脚本
echo 2. 脚本会自动检测系统并下载安装 Node.js
echo 3. 安装完成后重启此检查脚本
echo.
echo 方法二：官方安装程序
echo 1. 打开浏览器访问：https://nodejs.org/
echo 2. 点击下载 LTS 版本（推荐）
echo 3. 运行安装程序，保持默认设置
echo 4. 安装完成后重启此检查脚本
echo.
echo 方法二：使用包管理器（高级用户）
echo - Windows: 使用 winget 或 chocolatey
echo - macOS: 使用 brew
echo - Linux: 使用系统包管理器
echo.
echo 安装完成后，请重新运行此脚本进行验证。
echo.
pause
exit /b 1