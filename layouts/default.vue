<template>
  <el-container>
    <el-header :height="'auto'">
      <my-header />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer :height="'auto'">
      <my-footer />
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/index.vue'
import MyFooter from '@/components/public/footer/index.vue'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #f8f8f8;
}
</style>
