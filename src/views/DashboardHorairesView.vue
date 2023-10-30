<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import { loggedIn, checkLoggedIn } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import router from '@/router'

const horaires = ref<Horaires[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.horairesAll
const details = apiConfig.production.endpoints.horairesAll
const horairesQuery = `${baseUrl}${endpoint}`
const horairesDetailsQuery = `${baseUrl}${details}`

interface Horaires {
  id: number
  jourDeLaSemaine: String
  openingAm: String
  closingAm: String
  openingPm: String
  closingPm: String
}

const getAllHoraires = async () => {
  if (!loggedIn.value) {
    router.push('/login')
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }

  try {
    const response = await axios.get(horairesQuery, config)
    horaires.value = response.data
    sortHorairesById()
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires :', error)
  }
}

const sortHorairesById = () => {
  horaires.value.sort((a, b) => a.id - b.id)
}

const extractHoursAndMinutes = (isoString: string) => {
  const date = new Date(isoString)
  const hours = date.getUTCHours().toString().padStart(2, '0') // Obtient les heures (0-23)
  const minutes = date.getUTCMinutes().toString().padStart(2, '0') // Obtient les minutes (0-59)
  return `${hours}:${minutes}`
}

onMounted(() => {
  checkLoggedIn()
  getAllHoraires()
})
</script>

<template>
  <div>
    <SidebarAdmin />
    <div class="listContainer">
      <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
        <div class="container place-content-center grid grid-cols-1">
          <h2 class="text-gray-700 text-center text-2xl sm:text-4xl sm:py-4">Horaires du garage</h2>
          <div v-if="horaires" class="relative overflow-x-auto">
            <table
              class="divide-y divide-gray-200 w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead
                class="bg-gray-200 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    jour
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Matin
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Après-midi
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" v-if="horaires.length">
                <tr v-for="horaire in horaires" :key="horaire.id">
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ horaire.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ horaire.jourDeLaSemaine }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ extractHoursAndMinutes(horaire.openingAm) }} -
                    {{ extractHoursAndMinutes(horaire.closingAm) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ extractHoursAndMinutes(horaire.openingPm) }} -
                    {{ extractHoursAndMinutes(horaire.closingPm) }}
                  </td>
                  <td class="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <RouterLink
                      :to="{
                        name: 'dashboard-horaires-details',
                        params: { id: horaire.id }
                      }"
                      class="text-red-600 hover:text-red-900 ml-4"
                      ><svg
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="4" class="px-6 py-4 whitespace-nowrap text-center">
                    Chargement en cours...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main_content {
  transition: all 0.4s ease;
  float: left;
  display: flex;
  justify-content: center;
}
.relative {
  position: relative;
}
.ml-64 {
  margin-left: 64px;
}
</style>
