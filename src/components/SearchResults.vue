<script setup lang="ts">
import CardAnnonceDisplayed from './CardAnnonceDisplayed.vue'
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesQuery
const searchResults = ref<{ id: number; title: string }[]>([])
const route = useRoute()
const searchQuery = route.query.q

const performSearch = async () => {
  try {
    const response = await axios.get(`${baseUrl}${endpoint}/?q=${searchQuery}`)
    searchResults.value = response.data
  } catch (error) {
    console.error('Erreur lors de la recherche des annonces:', error)
  }
}

onMounted(() => {
  performSearch()
})
</script>

<template>
  <div class="mt-20">
    <h2 class="title_page">Résultat de votre recherche</h2>
    <div
      class="w-full sm:w-1/3 flex justify-center mx-auto md:grid md:grid-cols-2 md:place-content-evenly"
    >
      <ul class="annoncesListContainer">
        <li v-for="result in searchResults" :key="result.id">
          <RouterLink :to="`/annonces/${result.id}`">
            <CardAnnonceDisplayed :annonce="result">
              <template #custom-button="{ annonce }">
                <RouterLink :to="`/annonces/${annonce.id}`">
                  <button class="custom-button">Voir l'annonce</button>
                </RouterLink>
              </template>
            </CardAnnonceDisplayed>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
