import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import echarts from 'echarts'

import App from './app.vue';
import 'iview/dist/styles/iview.css';

import './axiosConfig.js'

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    window.currentMenu = {fullPath:to.fullPath,parentName:to.meta.parentName};
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
    if(to.fullPath&&to.fullPath=="/Login"){

    }
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

Vue.prototype.$echarts = echarts 

