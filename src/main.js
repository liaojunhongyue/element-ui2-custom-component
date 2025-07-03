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

// 全局 Dialog 拖拽指令
import dragDialog from './directives/dragDialog';
Vue.directive('drag-dialog', dragDialog);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
