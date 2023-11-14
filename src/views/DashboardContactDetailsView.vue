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
    <div class="listContainer px-5">
      <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
        <div class="container place-content-center grid grid-cols-1">
          <h2 class="text-gray-500 text-center text-2xl sm:text-4xl sm:py-4">
            Demandes de contact de {{ contact?.name }}
          </h2>

          <div>
            <h3 class="title">{{ contact?.purpose }}</h3>
          </div>

          <p>{{ contact?.message }}</p>

          <div class="mt-4">
            <p class="my-4">Téléphone : {{ contact?.phone }}</p>
            <p class="my-4">Mail: {{ contact?.email }}</p>

            <div class="relative overflow-x-auto">
              <div class="mt-6 flex items-center justify-end gap-x-6">
                <RouterLink to="/dashboard/contacts" class="buttonSecondary">Retour </RouterLink>
                <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900 ml-4">Éditer</a> -->
                <RouterLink
                  to="/dashboard/contacts"
                  class="buttonPrimary"
                  @click="deleteContact(contact.id)"
                  >Supprimer
                </RouterLink>
              </div>
            </div>
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
