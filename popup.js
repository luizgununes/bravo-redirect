document.addEventListener('DOMContentLoaded', function () {

  var Button = document.getElementById('tarefas');
  Button.addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://controle.suporte99.com/#/minhasTarefas' }, function (tab) {
      janela = tab.windowId;
      bravo = tab.id;
      chrome.tabs.onRemoved.AddListener(function (tabId) {
        if (tabId == bravo) {
          janela = false;
          bravo = false;
        }
      });
    });
  });

  var Button = document.getElementById('timetracking');
  Button.addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://controle.suporte99.com/#/timeTracking' }, function (tab) {
      janela = tab.windowId;
      bravo = tab.id;
      chrome.tabs.onRemoved.addListener(function (tabId) {
        if (tabId == bravo) {
          janela = false;
          bravo = false;
        }
      });
    });
  });

  var Button = document.getElementById('protocolos');
  Button.addEventListener('click', function () {
    chrome.tabs.create({ url: 'https://controle.suporte99.com/#/protocolos' }, function (tab) {
      janela = tab.windowId;
      bravo = tab.id;
      chrome.tabs.onRemoved.addListener(function (tabId) {
        if (tabId == bravo) {
          janela = false;
          bravo = false;
        }
      });
    });
  });

}, false);