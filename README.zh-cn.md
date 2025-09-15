<div align="center">
  <h1 align="center">Hextra</h1>
  <sup align="center"><a href="README.md">English</a> | <a href="README.zh-cn.md">简体中文</a> ｜ <a href="README.fa.md">فارسی</a></sup>
  <p align="center">用于创建美观的静态站点的现代化, 响应式, 功能强大的 Hugo 主题.</p>

演示 → [imfing.github.io/hextra](https://imfing.github.io/hextra/)
</div>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/5097752/263550533-c18343ca-3848-4230-b5c0-ee989d7916da.png">
  <img alt="Hextra" src="https://user-images.githubusercontent.com/5097752/263550528-663599f9-17a1-4686-b5c4-3da233b5034d.png">
</picture>

<div align="right">
<a href="https://github.com/imfing/hextra/actions/workflows/pages.yml"><img alt="GitHub Actions Status" src="https://github.com/imfing/hextra/actions/workflows/pages.yml/badge.svg"></a> <a href="https://app.netlify.com/sites/hugo-hextra/deploys"><img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/61d6e55a-2447-487e-b59f-c9537e5df175/deploy-status"></a>
</div>

## 特性

- **美观的设计** - 受 Nextra 的启发，Hextra 利用 Tailwind CSS 提供现代化的设计，使您的网站看起来美观有加.
- **响应式布局和深色模式支持** - 在任何设备上看起来都足够美观, 无论是手机, 平板电脑或者电脑. 深色模式的支持使 Hextra 可以应对各种照明环境.
- **快速且轻量** - 由 Hugo 强力支持, Hugo 是一个快如闪电的静态站点生成器, 这一切都只需一个可执行文件, Hextra 始终保持最小化, 无需 Javascript 或者 Node.js.
- **全文搜索** - 集成了 Flexsearch 的全文搜索, 无需额外的配置.
- **功能齐全** - Markdown, 代码高亮, LaTex 数学公式, diagrams 图表和 Shortcodes 都可以用于丰富你的内容. 目录, 面包屑导航, 分页, 侧边栏等均由 Hextra 自动生成。
- **多语言和 SEO Ready** - Hugo 的多语言模式使得构建多语言网站更简单. 具有 SEO tags, Open Graph, 和 Twitter Cards 等诸多开箱即用的功能.

## 快速开始

### 使用模板

使用 [Hextra stater template](https://github.com/imfing/hextra-starter-template) 是使用 Hextra 主题的最简单方法. 点击仓库页面上的 `Use this template` 按钮开始使用.

此仓库中包含一个 [GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) 来帮助你免费在 GitHub Pages 上自动构建和部署网站.

### 使用

转至[文档](https://imfing.github.io/hextra/zh-cn/docs)

## 本地运行测试

### 环境要求

#### 基本要求 (必须)
- **Hugo** (版本 ≥ 0.146.0，需要 Extended 版本)
- **Git**

#### 完整开发环境 (可选)
- **Go** (版本 ≥ 1.20) - 用于 Task 运行器
- **Node.js** - 用于 CSS 编译和高级开发功能

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/imfing/hextra.git
   cd hextra
   ```

2. **安装 Node.js 依赖** (可选，用于完整开发功能)
   ```bash
   npm install
   ```
   
   > **注意**：如果只是简单测试主题，可以跳过此步骤，直接使用 Hugo 命令。

### 开发命令

#### 启动开发服务器

**快速启动 (仅需 Hugo)**：
```bash
# 直接使用 Hugo 命令启动开发服务器
hugo server --source=exampleSite --themesDir=../.. --disableFastRender -D --port 1313
```

**完整开发环境 (需要 Node.js)**：
```bash
# 启动主题开发服务器，包含热重载和调试日志
npm run dev:theme

# 或标准开发服务器
npm run dev
```

**使用 Task 运行器**：
```bash
# 安装 Task (如果尚未安装)
go install github.com/go-task/task/v3/cmd/task@latest

# 启动开发服务器
task dev
```

#### 构建项目

**构建示例网站**：
```bash
npm run build
# 或使用 Task
task build
```

**仅编译 CSS**：
```bash
npm run build:css
# 或使用 Task
task css
```

### 测试流程

1. **启动开发服务器**
   ```bash
   npm run dev:theme
   ```

2. **访问本地网站**
   
   打开浏览器访问：`http://localhost:1313`

3. **实时预览**
   
   修改 `exampleSite/` 目录下的内容文件，浏览器会自动刷新显示更改。

4. **测试多语言功能**
   
   访问不同语言版本：
   - 英文：`http://localhost:1313/en/`
   - 中文：`http://localhost:1313/zh-cn/`
   - 波斯语：`http://localhost:1313/fa/`
   - 日语：`http://localhost:1313/ja/`

### 开发提示

- **主题开发**：使用 `npm run dev:theme` 获得更详细的调试信息
- **内容测试**：在 `exampleSite/content/` 目录下添加或修改内容进行测试
- **样式修改**：修改 `assets/css/` 目录下的样式文件
- **配置测试**：编辑 `exampleSite/hugo.yaml` 来测试不同的配置选项

### 故障排除

如果遇到问题，请尝试：

1. **清理缓存**：
   ```bash
   hugo mod clean
   npm run build:css
   ```

2. **重新安装依赖**：
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **检查 Hugo 版本**：
   ```bash
   hugo version
   ```
   确保使用的是 Extended 版本 ≥ 0.146.0

## 贡献

该项目正在积极开发中. 欢迎贡献!

## 许可证

[MIT License](./LICENSE)
