// 각 리스트 삭제
const cartListDelete = async e => {
  if (!e.target.matches('.cartDeletItem')) return;
  // const cartId = e.target.closest('li').id;
  // console.log(cartId, 'cart_id');
  const cartlist = e.target.closest('li').classList[1]; // classname으로 'cartItem'이랑 백엔드에서 자동으로 생성해주는 번호?가 있는데, 그 번호를 잡는 것.
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
  cartItems = res;
  // cartItems = await res();
  console.log(cartItems, '삭제후cartItems');
  console.log(e.path, 'e.path');
  const el = e.path[2];
  // console.log(el, 'el');
  // console.log(cartItems, 'cartitems');
  $cartItemLists.removeChild(el);
  
};

$cartItemLists.addEventListener('click', cartListDelete);