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
  image: '',
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
  image: string
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
    <div class="flex flex-auto w-full sm:w-3/4 mt-20 px-1 md:px-40 justify-center">
      <div class="mt-20 border-t border-gray-100">
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
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div class="flex w-0 flex-1 items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span class="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                      >Download</a
                    >
                  </div>
                </li>
                <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div class="flex w-0 flex-1 items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span class="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                      >Download</a
                    >
                  </div>
                </li>
              </ul>
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
