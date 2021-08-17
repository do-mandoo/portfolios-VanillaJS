const $cartLiTemplate = document.getElementById('cart-item-li').content
  .firstElementChild;

const showCartList = cartItems => {
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
  // $cartItemLists.appendChild($CartFragmentNode);
  // return $cartItemLists;
};

export default showCartList();
