// import CalendarComponent from '@/views/Calendar.vue';
import { RouteConfig } from 'vue-router';

export const calendarRoutes: Array<RouteConfig> = [
  {
    path: '/calendar/:type',
    name: 'calendar',
    // component: CalendarComponent,
    component: () =>
      import(/* webpackChunkName: 'calendar' */ '@/views/Calendar.vue'),
    props: true,
    meta: {
      title: 'calendar',
    },
  },
];
