// おみくじ
function check() {

  const btn = document.getElementById('btn');
  // btn.addEventListener('click', () => {
  //   const results = ['大吉', '中吉', '凶']
  //   btn.textContent = results[Math.floor(Math.random() * results.length)];

    btn.addEventListener('click', () => {
    const n = Math.random();
    clearClass(btn)

    if (n < 0.20) {
      btn.textContent = '大吉';
      btn.classList.add('daikiti');
    } else if (n < 0.50) {
      btn.textContent = '中吉';
      btn.classList.add('chukiti');
    } else {
      btn.textContent = '凶';
      btn.classList.add('kyo');
    }

  });
}
window.addEventListener("load", check);

// 指定してあるクラスを全て取り除く
// 特定のクラスだけ取り除きたいなら、クラスを指定してremoveする
function clearClass(element) {
  element.classList.remove(...element.classList)

}

// モーダルウィンドウ
// function checkd()  {
//   const open = document.getElementById('open');
//   const close = document.getElementById('close');
//   const modal = document.getElementById('modal');
//   const mask = document.getElementById('mask');

//   open.addEventListener('click', () => {
//     modal.classList.remove('hidden');
//     mask.classList.remove('hidden');
//   });

//   close.addEventListener('click', () => {
//     modal.classList.add('hidden');
//     mask.classList.add('hidden');
//   });
//   mask.addEventListener('click', () => {
//     close.click();
//   });
// }
// window.addEventListener("load", checkd);


window.addEventListener('load', (event) => {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

  open.addEventListener('click', () => {
    modal.classList.remove('hidden');
    mask.classList.remove('hidden');
  });
  close.addEventListener('click', () => {
    modal.classList.add('hidden');
    mask.classList.add('hidden');
  });
  mask.addEventListener('click', () => {
    close.click();
  });
});

// ハンバーガーメニュー
/*global $*/
$(function() {
  $('.menu-trigger').on('click', function(event) {
    $(this).toggleClass('active');
    $('#sp-menu').fadeToggle();
    event.preventDefault();
  });
});

window.addEventListener('load', (event) => {
  const open = document.getElementById('menu-open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('menu-close');

  open.addEventListener('click', () =>{
    overlay.classList.add('show');
    open.classList.add('hide');
  });

  close.addEventListener('click', () =>{
    overlay.classList.remove('show');
    open.classList.remove('hide');
  });
});


$(function() {
  $('.accordion-item').click(function(){

    //出隠れする部分を変数に格納しておく
    var $answer = $(this).children('.answer');

    //hasClassメソッドで出隠れする部分にopenが存在するか確認
    if ($answer.hasClass('open')) {

      //出隠れ部分が出ている場合の処理

      //&ltdiv class="answer open"&gtからopenを消す
      $answer.removeClass('open');

      //出ている部分をスライドアップして隠す
      $answer.slideUp();

      //横にある開閉ボタンを+に変える
      $(this).children('span').text('+');
    } else {

      //出隠れ部分が隠れている場合の処理

      //&ltdiv class="answer"&gtにopenを追加する
      $answer.addClass('open');

      //出す部分をスライドダウンして表示させる
      $answer.slideDown();

      //横にある開閉ボタンを-に変える
      $(this).children('span').text('-');
    }
  });
});