// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import AboutPage from '../virew/AboutPage.vue'
import StudentList from '../virew/StudentList.vue'
import ProductPage from '../virew/ProductPage.vue'
import Category from '../virew/Category.vue'
import ProductEditPage from '../virew/ProductEditPage.vue'; // Correct import path

import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import Index from '../virew/Index.vue'


// const routes = [
//   {
//     path: '/editproduct/:id',
//     name: 'EditProduct',
//     component: ProductEditPage
//   },
//   {
//     path: '/about',
//     name: 'About',
//     component: AboutPage
//   },
//   {
//     path: '/studentlist',
//     name: 'studentlist',
//     component: StudentList
//   },
//   {
//     path: '/pro',
//     name: 'Pro',
//     component: ProductPage
//   },
//   {
//     path: '/ca',
//     name: 'ca',
//     component: Category
//   },
//   {
//     path: '/register',
//     name: 'rigister',
//     component: Register
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: Login,
//     meta: { requiresAuth: false }, // Use meta to mark this route as not requiring authentication
//   },
//   {
//     path: '/',
//     name: 'index',
//     component: Index
//   }
// ]

const routes = [
  {
    path: '/editproduct/:id',
    name: 'EditProduct',
    component: ProductEditPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/studentlist',
    name: 'StudentList',
    component: StudentList,
  },
  {
    path: '/pro',
    name: 'ProductPage',
    component: ProductPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/ca',
    name: 'Category',
    component: Category,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/pro');
  } else {
    next();
  }
});

export default router
