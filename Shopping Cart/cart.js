const carts = [];

// DOM
const $goListPage = document.querySelector('.goListPage');
const $allSelect = document.querySelector('.allSelect');
const $allDelete = document.querySelector('.allDelete');
const $itemCheckBox = document.querySelector('.itemCheckBox');
const $cartItemDel = document.querySelector('.cartItemDel');
// const $eachItemList = document.querySelector('.eachItemList');

// 목록 페이지로 가는 함수
$goListPage.onclick = async () => {
  // window.location.href = './list.html';
};

const CartNumber = async e => {
  const $targetLi = e.target.closest('li');
  const $number = $targetLi.querySelector('.cart-item-number');
  const $increase = $targetLi.querySelector('.cart-item-increase');
  const $decrease = $targetLi.querySelector('.cart-item-decrease');
  const cartId = $targetLi.classList[1];
  const number = +$number.textContent;
  if (+$number.textContent > 1) {
    const res = await fetch(`http://localhost:4000/api/mycart/${cartId}`, {
      method: 'PATCH',
      headers: 'Content-Type:application/json',
      body: JSON.stringify({ numberOfCart: +$number.textContent })
    });
    const res2 = await res.json();
    console.log(res2);
  }
};

// 모든 체크박스 체크하기.
$itemCheckBox.onchange = e => {
  console.log(e.target, 123);
  try {
    // const res = await fetch('/todos', {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ completed: $ckCompleteAll.checked })
    // });
    // todos = await res.json();
    // render();
  } catch (err) {
    console.error('[ERROR!!]', err);
  }
};

// 체크된 리스트 삭제
$allDelete.onclick = e => {
  const $eachItemList = document.querySelector('.eachItemList');
  console.log(e.target, 454);
  console.log($eachItemList, 23);
  try {
    // const res = await fetch('/todos/completed', { method: 'DELETE' });
    // todos = await res.json();
    // render();
  } catch (err) {
    console.error('[ERROR!!]', err);
  }
};
/* app.delete('/todos/completed', (req, res) => {
  todos = todos.filter(todo => !todo.completed);
  res.send(todos);
}); */

/* // 각각의 리스트 삭제
$cartItemDel.onclick = ({ target }) => {
  const parentId = target.closest('li');

  $lists.removeChild(parentId);
  carts = carts.filter(item => item.id !== +parentId.id.slice(-1));
}; */

/* // 첫 화면에서 db bookmark 정보 가져와 화면에 렌더링
(async () => {
  try {
    const users = await fetch(`/users/${user.id}`);
    const { bookmarks } = await users.json();
    bookmarks.forEach(async movie_id => {
      // 이 안에서 get 요청을 할 것
      const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=ko`;
      const res = await fetch(url);
      const results = await res.json();
      // console.log(results);
      render(results);
    });
  } catch (err) {
    console.log('[ERROR]', err);
  }
})(); */

/* const render = results => {
  const $li = document.createElement('li');
  $li.id = results.id;
  const $a = document.createElement('a');
  $a.href = '#';
  $a.textContent = results.title;
  const $img = document.createElement('img');
  if (results.poster_path === null) {
    $img.src = '../image/준비중.png';
  } else {
    $img.src = `https://image.tmdb.org/t/p/w500/${results.poster_path}`;
  }
  $a.insertAdjacentElement('afterbegin', $img);
  $li.appendChild($a);
  $main__container__movies.appendChild($li);
};

// <li class='${id}'>
//   <a href="#">
//     <img src=""></img>
//     title
//   </a>
// </li>
 */
