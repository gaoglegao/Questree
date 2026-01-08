import { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    type Connection,
    type Edge,
    type Node,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import QuestreeNode from './QuestreeNode';
import { useTreeStore } from '../stores/treeStore';

// 注册自定义节点类型
const nodeTypes = {
    questreeNode: QuestreeNode,
};

/** 追问树画布组件 - 横向布局 */
export default function TreeCanvas() {
    const {
        nodes: storeNodes,
        edges: storeEdges,
        setNodes: setStoreNodes,
        setEdges: setStoreEdges,
        initializeTree
    } = useTreeStore();

    const [nodes, setNodes, onNodesChange] = useNodesState(storeNodes as Node[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);

    // 初始化树
    useEffect(() => {
        initializeTree();
    }, [initializeTree]);

    // 同步 store 到本地 state
    useEffect(() => {
        setNodes(storeNodes as Node[]);
    }, [storeNodes, setNodes]);

    useEffect(() => {
        setEdges(storeEdges);
    }, [storeEdges, setEdges]);

    // 同步本地 state 到 store（使用类型断言）
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setStoreNodes(nodes as any);
    }, [nodes, setStoreNodes]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setStoreEdges(edges as any);
    }, [edges, setStoreEdges]);

    // 处理连接
    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds: Edge[]) => addEdge({
                ...connection,
                id: `edge_${connection.source}_${connection.target}`,
            }, eds));
        },
        [setEdges]
    );

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.3 }}
                minZoom={0.1}
                maxZoom={2}
                defaultEdgeOptions={{
                    style: { stroke: '#10b981', strokeWidth: 2 },
                    animated: true,
                    type: 'smoothstep', // 平滑的阶梯连线，更适合横向布局
                }}
                proOptions={{ hideAttribution: true }}
            >
                {/* 背景网格 */}
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    color="#334155"
                />

                {/* 控制按钮 */}
                <Controls
                    position="bottom-right"
                    showZoom={true}
                    showFitView={true}
                    showInteractive={false}
                />

                {/* 小地图 */}
                <MiniMap
                    position="bottom-left"
                    nodeColor={(node) => {
                        switch (node.data?.status) {
                            case 'resolved': return '#22c55e';
                            case 'unresolved': return '#ef4444';
                            default: return '#f59e0b';
                        }
                    }}
                    maskColor="rgba(15, 23, 42, 0.8)"
                    style={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                    }}
                />
            </ReactFlow>
        </div>
    );
}
