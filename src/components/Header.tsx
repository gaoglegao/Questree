import { useTreeStore } from '../stores/treeStore';

/** 侧边栏头部组件 */
export default function Header() {
    const { nodes } = useTreeStore();

    // 统计节点状态
    const stats = {
        total: nodes.length,
        resolved: nodes.filter((n) => n.data.status === 'resolved').length,
        unresolved: nodes.filter((n) => n.data.status === 'unresolved').length,
        pending: nodes.filter((n) => n.data.status === 'pending').length,
    };

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50">
            {/* Logo 和标题 */}
            <div className="flex items-center gap-2">
                <span className="text-2xl">🌳</span>
                <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        Questree
                    </h1>
                    <p className="text-xs text-slate-400">追问</p>
                </div>
            </div>

            {/* 状态统计 */}
            <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1" title="总节点数">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="text-slate-300">{stats.total}</span>
                </div>
                <div className="flex items-center gap-1" title="已解决">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-slate-300">{stats.resolved}</span>
                </div>
                <div className="flex items-center gap-1" title="有疑问">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-slate-300">{stats.unresolved}</span>
                </div>
                <div className="flex items-center gap-1" title="待处理">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="text-slate-300">{stats.pending}</span>
                </div>
            </div>
        </header>
    );
}
