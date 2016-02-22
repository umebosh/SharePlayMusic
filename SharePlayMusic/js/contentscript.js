function  getTitle(){
    //ページタイトルの情報を送信
    //window.console.log(document.title);
    chrome.runtime.sendMessage(
        {
            type:"title",
            value: document.title
        },
        function(response){
            if(response){
                alert("in content_script   :"+ response);
            }
        }
    );

    //アルバムアートのURLを送信
    var albumart = document.getElementById("playerBarArt");
    //console.log(albumart.src);
    chrome.runtime.sendMessage(
        {
            type:"albumart",
            value:String(albumart)
        },
        function(response){
            if(response){
                alert("in content_script   :"+ response);
            }
        }
    );
}

//右クリックした時にgetTitleが呼ばれてbackgroundに情報を飛ばす
window.addEventListener('contextmenu', getTitle, false);

//function getinfo(){
//    var album = document.getElementsByClassName("player-album");
//    var artist = document.getElementsByClassName("player-artist");
//    var title = document.getElementById("currently-playing-title");
//    var albumart = document.getElementById("playerBarArt");
//    window.console.log(album);
//    window.console.log(artist);
//    window.console.log(title);
//    window.console.log(albumart);
//}
