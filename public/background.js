// Questree Background Service Worker
// Chrome Extension Manifest V3

// 当点击扩展图标时，打开 Side Panel
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// 监听来自 Side Panel 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NAVIGATE_TO_URL') {
    // 导航到指定 URL
    chrome.tabs.update(message.tabId, { url: message.url });
    sendResponse({ success: true });
  }
  
  if (message.type === 'GET_ACTIVE_TAB') {
    // 获取当前活跃的标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        sendResponse({ tab: tabs[0] });
      } else {
        sendResponse({ tab: null });
      }
    });
    return true; // 保持消息通道开放以进行异步响应
  }
  
  if (message.type === 'CREATE_NEW_TAB') {
    // 创建新标签页
    chrome.tabs.create({ url: message.url }, (tab) => {
      sendResponse({ tab });
    });
    return true;
  }
  
  return false;
});

// 监听标签页更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // 向 Side Panel 发送页面加载完成消息
    chrome.runtime.sendMessage({
      type: 'TAB_UPDATED',
      tabId,
      url: tab.url,
      title: tab.title
    }).catch(() => {
      // Side Panel 可能未打开，忽略错误
    });
  }
});

console.log('Questree background service worker loaded');
