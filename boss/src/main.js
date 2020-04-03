// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios' //fetch 替代ajax  是fetch的封装  promise

// 08-19.1
// import store from './vuex/store'
import store from './store/index'   //集中式的存储

// rem
import "./js/flexible" //移动端自适应插件
//导入字体样式
import "./styles/fontstyle.css"
import "./styles/index.styl"


//在页面中使用axios  直接  this.$http 就可以了
Vue.prototype.$http = axios


import MintUI from 'mint-ui'   //皮肤
import 'mint-ui/lib/style.css'
Vue.use(MintUI)  //加载Mintui

//全局定义alert弹窗层
window.alert = function (msg) {
  Vue.$toast({
    message: msg,
    //	  position: 'bottom',
    duration: 3000
  })
}


Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  data: {},
  template: '<App/>',
  components: {
    App
  },
})
