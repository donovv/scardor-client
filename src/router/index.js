import { createRouter, createWebHistory } from 'vue-router';

import store from '@/store/index';

import HomeView from '../views/HomeView.vue';
import SettingsView from '../views/SettingsView.vue';
import ClassPicker from '../views/ClassPicker.vue';
import ClassView from '../views/ClassView.vue';
import ResourceView from '../views/ResourceView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/settings/:id?',
    name: 'settings',
    component: SettingsView,
    props: true,
    beforeEnter: (to, from, next) => {
      if (store.getters['user/isLoggedIn']) next();
      next('/');
    },
  },
  {
    path: '/classpicker',
    name: 'classpicker',
    component: ClassPicker,
  },
  {
    path: '/resources',
    name: 'resources',
    component: ResourceView,
  },
  {
    path: '/class/:id',
    name: 'class',
    component: ClassView,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  hamburger.classList.remove('change');
  menu.classList.remove('visible');
  next();
});

export default router;
