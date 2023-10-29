<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { state } from '@/stores/state'
import { loggedIn, checkLoggedIn } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import { useRoute, useRouter } from 'vue-router'
import SidebarAdmin from '@/components/SidebarAdmin.vue'

const route = useRoute()
const router = useRouter()
const horaireDetails = ref<HorairesDetails[]>([])

const baseUrl = apiConfig.production.baseUrl
const details = apiConfig.production.endpoints.horairesDetails
const horairesDetailsQuery = `${baseUrl}${details}`

const openingAmTime = ref('')
const closingAmTime = ref('')
const openingPmTime = ref('')
const closingPmTime = ref('')

interface HorairesDetails {
  id: number
  jourDeLaSemaine: String
  openingAm: String
  closingAm: String
  openingPm: String
  closingPm: String
}

const getHorairesOfTheDaybyId = async (id: String) => {
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
    const response = await axios.get(`${horairesDetailsQuery}${id}`, config)
    horaireDetails.value = response.data
    openingAmTime.value = formatISOStringToTime(horaireDetails.value.openingAm)
    closingAmTime.value = formatISOStringToTime(horaireDetails.value.closingAm)
    openingPmTime.value = formatISOStringToTime(horaireDetails.value.openingPm)
    closingPmTime.value = formatISOStringToTime(horaireDetails.value.closingPm)
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires :', error)
  }
}

const formatTimeToISOString = (time: string) => {
  const [hours, minutes] = time.split(':')
  const currentDate = new Date()
  currentDate.setUTCHours(Number(hours))
  currentDate.setUTCMinutes(Number(minutes))
  return currentDate.toISOString()
}

const formatISOStringToTime = (isoString: string) => {
  const date = new Date(isoString)
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const updateHorairesOfTheDay = async () => {
  if (!loggedIn.value) {
    router.push('/login')
    return
  }
  const currentDate = new Date()

  const openingAmISOString = formatTimeToISOString(openingAmTime.value)
  const closingAmISOString = formatTimeToISOString(closingAmTime.value)
  const openingPmISOString = formatTimeToISOString(openingPmTime.value)
  const closingPmISOString = formatTimeToISOString(closingPmTime.value)

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }

  const payload = {
    openingAm: openingAmISOString,
    closingAm: closingAmISOString,
    openingPm: openingPmISOString,
    closingPm: closingPmISOString
  }
  console.log(payload)
  await axios.patch(`${horairesDetailsQuery}${route.params.id}`, payload, config)
}
onMounted(() => {
  checkLoggedIn()
  getHorairesOfTheDaybyId(route.params.id.toString())
})
</script>
<template>
  <div>
    <SidebarAdmin />
    <form class="detailsContainer">
      <div class="listContainer space-y-12">
        <div class="border-b border-gray-900/10 pb-12 mt-5">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Horaire du {{ horaireDetails.jourDeLaSemaine }}
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Modifier les horaires d'ouverture et de fermeture du garage.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="openingAm" class="block text-sm font-medium leading-6 text-gray-900"
                >Ouverture Matin</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md"
                >
                  <input
                    type="time"
                    name="openingAm"
                    id="openingAm"
                    autocomplete="openingAm"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    v-model="openingAmTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="closingAm" class="block text-sm font-medium leading-6 text-gray-900"
                >Fermeture Matin</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md"
                >
                  <input
                    type="time"
                    name="closingAm"
                    id="closingAm"
                    autocomplete="closingAm"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    v-model="closingAmTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="openingPm" class="block text-sm font-medium leading-6 text-gray-900"
                >Ouverture Après-midi</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md"
                >
                  <input
                    type="time"
                    name="openingPm"
                    id="openingPm"
                    autocomplete="openingPm"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    v-model="openingPmTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="closingPm" class="block text-sm font-medium leading-6 text-gray-900"
                >Fermeture Après-midi</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-600 sm:max-w-md"
                >
                  <input
                    type="time"
                    name="closingPm"
                    id="closingPm"
                    autocomplete="closingPm"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    v-model="closingPmTime"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">
          <RouterLink to="/dashboard/horaires">Retour</RouterLink>
        </button>

        <button
          type="submit"
          class="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          @click="updateHorairesOfTheDay"
        >
          Mettre à jour
        </button>
      </div>
    </form>
  </div>
</template>