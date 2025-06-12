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

// 表单组件
import CuInput from './components/FormItem/CuInput.vue';
import CuTextarea from './components/FormItem/CuTextarea.vue';
import CuInputNumber from './components/FormItem/CuInputNumber.vue';
import CuRadio from './components/FormItem/CuRadio.vue';
import CuCheckbox from './components/FormItem/CuCheckbox.vue';
import CuSelect from './components/FormItem/CuSelect.vue';
import CuSwitch from './components/FormItem/CuSwitch.vue';
import CuTimePicker from './components/FormItem/CuTimePicker.vue';
import CuDatePicker from './components/FormItem/CuDatePicker.vue';
import CuDateTimePicker from './components/FormItem/CuDateTimePicker.vue';
// 自定义组件
import CustomRate from './components/FormCustom/CustomRate.vue';
// 注册表单组件
const formItemArr = [CuInput, CuTextarea, CuInputNumber, CuRadio, CuCheckbox, CuSelect, 
  CuSwitch, CuTimePicker, CuDatePicker, CuDateTimePicker];
// 注册自定义组件
const customArr = [CustomRate]
formItemArr.concat(...customArr).map((item) => {
  Vue.component(item.name, item);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
