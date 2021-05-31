// data 배열로 담음
let cartItems = [];
const $cartLiTemplate = document.getElementById('cart-item-li').content
  .firstElementChild;

// DOM
// const $goListPage = document.querySelector('.goListPage');
const $allSelect = document.querySelector('.allSelect');
const $allDelete = document.querySelector('.allDelete');
const $itemCheckBox = document.querySelector('.itemCheckBox');
const $cartItemLists = document.querySelector('.cartItemLists');
const $cartTotalCost = document.querySelector('.cartTotalCost');
// const $cartCountNum = document.querySelector('.cartCountNum');
const $totalCost = document.querySelector('.totalCost');

// 금액 자리수
// const moneyfilter = money => {
//   return '₩' + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

//-------
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

  const allCosts = () => {
    if (!cartItems.length) return '';
    return cartItems.reduce(
      (acc, cur) => acc + cur.price * cur.numberOfCart,
      0
    );
  };

  $totalCost.textContent = allCosts();
});

// 리스트 추가 감소.
const changeCartNumber = async e => {
  if (!(e.target.matches('.cartDownBtn') || e.target.matches('.cartUpBtn')))
    return;

  const $targetLi = e.target.closest('li');
  const $number = $targetLi.querySelector('.cartCountNum');
  const $downBtn = $targetLi.querySelector('.cartDownBtn');
  const $upBtn = $targetLi.querySelector('.cartUpBtn');
  const $cost = $targetLi.querySelector('.cartTotalCost');
  const cartId = $targetLi.id;
  console.log(cartId, 49305);
  const number = +$number.textContent;
  const cost = +$cost.textContent;
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
  // const cartId = e.target.closest('li').id;
  // console.log(cartId, 'cart_id');
  const cartlist = e.target.closest('li').classList[1];
  console.log(cartlist, 'cartlist cartId');

  const option = {
    method: 'DELETE'
  };
  const res = await fetch(
    `http://localhost:4000/api/appPosts/mycart/delete/${cartlist}`,
    option
  );
  // console.log(res.json());
  // cartItems = await res;
  console.log('akjdf');
  cartItems = res;
  // cartItems = await res();
  console.log(cartItems, '삭제후cartItems');
  const el = e.path[2];
  // console.log(el, 'el');
  // console.log(cartItems, 'cartitems');
  // console.log($cartItemLists.firstElementChild, 338383);
  $cartItemLists.removeChild(el);

  // 리스트 삭제되면 다시 계산해서 총 합계 나타남.
  const allCosts = () => {
    if (!cartItems.length) return '';
    return (
      '₩ ' +
      cartItems.reduce((acc, cur) => acc + cur.price * cur.numberOfCart, 0)
    );
  };
  $totalCost.textContent = allCosts();
};

$cartItemLists.addEventListener('click', cartListDelete);

// 각 리스트 총 금액
// const eachListCostTotal = () => {
//   $cartTotalCost.textContent =
//     '₩ ' +
//     cartItems[0].reduce((acc, cur) => acc + cur.price * cur.numberOfCart, 0);
// };

// $cartItemLists.addEventListener('click', eachListCostTotal());
