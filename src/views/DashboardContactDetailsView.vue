<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import { loggedIn, checkLoggedIn } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import { useRoute } from 'vue-router'
import router from '@/router'

//TODO : Display details of the contact
const route = useRoute()
const contact = ref<Contact | null>(null)

const baseUrl = apiConfig.production.baseUrl
const details = apiConfig.production.endpoints.contactDetails
const contactsDetailsQuery = `${baseUrl}${details}`

interface Contact {
  id: number
  name: string
  phone: string
  email: string
  purpose: string
  message: string
}

const id = route.params.id

const getContactById = async () => {
  if (!loggedIn.value) {
    router.push('/login')
    return
  }

  if (!id) {
    console.error("ID introuvable dans l'URL.")
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }

  try {
    const response = await axios.get(`${contactsDetailsQuery}${id}`, config)
    contact.value = response.data
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error)
  }
}

const deleteContact = async () => {
  if (!loggedIn.value) {
    router.push('/login')
    return
  }

  if (!id) {
    console.error("ID introuvable dans l'URL.")
    return
  }

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }

  try {
    await axios.delete(`${contactsDetailsQuery}${id}`, config)
    router.push('/dashboard/contacts')
  } catch (error) {
    console.error('Erreur lors de la suppression du contact :', error)
  }
}

onMounted(() => {
  checkLoggedIn()
  getContactById()
})
</script>

<template>
  <div>
    <SidebarAdmin />
    <div class="listContainer">
      <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
        <div class="container place-content-center grid grid-cols-1">
          <h2 class="text-gray-500 text-center text-2xl sm:text-4xl sm:py-4">
            Demandes de contact de {{ contact?.name }}
          </h2>
          <div class="relative overflow-x-auto">
            <RouterLink to="/dashboard/contacts" class="text-indigo-600 hover:text-indigo-900"
              >Retour
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
