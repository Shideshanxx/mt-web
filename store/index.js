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
      const res=await app.$axios.get('/geo/menu')
      const {status:status2,data:{menu}}=await app.$axios.get('/geo/menu')
      commit('home/setMenu',status2===200?menu:[])
    }
  }
})

export default store
