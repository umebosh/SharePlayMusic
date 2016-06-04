$(function () {
  var BG = chrome.extension.getBackgroundPage();
  $('#format').val(BG.getFormat());
  $('#update').click(function () {
    BG.updateFormat($('#format').val());
  });
  $('#tweet').click(function () {
    BG.tweet();
  });
});
