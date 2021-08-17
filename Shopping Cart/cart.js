// data 배열로 담음
let cartItems = [];
const $cartLiTemplate = document.getElementById('cart-item-li').content
  .firstElementChild;
// const $listContainer = document.querySelector('.listContainer');
const $cartItemLists = document.querySelector('.cartItemLists');
const $totalCost = document.querySelector('.totalCost');

const allCosts = () => {
  if (!cartItems.length) return '';
  return cartItems.reduce((acc, cur) => acc + cur.price * cur.numberOfCart, 0);
};

// 카트에 담긴 상품들 랜더링.
document.addEventListener('DOMContentLoaded', async () => {
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/appPosts/mycart');
      cartItems = await res.json();
      console.log(cartItems, '카트배열');
    } catch (e) {
      console.log(e, '카트에러남ㅋ');
    }
  };
  await fetchItems();

  const $CartFragmentNode = document.createDocumentFragment();

  cartItems.forEach(item => {
    const $newCartNode = $cartLiTemplate.cloneNode(true);
    // 데이터가 바뀌는 노드만 잡기.
    const $cartImg = $newCartNode.querySelector('.cartImg');
    const $cartProductCoffeeName = $newCartNode.querySelector(
      '.cartProductCoffeeName'
    );
    const $cartCoffeeType = $newCartNode.querySelector('.cartCoffeeType');
    const $cartEachCoffeeInfo = $newCartNode.querySelector(
      '.cartEachCoffeeInfo'
    );
    const $cartCountNum = $newCartNode.querySelector('.cartCountNum');
    const $cartTotalCost = $newCartNode.querySelector('.cartTotalCost');

    $newCartNode.classList.add(item.cartId);
    $newCartNode.id = item._id;
    console.log($newCartNode, 'jioif');
    // $imgNode.src = item.imageUrl;
    $cartImg.setAttribute('src', item.imageUrl);
    $cartProductCoffeeName.textContent = item.name;
    $cartCoffeeType.textContent = item.type;
    $cartEachCoffeeInfo.textContent = item.subName;
    $cartCountNum.textContent = item.numberOfCart;
    $cartTotalCost.textContent = item.price * $cartCountNum.textContent;
    // ₩

    $CartFragmentNode.appendChild($newCartNode);
  });
  $cartItemLists.appendChild($CartFragmentNode);

  $totalCost.textContent = allCosts();
});

// 리스트 추가 감소.
const changeCartNumber = async e => {
  if (!(e.target.matches('.cartDownBtn') || e.target.matches('.cartUpBtn')))
    return;

  const $targetLi = e.target.closest('li');
  const $number = $targetLi.querySelector('.cartCountNum');
  const cartId = $targetLi.id;
  console.log(cartId, 49305);
  const number = +$number.textContent;

  if (e.target.matches('.cartDownBtn')) {
    $number.textContent = number - 1;
  } else {
    $number.textContent = number + 1;
  }

  const res = await fetch(
    `http://localhost:4000/api.appPosts/mycart/modify/${cartId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numberOfCart: +$number.textContent })
    }
  );
  const res2 = await res.json();
  console.log(res2, 'res2');
  return res2;
};
$cartItemLists.addEventListener('click', changeCartNumber);

// 각 리스트 삭제
const cartListDelete = async e => {
  if (!e.target.matches('.cartDeletItem')) return;
  const cartlist = e.target.closest('li').classList[1]; // classname으로 'cartItem'이랑 백엔드에서 자동으로 생성해주는 번호'cartId'가 있는데, 그 번호를 잡는 것.

  const option = {
    method: 'DELETE'
  };
  const res = await fetch(
    `http://localhost:4000/api/appPosts/mycart/delete/${cartlist}`,
    option
  );
  cartItems = res;
  const el = e.path[2];
  $cartItemLists.removeChild(el);
};
$cartItemLists.addEventListener('click', cartListDelete);

// // 전체 삭제 추후 구현.
// const itemAllDelete = e => {
//   if (!e.target.matches('.allDelete')) return;
//   const targetLi = e.target.nextElementSibling.children;
//   console.log(targetLi);

//   // const option = {
//   //   method: 'DELETE'
//   // };
//   // const res = await fetch(
//   //   `http://localhost:4000/api/appPosts/mycart/delete/${cartlist}`,
//   //   option
//   // );
//   // cartItems = res;
//   // const el = e.path[2];
//   // $cartItemLists.removeChild(el);

//   console.log(cartItems, 'cartItems전삭');
// };
// $listContainer.addEventListener('click', itemAllDelete);
