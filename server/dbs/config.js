export default {
  // mongodb数据库
  // student是数据库名称
  dbs: 'mongodb://127.0.0.1:27017/student',
  // redis数据库
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  // 设置QQ的smtp服务，发送验证码到邮箱
  smtp:{
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '307042873@qq.com'
    },
    get pass() {
      return 'klpomfiqtctibgjg'
    },
    // 生成随机的验证码
    get code() {
      return ()=>{
        return Math.random().toString(16).slice(2,6).toUpperCase()
      }
    },
    // 设置验证码过期时间
    get expire() {
      // 返回一个函数，即每个的时间不同，不然返回的是一个常量
      // 过期时间一小时
      return ()=>{
        return new Date().getTime()+60*1000
      }
    }
  }
}