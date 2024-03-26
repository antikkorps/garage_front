<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'
import ContactForm from '@/components/ContactForm.vue'
import { RouterLink, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { state } from '@/stores/state'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const props = defineProps({
  id: Number
})

console.log(props.id)

const annonce = ref<Annonce>({
  id: 0,
  title: '',
  description: '',
  brand: '',
  price: 0,
  kilometrage: 0,
  yearofcirculation: 0,
  imageCover: '',
  imageOne: '',
  imageTwo: '',
  imageThree: '',
  published: false,
  featured: false,
  author: {}
})

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annonceDetails
const annoncesQuery = `${baseUrl}${endpoint}`

const route = useRoute()

const showContactForm = ref(false)

const toggleContactForm = () => {
  if (!showContactForm.value) {
    getSelectedAnnonces()
  }
  showContactForm.value = !showContactForm.value
}

interface Annonce {
  id: number
  title: string
  description: string
  brand: string
  price: number
  kilometrage: number
  yearofcirculation: number
  imageCover: string
  imageOne: string
  imageTwo: string
  imageThree: string
  published: boolean
  featured: boolean
  author: object
}

const getSelectedAnnonces = async () => {
  try {
    const annonceId = route.params.id
    const response = await axios.get(`${annoncesQuery}${annonceId}`)
    annonce.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error)
  }
}

onMounted(() => {
  getSelectedAnnonces()
})
</script>
<template>
  <NavbarMain />
  <div class="main_content">
    <div class="w-full sm:w-full md:w-3/4 xl:w-1/3 lg:w-2/3 mx-auto px-4">
      <div class="mt-20 border-t border-gray-100 flex flex-col justify-start items-center">
        <a :href="annonce.imageCover" target="_blank"
          ><img
            v-if="annonce.imageCover"
            :src="annonce.imageCover"
            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          />
          <img
            v-else
            src="https://via.placeholder.com/150"
            class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
          />
        </a>

        <div class="galleryContainer">
          <a :href="annonce.imageOne" target="_blank"
            ><img v-if="annonce.imageOne" :src="annonce.imageOne" class="imageGallery"
          /></a>
          <a :href="annonce.imageTwo" target="_blank"
            ><img v-if="annonce.imageTwo" :src="annonce.imageTwo" class="imageGallery"
          /></a>
          <a :href="annonce.imageThree" target="_blank"
            ><img v-if="annonce.imageThree" :src="annonce.imageThree" class="imageGallery"
          /></a>
        </div>
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          {{ annonce.title }}
        </h3>
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ annonce.description }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Marque</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ annonce.brand }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">kilométrage</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ annonce.kilometrage }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Prix</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              €{{ annonce.price }}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Année</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {{ annonce.yearofcirculation }}
            </dd>
          </div>
        </dl>
        <div class="flex justify-center">
          <button class="buttonPrimary mb-10" @click="toggleContactForm">Nous contacter</button>
        </div>
      </div>
    </div>
  </div>

  <ContactForm v-if="showContactForm && annonce.id" :id="annonce.id" :title="annonce.title" />

  <FooterSection />
</template>

<style scoped lang="scss"></style>
