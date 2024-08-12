// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import AboutPage from '../virew/AboutPage.vue'
import StudentList from '../virew/StudentList.vue'
import ProductPage from '../virew/ProductPage.vue'
import Category from '../virew/Category.vue'
import ProductEditPage from '../virew/ProductEditPage.vue'; // Correct import path

const routes = [
  {
    path: '/editproduct/:id',
    name: 'EditProduct',
    component: ProductEditPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/studentlist',
    name: 'studentlist',
    component: StudentList
  },
  {
    path: '/',
    name: 'Pro',
    component: ProductPage
  },
  {
    path: '/ca',
    name: 'ca',
    component: Category
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
