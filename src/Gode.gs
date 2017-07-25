function doGet() {
  var template = HtmlService.createTemplateFromFile('Index');
  var output = template.evaluate();
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  output.setFaviconUrl('https://ib.airbank.cz/static-html/static/favicon.ico');
  output.setTitle('Air Bank export uploader');
  
  return output;
}

function includeHtml(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getFolders() {
  var root = DriveApp.getRootFolder();
  var foldersIterator = root.getFolders();
  var currentFolderId = getCurrentFolder();
  
  var folders = [];
  folders.push({
    id: root.getId(),
    name: root.getName(),
    isCurrent: !currentFolderId,
  });
  
  while (foldersIterator.hasNext()) {
  var folder = foldersIterator.next();
    folders.push({
      id: folder.getId(),
      name: "- " + folder.getName(),
      isCurrent: folder.getId() == currentFolderId,
    });
  }
  
  
  
  return folders;
}

function getCurrentFolder() {
  var userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty('currentFolderId');
}

function setCurrentFolder(folderId) {
  var userProperties = PropertiesService.getUserProperties();
  return userProperties.setProperty('currentFolderId', folderId);
}

function uploadFileToGoogleDrive(data, filename, folderId) {
  var folder = DriveApp.getFolderById(folderId);
  
  var file = folder.createFile(filename, data, 'text/plain');

  return {
    id: file.getId(),
    name: file.getName(),
    url: file.getUrl(),
    downloadUrl: file.getDownloadUrl()
  }
}