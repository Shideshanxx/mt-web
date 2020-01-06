<template>
  <div class="" />
</template>

<script>
export default {
  layout: 'blank',
  // 在中间件中执行退出操作（nuxt的生命周期中，middleware在Render之前执行）
  middleware: async (ctx) => {
    let {status,data} = await ctx.$axios.get('/users/exit')
    if (status === 200 && data.code === 0) {
      window.location.href = '/'
    }
  }
}
</script>