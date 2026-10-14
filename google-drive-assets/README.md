# AI-home Google Drive 素材串接

這個資料夾包含 AI-home 的 Google Apps Script 素材清單 API。它會讀取指定 Google Drive 資料夾內的圖片、影片與其他檔案，回傳檔名、類型、大小、更新時間及可用連結。

## 素材資料夾

- Google Drive： https://drive.google.com/drive/folders/1mGwvEvcGJWJYZuedg55wypbDAzaDaZhY?usp=drive_link
- Folder ID：`1mGwvEvcGJWJYZuedg55wypbDAzaDaZhY`

## 部署步驟（需要由資料夾擁有者操作一次）

1. 開啟 [Google Apps Script](https://script.google.com/home)。
2. 建立新專案，將本資料夾的 `Code.gs` 全部內容貼入編輯器。
3. 儲存專案。
4. 按「部署」→「新增部署」→ 選取類型「網頁應用程式」。
5. 「執行身分」選「我」，「誰可以存取」依帳戶允許的選項選「任何人」。
6. 按部署並完成 Google 權限授權，複製部署網址（通常以 `/exec` 結尾）。

官方說明：[將 Apps Script 部署為網頁應用程式](https://developers.google.com/apps-script/guides/web)。

## 測試

將部署網址加上 `?callback=aiHomeDriveAssetsCallback`，例如：

```
https://script.google.com/macros/s/你的部署ID/exec?callback=aiHomeDriveAssetsCallback
```

成功時應看到類似 `aiHomeDriveAssetsCallback({"ok":true,...});` 的內容。若出現權限錯誤，請確認 Apps Script 是以資料夾擁有者帳戶執行，且該帳戶可以讀取素材資料夾。

## 檔案分享與使用注意

- 網站訪客要直接載入檔案，該檔案需允許訪客存取。請先將素材資料夾設為「知道連結的任何人可檢視」，並確認新加入檔案沒有被個別權限限制。
- 不要把私人文件、帳號憑證或不應公開的素材放進這個資料夾。
- API 會列出資料夾的直接子檔案，不會遞迴列出子資料夾中的檔案。
- Google Drive 適合當素材管理區，但大型影片的直接播放可能受 Drive 預覽、下載限制或瀏覽器支援影響；若影片無法播放，可改用公開 MP4 主機或 YouTube 非公開影片。
- 這份程式先建立「雲端素材清單 API」。要讓 Imperia 網站自動把清單顯示在作品大廳，還需要把 Apps Script 部署網址接到網站前端；部署完成後提供該網址即可進行下一步。
