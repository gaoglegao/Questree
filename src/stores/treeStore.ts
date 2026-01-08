import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuestreeNode, QuestreeEdge, NodeStatus } from '../types';

interface TreeState {
    nodes: QuestreeNode[];
    edges: QuestreeEdge[];
    selectedNodeId: string | null;

    // Actions
    setNodes: (nodes: QuestreeNode[]) => void;
    setEdges: (edges: QuestreeEdge[]) => void;
    addNode: (node: QuestreeNode) => void;
    updateNode: (id: string, data: Partial<QuestreeNode['data']>) => void;
    deleteNode: (id: string) => void;
    addEdge: (edge: QuestreeEdge) => void;
    deleteEdge: (id: string) => void;
    selectNode: (id: string | null) => void;
    updateNodeStatus: (id: string, status: NodeStatus) => void;
    createChildNode: (parentId: string, title: string, url?: string) => string;
    initializeTree: () => void;
}

// 生成唯一 ID
const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const useTreeStore = create<TreeState>()(
    persist(
        (set, get) => ({
            nodes: [],
            edges: [],
            selectedNodeId: null,

            setNodes: (nodes) => set({ nodes }),
            setEdges: (edges) => set({ edges }),

            addNode: (node) => set((state) => ({
                nodes: [...state.nodes, node]
            })),

            updateNode: (id, data) => set((state) => ({
                nodes: state.nodes.map((node) =>
                    node.id === id
                        ? { ...node, data: { ...node.data, ...data, updatedAt: Date.now() } }
                        : node
                )
            })),

            deleteNode: (id) => set((state) => ({
                nodes: state.nodes.filter((node) => node.id !== id),
                edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
                selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId
            })),

            addEdge: (edge) => set((state) => ({
                edges: [...state.edges, edge]
            })),

            deleteEdge: (id) => set((state) => ({
                edges: state.edges.filter((edge) => edge.id !== id)
            })),

            selectNode: (id) => set({ selectedNodeId: id }),

            updateNodeStatus: (id, status) => {
                const { updateNode, nodes, edges } = get();
                updateNode(id, { status });

                // 递归更新父节点状态（如果所有子节点都完成，父节点也标记为完成）
                const parentEdge = edges.find((edge) => edge.target === id);
                if (parentEdge) {
                    const parentId = parentEdge.source;
                    const childEdges = edges.filter((edge) => edge.source === parentId);
                    const childNodes = childEdges.map((edge) =>
                        nodes.find((node) => node.id === edge.target)
                    );

                    // 如果有任何子节点未解决，父节点状态为 pending
                    const hasUnresolved = childNodes.some(
                        (node) => node?.data.status === 'unresolved'
                    );
                    const allResolved = childNodes.every(
                        (node) => node?.data.status === 'resolved'
                    );

                    if (hasUnresolved) {
                        updateNode(parentId, { status: 'pending' });
                    } else if (allResolved) {
                        updateNode(parentId, { status: 'resolved' });
                    }
                }
            },

            createChildNode: (parentId, title, url) => {
                const { nodes, addNode, addEdge } = get();
                const parentNode = nodes.find((n) => n.id === parentId);

                if (!parentNode) return '';

                const newId = generateId();
                const childrenCount = get().edges.filter((e) => e.source === parentId).length;

                const newNode: QuestreeNode = {
                    id: newId,
                    type: 'questreeNode',
                    position: {
                        x: parentNode.position.x + 350,  // 横向：向右偏移
                        y: parentNode.position.y + (childrenCount - 0.5) * 100  // 垂直居中分布
                    },
                    data: {
                        title,
                        url,
                        status: 'pending',
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }
                };

                addNode(newNode);
                addEdge({
                    id: `edge_${parentId}_${newId}`,
                    source: parentId,
                    target: newId
                });

                return newId;
            },

            initializeTree: () => {
                const { nodes } = get();
                if (nodes.length === 0) {
                    // 创建根节点
                    const rootNode: QuestreeNode = {
                        id: 'root',
                        type: 'questreeNode',
                        position: { x: 100, y: 200 },
                        data: {
                            title: '🌱 开始你的追问',
                            question: '点击 + 按钮添加第一个问题节点',
                            status: 'pending',
                            createdAt: Date.now(),
                            updatedAt: Date.now()
                        }
                    };
                    set({ nodes: [rootNode], edges: [] });
                }
            }
        }),
        {
            name: 'questree-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
