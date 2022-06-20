import Vue from 'vue';
import VueRouter from 'vue-router';
import AqiView from '@/views/AqiView.vue';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    name: 'AqiView',
    component: AqiView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const el = document.getElementsByTagName('body')[0];
  el.classList.remove('lock');
  next();
});

export default router;
