<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left"
      >
        <nuxt-link to="/">
          <img
            src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
            alt="美团"
          >
        </nuxt-link>
      </el-col>
      <el-col
        :span="15"
        class="center"
      >
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家铺地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl
            v-if="isHotPlace"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd
              v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
              :key="idx"
            >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl
            v-if="isSearchList"
            class="searchList"
          >
            <dd
              v-for="(item,idx) in searchList"
              :key="idx"
            >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)"
            :key="idx"
            :href="'/products?keyword='+encodeURIComponent(item.name)"
          >{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout"
            >
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie"
            >
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel"
            >
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment"
            >
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business"
            >
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right"
      >
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import { async } from 'q'
export default {
  data() {
    return {
      search: '',
      isFocus:false,
      hotPlace:[],
      searchList:[]
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus&&!this.search
    },
    isSearchList() {
      return this.isFocus&&this.search
    }
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      // 设置延时：因为点击搜索list的内容会先触发blur事件，导致searchlist消失，无法触发点击事件
      setTimeout(() => {
        this.isFocus = false
      },200)
    },
    // input 设置300ms的延时
    input: _.debounce(async function(){
      let self = this;
      let city = self.$store.state.geo.position.city.replace('市','')
      self.searchList = []
      let {status,data:{top}}=await self.$axios.get('/search/top',{
        params:{
          input:self.search,
          city
        }
      })
      // 取10条数据
      self.searchList = top.slice(0,10)
    },300)
  }
}
</script>

<style lang="scss">

</style>