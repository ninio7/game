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

  function clearCalendar() {
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];
    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
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
      document.querySelector('tbody').appendChild(tr);
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