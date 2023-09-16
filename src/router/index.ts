import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../components/SearchView.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesView.vue')
    },
    {
      path: '/annonces/all',
      name: 'annonces',
      component: () => import('../views/AnnoncesView.vue')
    },
    {
      path: '/annonces/:id',
      name: 'annonce-details',
      component: () => import('../views/AnnonceDetailsView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/dashboard/annonces',
      name: 'dashboard-annonces',
      component: () => import('../views/DashboardAnnoncesView.vue')
    },
    {
      path: '/dashboard/contacts',
      name: 'dashboard-contacts',
      component: () => import('../views/DashboardContactsView.vue')
    }
  ]
})

export default router
