export default {
  // student是数据库名称
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp:{
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '307042873@qq.com'
    },
    get pass() {
      return 'klpomfiqtctibgjg'
    }
  },
  get code() {
    return ()=>{
      return Math.random().toString(16).slice(2,6).toUpperCase()
    }
  },
  get expire() {
    // 返回一个函数，即每个的时间不同，不然返回的是一个常量
    return () => {
      // 过期时间一分钟
      return new Data().getTime()+60*60*1000
    }
  }
}