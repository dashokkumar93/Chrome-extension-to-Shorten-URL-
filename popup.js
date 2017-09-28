chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');
  chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
    $.ajax({
            url: 'https://www.googleapis.com/urlshortener/v1/url?key='+{APIKEY},//Your API Key.
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: '{ longUrl: "' +tablink +'"}',
            success: function(response) {

                message.innerText = (response.id);
                $("#copy").removeAttr("disabled");
               var copyElement=document.getElementById("copy");
                message.innerText="Shortered URL: "+message.innerText;
               var clipboard=new Clipboard(copyElement);
               $("#copy").attr({
               "data-clipboard-text":response.id,
             "data-clipboard-action":"copy"
             });
            }
         });


});

  chrome.tabs.executeScript(null, {
  code:"var a=a+1;"
  }, function() {

    if (chrome.runtime.lastError) {
      message.innerText = 'Unable to shortern links for the current tab';
    }
  });

}

window.onload = onWindowLoad;
