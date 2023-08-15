import RegisterForm from 'src/components/auth/RegisterForm.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/auth/LoginForm.vue') },
      { path: 'registro', component: RegisterForm }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
