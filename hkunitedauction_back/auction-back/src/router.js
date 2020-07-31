const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/Index.vue'], resolve)
    },
    {
        path: '/main-data/product',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/main-data/Product.vue'], resolve)
    },
    {
        path: '/main-data/product/:id',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/main-data/ProductDetail.vue'], resolve)
    },
    {
        path: '/main-data/user',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/main-data/User.vue'], resolve)
    },
    {
        path: '/main-data/catalog',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/main-data/Catalog.vue'], resolve)
    },
    {
        path: '/main-data/image',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/main-data/Image.vue'], resolve)
    },
    {
        path: '/auction/lot',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/auction/Lot.vue'], resolve)
    },
    {
        path: '/auction/lot/:id',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/auction/LotDetail.vue'], resolve)
    },
    {
        path: '/mall/good',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/mall/Good.vue'], resolve)
    },
    {
        path: '/mall/good/:id',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/mall/GoodDetail.vue'], resolve)
    },
    {
        path: '/order/order',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/order/Order.vue'], resolve)
    },
    {
        path: '/order/order/:id',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./view/order/OrderDetail.vue'], resolve)
    }
];
export default routers;