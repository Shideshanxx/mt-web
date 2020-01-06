import axios from 'axios'
// 新建一个 axios 实例
const instance = axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:1000,
  headers:{

  }
})

export default instance
