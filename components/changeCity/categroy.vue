<template>
  <div>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item"
      >
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt>{{ item.title }}</dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>