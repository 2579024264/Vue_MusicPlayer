import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//导入iconfont
import '@/assets/icon/iconfont.css'
//导入element-ui
import ElementUI from 'element-ui'
//导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
//use一下
Vue.use(ElementUI)
//导入
import VueRouter from 'vue-router'
//使用
Vue.use(VueRouter)
//导入需要通过路由管理的组件
import discovery from './view/01discovery.vue'
import playlist from './view/02playlist.vue'
import songs from './view/03songs.vue'
import MV from './view/04MV.vue'
import result from './view/05result.vue'
import playlist1 from './view/06playlist.vue'
import MV1 from './view/07MV.vue'
import songs1 from './view/08song.vue'
import playlist2 from './view/09playlist.vue'
import MV2 from './view/10MV.vue'
//创建路由
let router=new VueRouter({
  //配置地址和组件的对应关系
  routes:[
    {
      path:"/",
      component:discovery
    },
    {
      path:'/discovery',
      component:discovery
    },
    {
      path:'/playlist',
      component:playlist
    },
    {
      path:'/songs',
      component:songs
    },
    {
      path:'/MV',
      component:MV
    },
    {
      path:'/result',
      component:result,
      children:[  //这里定义子路由方法  定义嵌套路由属性
        {
          path:'/songs1',
          // name:'songs1',
          component:songs1,
        },
        {
          path:'/playlist1',
          component:playlist1
        },
        {
          path:'/MV1',
          component:MV1
        }
      ],
      redirect:'/songs1'
    },
    {
      path:'/playlist2',
      component:playlist2
    },
    {
      path:'/MV2',
      component:MV2
    }
  ]
})

new Vue({
  render: h => h(App),
  //挂载到Vue实例上
  router
}).$mount('#app')
