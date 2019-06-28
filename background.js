var idioma = {
  en: {
    name: "Portuguese",
    nativeName: "Portugu\u00eas"
  }
};

var array_elements = new Array(),
  bravo = false,
  janela = false;

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function click(info) {

  chrome.storage.sync.get(function () {

    var montarURL = {
      'url': 'https://controle.suporte99.com/#/protocolos/' + encodeURIComponent(info.selectionText) + '/protoTarefas'
    }

    if (bravo) {
      chrome.tabs.update(bravo, montarURL, function (tab) {
        chrome.tabs.highlight({
          'windowId': tab.windowId,
          'tabs': tab.index
        }, function () {
          chrome.windows.update(tab.windowId, {
            focused: true
          }, function () {});
        });
      });
    } else {
      chrome.tabs.create(montarURL, function (tab) {
        janela = tab.windowId;
        bravo = tab.id;
        chrome.tabs.onRemoved.addListener(function (tabId) {
          if (tabId == bravo) {
            janela = false;
            bravo = false;
          }
        });
      });
    }
  });
}

chrome.storage.sync.get(function () {
  chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    "id": "tr_parent",
    "title": chrome.i18n.getMessage("contextmenu"),
    "contexts": ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  click(info, tab);
});