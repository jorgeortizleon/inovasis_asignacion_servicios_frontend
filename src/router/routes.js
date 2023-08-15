import RegisterForm from 'src/components/auth/RegisterForm.vue';
import About from 'src/components/About.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('components/auth/LoginForm.vue') },
      { path: '/registro', component: RegisterForm }
    ]
  },
  {
    path: '/about',
    component: About,
  },
  

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
