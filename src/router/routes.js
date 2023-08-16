import RegisterForm from 'src/components/auth/RegisterForm.vue';
import About from 'src/components/About.vue';

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
      { path: '', component: () => import('components/auth/LoginForm.vue') },
    ]
  },

  {
    path: '/home',
    name: "home",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'registro', component: () => import('components/auth/RegisterForm.vue'), },
      { path: '/about', component: () => import('components/About.vue')},
    ]
  },
      { path: '/login', component: () => import('components/auth/LoginForm.vue') },
      { path: '/registro', component: RegisterForm },
      { path: '/about', component: () => import('components/About.vue')},
  
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
