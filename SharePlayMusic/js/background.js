//開発中は以下のコードのコメントアウトを解除すると区別しやすくなる
//chrome.browserAction.setBadgeText({text:"dev"});

var tabtitle;
var baseUrl = "https://twitter.com/intent/tweet";
var arturl = "";
var hashtags = "ぷれみゅ";

//右クリックした時にcontentScriptから飛んできたタイトル情報を受け取ってtitleに格納
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.type == "title") {
      tabtitle = request.value;
    }
    if (request.type == "albumart") {
      arturl = request.value;
    }

  }
);

//コンテクストメニューがクリックされた時に実行される
var tweet = function () {
  //alert("in background, tweet()");
  text = tabtitle;
  window.console.log("in background:" + tabtitle);
  //console.log("in background:"+ arturl);
  window.open(baseUrl + "?&text=" + encodeURI(tabtitle) + "&hashtags=" + hashtags);
};

chrome.contextMenus.create({title: "tweet", onclick: tweet}, function () {
  //alert("コンテキストメニュー登録完了");
});

var getTags = function () {
  return hashtags;
};

var updateTags = function (tags) {
  hashtags = tags;
};
