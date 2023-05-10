import Vue from 'vue'
import App from './App.vue'

// 导入包
import axios from 'axios'
import VueAxios from 'vue-axios'

// 使用插件(调用插件对象的install方法, 在Vue的原型对象上, 挂载了$http)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

// Vue.$http('http://localhost:3000/todos').then((res) => {
//   console.log(res)
// })

new Vue({
  render: (h) => h(App),
}).$mount('#app')
