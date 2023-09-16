<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const contacts = ref<Contact[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.contactsAll
const annoncesQuery = `${baseUrl}${endpoint}`

interface Contact {
  id: number
  name: string
  phone: string
  email: string
  message: string
}

const getAllContacts = async () => {
  try {
    const response = await axios.get(annoncesQuery)
    contacts.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces :', error)
  }
}

onMounted(() => {
  getAllContacts()
})
</script>

<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'lg:ml-64': state.showSidebar }]">
      <div class="container place-content-center grid grid-cols-1">
        <h2 class="text-gray-500 text-center text-2xl sm:text-4xl sm:py-4">
          Liste des demandes de contact
        </h2>
        <div v-if="contacts">
          <table class="table-auto divide-y divide-gray-200">
            <thead class="bg-gray-200">
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
                  Nom
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Téléphone
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Message
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200" v-if="contacts.length">
              <tr v-for="contact in contacts" :key="contact.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ contact.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ contact.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ contact.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ contact.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ contact.message }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Voir</a>
                  <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900 ml-4">Éditer</a> -->
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
