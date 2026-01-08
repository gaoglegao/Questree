# 追问 (Questree) 🌳

像树一样生长的逻辑探索工具 | A Tree-Structured Logic Exploration Tool.

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![platform](https://img.shields.io/badge/platform-Chrome%20Extension-orange.svg)
[**🇺🇸 English Version**](./README_EN.md)

## 🌟 什么是 Questree？

在进行 AI 对话或深度调研时，我们往往会陷入"线性信息的泥潭"：
- **对话太长**：AI 逐渐忘记上下文，逻辑变得混乱。
- **分支太多**：为了追问一个细节而打开无数个标签页，思维碎成一地。
- **操作太重**：在不同网页间复制粘贴上下文，极其割裂。

**Questree（追问）** 是一款 Chrome 浏览器插件。它将你的思考路径可视化为一棵**"逻辑树"**。每一次"追问"都是一个分枝，每一个网页都是一个节点。它让复杂的调研过程变得有序、可追溯、可管理。

## ✨ 核心亮点

### 1. 结构化思维图谱 (The Tree)
- **横向展开（深度）**：针对某个回答的细节进行递进式"追问"。
- **纵向并行（广度）**：在同一层级尝试不同的提问方向或对比不同来源。
- **折叠与展开**：保持界面简洁，只关注当前活跃的逻辑链条。

### 2. 状态递归追踪 (Task Tracking)
- **节点状态**：每个节点可标记为 **已解决 (✓)** 或 **有疑问 (✗)**。
- **递归逻辑**：如果子节点未完成，父节点会自动显示为"待处理"状态，确保调研没有死角。

### 3. 轻量化网页集成 (Web-as-a-Node)
- **右侧联动预览**：点击左侧树节点，右侧主窗口瞬间跳转至对应网页。
- **打破标签页混乱**：不再需要管理几十个 Tab，侧边栏的树就是你的导航地图。

### 4. 上下文感知 (Context-Aware)
- 提问时自动引用父节点与兄弟节点的权重信息，让 AI 的回答更精准，无需重复背景。

## 🗺️ 开发路线图 (Roadmap)

### 第一阶段：基座构建 (Browser Extension Base) - 进行中
- [x] Side Panel 架构：开发原生侧边栏容器。
- [x] 树形交互引擎：基于 React Flow 实现节点的增删改查与连线。
- [ ] 节点导航：实现点击节点，浏览器自动跳转/切换至对应 URL。

### 第二阶段：AI 注入 (Smart Questioning)
- [ ] 轻量对话框：在节点内直接进行 AI 提问。
- [ ] 智能 Prompt 构造：根据节点在树中的位置，自动提取上下文。
- [ ] 节点状态机：完成"打勾/打叉"及其向上递归的逻辑开发。

### 第三阶段：深度协同 (Deep Exploration)
- [ ] 一键萌芽 (Smart Sprout)：在网页中划选文字，直接生成关联子节点。
- [ ] 自动填充：自动在新网页的输入框内填入父节点的上下文。
- [ ] 思维导出：支持将整棵"追问树"导出为 Markdown 或 PDF。

## 🛠️ 技术栈

- **核心框架**: React + Vite
- **插件标准**: Chrome Extension Manifest V3
- **可视化库**: React Flow (用于构建动态节点画布)
- **状态管理**: Zustand / Chrome Storage API
- **样式**: Tailwind CSS

## 📦 安装与使用 (开发预览版)

1. 克隆本仓库：
   ```bash
   git clone https://github.com/your-username/questree.git
   ```
2. 安装依赖并构建：
   ```bash
   npm install
   npm run build
   ```
3. 打开 Chrome 浏览器，进入 `chrome://extensions/`。
4. 开启"开发者模式"，点击"加载已解压的扩展程序"，选择 `dist` 目录。
5. 点击插件图标打开 Side Panel，开启你的"追问"之旅。

## 🚀 开发模式

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev

# 构建生产版本
npm run build

# 构建 Chrome 扩展（完整构建）
npm run build:ext
```

## 🌈 愿景

Questree 追问 的目标是成为 AI 时代人类大脑的"逻辑外挂"。我们不只是在看网页，我们是在构建知识的森林。

## 💡 参与贡献

如果你对"结构化提问"或"可视化笔记"有独到的见解，欢迎提交 Issue 或 Pull Request！

---
Questree - Deepen your thoughts, one branch at a time.
