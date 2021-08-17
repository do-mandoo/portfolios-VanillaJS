// 각 리스트 총 금액
const eachListCostTotal = cartItems => {
  $cartTotalCost.textContent =
    '₩ ' +
    cartItems[0].reduce((acc, cur) => acc + cur.price * cur.numberOfCart, 0);
};

// $cartItemLists.addEventListener('click', eachListCostTotal());
