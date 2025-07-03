import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let originPush =  VueRouter.prototype.push;  //备份原push方法

// 解决两次点击相同路由后的报错问题
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {    //如果传了回调函数，直接使用
    originPush.call(this, location, resolve, reject);
  } else {                     //如果没有传回调函数，手动添加
    originPush.call(this, location, ()=>{}, ()=>{}); 
  }
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'mainHome',
      component: () => import('../pages/mainHome.vue')
    },
    {
      path: '/dialog/drag',
      name: 'dialogDrag',
      component: () => import('../pages/dialog/dialogDrag.vue')
    },
  ]
})

export default router;