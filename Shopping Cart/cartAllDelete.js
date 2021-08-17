// 전체 삭제
const itemAllDelete = async e => {
  if (!e.target.matches('.allDelete')) return;
  const option = {
    method: 'DELETE'
  };
  const res = await fetch(
    `http://localhost:4000/api/appPosts/mycart/delete/${'li의id'}`,
    option
  );
  cartItems = res;

  // $cartItemLists.removeChild();

  console.log(cartItems, 'cartItems전삭');

  // const itemlength = cartItems.length;
  // for (let i = 0; i < itemlength; i++) {
  //   const li = e.target.closest('button').nextElementSibling.children[i]
  //     .classList[1];
  //   console.log(li);
  // }

  // const ullist = e.target.closest('button').nextElementSibling.children;
  // console.log(ullist, 'ullist');
  // console.log(cartItems.length, 'cartitemlistis');
  // const maplistcartId = cartItems.map(item => item.cartId);
  // for (let i = 0; i < cartItems.length; i++) {
  //   cartItems.children[i].className;
  // }
  // maplistcartId.forEach(cartId => {
  //   console.log(cartId, 'foreachcartId');
  // });
};

$listContainer.addEventListener('click', itemAllDelete);
