<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted } from 'vue'
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { loggedIn, checkLoggedIn, formatDate } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import { state } from '@/stores/state'
import router from '@/router'

const userProfile = ref<UserProfile[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.userProfile
const userProfileQuery = `${baseUrl}${endpoint}`

interface UserProfile {
  id: Number
  email: String
  firstName: String
  lastName: String
  role: String
  createdAt: String
  updatedAt: String
}

const getUserProfile = async () => {
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
    const response = await axios.get(userProfileQuery, config)
    userProfile.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur :", error)
  }
}

onMounted(() => {
  checkLoggedIn()
  getUserProfile()
})
</script>
<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
      <div class="detailsContainer">
        <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Profil Utilisateur</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Bienvenue {{ userProfile.firstName }} sur votre profil !
            </p>
          </div>
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nom complet</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ userProfile.firstName }} {{ userProfile.lastName }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Role</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div v-if="userProfile.role === 'ADMIN'">Administrateur</div>
                  <div v-else>Utilisateur</div>
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ userProfile.email }}
                </dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Profil créé le :</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(userProfile.createdAt) }}
                </dd>
              </div>
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Profil mis à jour le :</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formatDate(userProfile.updatedAt) }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
