import Router from 'koa-router';
import Redis from 'koa-redis';
// nodeMailer用于发送邮件
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
// Passport用于权限验证
import Passport from './utils/passport'
// 因为dbs/config中大部分是关于email的内容，这里命名为Email
import Email from '../dbs/config'
import axios from './utils/axios'

// 定义路由实例，并设置接口前缀
let router = new Router({
  prefix:'/users'
})

// 获取redis的客户端
let Store = new Redis().client

// user相关的接口用post方式，因为post比get安全
// 注册接口
router.post('/signup',async (ctx)=>{
  // 解构赋值的方式获取post方式(ctx.request.body)上传的参数
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;

  if(code){
    // 从redis中获取相应username的验证码(当nodeMailer发送验证码时会先把发送的验证码存到redis中)
    const saveCode = await Store.hget(`nodemail:${username}`,'code')
    // 从redis中获取相应username的过期时间
    const saveExpire = await Store.hget(`nodemail:${username}`,'expire')
    // 如果验证码正确
    if(code===saveCode){
      if(new Date().getTime()-saveExpire>0){
        ctx.body={
          code: -1,
          msg:'验证码已过期，请重新尝试'
        }
        return false
      }
    }else{
      ctx.body={
        code:-1,
        msg:'请填写正确的验证码'
      }
    }
  }else{
    ctx.body={
      code:-1,
      msg:'请填写验证码'
    }
  }

  let user = await User.find({
    username
  })
  if(user.length){
    ctx.body={
      code:-1,
      msg:'已被注册'
    }
    return
  }
  // 对新注册的用户入库
  let newuser = await User.create({
    username,
    password,
    email
  })
  if(newuser){
    // 为什么要执行这一步？？？？
    let res = await axios.post('/users/signin',{
      username,
      password
    })
    if(res.data&&res.data.code===0){
      ctx.body={
        code:0,
        msg:'注册成功',
        user:res.data.user
      }
    }else{
      ctx.body={
        code:-1,
        msg:'error'
      }
    }
  }else{
    ctx.body={
      code:-1,
      msg:'注册失败'
    }
  }
})

// 登录接口 (注意next的用法)
router.post('/signin',async (ctx,next)=>{
  // 实例化Passport时用的是local策略，这里验证也传入'local';local策略会返回err,user,info,status 这些参数信息
  return Passport.authenticate('local',function(err,user,info,status){
    if(err) {
      ctx.body={
        code:-1,
        msg:err
      }
    }else{
      if(user){
        ctx.body={
          code:0,
          msg:'登录成功',
          user
        }
        // 做一个登录的动作，ctx.login(user)是封装在passport里的api，会调用passport.serializeUser()，将信息存入session
        return ctx.login(user)
      }else{
        // 如果没有找到用户，说明有异常，返回异常信息给客户端
        ctx.body={
          code:1,
          msg:info
        }
      }
    }
  // 注意下面这种写法
  })(ctx,next)
})

// 获取验证码接口
router.post('/verify', async (ctx,next)=>{
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body={
      code:-1,
      msg:'验证请求过于频繁，一分钟一次'
    }
    return false
  }
  // 发送的来源
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  // 发送的信息
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username,
  }
  // 发送的格式
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject:'模拟美团网注册码',
    html:`您在模拟美团网注册，您的注册码是${ko.code}`
  }
  await transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      // 实际上应该填报警信息
      return console.log('error')
    }else{
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  }
})

// 退出登录接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  // ctx.isAuthenticated() 表示是否还是登录状态
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户信息
router.get('/getUser', async (ctx) => {
  //ctx.isAuthenticated() 是passport的api
  if (ctx.isAuthenticated()) {
    // 如果是登录状态，passport会把登录信息存到session中，那么session一定会有passport，passport一定有user
    const {username, email} = ctx.session.passport.user
    ctx.body={
      user:username,
      email
    }
  }else{
    ctx.body={
      user:'',
      email:''
    }
  }
})

export default router


// 1. session，redis，cookies，passward的序列化和反序列化等关系
// 2. ctx.logout()  ctx.login()   ctx.isAuthenticated() ?????  登录状态表示什么意思？
// 3. koa-router 中的next 是什么意思
// 4. 为什么注册入库用户信息后要调用登陆接口，再判断是不是注册成功
