// data 배열로 담음
let productItems = [];
// const mycartItmes = [];
const $liTemplate = document.getElementById('product-item-li').content
  .firstElementChild;

// pagination페이지네이션
const currentPage = 1;
const rows = 4;

// DOM
// const $container = document.querySelector('.container');
// const $totlaCost = document.querySelector('.totalCost');
// const $upBtn = document.querySelector('.upBtn');
// const $downBtn = document.querySelector('.downBtn');
// const $countNum = document.querySelector('.countNum');
// const putInCart = document.querySelector('.putInCart');
// const $goCartPage = document.querySelector('.goCartPage');
const $itemLists = document.querySelector('.itemLists');
const $pagenumbers = document.querySelector('.pagenumbers');
const $item = document.querySelectorAll('.item');

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
  console.log(productItems, 'productItems');

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
    // console.log($newProductNode.id, 'productid');
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

  // 새로고침해도 localStorage에 담은 상품 개수 유지
  const onLoadCartNumbers = () => {
    const productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
      document.querySelector('.itemListWrap span').textContent = productNumbers;
    }
  };

  // 담기를 누르면 쇼핑카트 아이콘 옆에 담긴 개수 생성.
  const cartNumbers = () => {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers, 10);
    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers + 1);
      document.querySelector('.itemListWrap span').textContent =
        productNumbers + 1;
    } else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.itemListWrap span').textContent = 1;
    }
  };

  // ul안의 li개수를 childElementCount사용해서 변수로 사용.
  // 담기버튼인 'putInCart'엘리먼트를 li개수만큼 for문을 돌려서 click이벤트를 걸어줌. => 배열 고차함수 사용해도 좋을듯
  const ULlength = $itemLists.childElementCount;
  const putInCart = document.querySelectorAll('.putInCart');
  for (let i = 0; i < ULlength; i++) {
    putInCart[i].addEventListener('click', () => {
      cartNumbers();
    });
  }

  onLoadCartNumbers();

  // 페이지네이션 pagination
  // function DisplayList(items, wrapper, rowPage, page) {
  //   wrapper.innerHTML = '';
  //   console.log(293, items, wrapper, rowPage, page);
  //   const zeroPage = page - 1;
  //   const start = rowPage * zeroPage;
  //   const end = start + rowPage;

  //   const paginationItems = items.slice(start, end);
  //   for (let i = 0; i < paginationItems.length; i++) {
  //     const item = paginationItems[i];
  //     const itemElement = document.createElement('div');
  //     itemElement.classList.add('item');
  //     itemElement.textContent = item;

  //     wrapper.appendChild(itemElement);
  //   }
  // }

  // function PagenationButton(page, items) {
  //   const $button = document.createElement('button');
  //   $button.textContent = page;
  //   if (currentPage === page) $button.classList.add('active');
  //   $button.addEventListener('click', () => {
  //     currentPage = page;
  //     DisplayList(items, $list, rows, currentPage);
  //     const currentBtn = document.querySelector('.pagenumbers button.active');
  //     currentBtn.classList.remove('active');
  //     $button.classList.add('active');
  //   });
  //   return $button;
  // }

  // function MakePagenation(items, wrapper, rowPage) {
  //   wrapper.innerHTML = '';
  //   console.log(123, items, wrapper, rowPage);
  //   const pageCount = Math.ceil(items.length / rowPage);
  //   for (let i = 1; i < pageCount + 1; i++) {
  //     const button = PagenationButton(i, items);
  //     wrapper.appendChild(button);
  //   }
  // }
  // DisplayList(productItems, $itemLists, rows, currentPage);
  // MakePagenation(productItems, $pagenumbers, rows);
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

// 스크롤이벤트 GO TO TOP SCROLL
window.addEventListener('scroll', () => {
  // if (document.querySelector('html').scrollTop > 100) { 과 아래가 같음.
  if (window.pageYOffset > 100) {
    document.querySelector('.scroll-icon').style.display = 'block';
  } else {
    document.querySelector('.scroll-icon').style.display = 'none';
  }
});
// back to top
document.querySelector('.scroll-icon').addEventListener('click', () => {
  window.scrollTo({
    // 문서의 지정된 위치로 스크롤한다.
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});
