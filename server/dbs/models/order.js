import mongoose from 'mongoose'
const Schema = mongoose.Schema
// 订单号id、用户user、创建时间time、金额total、商品图片imgs、项目名称name、订单状态status
const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  user:{
    type:String,
    require:true
  },
  time:{
    type:String,
    require:true
  },
  total:{
    type:Number,
    require:true
  },
  imgs:{
    type:Array,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  status:{
    type:Number,
    require:true
  }
})

export default mongoose.model('Order', Order)
