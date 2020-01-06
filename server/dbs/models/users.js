import mongoose from 'mongoose'
const Schema = mongoose.Schema
// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection
// 定义一个 模式
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})
// 导出一个User模型
export default mongoose.model('User',UserSchema)