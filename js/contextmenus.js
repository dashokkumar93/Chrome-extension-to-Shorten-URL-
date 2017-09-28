
chrome.runtime.onInstalled.addListener(function() {

  chrome.contextMenus.create({
      title: "Shortern the links",
      contexts:["link"],
      id: "parent",
  });
  chrome.contextMenus.create({
      title: "Shortern the link and copy",
      contexts:["link"],
      parentId: "parent",
      id: "shorternlink",
  });

});
chrome.contextMenus.onClicked.addListener(onClickHandler);
function onClickHandler(info, tab){

if(info.menuItemId==="shorternlink"){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://www.googleapis.com/urlshortener/v1/url?key="+{APIKEY}, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
      longUrl:info.linkUrl
  }));
  xhr.onreadystatechange=function(){
  if(this.readyState == 4 &&this.status===200){var data=(JSON.parse(this.responseText));

    function copyTextToClipboard() {
          var copyFrom = document.createElement("textarea");
          copyFrom.textContent = data.id;
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(copyFrom);
          copyFrom.select();
          document.execCommand('copy');
          body.removeChild(copyFrom);
        }
  copyTextToClipboard();
  }
}

}
}
