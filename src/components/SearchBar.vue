<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesQuery
const searchQuery = `${baseUrl}${endpoint}/?q=`
const q = ref('')

const route = useRoute()
const router = useRouter()

let searchTimeout: NodeJS.Timeout | null = null

const searchCar = async () => {
  // check for timeout
  if (searchTimeout !== null) {
    clearTimeout(searchTimeout)
  }

  // new timeout (1000 milliseconds)
  searchTimeout = setTimeout(async () => {
    try {
      console.log('searching for ' + q.value)
      const response = await axios.get(searchQuery + q.value)
      console.log(response.data)

      router.push({ name: 'search', query: { q: q.value } })
    } catch (error) {
      console.error('Erreur lors de la recherche des annonces:', error)
    }
  }, 1000)
}
</script>

<template>
  <div class="sm:w-1/2 place-content-evenly my-5 mx-auto">
    <form>
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Recherche rapide : Voiture, modèle, année..."
          required
          @input="searchCar"
          v-model="q"
        />
        <!-- <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button> -->
      </div>
    </form>
  </div>
</template>
