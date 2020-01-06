<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave"
    >
      <dt>全部分类</dt>
      <dd
        v-for="(item,index) in $store.state.home.menu"
        :key="index"
        @mouseenter="enter"
      >
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout"
    >
      <template v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">
          {{ item.title }}
        </h4>
        <span
          v-for="v in item.child"
          :key="v"
        >{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',    // 用于记录鼠标是否hover
      menu: [{
        type: 'food',
        name: '美食',
        child:[{
          title:'美食',
          child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
        }]
      },{
        type: 'takeout',
        name: '外卖',
        child:[{
          title:'外卖',
          child:['美团外卖']
        }]
      },{
        type: 'hotel',
        name: '酒店',
        child:[{
          title:'酒店星级',
          child:['经济型','舒适/三星','高档/四星','豪华/五星']
        }]
      },{
        type: 'homestay',
        name: '榛果民宿',
        child:[{
          title:'热门城市',
          child:['上海','杭州','北京','广州','深圳']
        },{
          title:'热门房源',
          child:['loft','别墅']
        }]
      },{
        type: 'movie',
        name: '猫眼电影',
        child:[{
          title:'热映电影',
          child:['叶问4','美丽人生']
        },{
          title:'热门影院',
          child:['万达影城','CGV影城']
        }]
      },{
        type: 'airport',
        name: '机票/火车票',
        child:[{
          title:'机票',
          child:['国内机票','国际机票']
        },{
          title:'火车票',
          child:['火车票']
        }]
      },{
        type: 'ktv',
        name: '休闲娱乐/KTV',
        child:[{
          title:'休闲娱乐',
          child:['酒吧','密室逃脱']
        },{
          title:'KTV',
          child:['KTV']
        }]
      },{
        type: 'life',
        name: '生活服务',
        child:[{
          title:'生活服务',
          child:['家政','送水','充值缴费']
        }]
      },{
        type: 'hair',
        name: '丽人/美发/医学美容',
        child:[{
          title:'丽人',
          child:['美发','美甲']
        }]
      },{
        type: 'marry',
        name: '结婚/婚纱拍摄/婚宴',
        child:[{
          title:'结婚',
          child:['婚纱拍摄','婚宴']
        }]
      },{
        type: 'offspring',
        name: '亲子/儿童乐园/幼教',
        child:[{
          title:'儿童乐园',
          child:['婴儿游泳','其他亲子游乐']
        },{
          title:'幼儿教育',
          child:['早教中心','少儿英语']
        },{
          title:'亲子摄影',
          child:['儿童摄影','上门拍']
        },{
          title:'孕产护理',
          child:['妇幼医院','产后恢复']
        }]
      },{
        type: 'sport',
        name: '运动健身/健身中心',
        child:[{
          title:'运动健身',
          child:['游泳馆','健身馆','羽毛球馆']
        }]
      },{
        type: 'furniture',
        name: '家装/建材/家居',
        child:[{
          title:'装修设计',
          child:['半包装修','全包装修']
        },{
          title:'装修建材',
          child:['地板','瓷砖','门窗','电梯']
        },{
          title:'家具家居',
          child:['餐具','沙发','床上用品']
        },{
          title:'家具卖场',
          child:['建材卖场','家具卖场']
        }]
      },{
        type: 'study',
        name: '学习培训/音乐培训',
        child:[{
          title:'音乐培训',
          child:['钢琴','吉他','小提琴']
        },{
          title:'职业培训',
          child:['IT','会计','管理']
        },{
          title:'外语培训',
          child:['英语','日语','韩语']
        }]
      },{
        type: 'health',
        name: '医疗健康/宠物/爱车',
        child:[{
          title:'医疗健康',
          child:['医院','口腔','体检中心']
        },{
          title:'爱车',
          child:['洗车','租车','维修保养']
        },{
          title:'宠物',
          child:['宠物店','宠物医院']
        }]
      },{
        type: 'bar',
        name: '酒吧/密室逃脱',
        child:[{
          title:'玩乐',
          child:['KTV','酒吧','VR','网吧网咖']
        }]
      }]
    }
  },
  computed:{
    curdetail:function(){
      return this.$store.state.home.menu.filter(item => item.type===this.kind)[0]
    }
  },
  methods: {
    mouseleave() {
      let self=this;
      self._timer=setTimeout(function(){
        self.kind=''
      },150)
    },
    enter(e) {
      this.kind=e.target.querySelector('i').className
    },
    sover:function(){
      // 当进入hover面板时清空_timer，kind不会被清空，当离开hover面板时才会清空kind
      clearTimeout(this._timer)
    },
    sout:function(){
      this.kind=''
    }
  }
}
</script>

<style lang="scss">

</style>