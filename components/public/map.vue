<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    class="m-map"
  />
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:300
    },
    height: {
      type:Number,
      default:300
    },
    point: {
      type:Array,
      default(){
        return [120.12,30.16]
      }
    }
  },
  data() {
    return {
      id: 'map',
      key: '55d4e5203ebffd81d2ab3ff4040bf47c'
    }
  },
  watch: {
    point: function (val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  // mounted在客户端执行，不在服务端执行
  mounted() {
    let self = this
    self.id = `map${Math.random().toString().slice(4, 6)}`
    // 因为要访问window对象，所以必须在mounted里面调用，而不能在created里面调用
    window.onmaploaded = () => {
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      })
      self.map = map
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }
    // 这里回调函数取名onmaploaded，也可以自己随意取名，但要和上面定义的window.[callbackName]保持一致
    const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>
