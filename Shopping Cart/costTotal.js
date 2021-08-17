const allCosts = cartItems => {
  if (!cartItems.length) return '';
  return (
    '₩ ' + cartItems.reduce((acc, cur) => acc + cur.price * cur.numberOfCart, 0)
  );
};
console.log(allCosts(), 'allcost');
// $totalCost.textContent = allCosts();
