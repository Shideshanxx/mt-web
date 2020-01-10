<template>
  <div class="m-iselect">
    <span class="name">按省份选择</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- city与province对应，选择province获取city值，当city长度为0，city不可选 -->
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-autocomplete
      v-model="input"
      popper-class="my-autocomplete"
      :fetch-suggestions="querySearch"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pvalue: '',
      province: [],
      cvalue: '',
      city:[],
      input: '',
      loading: false,
      remoteValue: []
    }
  },
  watch: {
    async pvalue(newPvalue) {
      let self = this;
      let {status,data:{city}}=await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue=''
      }
    }
  },
  async mounted(){
    let self=this;
    let {status,data:{province}}=await self.$axios.get('/geo/province')
    if(status===200){
      self.province=province.map(item=>{
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },
  methods: {
    querySearch(queryString, cb) {
      console.log(queryString, cb)
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/changeCity/iselect.scss";
</style>