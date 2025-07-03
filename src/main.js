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
import CuInput from './components/Form/FormItem/CuInput.vue';
import CuTextarea from './components/Form/FormItem/CuTextarea.vue';
import CuInputNumber from './components/Form/FormItem/CuInputNumber.vue';
import CuRadio from './components/Form/FormItem/CuRadio.vue';
import CuCheckbox from './components/Form/FormItem/CuCheckbox.vue';
import CuSelect from './components/Form/FormItem/CuSelect.vue';
import CuSwitch from './components/Form/FormItem/CuSwitch.vue';
import CuTimePicker from './components/Form/FormItem/CuTimePicker.vue';
import CuDatePicker from './components/Form/FormItem/CuDatePicker.vue';
import CuDateTimePicker from './components/Form/FormItem/CuDateTimePicker.vue';
// 自定义组件
import CustomRate from './components/Form/FormCustom/CustomRate.vue';
import CustomColorPicker from './components/Form/FormCustom/CustomColorPicker.vue';
// 注册表单组件
const formItemArr = [CuInput, CuTextarea, CuInputNumber, CuRadio, CuCheckbox, CuSelect, 
  CuSwitch, CuTimePicker, CuDatePicker, CuDateTimePicker];
// 注册自定义组件
const customArr = [CustomRate, CustomColorPicker]
formItemArr.concat(...customArr).map((item) => {
  Vue.component(item.name, item);
})

// 全局 Dialog 拖拽指令
import dragDialog from './directives/dragDialog';
Vue.directive('drag-dialog', dragDialog);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
