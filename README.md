# MeetU: 聚會交友平台 管理後台

### 專案目的
我們是一群剛開始學習程式設計的學生，這個專案是我們的期末專題。**MeetU管理後台** 平台讓網站管理員可以更加便利地進行管理。</br>
**MeetU使用者前台**：https://github.com/HollaWord/SpringBoot-Vue3-MSSQL-WebSocket.git

### 專案成員
[Emerald](https://github.com/HollaWord) , [Benson](https://github.com/chengyu9072) , [Noel](https://github.com/Noelyan1995), [Jayson](https://github.com/jaysonyang503) , [ReynoldYuan](https://github.com/ReynoldYuan)

**MeetU管理後台** 包含以下功能：
- **快速掌握每一位會員的帳號狀態**
- **協助使用者進行恢復帳號需求**
- **清楚了解系統發送給每一位會員的通知內容**
- **方便網站管理員發送系統通知**
- **管理員可以針對每一筆檢舉資料進行審核**

### 技術堆疊
- **後端**: Spring Boot
- **前端**: Vue 3
- **資料庫**: Microsoft SQL Server (MSSQL)

# 細節請參閱我們的 MeetU.pptx 和展示影片
因PPT包含影片檔造成檔案較大，請直接於下方網址查看：</br>
https://1drv.ms/p/s!Ark_lrwm9EcYgbFvUlWK7K1gZgVTtw?e=LRsKnx

### 安裝說明
按照以下步驟設置並運行此專案：

1. **更新 MSSQL 配置**：
   在 `application.properties` 文件中，修改 MSSQL 的連接配置，包括port、用戶名和密碼。

2. **創建資料庫結構**：
   在 MSSQL 中執行 `data.sql` 腳本，以建立必要的資料表和結構。</br>
   或者可直接使用 `MeetU.bak` 建立預設資料 (請注意,部分圖片可能無法正常顯示，建議直接透過網頁前台做修改)

3. **安裝依賴包**：
   在專案根目錄下運行以下命令以安裝必要的依賴包：
   ```bash
   npm install

4. **啟動開發伺服器**：
   依賴包安裝完成後，使用以下命令啟動開發伺服器：
   ```bash
   npm run dev

# 已知問題
由於時間限制，部分功能僅部分實現。<br>

