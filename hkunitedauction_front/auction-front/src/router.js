import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: () => import('./view/Home'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/lot/:id',
    component: () => import('./view/Lot'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/my',
    component: () => import('./view/My'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/my/auction/:type',
    component: () => import('./view/MyAuction'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/my/cart',
    component: () => import('./view/Cart'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/mall',
    component: () => import('./view/Mall'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/good/:id',
    component: () => import('./view/Good'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/order',
    component: () => import('./view/Order'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/setting',
    component: () => import('./view/Setting'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/catalog',
    component: () => import('./view/Catalog'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/search',
    component: () => import('./view/Search'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/order/detail/:id',
    component: () => import('./view/OrderDetail'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/quote/:id',
    component: () => import('./view/Quote'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/search/result/:type/:catalog/:q',
    component: () => import('./view/SearchResult'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/catalog/count/:l1/:l2/:l3',
    component: () => import('./view/CatalogCount'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/catalog/result/:type/:l1/:l2/:l3',
    component: () => import('./view/CatalogResult'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/mail',
    component: () => import('./view/Mail.vue'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/message',
    component: () => import('./view/Message.vue'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/mail/create',
    component: () => import('./view/MailCreate.vue'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/login',
    component: () => import('./view/Login.vue'),
    meta: {
      title: '香港联合拍卖'
    }
  },
  {
    path: '/register',
    component: () => import('./view/Register.vue'),
    meta: {
      title: '香港联合拍卖'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {

  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};