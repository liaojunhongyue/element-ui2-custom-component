import Vue from 'vue'
import App from './App.vue'

// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 路由
import router from './router/index.js';

// store 数据管理
import store from './store/index.js'

// 全局组件
import CuInput from './components/FormItem/CuInput.vue';
import CuTextarea from './components/FormItem/CuTextarea.vue';
import CuInputNumber from './components/FormItem/CuInputNumber.vue';
import CuRadio from './components/FormItem/CuRadio.vue';
// 注册全局组件
const componentArr = [CuInput, CuTextarea, CuInputNumber, CuRadio];
componentArr.map((item) => {
  Vue.component(item.name, item);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
