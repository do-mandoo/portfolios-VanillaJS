// date 배열로 담음
let productItems = [];
const cartItmes = [];
const $liTemplate = document.getElementById('cart-item-li').content
  .firstElementChild;

// DOM
const $totlaCost = document.querySelector('.totalCost');
const $upBtn = document.querySelector('.upBtn');
const $downBtn = document.querySelector('.downBtn');
const $countNum = document.querySelector('.countNum');
const $putInCart = document.querySelector('.putInCart');
const $goCartPage = document.querySelector('.goCartPage');
const $itemLists = document.querySelector('.lists');

// 상품 수량 증가와 함께 금액 증가
$upBtn.onclick = ({ target }) => {
  // const nowCost = parseInt(
  //   target.parentNode.nextElementSibling.lastElementChild,
  //   10
  // );
  console.log({ target });
  const currentNum = parseInt($countNum.innerText, 10);
  const currentCost = parseInt($totlaCost.innerText, 10);
  $countNum.innerText = currentNum + 1;
  $totlaCost.innerText = +currentCost + 16000;
};

// 상품 수량 감소와 함께 금액 감소
$downBtn.onclick = ({ target }) => {
  console.log({ target });
  const currentNum = parseInt($countNum.innerText, 10);
  const currentCost = parseInt($totlaCost.innerText, 10);
  $countNum.innerText = currentNum - 1;
  $totlaCost.innerText = currentCost - 16000;
};

// 장바구니 페이지로 가는 함수
// $goCartPage.onclick = async () => {

// product페이지 서버에서 불러와서 렌더.
document.addEventListener('DOMContentLoaded', async () => {
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/appPosts/myproduct');
      productItems = await res.json();
    } catch (e) {
      console.log(e, '에러남');
    }
  };
  await fetchItems();

  console.log(productItems, 12);

  const $FragmentNode = document.createDocumentFragment();

  productItems.forEach(item => {
    const $newProductNode = $liTemplate.cloneNode(true);
    // 데이터가 바뀌는 노드만 잡기.
    const $imgNode = $liTemplate.querySelector('.img');
    const $productCoffeeNameNode = $liTemplate.querySelector(
      '.productCoffeeName'
    );
    const $coffeeTypeNode = $liTemplate.querySelector.querySelector(
      '.coffeeType'
    );
    const $eachCoffeeInfoNode = $liTemplate.querySelector('.eachCoffeeInfo');
    const $countNum = $liTemplate.querySelector('.countNum');
    const $totalCost = $liTemplate.querySelector('.totalCost');

    $newProductNode.classList.add(item._id);
    // $imgNode.src = item.imageUrl;
    $imgNode.setAttribute('src', item.imageUrl);
    $productCoffeeNameNode.textContent = item.name;
    $coffeeTypeNode.textContent = item.type;
    $eachCoffeeInfoNode.textContent = item.subName;
    $countNum.textContent = item + 1;
    $totalCost.textContent = '₩' + item.price;

    $FragmentNode.appendChild(productItems);
    console.log($FragmentNode, 124134);

    return $FragmentNode;
  });
  console.log($FragmentNode, 124134);
  // window.location.href = './cart.html';
});

// document.addEventListener('DOMContentLoaded', async () => {
//   const fetchItems = async () => {
//     try {
//       const res = await fetch('http://localhost:4000/api/appPosts/myproduct');
//       cartItmes = await res.json();
//     } catch (e) {
//       console.log(e, '에러남');
//     }
//   };
//   await fetchItems();
//   renderProduct($items, items);
// });

console.log(productItems, 'product');

// 서버와 통신

// 장바구니에 넣는 함수
$putInCart.onclick = ({ target }) => {
  console.log({ target });
};
