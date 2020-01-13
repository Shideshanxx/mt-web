import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 购物车id、detail(商品名称、单价、数量)、购物车编号、用户user、购物车创建时间time
const Cart = new Schema({
  id: {
    type: String,
    require: true
  },
  detail: {
    type: Array,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  }
})

export default mongoose.model('Cart', Cart)
