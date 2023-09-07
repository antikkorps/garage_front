<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.horairesAll
const horairesQuery = `${baseUrl}${endpoint}`

interface Horaire {
  id: number
  jourDeLaSemaine: string
  openingAm: string
  closingAm: string
  openingPm: string
  closingPm: string
}

const horaires = ref<Horaire[]>([])

const fetchHoraires = async () => {
  try {
    const response = await axios.get<Horaire[]>(horairesQuery)
    // Convertir les horaires en format ISO en heures d'ouverture
    const horairesFormatted = response.data.map((horaire) => ({
      ...horaire,
      openingAm: horaire.openingAm.split('T')[1].substring(0, 5),
      closingAm: horaire.closingAm.split('T')[1].substring(0, 5),
      openingPm: horaire.openingPm.split('T')[1].substring(0, 5),
      closingPm: horaire.closingPm.split('T')[1].substring(0, 5)
    }))
    horaires.value = horairesFormatted
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires :', error)
  }
}

onMounted(() => {
  fetchHoraires()
})

const sortedHoraires = computed(() => {
  return horaires.value.slice().sort((a, b) => {
    const joursDeLaSemaine = [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche'
    ]
    return joursDeLaSemaine.indexOf(a.jourDeLaSemaine) - joursDeLaSemaine.indexOf(b.jourDeLaSemaine)
  })
})
</script>

<template>
  <div class="sm:w-1/2 flex flex-col justify-center mx-auto my-10">
    <h2 class="Titre_horaires">Les Horaires</h2>

    <table class="horaires">
      <thead>
        <tr>
          <th>Jour</th>
          <th>Matin</th>
          <th>Après-Midi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horaire in sortedHoraires" :key="horaire.id">
          <td>{{ horaire.jourDeLaSemaine }}</td>
          <td>{{ horaire.openingAm }} - {{ horaire.closingAm }}</td>
          <td>{{ horaire.openingPm }} - {{ horaire.closingPm }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.Titre_horaires {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

tbody {
  text-align: center;
  width: 50%;
}
</style>
