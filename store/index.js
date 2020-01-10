import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    // nuxtServerInit 写在 Store action中，在middleware之前执行  (在nuxtServerInit中进行服务端渲染,接口在服务端请求而不在客户端请求)
    async nuxtServerInit({commit},{req,app}) {
      const {status,data:{province,city}}=await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition',status===200?{city,province}:{city:'',province:''})
      const {status:status2,data:{menu}}=await app.$axios.get('/geo/menu')
      commit('home/setMenu',status2===200?menu:[])
      const {status:status3,data:{result}}=await app.$axios.get('/search/hotPlace',{
        params:{
          city:app.store.state.geo.position.city.replace('市','')
        }
      })
      commit('home/setHotPlace',status3===200?result:[])
    }
  }
})

export default store


/**
 * 强制关闭vscode，项目依然在运行；再运行项目会提示3000端口被占用；解决方法：
 * 在CMD中输入netstat -nao | findstr 3000，查看占用的程序
 * 再输入 taskkill /pid 12212(12212是占用该端口号的程序) 终止该程序
 */
