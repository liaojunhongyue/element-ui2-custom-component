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
      path: '/table/drag/basic',
      name: 'basicTableDrag',
      component: () => import('../pages/table/basicTableDrag.vue')
    },
    {
      path: '/table/drag/deployable',
      name: 'deployableTableDrag',
      component: () => import('../pages/table/deployableTableDrag.vue')
    },
    {
      path: '/table/drag/treeTableDrag',
      name: 'treeTableDrag',
      component: () => import('../pages/table/treeTableDrag.vue')
    },
  ]
})

export default router;