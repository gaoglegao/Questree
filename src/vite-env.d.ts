/// <reference types="vite/client" />

// Chrome Extension API 类型声明
declare namespace chrome {
    namespace sidePanel {
        function open(options: { windowId: number }): Promise<void>;
    }

    namespace action {
        const onClicked: {
            addListener(callback: (tab: chrome.tabs.Tab) => void): void;
        };
    }

    namespace tabs {
        interface Tab {
            id?: number;
            url?: string;
            title?: string;
            windowId: number;
        }

        function update(tabId: number, updateProperties: { url?: string }): Promise<Tab>;
        function query(queryInfo: { active?: boolean; currentWindow?: boolean }, callback: (tabs: Tab[]) => void): void;
        function create(createProperties: { url?: string }, callback?: (tab: Tab) => void): void;

        const onUpdated: {
            addListener(callback: (tabId: number, changeInfo: { status?: string }, tab: Tab) => void): void;
        };
    }

    namespace runtime {
        function sendMessage(message: unknown): Promise<unknown>;

        const onMessage: {
            addListener(callback: (message: unknown, sender: unknown, sendResponse: (response?: unknown) => void) => boolean | void): void;
        };
    }

    namespace storage {
        interface StorageArea {
            get(keys?: string | string[] | null): Promise<Record<string, unknown>>;
            set(items: Record<string, unknown>): Promise<void>;
            remove(keys: string | string[]): Promise<void>;
        }

        const local: StorageArea;
        const sync: StorageArea;
    }
}
