<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import { loggedIn, checkLoggedIn } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import router from '@/router'

const contacts = ref<Contact[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.contactsAll
const details = apiConfig.production.endpoints.contactDetails
const contactsQuery = `${baseUrl}${endpoint}`
const contactsDetailsQuery = `${baseUrl}${details}`

interface Contact {
  id: number
  name: string
  phone: string
  email: string
  purpose: string
  message: string
}

const getAllContacts = async () => {
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
    const response = await axios.get(contactsQuery, config)
    contacts.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces :', error)
  }
}

const deleteContact = async (contactId: number) => {
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
    await axios.delete(`${contactsDetailsQuery}${contactId}`, config)

    getAllContacts()
  } catch (error) {
    console.error('Erreur lors de la suppression du contact :', error)
  }
}

onMounted(() => {
  checkLoggedIn()
  getAllContacts()
})
</script>

<template>
  <div>
    <SidebarAdmin />
    <div class="listContainer">
      <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
        <div class="container place-content-center grid grid-cols-1">
          <h2 class="text-gray-700 text-center text-2xl sm:text-4xl sm:py-4">
            Demandes de contact
          </h2>
          <div v-if="contacts" class="relative overflow-x-auto">
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
                    Objet
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
                    {{ contact.purpose }}
                  </td>
                  <td class="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <RouterLink
                      :to="{
                        name: 'dashboard-contacts-details',
                        params: { id: contact.id }
                      }"
                      class="text-indigo-600 hover:text-indigo-900"
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
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </RouterLink>
                    <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900 ml-4">Éditer</a> -->
                    <RouterLink
                      to="/dashboard/contacts"
                      class="text-red-600 hover:text-red-900 ml-4"
                      @click="deleteContact(contact.id)"
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
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
