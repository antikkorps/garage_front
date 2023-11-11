import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import requireAuth from '../guards/auth-guard'
import roleGuard from '../guards/role-guard'

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
      path: '/forgotten-pass',
      name: 'forgotten-password',
      component: () => import('../views/ForgottenPasswordView.vue')
    },
    {
      path: '/newpass',
      name: 'new password',
      component: () => import('../views/NewPasswordView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
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
      component: () => import('../views/AnnonceDetailsView.vue'),
      props: true
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/annonces',
      name: 'dashboard-annonces',
      component: () => import('../views/DashboardAnnoncesView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/annonces/:id',
      name: 'dashboard-annonces-details',
      component: () => import('../views/DashboardAnnonceDetailsView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/annonces/new',
      name: 'annonce-new',
      component: () => import('../views/DashboardAnnonceNewView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/contacts',
      name: 'dashboard-contacts',
      component: () => import('../views/DashboardContactsView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/contacts/:id',
      name: 'dashboard-contacts-details',
      component: () => import('../views/DashboardContactDetailsView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/horaires',
      name: 'dashboard-horaires',
      component: () => import('../views/DashboardHorairesView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/horaires/:id',
      name: 'dashboard-horaires-details',
      component: () => import('../views/DashboardHoraireDetailsView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/dashboard/users',
      name: 'dashboard-users',
      component: () => import('../views/DashboardUsersView.vue'),
      beforeEnter: [requireAuth, roleGuard(['ADMIN'])]
    },
    {
      path: '/dashboard/users/new',
      name: 'user-new',
      component: () => import('../views/DashboardUserNewView.vue'),
      beforeEnter: [requireAuth, roleGuard(['ADMIN'])]
    },
    {
      path: '/dashboard/users/:id',
      name: 'user-details',
      component: () => import('../views/DashboardUserDetailsView.vue'),
      beforeEnter: [requireAuth, roleGuard(['ADMIN'])]
    },
    {
      path: '/dashboard/profile',
      name: 'user-profile',
      component: () => import('../views/DashboardUserProfileView.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue')
    }
  ]
})

export default router
