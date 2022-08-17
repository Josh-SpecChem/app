import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Calculator from '../views/Calculator.vue';
import CrossoverChart from '../views/CrossoverChart.vue';
import DOTApprovals from '../views/DOTApprovals.vue';
import ProductLibrary from '../views/ProductLibrary.vue';
import SelectProduct from '../views/SelectProduct.vue';
import VideoGallery from '../views/VideoGallery.vue';
import CalculatorEpoxy from '../views/CalculatorEpoxy.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: Calculator,
    children: [
      { path: 'epoxy', name: 'Calculator', component: Calculator },
      { path: 'epoxy/calculateepoxy', name: 'Calculator', component: Calculator },
      { path: 'cementitous', name: 'Calculator', component: Calculator },
      { path: 'cementitous/calculatecementitous', name: 'Calculator', component: Calculator },
    ],
  },
  {
    path: '/crossoverchart',
    name: 'CrossoverChart',
    component: CrossoverChart,
    children: [
      { path: 'productname/:name', name: 'CrossoverChart', component: CrossoverChart },
      { path: 'productname/:name/:reload', name: 'CrossoverChart', component: CrossoverChart },
    ],
  },
  {
    path: '/dotapprovals',
    name: 'DOTApprovals',
    component: DOTApprovals,
    children: [
      { path: 'state/:ID', name: 'DOTApprovals', component: DOTApprovals },
    ],
  },
  {
    path: '/productlibrary',
    name: 'ProductLibrary',
    component: ProductLibrary,
    children: [
      { path: 'productid/:id/:title', name: 'ProductLibrary', component: ProductLibrary },
    ],
  },
  {
    path: '/selectproduct',
    name: 'SelectProduct',
    component: SelectProduct,
    children: [
      { path: 'curingcompound', name: 'SelectProduct', component: SelectProduct },
      { path: 'curingcompound/:title', name: 'SelectProduct', component: SelectProduct },
      { path: 'curingcompound/:title/:subtitle', name: 'SelectProduct', component: SelectProduct },
      { path: 'repairmortar', name: 'SelectProduct', component: SelectProduct },
      { path: 'repairmortar/:title', name: 'SelectProduct', component: SelectProduct },
      { path: 'repairmortar/:title/:subtitle', name: 'SelectProduct', component: SelectProduct },
      { path: 'groutanchor', name: 'SelectProduct', component: SelectProduct },
      { path: 'groutanchor/:title', name: 'SelectProduct', component: SelectProduct },
      { path: 'groutanchor/:title/:subtitle', name: 'SelectProduct', component: SelectProduct },
      { path: 'sealer', name: 'SelectProduct', component: SelectProduct },
      { path: 'sealer/:title', name: 'SelectProduct', component: SelectProduct },
      { path: 'sealer/:title/:subtitle', name: 'SelectProduct', component: SelectProduct },
    ],
  },
  {
    path: '/videogallery',
    name: 'VideoGallery',
    component: VideoGallery,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
