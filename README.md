<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ZREgjPDvrWktf8Ps6sCYmZSFEHRQ3WDZ

## Run Locally

**Prerequisites:** Node.js

### 1. 安装 Node.js

首先需要安装 Node.js，如果还没有安装：

**方法一：简化安装指导（推荐新手）**
- 双击运行 `install-nodejs-simple.bat`，按照屏幕指导手动安装 Node.js

**方法二：详细手动安装指南**
- 查看 `MANUAL_INSTALL.md` 文件获取详细的安装步骤和问题解决方法

**方法三：自动安装（高级用户）**
- 双击运行 `install-nodejs.bat`，脚本会自动检测系统架构并下载安装最新 LTS 版本

**方法四：使用包管理器（高级用户）**
- Winget: `winget install OpenJS.NodeJS.LTS`
- Chocolatey: `choco install nodejs-lts`

**方法五：使用 nvm-windows（开发者选项）**
1. 下载 nvm-windows：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)
2. 安装并重启命令提示符
3. 安装 Node.js：`nvm install lts`
4. 使用 Node.js：`nvm use lts`

### 2. 检查 Node.js 安装

运行环境检查脚本：
- 双击运行 `check-nodejs.bat` 检查 Node.js 和 npm 是否正确安装

### 3. 一键设置和启动

**推荐方式：**
- 双击运行 `setup-and-start.bat` 进行完整设置（安装依赖 + 打包）
- 打包完成后，双击运行 `start.bat` 启动项目

**手动方式：**
1. 安装依赖：
   ```bash
   npm install
   ```
2. 设置 API Key（已自动配置）：
   - `.env` 和 `.env.local` 文件已包含 Gemini API Key
3. 启动项目：
   ```bash
   npm run dev
   ```
