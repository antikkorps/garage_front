<script setup lang="ts">
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { state } from "@/stores/state";
import axios from "axios";
import apiConfig from "@/config/apiConfig";

const annonces = ref<Annonce[]>([]);

const baseUrl = apiConfig.production.baseUrl;
const endpoint = apiConfig.production.endpoints.annoncesAll;
const deleteEndpoint = apiConfig.production.endpoints.annonceDetails;
const annoncesQuery = `${baseUrl}${endpoint}`;

interface Annonce {
  id: number;
  title: string;
  description: string;
  price: number;
  kilometrage: number;
  yearofcirculation: number;
  image: string;
  published: boolean;
  featured: boolean;
  author: object;
}

const getAllAnnonces = async () => {
  try {
    const response = await axios.get(annoncesQuery);
    annonces.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
  }
};

const deleteAnnonce = async (id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
    },
  };

  try {
    await axios.delete(`${baseUrl}${deleteEndpoint}${id}`, config);
    annonces.value = annonces.value.filter((annonce) => annonce.id !== id);
    getAllAnnonces();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'annonce :", error);
  }
};

const confirmDelete = (id: number) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette annonce?")) {
    deleteAnnonce(id);
  }
};

onMounted(() => {
  getAllAnnonces();
});
</script>

<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'lg:ml-64': state.showSidebar }]">
      <div class="container place-content-center grid grid-cols-1">
        <h2 class="text-gray-500 text-center text-2xl sm:text-4xl sm:py-4">
          Liste des Annonces
        </h2>
        <div v-if="annonces" class="relative overflow-x-auto">
          <table
            class="divide-y divide-gray-200 w-full text-sm text-left text-gray-500 dark:text-gray-500"
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
                  Mise en avant
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
                  {{ annonce.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :disabled="true"
                    :checked="annonce.published"
                    class="checkbox_disable"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :disabled="true"
                    :checked="annonce.featured"
                    class="checkbox_disable"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex">
                    <RouterLink
                      :to="{
                        name: 'dashboard-annonces-details',
                        params: { id: annonce.id },
                      }"
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
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
                    <a
                      href="#"
                      class="text-red-600 hover:text-red-900 ml-4"
                      @click.prevent="confirmDelete(annonce.id)"
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
                    </a>
                  </div>
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
              <RouterLink to="/dashboard/annonces/new">
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
</template>

<style scoped lang="scss">
.relative {
  position: relative;
}
.ml-64 {
  margin-left: 64px;
  transition: all 0.4s ease;
}

.checkbox_disable {
  opacity: 0.4;
}
[type="checkbox"]:checked {
  background-color: black;
}
</style>
