import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
// import HomeComponent from '@/views/Home.vue';
// import CalendarComponent from '@/views/Calendar.vue';
// import ProfileComponent from '@/views/Profile.vue';
// import ShareComponent from '@/views/Share.vue';
// import SignInComponent from '@/views/SignIn.vue';
import { calendarRoutes } from '@/router/calendar/calendar';
import { profileStore } from '@/store/profile/profile';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    // component: HomeComponent,
    component: () => import(/* webpackChunkName: 'home' */ '@/views/Home.vue'),
    meta: {
      title: 'home',
    },
  },
  // {
  //   path: '/calendar/:type',
  //   name: 'calendar',
  //   component: CalendarComponent,
  //   props: true,
  // },
  ...calendarRoutes,
  {
    path: '/profile',
    name: 'profile',
    // component: ProfileComponent,
    component: () =>
      import(/* webpackChunkName: 'profile' */ '@/views/Profile.vue'),
  },
  {
    path: '/share',
    name: 'share',
    // component: ShareComponent,
    component: () =>
      import(/* webpackChunkName: 'share' */ '@/views/Share.vue'),
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    // component: SignInComponent,
    component: () =>
      import(/* webpackChunkName: 'signIn' */ '@/views/SignIn.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  if (!to.meta?.title) {
    return;
  }
  document.title = to.meta.title;
});

router.beforeEach((to, from, next) => {
  if (to.path === '/sign-in') {
    next();
    return;
  }
  if (profileStore.getProfile) {
    next();
    return;
  }
  next('/sign-in');
});

export default router;
