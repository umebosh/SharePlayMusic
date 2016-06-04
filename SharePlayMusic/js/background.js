//開発中は以下のコードのコメントアウトを解除すると区別しやすくなる
//chrome.browserAction.setBadgeText({text:"dev"});

var tabtitle;
var baseUrl = "https://twitter.com/intent/tweet";
var arturl = "";
var hashtags = "ぷれみゅ";
var textFormat = "{title} - {artist} #nowplaying";

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
  var format = textFormat;
  var segs = tabtitle.split(" - ");
  var title = segs[0];
  var artist = segs[1];
  var tweetText = format.replace(new RegExp( "{title}", "g" ), title)
    .replace(new RegExp("{artist}", "g"), artist);
  var tags = findHashtags(tweetText);
  for (var i = 0; i < tags.length; i ++) {
    tweetText = tweetText.replace(new RegExp(" ?#" + tags[i], "g"), "");
  }
  // window.console.log("in background:" + tabtitle);
  //console.log("in background:"+ arturl);
  window.open(baseUrl + "?text=" + encodeURI(tweetText) + "&hashtags=" + encodeURI(tags.join(",")));
};

var findHashtags = function (text) {
  regex = /#+([A-Za-z0-9-_ぁ-ヶ亜-黑]+)/g;
  return text.match(regex).map(function(e) { return e.substr(1); });
};

chrome.contextMenus.create({title: "tweet", onclick: tweet}, function () {
  //alert("コンテキストメニュー登録完了");
});

var getFormat = function () {
  return textFormat;
};

var updateFormat = function (text) {
  textFormat = text;
};
