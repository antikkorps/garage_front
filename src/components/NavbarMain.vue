<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { PropType } from 'vue'
import ProgessIndicator from '@/components/ProgessIndicator.vue'
import ToggleDarkMode from './ToggleDarkMode.vue'

const isMenuVisible = ref(false)
const loggedIn = ref(false)

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

const checkLoggedIn = () => {
  if (localStorage.getItem('jwt_token')) {
    loggedIn.value = true
  } else {
    loggedIn.value = false
  }
}

const logOutUser = () => {
  localStorage.removeItem('jwt_token')
  loggedIn.value = false
}

onMounted(() => {
  checkLoggedIn()
})

const props = defineProps({
  currentPage: String as PropType<string>
})

const routes = [
  { path: '/about', name: 'about', label: 'A Propos' },
  { path: '/services', name: 'services', label: 'Services' },
  { path: '/annonces/all', name: 'annonces', label: 'Nos véhicules' },
  { path: '/contact', name: 'contact', label: 'Contact' },
  { path: '/dashboard', name: 'admin', label: 'Admin' }
]
</script>

<template>
  <nav class="navContainer">
    <div class="h-fit relative">
      <div class="navRoutesContainer">
        <RouterLink to="/" class="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Garage Parrot</span
          >
        </RouterLink>
        <div class="flex md:order-2">
          <ToggleDarkMode />
          <button type="button" class="buttonNavBarMainMenuLoginLogout" v-if="!loggedIn">
            <router-link to="/login">Se connecter</router-link>
          </button>

          <div>
            <button
              type="button"
              class="buttonNavBarMainMenuLoginLogout"
              v-if="loggedIn"
              @click="logOutUser"
            >
              <router-link to="/">Se déconnecter</router-link>
            </button>
          </div>
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="navToggleMobile"
            aria-controls="navbar-cta"
            aria-expanded="false"
            @click="toggleMenu"
          >
            <span class="sr-only">menu principal ouvert</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
          :class="{ hidden: !isMenuVisible }"
        >
          <ul class="navUlRoute">
            <li>
              <RouterLink
                to="/"
                class="block py-2 pl-3 pr-4 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500 transition-colors duration-300"
                >Accueil</RouterLink
              >
            </li>
            <li v-for="route in routes" :key="route.path">
              <RouterLink
                :to="route.path"
                class="navLinks"
                :class="{
                  'underline underline-offset-8': props.currentPage === route.name
                }"
                >{{ route.label }}</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="absolute bottom-0 inset-x-0">
        <ProgessIndicator />
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
