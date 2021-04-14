import mongoose from 'mongoose';
import Joi from 'joi';
import Cart from '../../models/cart';
import Product from '../../models/product';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

/* 포스트 작성 Product
POST /api/appPosts/myproduct/add
{
  name: 이름,
  type: 커피종류,
  subName: 설명,
  price:가격(number),
  imageUrl:이미지
} */
export const Pwrite = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    name: Joi.string().required(), // required() 가 있으면 필수 항목
    type: Joi.string().required(),
    subName: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required()
  });
  // 검증하고나서 검증 실패인 경우 에러처리\
  console.log('he');
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 404; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { name, type, subName, price, imageUrl } = ctx.request.body;
  const product = new Product({
    name,
    type,
    subName,
    price,
    imageUrl
  });
  console.log(product, '2324product');
  try {
    await product.save();
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 작성 Cart
POST /api/appPosts/mycart/add
{
  numberOfCart:number,
  name: 이름,
  type: 커피종류,
  subName: 설명,
  price:가격(number),
  imageUrl:이미지
} */
export const Cwrite = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    numberOfCart: Joi.number().required(),
    name: Joi.string().required(), // required() 가 있으면 필수 항목
    type: Joi.string().required(),
    subName: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required()
  });
  // 검증하고나서 검증 실패인 경우 에러처리
  console.log('sddsfdsdlfkjslekfjlsdkjf');
  const result = schema.validate(ctx.request.body);
  console.log(result, 'dsfdsfdsfds');
  if (result.error) {
    ctx.status = 404; // Bad Request
    ctx.body = result.error;
    return;
  }
  const { id } = ctx.params;
  const {
    numberOfCart,
    name,
    type,
    subName,
    price,
    imageUrl
  } = ctx.request.body;
  const cart = new Cart({
    numberOfCart,
    name,
    type,
    subName,
    price,
    imageUrl
  });
  console.log(cart, '2324cart');
  try {
    console.log(id, 'sdfsdfdsfdsfdsf');
    const oldCart = await Cart.findOne({ cartId: id }).exec();
    if (oldCart) {
      const cart = await Cart.findOneAndUpdate(
        { cartId: id },
        { numberOfCart },
        { new: true }
      ).exec();
      ctx.body = cart;
    } else {
      const cart = new Cart({
        cartId: id,
        numberOfCart,
        name,
        type,
        subName,
        price,
        imageUrl
      });
      await cart.save();
      ctx.body = cart;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 데이터 목록 조회 Product
GET /api/myproduct */
export const Plist = async ctx => {
  try {
    const products = await Product.find().exec();
    ctx.body = products;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 데이터 목록 조회 Cart
GET /api/myproduct */
export const Clist = async ctx => {
  try {
    const cart = await Cart.find().exec();
    ctx.body = cart;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// /* 특정 포스트 조회
// GET /api/appPosts/:id */
// export const read = async ctx => {
//   const { id } = ctx.params;
//   try {
//     const product = await Product.findById(id).exec();
//     if (!product) {
//       ctx.status = 404; //
//     }
//   } catch (e) {
//     ctx.throw(500, e);
//   }
// };

/* 특정 포스트 삭제
DELETE /api/mycart/delete/:id */
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Cart.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content(성공하기는 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* 포스트 수정(교체) Cart
PATCH /api/mycart/modify/:id
{
  name: 이름,
  type: 커피종류,
  subName: 설명,
  price:가격(number),
  imageUrl:이미지
} */
export const update = async ctx => {
  const { id } = ctx.params; // 물건id
  const { numberOfCart } = ctx.body; // 물건 수량
  console.log({ numberOfCart });
  // write에서 사용한 schema와 비슷한데, required()가 없습니다.
  const schema = Joi.object().keys({
    name: Joi.string().required(), // required() 가 있으면 필수 항목
    type: Joi.string().required(),
    subName: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required()
  });
  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 404; // Bad Request
    ctx.body = result.error;
    return;
  }
  try {
    const cart = await Cart.findByIdAndUpdate(id, ctx.request.body, {
      new: true // 이 값을 설정하면 업데이트된 데이터를 반환합니다.
      // false일때는 업데이트 되기 전의 데이터를 반환합니다.
    }).exec();
    if (!cart) {
      ctx.status = 404;
    } else {
      const cart = await Cart.find().exec();
      ctx.body = cart;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
