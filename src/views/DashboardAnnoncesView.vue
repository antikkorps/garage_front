<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const annonces = ref<Annonce[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesAll
const annoncesQuery = `${baseUrl}${endpoint}`

interface Annonce {
  id: number
  title: string
  description: string
  price: number
  kilometrage: number
  yearofcirculation: number
  image: string
  published: boolean
  author: object
}

const getAllAnnonces = async () => {
  try {
    const response = await axios.get(annoncesQuery)
    annonces.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces :', error)
  }
}

onMounted(() => {
  getAllAnnonces()
})
</script>

<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'lg:ml-64': state.showSidebar }]">
      <div class="container place-content-center grid grid-cols-1">
        <h2 class="text-gray-500 text-center text-2xl sm:text-4xl sm:py-4">Liste des Annonces</h2>
        <div v-if="annonces" class="relative overflow-x-auto">
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
                  Titre
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Prix
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Publiée
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-if="annonces.length">
              <tr v-for="annonce in annonces" :key="annonce.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ annonce.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ annonce.title }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ annonce.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ annonce.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ annonce.published }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Voir</a>
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 ml-4">Éditer</a>
                  <a href="#" class="text-red-600 hover:text-red-900 ml-4">Supprimer</a>
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
