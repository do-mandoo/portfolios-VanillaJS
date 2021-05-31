import mongoose from 'mongoose';

const { Schema } = mongoose;

const CartSchema = new Schema({
  cartId: String,
  numberOfCart: Number,
  name: String,
  type: String,
  subName: String,
  price: Number,
  imageUrl: String
});

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
