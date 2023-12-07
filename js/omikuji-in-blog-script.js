window.addEventListener("load", function() {
    var iframe = document.getElementById("your-iframe-id");
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
});

document.getElementById('omikuji1-btn').addEventListener('click', function() {
    document.getElementById('omikuji1-content').style.display = 'block';
    document.getElementById('omikuji2-content').style.display = 'none';
});

document.getElementById('omikuji2-btn').addEventListener('click', function() {
    document.getElementById('omikuji1-content').style.display = 'none';
    document.getElementById('omikuji2-content').style.display = 'block';
});

function openOmikuji(evt, omikujiName) {
  var i, tabcontent, tablinks;

  // すべてのタブコンテンツを非表示にする
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // すべてのタブリンクのアクティブクラスを削除する
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // クリックされたタブのコンテンツを表示し、アクティブクラスを追加する
  document.getElementById(omikujiName).style.display = "block";
  evt.currentTarget.classList.add("active");
}
