import { memo, useState } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { QuestreeNodeData } from '../types';
import { useTreeStore } from '../stores/treeStore';

/** 追问树自定义节点组件 */
const QuestreeNode = memo(({ id, data, selected }: NodeProps & { data: QuestreeNodeData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(data.title);
    const { updateNode, updateNodeStatus, createChildNode, deleteNode, selectNode } = useTreeStore();

    // 状态图标
    const statusIcon = {
        pending: '⏳',
        resolved: '✓',
        unresolved: '✗'
    }[data.status];

    // 状态颜色
    const statusColor = {
        pending: 'border-yellow-500/50 bg-yellow-500/10',
        resolved: 'border-green-500/50 bg-green-500/10',
        unresolved: 'border-red-500/50 bg-red-500/10'
    }[data.status];

    const handleTitleSave = () => {
        updateNode(id, { title: editTitle });
        setIsEditing(false);
    };

    const handleAddChild = () => {
        const title = prompt('输入新节点的问题/标题:');
        if (title) {
            createChildNode(id, title);
        }
    };

    const handleNavigate = () => {
        if (data.url) {
            // 发送消息给 background script 导航到 URL
            chrome.runtime?.sendMessage({
                type: 'NAVIGATE_TO_URL',
                url: data.url
            });
        }
    };

    const handleStatusToggle = () => {
        const nextStatus = {
            pending: 'resolved',
            resolved: 'unresolved',
            unresolved: 'pending'
        }[data.status] as 'pending' | 'resolved' | 'unresolved';
        updateNodeStatus(id, nextStatus);
    };

    return (
        <div
            className={`
        min-w-[200px] max-w-[280px] rounded-xl border-2 backdrop-blur-md
        transition-all duration-200 ease-out
        ${statusColor}
        ${selected ? 'ring-2 ring-emerald-400 shadow-lg shadow-emerald-500/20' : 'shadow-md'}
        hover:shadow-lg hover:scale-[1.02]
      `}
            onClick={() => selectNode(id)}
        >
            {/* 输入连接点 */}
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-800"
            />

            {/* 节点头部 */}
            <div className="px-4 py-3 border-b border-slate-600/30">
                <div className="flex items-center justify-between gap-2">
                    {/* 状态按钮 */}
                    <button
                        onClick={handleStatusToggle}
                        className="text-lg hover:scale-110 transition-transform"
                        title="切换状态"
                    >
                        {statusIcon}
                    </button>

                    {/* 标题 */}
                    {isEditing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={handleTitleSave}
                            onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                            autoFocus
                            className="flex-1 bg-slate-700/50 text-white text-sm rounded px-2 py-1 outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                    ) : (
                        <span
                            onDoubleClick={() => setIsEditing(true)}
                            className="flex-1 text-sm font-medium text-slate-100 truncate cursor-text"
                            title={data.title}
                        >
                            {data.title}
                        </span>
                    )}

                    {/* 操作按钮 */}
                    <div className="flex gap-1">
                        <button
                            onClick={handleAddChild}
                            className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/40 transition-colors"
                            title="添加子节点"
                        >
                            +
                        </button>
                        {id !== 'root' && (
                            <button
                                onClick={() => deleteNode(id)}
                                className="w-6 h-6 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/40 transition-colors"
                                title="删除节点"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 节点内容 */}
            <div className="px-4 py-3">
                {data.question && (
                    <p className="text-xs text-slate-400 mb-2 line-clamp-2">{data.question}</p>
                )}

                {data.url && (
                    <button
                        onClick={handleNavigate}
                        className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                        <span>🔗</span>
                        <span className="truncate max-w-[180px]">{new URL(data.url).hostname}</span>
                    </button>
                )}
            </div>

            {/* 输出连接点 */}
            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-slate-800"
            />
        </div>
    );
});

QuestreeNode.displayName = 'QuestreeNode';

export default QuestreeNode;
