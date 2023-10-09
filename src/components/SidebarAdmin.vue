<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { state } from '@/stores/state'
import { logOutUser } from '@/stores/reusable'

const optionsAvecListeDeroulante = ref([])

const toggleDeroulante = (option: HTMLElement) => {
  const deroulante = option.querySelector('.deroulante')
  if (deroulante) {
    deroulante.classList.toggle('hidden')
  }
}

const toggleSidebar = () => {
  state.showSidebar = !state.showSidebar
  optionsAvecListeDeroulante.value.forEach((option: HTMLElement) => {
    const deroulante = option.querySelector('.deroulante')
    if (deroulante) {
      deroulante.classList.add('hidden')
    }
  })
}

const router = useRouter()

const handleRouteChange = () => {
  state.showSidebar = false // Fermer la barre latérale lorsque la navigation a lieu
}

const handleLogout = () => {
  logOutUser()
  router.push('/')
}

onMounted(() => {
  optionsAvecListeDeroulante.value = Array.from(
    document.querySelectorAll('.optionAvecListeDeroulante')
  )

  optionsAvecListeDeroulante.value.forEach((option: HTMLElement) => {
    option.addEventListener('click', () => {
      toggleDeroulante(option)
    })
  })

  router.afterEach(handleRouteChange) // Détecter les changements de route avec le routeur
})
</script>
<template>
  <!-- Top Navbar -->
  <nav class="bg-gray-600 border-gray-600 dark:bg-gray-900 p-4 flex items-center justify-between">
    <div>
      <h1 class="text-white dark:text-white text-xl font-semibold">
        Garage Parrot - Administration
      </h1>
    </div>
    <div class="flex items-center space-x-4">
      <button v-if="!state.showSidebar" class="text-white open_menu" @click="toggleSidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <button v-else class="text-white close_menu" @click="toggleSidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 text-white cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </div>
  </nav>

  <!-- Sidebar -->
  <transition name="sidebar-slide" mode="out-in">
    <aside
      :class="['sidebar bg-gray-800 text-white w-64 p-4', { hidden: !state.showSidebar }]"
      key="sidebar"
    >
      <nav>
        <ul class="space-y-2">
          <li class="optionAvecListeDeroulante">
            <div class="flex items-center justify-between p-2 hover:bg-gray-700">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span class="cursor-pointer">Annonces</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <ul class="deroulante ml-4 hidden">
              <li>
                <RouterLink
                  to="/dashboard/annonces"
                  class="p-2 hover:bg-gray-700 flex items-center"
                >
                  <i class="fas fa-chevron-right mr-2 text-xs"></i>
                  Liste des annonces
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/annonces/new" class="p-2 hover:bg-gray-700 flex items-center">
                  <i class="fas fa-chevron-right mr-2 text-xs"></i>
                  Ajouter une annonce
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="optionAvecListeDeroulante">
            <div class="flex items-center justify-between p-2 hover:bg-gray-700">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span>Media</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <ul class="deroulante ml-4 hidden">
              <li>
                <a href="#" class="p-2 hover:bg-gray-700 flex items-center">
                  <i class="fas fa-chevron-right mr-2 text-xs"></i>
                  Liste des media
                </a>
              </li>
              <li>
                <a href="#" class="p-2 hover:bg-gray-700 flex items-center">
                  <i class="fas fa-chevron-right mr-2 text-xs"></i>
                  Ajouter un media
                </a>
              </li>
            </ul>
          </li>
          <li class="optionAvecListeDeroulante">
            <div class="flex items-center justify-between p-2 hover:bg-gray-700">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <span class="cursor-pointer">Utilisateurs</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <ul class="deroulante ml-4 hidden">
              <li>
                <RouterLink to="/dashboard" class="p-2 hover:bg-gray-700 flex items-center">
                  <i class="fas fa-chevron-right mr-2 text-xs"></i>
                  Liste des utilisateurs
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/dashboard" class="p-2 hover:bg-gray-700 flex items-center">
                  <i class="fas fa-chevron-right mr-2 text-xs"></i>
                  Liste des rôles
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="optionAvecListeDeroulante">
            <div class="flex items-center justify-between p-2 hover:bg-gray-700">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="cursor-pointer">Horaires</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <ul class="deroulante ml-4 hidden">
              <li>
                <RouterLink
                  to="/dashboard/horaires"
                  class="p-2 hover:bg-gray-700 flex items-center"
                >
                  Liste des Horaires
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="optionAvecListeDeroulante">
            <div class="flex items-center justify-between p-2 hover:bg-gray-700">
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>

                <span class="cursor-pointer">Contacts</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            <ul class="deroulante ml-4 hidden">
              <li>
                <RouterLink
                  to="/dashboard/contacts"
                  class="p-2 hover:bg-gray-700 flex items-center"
                >
                  Liste des demandes de contacts
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="optionAvecListeDeroulante text-red-500">
            <RouterLink
              to="/"
              class="p-2 hover:bg-gray-700 flex items-center"
              @click="handleLogout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>

              Se déconnecter
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
  </transition>
</template>
<style scoped lang="scss">
.open_menu {
  transition: all 0.4s ease;
}

.close_menu {
  transition: all 0.4s ease;
}
.sidebar {
  float: left;
  z-index: 100;
  transition: all 0.4s ease;
  min-height: 93vh;
}
@media screen and (min-width: 768px) {
  .sidebar {
    width: 15vw;
  }
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: margin-left 0.5s;
}
.sidebar-slide-enter,
.sidebar-slide-leave-to {
  margin-left: -300px;
}
</style>
