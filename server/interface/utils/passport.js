import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

// passport本身是没有验证功能的，需要设置一个策略才可以,这里采用本地策略
passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  // 如果能找到该用户
  if(result !== null) {
    // 如果库里的密码等于用户输入的密码
    if(result.password===password) {
      return done(null,result)
    } else {
      return done(null,false,'密码错误')
    }
  } else {
    return done(null,false,'用户不存在')
  }
}))

// 序列化
passport.serializeUser(function(user,done){
  done(null,user)
})
// 反序列化
passport.deserializeUser(function(user,done){
  done(null,user)
})

export default passport