// Questree 类型定义

/** 节点状态 */
export type NodeStatus = 'pending' | 'resolved' | 'unresolved';

/** 追问树节点数据 */
export interface QuestreeNodeData {
    /** 节点标题 */
    title: string;
    /** 节点描述/问题内容 */
    question?: string;
    /** 关联的 URL */
    url?: string;
    /** 节点状态 */
    status: NodeStatus;
    /** 创建时间 */
    createdAt: number;
    /** 更新时间 */
    updatedAt: number;
    /** AI 回答内容 */
    answer?: string;
    /** 是否折叠子节点 */
    collapsed?: boolean;
    /** 索引签名 - React Flow 类型兼容 */
    [key: string]: unknown;
}

/** React Flow 节点类型 */
export interface QuestreeNode {
    id: string;
    type: 'questreeNode';
    position: { x: number; y: number };
    data: QuestreeNodeData;
}

/** React Flow 边类型 */
export interface QuestreeEdge {
    id: string;
    source: string;
    target: string;
    type?: string;
}

/** 整棵追问树的数据结构 */
export interface QuestreeData {
    nodes: QuestreeNode[];
    edges: QuestreeEdge[];
    rootNodeId?: string;
}

/** Chrome 消息类型 */
export interface ChromeMessage {
    type: string;
    [key: string]: unknown;
}
