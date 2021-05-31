import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  type: String,
  subName: String,
  price: Number,
  imageUrl: String,
  publishedData: {
    type: Date,
    default: Date.now // 현재 날짜를 기본값으로 지정
  }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
