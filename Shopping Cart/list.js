// data 배열로 담음
let productItems = [];
// const mycartItmes = [];
const $liTemplate = document.getElementById('product-item-li').content
  .firstElementChild;

// DOM
// const $container = document.querySelector('.container');
// const $totlaCost = document.querySelector('.totalCost');
// const $upBtn = document.querySelector('.upBtn');
// const $downBtn = document.querySelector('.downBtn');
// const $countNum = document.querySelector('.countNum');
// const $putInCart = document.querySelector('.putInCart');
// const $goCartPage = document.querySelector('.goCartPage');
const $itemLists = document.querySelector('.itemLists');
// const $item = document.querySelector('ltem');

// 금액 자리수
// const moneyfilter = money => {
//   return '₩' + money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// };

// product페이지 서버에서 불러와서 렌더.
document.addEventListener('DOMContentLoaded', async () => {
  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/appPosts/myproduct');
      productItems = await res.json();
      console.log(productItems, 'productItems');
    } catch (e) {
      console.log(e, '프로덕트에러남ㅎ');
    }
  };
  await fetchItems();

  const $FragmentNode = document.createDocumentFragment(); // ul-$itemLists에 appendChild해야함.===$itemLists.appendChild($FragmentNode)

  productItems.forEach(item => {
    const $newProductNode = $liTemplate.cloneNode(true);

    // 데이터가 바뀌는 노드만 잡기.
    const $imgNode = $newProductNode.querySelector('.img');
    const $productCoffeeNameNode = $newProductNode.querySelector(
      '.productCoffeeName'
    );
    const $coffeeTypeNode = $newProductNode.querySelector('.coffeeType');
    const $eachCoffeeInfoNode = $newProductNode.querySelector(
      '.eachCoffeeInfo'
    );
    const $countNum = $newProductNode.querySelector('.countNum');
    const $totalCost = $newProductNode.querySelector('.totalCost');

    $newProductNode.id = item._id;
    console.log($newProductNode.id, 'productid');
    // $newProductNode.classList.add(item._id);
    // console.log($newProductNode.classList[1], 'classlist');
    // $imgNode.src = item.imageUrl;
    $imgNode.setAttribute('src', item.imageUrl);
    $productCoffeeNameNode.textContent = item.name;
    $coffeeTypeNode.textContent = item.type;
    $eachCoffeeInfoNode.textContent = item.subName;
    $countNum.textContent = 1;
    $totalCost.textContent = item.price;
    // ₩

    $FragmentNode.appendChild($newProductNode);
  });
  $itemLists.appendChild($FragmentNode);
  console.log($itemLists, 'itemlists');
});

// 상품 수량 증감 함수
const changeItemNumber = e => {
  if (!(e.target.matches('.upBtn') || e.target.matches('.downBtn'))) return;

  if (e.target.matches('.upBtn')) {
    const quantity = +e.target.previousElementSibling.textContent;
    e.target.previousElementSibling.textContent = quantity + 1;
    // const cost = +e.target.parentNode.nextElementSibling.lastElementChild
    //   .textContent;
    // e.target.parentNode.nextElementSibling.lastElementChild.textContent =
    //   cost * e.target.previousElementSibling.textContent;
  } else {
    const quantity = +e.target.nextElementSibling.textContent;
    e.target.nextElementSibling.textContent = quantity - 1;
    // const cost = +e.target.parentNode.nextElementSibling.lastElementChild
    //   .textContent;
    // e.target.parentNode.nextElementSibling.lastElementChild.textContent =
    //   cost / e.target.nextElementSibling.textContent;
  }
};
// 상품 수량 증감 함수 이벤트 바인딩.
$itemLists.addEventListener('click', changeItemNumber);

// 장바구니 추가 함수
const putAProductInCart = async e => {
  if (!e.target.matches('.putInCart')) return;

  const targetLi = e.target.closest('li').cloneNode(true); // closest: targetElement에서부터 closest()메소드를 통해 만족하는 요소 탐색 후 부모 요소 반환
  const productId = e.target.closest('li').id;
  console.log(productId, 'productafsdfId');
  const numberOfCart = targetLi.querySelector('.countNum').textContent;
  const name = targetLi.querySelector('.productCoffeeName').textContent;
  const price = +targetLi.querySelector('.totalCost').textContent;
  const imageUrl = targetLi.querySelector('img').getAttribute('src');

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ numberOfCart, name, price, imageUrl })
  };

  const res = await fetch(
    `http://localhost:4000/api/appPosts/mycart/add/${productId}`,
    option
  );
  console.log(res, 'res');

  const $closestLi = e.target.closest('li');

  $closestLi.querySelector('.countNum').textContent = '1';
};

$itemLists.addEventListener('click', putAProductInCart);
