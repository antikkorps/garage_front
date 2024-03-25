<script setup lang="ts">
// @ts-nocheck
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import { loggedIn, checkLoggedIn } from '@/stores/reusable'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import router from '@/router'

const users = ref<Users[]>([])

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.userAll
const UserDetails = apiConfig.production.endpoints.userDetails
const usersQuery = `${baseUrl}${endpoint}`
const deleteUserQuery = `${baseUrl}${UserDetails}`

interface Users {
  id: Number
  email: String
  firstName: String
  lastName: String
  role: String
}

const getAllUsers = async () => {
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
    const response = await axios.get(usersQuery, config)
    users.value = response.data
    sortUsersById()
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error)
  }
}

const sortUsersById = () => {
  users.value.sort((a, b) => a.id - b.id)
}

const deleteUser = async (userId) => {
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
    await axios.delete(`${deleteUserQuery}${userId}`, config)
    const updatedUsers = users.value.filter((user) => user.id !== userId)
    users.value = updatedUsers
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error)
  }
}

onMounted(() => {
  checkLoggedIn()
  getAllUsers()
})
</script>

<template>
  <div>
    <SidebarAdmin />
    <div class="listContainer">
      <div :class="['main_content relative', { 'lg:ml-16': state.showSidebar }]">
        <div class="container place-content-center grid grid-cols-1">
          <h2 class="text-gray-500 text-center text-2xl sm:text-4xl sm:py-4">
            Liste des utilisateurs
          </h2>
          <div v-if="users" class="relative overflow-x-auto">
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
                    Prénom
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rôle
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" v-if="users.length">
                <tr v-for="user in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ user.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ user.lastName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ user.firstName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-gray-700">
                    <div v-if="user.role === 'ADMIN'">Administrateur</div>
                    <div v-else>Utilisateur</div>
                  </td>
                  <td class="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <RouterLink
                      :to="{
                        name: 'user-details',
                        params: { id: user.id }
                      }"
                      class="text-indigo-600 hover:text-indigo-900 ml-4"
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
                    <RouterLink
                      to="/dashboard/users"
                      class="text-red-600 hover:text-red-900 ml-4"
                      @click="deleteUser(user.id)"
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

            <div class="flex mx-16 mt-4 pb-4">
              <div
                class="text-red-600 hover:text-red-800 cursor-pointer hover:scale-125 ease-in-out duration-300"
                data-modal-target="staticModal"
                data-modal-toggle="staticModal"
              >
                <RouterLink to="/dashboard/users/new">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-12 h-12"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
