$(function(){
    var BG = chrome.extension.getBackgroundPage();
    $('#tags').val(BG.getTags());
    $('#update').click(function(){
        BG.updateTags( $('#tags').val() );
    });
    $('#tweet').click(function(){
        BG.tweet();
    });
});
