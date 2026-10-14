/**
 * AI-home Google Drive 素材清單 API
 * 資料夾 ID：1mGwvEvcGJWJYZuedg55wypbDAzaDaZhY
 *
 * 部署為 Web app 後，網站可用 ?callback=函式名稱 讀取清單（JSONP）。
 * 請勿將私人或敏感檔案放在公開素材資料夾。
 */
const AI_HOME_FOLDER_ID = '1mGwvEvcGJWJYZuedg55wypbDAzaDaZhY';

function doGet(e) {
  const payload = {
    ok: true,
    folderId: AI_HOME_FOLDER_ID,
    updatedAt: new Date().toISOString(),
    files: listAssets_()
  };

  const callback = e && e.parameter ? e.parameter.callback : '';
  if (callback) {
    // 限制 callback 格式，避免把任意內容拼進可執行程式碼。
    if (!/^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(callback)) {
      return ContentService.createTextOutput('Invalid callback')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function listAssets_() {
  const folder = DriveApp.getFolderById(AI_HOME_FOLDER_ID);
  const iterator = folder.getFiles();
  const files = [];

  while (iterator.hasNext()) {
    const file = iterator.next();
    const id = file.getId();
    const name = file.getName();
    const mimeType = file.getMimeType();
    const isImage = mimeType.indexOf('image/') === 0;
    const isVideo = mimeType.indexOf('video/') === 0;

    files.push({
      id: id,
      name: name,
      mimeType: mimeType,
      updatedAt: file.getLastUpdated().toISOString(),
      size: file.getSize(),
      viewUrl: 'https://drive.google.com/file/d/' + id + '/view',
      downloadUrl: 'https://drive.google.com/uc?export=download&id=' + id,
      imageUrl: isImage ? 'https://drive.google.com/uc?export=view&id=' + id : '',
      videoUrl: isVideo ? 'https://drive.google.com/uc?export=download&id=' + id : '',
      previewUrl: isVideo ? 'https://drive.google.com/file/d/' + id + '/preview' : ''
    });
  }

  files.sort(function(a, b) {
    return a.name.localeCompare(b.name, 'zh-Hant');
  });
  return files;
}
