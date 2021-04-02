const listElm = document.querySelector('#infinite-list');

// Add 20 items.
let nextItem = 1;
const loadMore = function () {
  for (let i = 0; i < 20; i++) {
    const item = document.createElement('li');
    item.innerText = 'Item ' + nextItem++;
    listElm.appendChild(item);
  }
};

// Detect when scrolled to bottom.
listElm.addEventListener('scroll', () => {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMore();
  }
});

// Initially load some items.
loadMore();

/* let  page = 2;

$(window).scroll(() => {
  if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    console.log(++page);
    $('body').append('<div class="big-box"><h1>Page ' + page + '</h1></div>');
  }
});
 */

// 인터섹션옵저버 써서 무한스크롤구현하기.
