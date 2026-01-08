# Questree 🌳

**A Tree-Structured Logic Exploration Tool.**

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![platform](https://img.shields.io/badge/platform-Chrome%20Extension-orange.svg)]()
[**🇨🇳 中文文档 (Chinese)**](./README.md)

---

## 🌟 What is Questree?

When conducting AI conversations or deep research, we often fall into the **"quagmire of linear information"**:
- **Too Long**: AI gradually forgets context, and logic becomes chaotic.
- **Too Many Branches**: Opening countless tabs to pursue a detail, scattering your thoughts everywhere.
- **High Friction**: Copy-pasting context between different web pages feels extremely disjointed.

**Questree** is a Chrome browser extension. It visualizes your thinking path as a **"Logic Tree"**. Every "follow-up question" is a branch, and every web page is a node. It makes complex research processes orderly, traceable, and manageable.

## ✨ Core Highlights

### 1. Structured Thought Graph (The Tree)
- **Horizontal Expansion (Depth)**: Progressive "follow-up" on details of an answer.
- **Vertical Parallelism (Breadth)**: Try different questioning directions or compare sources at the same level.
- **Fold & Expand**: Keep the interface clean, focusing only on the currently active logic chain.

### 2. Recursive Task Tracking
- **Node Status**: Each node can be marked as **Resolved (✓)** or **Unresolved (✗)**.
- **Recursive Logic**: If child nodes are unfinished, the parent node automatically shows as "Pending", ensuring no blind spots in your research.

### 3. Web-as-a-Node Integration
- **Side-by-Side Preview**: Click a node in the tree to instantly navigate the main window to the corresponding URL.
- **No More Tab Chaos**: Forget managing dozens of tabs; the sidebar tree is your navigation map.

### 4. Context-Aware Intelligence
- Automatically references weight information from parent and sibling nodes when questioning, making AI answers more precise without repeating background context.

## 🗺️ Roadmap

### Phase 1: Foundation (Browser Extension Base) - In Progress
- [x] **Side Panel Architecture**: Native sidebar container development.
- [x] **Tree Interaction Engine**: Node CRUD and connections based on React Flow.
- [ ] **Node Navigation**: Auto-navigate/switch to URL upon clicking a node.

### Phase 2: AI Injection (Smart Questioning)
- [ ] **Lightweight Dialog**: Ask AI directly within the node.
- [ ] **Smart Prompt Construction**: Auto-extract context based on the node's position in the tree.
- [ ] **Node State Machine**: "Check/Cross" logic with recursive updates.

### Phase 3: Deep Exploration
- [ ] **Smart Sprout**: Select text on a webpage to instantly generate a related child node.
- [ ] **Auto-Fill**: Automatically fill parent context into input boxes on new webpages.
- [ ] **Mind Export**: Export the entire "Questree" as Markdown or PDF.

## 🛠️ Tech Stack

- **Core Framework**: React + Vite
- **Extension Standard**: Chrome Extension Manifest V3
- **Visualization**: React Flow (for dynamic node canvas)
- **State Management**: Zustand / Chrome Storage API
- **Styling**: Tailwind CSS

## 📦 Installation & Usage (Dev Preview)

1. Clone this repository:
   ```bash
   git clone https://github.com/gaoglegao/Questree.git
   ```
2. Install dependencies and build:
   ```bash
   npm install
   npm run build:ext
   ```
3. Open Chrome and define `chrome://extensions/`.
4. Enable **"Developer mode"**, click **"Load unpacked"**, and select the `dist` directory.
5. Click the plugin icon to open the Side Panel and start your journey.

## 🚀 Development

```bash
# Install dependencies
npm install

# Dev mode (HMR)
npm run dev

# Build for production
npm run build

# Build Chrome Extension (Full Build)
npm run build:ext
```

## 🌈 Vision

Questree aims to be the **"Logical Exoskeleton"** for the human brain in the AI era. We are not just browsing webpages; we are building a forest of knowledge.

## 💡 Contributing

If you have unique insights into "Structured Questioning" or "Visual Note-taking", Issues and Pull Requests are welcome!

---
Questree - Deepen your thoughts, one branch at a time.
