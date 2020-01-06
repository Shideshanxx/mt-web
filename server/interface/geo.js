import Router from 'koa-router'
import axios from './utils/axios'
import sign from './utils/sign'
import Menu from '../dbs/models/menu'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})
// 获取当前定位接口
router.get('/getPosition',async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

// 获取菜单
router.get('/menu', async (ctx) => {
  // 从本地数据库获取
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }

  // 从接口获取
  let {status, data: {
      menu
    }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  }
})

export default router