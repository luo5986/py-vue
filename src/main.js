import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import axios from 'axios'
import vueParticles from 'vue-particles'
import Vcomp from './components/index'
import Toast from './components/toast'


// 引入全局css
import './assets/css/style.scss';

//引入echart
//4.x 引用方式
// import echarts from 'echarts'
//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// 将全局Echarts挂载到Vue的原型上
Vue.config.productionTip = false

// 将axios挂载在Vue的原型上
// axios.defaults.baseURL = ''
Vue.prototype.$http = axios

Vue.use(dataV);
Vue.use(vueParticles)
Vue.use(Vcomp)

Vue.prototype.$Toast = Toast

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
