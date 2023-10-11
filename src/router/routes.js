import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";
import HistorialServicio from '../components/services/HistorialServicio.vue';


const routes = [

  {
    path: "/",
    redirect: "/login",
  },

  {
    path: '/login',
    name: "login",
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: "login", component: () => import('components/auth/LoginForm.vue') },
    ]
  },

  {
    path: '/home',
    name: "home",
    beforeEnter: (to, from, next) => {
      const useAuth = useAuthStore();
      const { logged } = storeToRefs(useAuth);
      if (logged.value === 1) {
        next();
      } else {
        next("/login");
      }
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "home", component: () => import('pages/IndexPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/about', component: () => import('components/About.vue')},
      { path: '/users', component: () => import('components/users/UsersPage.vue')},
      { path: '/clientes', component: () => import('components/ClientesView.vue')},
      { path: '/servicios', component: () => import('components/services/servicios.vue')},
      { path: '/servicioshistory', component: () => import('components/services/ServiceHistory.vue')},
      {
        path: '/historial-servicio/:id',
        name: 'historial-servicio',
        component: HistorialServicio,
        props: true, // Pasar props automáticamente
      },
    ]
  },
      { path: '/login', component: () => import('components/auth/LoginForm.vue') },
      { path: '/about', component: () => import('components/About.vue')},

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
