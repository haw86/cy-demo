const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/Goods',
        meta: {
            title: '商品'
        },
        component: (resolve) => require(['./views/Goods/Goods.vue'], resolve)
    },
    {
        path: '/GoodsType',
        meta: {
            title: '分类'
        },
        component: (resolve) => require(['./views/Goods/GoodsType.vue'], resolve)
    },
    {
        path: '/Member',
        meta: {
            title: '会员'
        },
        component: (resolve) => require(['./views/Member/Member.vue'], resolve)
    },
    {
        path: '/MemberGrade',
        meta: {
            title: '会员'
        },
        component: (resolve) => require(['./views/Member/MemberGrade.vue'], resolve)
    }
];

export default routers;