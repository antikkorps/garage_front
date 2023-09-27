<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesQuery
const annonces = ref<{ id: number; title: string }[]>([])

const searchQuery = ref('')
const selectedBrands = ref([])
const selectedKilometerRange = ref('')
const selectedYear = ref('')

const performSearch = async () => {
  try {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
      params: {
        query: searchQuery.value,
        brands: selectedBrands.value,
        kilometerRange: selectedKilometerRange.value,
        year: selectedYear.value
      }
    })

    // Mettez à jour les annonces avec les résultats de la recherche
    annonces.value = response.data
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
  }
}

watch([searchQuery, selectedBrands, selectedKilometerRange, selectedYear], () => {
  // Vous pouvez exécuter la recherche en utilisant les valeurs actuelles des filtres
  performSearch()
})
</script>

<template>
  <div class="grid-cols-1 sm:grid md:grid-cols-2 w-full sm:w-3/4 place-content-evenly">
    <!-- Champs de recherche -->
    <div class="mb-4 flex flex-col">
      <input
        type="text"
        class="w-full mx-auto px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 inline-flex items-center"
        placeholder="Recherche rapide..."
        v-model="searchQuery"
      />
    </div>

    <!-- Filtres -->
    <div class="bg-gray-100 p-4 rounded-md">
      <h3 class="text-lg font-semibold mb-2">Filtres</h3>

      <!-- Marques -->
      <div class="mb-4">
        <h4 class="text-sm font-medium">Marques</h4>
        <!-- Exemple de filtres de marques -->
        <label class="inline-flex items-center mt-2">
          <input type="checkbox" class="text-blue-500 rounded" v-model="selectedBrands" />
          <span class="ml-2">Marque 1</span>
        </label>
        <label class="inline-flex items-center mt-2">
          <input type="checkbox" class="text-blue-500 rounded" />
          <span class="ml-2">Marque 2</span>
        </label>
        <!-- Ajoutez d'autres marques ici -->
      </div>

      <!-- Kilométrage -->
      <div class="mb-4">
        <h4 class="text-sm font-medium">Kilométrage</h4>
        <!-- Exemple de filtres de kilométrage -->
        <label class="block mt-2">
          <select
            class="w-full px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            v-model="selectedKilometerRange"
          >
            <option value="0-5000">0-5000 km</option>
            <option value="5000-10000">5000-10000 km</option>
            <option value="10000-20000">10000-20000 km</option>
            <!-- Ajoutez d'autres options de kilométrage ici -->
          </select>
        </label>
      </div>

      <!-- Année -->
      <div>
        <h4 class="text-sm font-medium">Année</h4>
        <!-- Exemple de filtres d'année -->
        <label class="block mt-2">
          <select
            class="w-full px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            v-model="selectedYear"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <!-- Ajoutez d'autres options d'année ici -->
          </select>
        </label>
      </div>
    </div>
  </div>
</template>
