var tabtitle;
var baseUrl = "https://twitter.com/intent/tweet";
var arturl = "";
var hashtags = "めうぷれ";

//右クリックした時にcontentScriptから飛んできたタイトル情報を受け取ってtitleに格納
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if(request.type == "title"){
            tabtitle = request.value;
        }
        if(request.type == "albumart"){
            arturl = request.value;
        }

    }
);

//コンテクストメニューがクリックされた時に実行される
function tweet(){
    //alert("in background, tweet()");
    text = tabtitle;
    window.console.log("in background:"+tabtitle);
    //console.log("in background:"+ arturl);
    window.open(baseUrl + "?&text=" + tabtitle + "&hashtags=" + hashtags);
}

chrome.contextMenus.create({title: "tweet", onclick: tweet}, function(){
    //alert("コンテキストメニュー登録完了");
});

