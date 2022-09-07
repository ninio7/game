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
$(document).on('turbolinks:load', function() {
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

// アコーディオンUI part1
window.addEventListener('load', (event) =>   {
const dts = document.querySelectorAll('dt');

dts.forEach(dt => {
  dt.addEventListener('click', () => {
    dt.parentNode.classList.toggle('appear');

    dts.forEach(el => {
      if (dt !== el) {
        el.parentNode.classList.remove('appear');
      }
    });
  });
});
});

// アコーディオンUI part2
$(document).on('turbolinks:load', function() {
  $('.accordion-item').click(function(){

    //出隠れする部分を変数に格納しておく
    let $answer = $(this).children('.answer');

    //hasClassメソッドで出隠れする部分にopenが存在するか確認
    if ($answer.hasClass('open')) {

      //出隠れ部分が出ている場合の処理
      $answer.removeClass('open');

      //出ている部分をスライドアップして隠す
      $answer.slideUp();

      //横にある開閉ボタンを+に変える
      $(this).children('span').text('+');
    } else {

      //出隠れ部分が隠れている場合の処理
      $answer.addClass('open');

      //出す部分をスライドダウンして表示させる
      $answer.slideDown();

      //横にある開閉ボタンを-に変える
      $(this).children('span').text('-');
    }
  });
});

// タブメニュー part1

window.addEventListener('load', (event) =>{
  const menuItems = document.querySelectorAll('.tabmenu li a');   //メニュー項目の取得
  const contents = document.querySelectorAll('.content');
  menuItems.forEach(clickedItem => {                              //取得した要素ひとつひとつに対して、イベントを設定
    clickedItem.addEventListener('click', e => {
      e.preventDefault();                                         //ページ遷移をしないため

      menuItems.forEach(item => {
        item.classList.remove('active');
      })
      clickedItem.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
      });

      //クリックされたメニュー項目に対応するcontentの要素を取得
      document.getElementById(clickedItem.dataset.id).classList.add('active');
    });
  });
});

// タブメニュー part2
$(document).on('turbolinks:load', function() {　//Turbolinksを無効化する処理(リロード無しで動作する)
  $(function() {
    // .tabがクリックされたときを指定
    $('.tab').click(function(){
      // 今ある.tab-activeを削除
      $('.tab-active').removeClass('tab-active');
      // クリックされた.tabに.tab-activeを追加
      $(this).addClass('tab-active');
      // 今ある.box-showを削除
      $('.box-show').removeClass('box-show');
      // indexに.tabのindex番号を代入
      const index = $(this).index();
      // .tabboxとindexの番号が同じ要素に.box-showを追加
      $('.tabbox').eq(index).addClass('box-show');
    });
  });
});

// カレンダー
window.addEventListener('load', (event) =>{

  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      // 30
      // 29, 30
      // 28, 29, 30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function getCalendarBody() {
    const dates = []; // date: 日付, day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    // 今日の日付を太字にする
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  //createCalendar()するたびにtbodyの中身をクリアにする
  function clearCalendar() {
    const tbody = document.querySelector('tbody');

　  //tbodyの最初の子要素がある限りtbodyからその最初の子要素を削除
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`; //padStartは文字列にしか使えない　2桁で表示、それに満たない場合は0の文字列で埋める

    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),  //全ての要素を1つの配列の中で展開させるため、スプレッド構文を使う
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    //週ごとに描画していくので、7日分ごとの配列に分ける
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      //datesから7日分のデータを取るには、splice() を使って先頭から7個分を削除しつつ取り出す
      weeks.push(dates.splice(0, 7));
    }


    weeks.forEach(week => {　　　　　　　　　　　//週ごとに処理、取り出した配列をweekとする
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled');
        }

        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);  // tbody を取得したあとに appendChild() を使って tr を追加
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalendar();
  });

  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });

  createCalendar();
});



// // ビンゴシート
// window.addEventListener('load', (event) =>{
//   function createColumn(col){
//     const source =[];
//     for (let i = 0; i < 15; i++){
//       source[i] = i + 1 + 15 * col;
//     }
//     const column = [];
//     // ランダムに5つの要素を取り出す
//     for (let i = 0; i < 5; i++){
//       column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
//     }
//     return column;
//   }

//   // すべての列の配列を作る
//   function createColumns(){
//     const columns = [];
//     for (let i = 0; i < 5; i++){
//       columns[i] = createColumn(i);
//     }
//     columns[2][2] = 'Free'
//     return columns;
//   }

//   function renderBingo(columns){
//     for (let row =0; row < 5; row++){
//       const tr = document.createElement('tr');
//       for (let col = 0; col < 5; col++){
//         const td = document.createElement('td');
//         td.textContent = columns[col][row];
//         tr.appendChild(td);
//       }
//       document.querySelector('tbody').appendChild(tr);
//     }
//   }
//   const columns = createColumns();
//   renderBingo(columns);
// });

// ストップウォッチ
$(document).on('turbolinks:load', function() {
// window.addEventListener('load', (event) =>{
  const timer = document.getElementById('timer')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    // 値を2桁で表示、その桁に満たなかったら文字列の前を0で埋める※文字列にしか使えない
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(2, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    //setTimeout() を使って10ミリ秒後にこのcountUp()自身を呼び出す
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click', ()=>{
    // ボタンにinactiveクラスがついていたらそれぞれの処理をしない
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', ()=>{
    setButtonStateStopped();
    clearTimeout(timeoutId);
    // タイマーが走っていた時間を全て足し上げる
    elapsedTime += Date.now() - startTime;

  });

  reset.addEventListener('click', ()=>{
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00:000';
    elapsedTime = 0;
  });
});


// タイピングゲーム
$(document).on('turbolinks:load', function() {
// window.addEventListener('load', (event) =>{
  function setWord() {
    // 重複しないようにsplice()を使って,wordsのランダムな位置から1個ずつ削除しながらwordにセットする
    // splice() の返り値は結果がひとつであっても配列になるので、配列から取り出すために、添字の0をつける。
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  const words = [
    'red',
    'blue',
    'pink',
  ];

  let word;
  let loc = 0;  // 今何文字目を打っているかを管理する
  let time;
  let isPlaying = false;
  const target = document.getElementById('target');

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    
    isPlaying = true;
    time = Date.now();
    setWord();
  });

  // 押したキーの情報が欲しいので、こちらでイベントオブジェクトを引数で受け取る。
  document.addEventListener('keydown', e => {
    // タイプしたキーが合っているかどうかを判定
    if (e.key !== word[loc]) {
      return;
    }
    loc++;
    // アンダーバーをlocの個数分繋げた文字列を作る
    // word.substring(loc) とすると、 loc 番目以降の文字を取り出す
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0){
        // 1000 で割って秒単位に→小数点以下を二桁まで表示したいので、toFixed()を使う
        const elapsedTime = ((Date.now() - time) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} second`;
        return;
      }
      setWord();
    }
  });
});