import Header from './components/Header';
import TreeCanvas from './components/TreeCanvas';
import './index.css';

/** Questree Side Panel 主应用 */
function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-900">
      {/* 头部 */}
      <Header />

      {/* 树形画布 */}
      <main className="flex-1 overflow-hidden">
        <TreeCanvas />
      </main>

      {/* 底部工具栏 */}
      <footer className="px-4 py-2 bg-slate-800/50 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>💡 双击节点编辑标题 | 点击 + 添加子节点</span>
          <span>v0.1.0</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
