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


/**
 * Mongoose的一切都始于一个Schema。每个schema映射到MongoDB的集合(collection)和定义该集合(collection)中的文档的形式。
 * 使用我们的schema定义，我们需要将我们的schema转成我们可以用的模型; mongoose.model(modelName, schema),
 *    第一个参数是你的模型集合的单数名称。Mongoose会自动寻找你的模型名称的复数形式,比如Person对应people；User对应users
 * 模型的实例是文档（documents）。文档有许多自己内置的实例方法；
 *    var Tank = mongoose.model('Tank', yourSchema); var small = new Tank({ size: 'small' });
 * 
 */