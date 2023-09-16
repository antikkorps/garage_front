<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'
import CardAnnonceDisplayed from '@/components/CardAnnonceDisplayed.vue'
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

const currentPage = 'annonces'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div>
    <h1 class="my-20 text-2xl text-center">Here will be displayed all the annonces</h1>
    <div class="flex justify-center my-10">
      <div class="grid-cols-1 sm:grid md:grid-cols-4 w-full sm:w-3/4 place-content-evenly">
        <CardAnnonceDisplayed v-for="annonce in annonces" :key="annonce.id" :annonce="annonce" />
      </div>
    </div>
  </div>
  <FooterSection />
</template>
