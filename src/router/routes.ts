import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:locale([\\w]{2,3})/',
    component: () => import('layouts/LocalizationWrapper.vue'),
    children: [
      {
        path: '',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/IndexPage.vue')
          }
        ]
      }
    ]
  },
  {
    name: '404',
    path: '/:locale([\\w]{2,3})/:pathMatch(.*)',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/:catchAll(.*)*',
    redirect: to => {
      return '/en' + to.fullPath;
    }
  }
];

export default routes;
