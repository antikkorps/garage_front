<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { loggedIn, checkLoggedIn, formatDate } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import { state } from '@/stores/state'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const userDetails = ref<UserDetails[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.userDetails
const userDetailsQuery = `${baseUrl}${endpoint}`

interface UserDetails {
  id: Number
  email: String
  firstName: String
  lastName: String
  role: String
  createdAt: String
  updatedAt: String
}

const getUserProfileById = async (id: String) => {
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
    const response = await axios.get(`${userDetailsQuery}${id}`, config)
    userDetails.value = response.data
    console.log(`${userDetailsQuery}${id}`)
    console.log(response.data)
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error)
  }
}

onMounted(() => {
  checkLoggedIn()
  getUserProfileById(route.params.id.toString())
})
</script>
<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
      <div class="detailsContainer">
        <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Profil de : {{ userDetails.firstName }} {{ userDetails.lastName }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Details et informations à propos de l'utilisateur.
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Prénom</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input type="text" class="input_text" v-model="userDetails.firstName" />
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nom</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input type="text" class="input_text" v-model="userDetails.lastName" />
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Role</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ userDetails.role }}
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ userDetails.email }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Profil créé le :</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(userDetails.createdAt) }}
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Profil mis à jour le :</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(userDetails.updatedAt) }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
