<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs
          :keyword="keyword"
          :type="type"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa :meta="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <!-- 如果可以购买(即list组件里有值)或者未登录  显示下面内容 -->
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list
          v-if="login"
          :list="list"
        />
        <div
          v-else
          class="deal-need-login"
        >
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看"
          >
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round
          >
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue';
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  components:{
    Crumbs,
    Summa,
    List
  },
  async asyncData(ctx){
    // 为什么keyword,type要这样取，而不写在data中；因为asyncData在服务端执行，写在data里面服务端无法获取到
    let {keyword,type}=ctx.query;
    let {status,data:{product,more:list,login}}=await ctx.$axios.get('/search/products',{
      params:{
        keyword,
        type,
        city:ctx.store.state.geo.position.city
      }
    })
    // console.log(login,product,list)
    if(status===200){
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    }else{
      return {
        keyword,
        product:{},
        type,
        list:[],
        login:false
      }
    }
  },
  computed:{
    canOrder:function(){
      return this.list.filter(item=>item.photos.length).length
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/detail/index.scss";
</style>
