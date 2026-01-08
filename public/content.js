// Questree Content Script
// 注入到所有网页中，用于与网页内容交互

// 监听来自 Background 或 Side Panel 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_PAGE_INFO') {
        // 获取当前页面信息
        sendResponse({
            url: window.location.href,
            title: document.title,
            selectedText: window.getSelection()?.toString() || ''
        });
    }

    if (message.type === 'GET_SELECTED_TEXT') {
        // 获取选中的文本（用于"一键萌芽"功能）
        const selectedText = window.getSelection()?.toString() || '';
        sendResponse({ selectedText });
    }

    if (message.type === 'FILL_INPUT') {
        // 自动填充输入框（用于"自动填充"功能）
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            activeElement.value = message.text;
            activeElement.dispatchEvent(new Event('input', { bubbles: true }));
            sendResponse({ success: true });
        } else {
            sendResponse({ success: false, error: 'No input element focused' });
        }
    }

    return false;
});

// 监听文本选择事件，用于"一键萌芽"功能的快捷按钮
document.addEventListener('mouseup', (e) => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText && selectedText.length > 0) {
        // 发送选中文本到 background
        chrome.runtime.sendMessage({
            type: 'TEXT_SELECTED',
            text: selectedText,
            url: window.location.href
        }).catch(() => {
            // 忽略错误
        });
    }
});

console.log('Questree content script loaded');
