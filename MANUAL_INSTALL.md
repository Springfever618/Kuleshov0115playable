# Node.js 手动安装指南

## Windows 系统安装 Node.js

### 方法一：使用官方安装程序（推荐）

#### 步骤：

1. **访问官方网站**
   - 打开浏览器，访问：https://nodejs.org/
   - 网站会自动检测您的系统

2. **下载 LTS 版本**
   - 在网站首页找到绿色的 "LTS" 按钮
   - 点击下载适用于 Windows 的 .msi 安装程序

3. **运行安装程序**
   - 找到下载的 .msi 文件（通常在 Downloads 文件夹）
   - 双击运行安装程序

4. **安装向导**
   - 点击 "Next" 继续
   - 接受许可协议（勾选 "I accept the terms in the License Agreement"）
   - 保持默认安装路径（通常是 `C:\Program Files\nodejs\`）
   - 点击 "Next" 继续所有步骤
   - 点击 "Install" 开始安装
   - 等待安装完成，点击 "Finish"

5. **验证安装**
   - 打开命令提示符（Win + R，输入 `cmd`，回车）
   - 输入以下命令验证：
     ```
     node --version
     npm --version
     ```
   - 如果显示版本号，说明安装成功

### 方法二：使用 Windows 包管理器

#### 使用 Winget（Windows 10/11 内置）

```cmd
winget install OpenJS.NodeJS.LTS
```

#### 使用 Chocolatey（如果已安装）

```cmd
choco install nodejs-lts
```

### 常见问题解决

#### 问题：'node' 不是内部或外部命令

**原因：** PATH 环境变量未正确设置

**解决方法：**
1. 右键点击"此电脑" → "属性"
2. 点击"高级系统设置"
3. 点击"环境变量"
4. 在"系统变量"中找到 "Path"
5. 点击"编辑"
6. 点击"新建"
7. 添加以下路径：
   - `C:\Program Files\nodejs\`
   - `C:\Program Files\nodejs\node_modules\npm\bin\`
8. 点击"确定"保存所有对话框
9. 重启命令提示符

#### 问题：安装程序无法运行

**原因：** 权限不足或安全软件阻止

**解决方法：**
1. 右键点击安装程序
2. 选择"以管理员身份运行"
3. 如果仍有问题，暂时关闭杀毒软件

#### 问题：安装后仍无法使用

**原因：** 需要重启或 PATH 未生效

**解决方法：**
1. 重启计算机
2. 重新打开命令提示符
3. 如果仍不行，按上述方法手动设置 PATH

### 安装完成后

安装完成后，您可以：

1. **验证安装**
   ```cmd
   node --version
   npm --version
   ```

2. **运行项目**
   - 双击运行 `setup-and-start.bat` 进行完整设置
   - 或双击运行 `start.bat` 直接启动项目

3. **访问项目**
   - 项目将在浏览器中打开：http://localhost:3000

### 获取帮助

如果安装过程中遇到问题：

1. 查看官方文档：https://nodejs.org/en/docs/
2. 访问中文社区：https://cnodejs.org/
3. 查看常见问题：https://nodejs.org/en/docs/guides/

---

**注意：** 请确保安装 LTS（长期支持）版本，而不是 Current 版本，以获得更好的稳定性和兼容性。