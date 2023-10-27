// content.js

// 監聽選項卡的更新事件，包括網頁載入
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("youtube.com")) {
      console.log("Detected YouTube page");
      // 如果是YouTube頁面，執行skipYouTubeAds函數
      skipYouTubeAds(tabId);
    }
  });
  
  function skipYouTubeAds(tabId) {
    console.log("skipYouTubeAds is running"); // 輸出日誌
  
    // 使用Chrome插件API來注入JavaScript代碼以控制網頁
    const script = `
      // 檢查是否有廣告，並自動點選跳過
      var skipButton = document.querySelector('.videoAdUiSkipButton');
      if (skipButton) {
        skipButton.click();
        console.log("Clicked skip button"); // 添加console.log
      } else {
        console.log("Skip button not found"); // 添加console.log
      }
    `;
  
    chrome.scripting.executeScript({
      target: { tabId },
      function: (script) => {
        // 在瀏覽器選項卡中執行JavaScript代碼
        eval(script);
      },
      args: [script],
    });
  }
  