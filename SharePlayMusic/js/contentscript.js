function getTitle() {
  //ページタイトルの情報を送信
  //window.console.log(document.title);
  chrome.runtime.sendMessage(
    {
      type: "title",
      value: document.title
    },
    function (response) {
      if (response) {
        alert("in content_script   :" + response);
      }
    }
  );

  //アルバムアートのURLを送信
  var albumart = document.getElementById("playerBarArt");
  //console.log(albumart.src);
  chrome.runtime.sendMessage(
    {
      type: "albumart",
      value: String(albumart)
    },
    function (response) {
      if (response) {
        alert("in content_script   :" + response);
      }
    }
  );
}

// 右クリックした時にgetTitleが呼ばれてbackgroundに情報を飛ばす
// window.addEventListener('contextmenu', getTitle, false);

// title が変更された時にgetTitleが呼ばれてbackgroundに情報を飛ばす
window.onload = function () {
  var titleEl = document.getElementsByTagName("title")[0];
  var docEl = document.documentElement;

  if (docEl && docEl.addEventListener) {
    docEl.addEventListener("DOMSubtreeModified", function (evt) {
      var t = evt.target;
      if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
        getTitle();
      }
    }, false);
  } else {
    document.onpropertychange = function () {
      if (window.event.propertyName == "title") {
        getTitle();
      }
    };
  }
};
