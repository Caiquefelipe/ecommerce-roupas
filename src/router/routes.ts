import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'AppLayoult',
    component: () => import('components/AppLayoult.vue'),
  },
]

export default routes
