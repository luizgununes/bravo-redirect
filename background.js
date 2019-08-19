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
          }, function () { });
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

function show() {

  (function loop() {
    var time = /(..)(:..)/.exec(new Date());
    var hora = time[0];
    var delay;

    if (hora == '17:20' || hora == '17:25') {
      var not = new Notification('Já são ' + hora + 'h, não esqueça do time-tracking!', {
        icon: './icons/logo-32.png',
        body: 'Clique aqui para abrir o Bravo!'
      });
      not.onclick = timeTracking;
    } else {
      time = /(..)(:..)/.exec(new Date());
      delay = 10000 - (time % 60000);
      setTimeout(loop, delay);
    }
  })();
}

function timeTracking() {
  chrome.tabs.create({ 'url': "https://controle.suporte99.com/#/timeTracking" });
}

if (!localStorage.isInitialized) {
  localStorage.isActivated = true;
  localStorage.isInitialized = true;
}

if (window.Notification) {
  if (JSON.parse(localStorage.isActivated)) {
    show();
  }
}