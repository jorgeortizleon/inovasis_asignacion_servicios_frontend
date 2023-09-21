import RegisterForm from 'src/components/auth/RegisterForm.vue';
import { useAuthStore } from "src/stores/auth";
import { storeToRefs } from "pinia";


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
      { path: 'registro', component: () => import('components/auth/RegisterForm.vue'), },
      { path: '/about', component: () => import('components/About.vue')},
      { path: '/users', component: () => import('components/UsersPage.vue')},
      { path: '/clientes', component: () => import('components/ClientesView.vue')},
    ]
  },
      { path: '/login', component: () => import('components/auth/LoginForm.vue') },
      { path: '/registro', component: RegisterForm },
      { path: '/about', component: () => import('components/About.vue')},

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/editar-usuario/:id',
    name: 'user-edit',
    component: () => import('components/UserEditForm.vue'),
  },
]

export default routes
