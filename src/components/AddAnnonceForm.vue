<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import apiConfig from '@/config/apiConfig'
import axios from 'axios'
import { useImagesStore } from '../stores/useImagesStore'

import UploadImages from './UploadImages.vue'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesNew
const formData = ref({
  title: '',
  description: '',
  price: null,
  kilometrage: null,
  yearofcirculation: null,
  brand: '',
  published: false,
  featured: false,
  imageCover: null as string | null,
  imageOne: null as string | null,
  imageTwo: null as string | null,
  imageThree: null as string | null
})

const { index } = defineProps(['index'])
const confirmationMessage = ref('')
const imagesStore = useImagesStore()

const addAnnonce = async () => {
  try {
    const token = localStorage.getItem('jwt_token')
    const imageCover = imagesStore.imageCover
    const imageOne = imagesStore.imageOne
    const imageTwo = imagesStore.imageTwo
    const imageThree = imagesStore.imageThree

    formData.value.imageCover = imageCover
    formData.value.imageOne = imageOne
    formData.value.imageTwo = imageTwo
    formData.value.imageThree = imageThree
    const postedAnnonce = JSON.stringify({ ...formData.value })
    console.log("détail de l'annonce postée", postedAnnonce)
    await axios.post(baseUrl + endpoint, postedAnnonce, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    formData.value = {
      title: '',
      description: '',
      price: null,
      kilometrage: null,
      yearofcirculation: null,
      brand: '',
      published: false,
      featured: false,
      imageCover: '',
      imageOne: '',
      imageTwo: '',
      imageThree: ''
    }
    confirmationMessage.value = 'Annonce créée avec succès'
    setTimeout(() => {
      confirmationMessage.value = ''
    }, 4000)
  } catch (error) {
    console.error("Erreur lors de la création de l'annonces:", error)
    confirmationMessage.value = "Erreur lors de la création de l'annonce"
    setTimeout(() => {
      confirmationMessage.value = ''
    }, 4000)
  }
}

const updateGalleryImages = (images: string[]) => {
  formData.value.imageOne = images[0]
  formData.value.imageTwo = images[1]
  formData.value.imageThree = images[2]
}

const confirmationMessageClass = computed(() => {
  return confirmationMessage.value.startsWith('Erreur') ? 'text-red-600' : 'text-green-600'
})
</script>

<template>
  <div class="grid mt-15">
    <form class="w-full sm:w-1/3 justify-self-center" @submit.prevent>
      <div class="space-y-5">
        <div class="border-b border-gray-900/10 pb-5">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Ajouter une annonce</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Merci de remplir ce formulaire pour poster une nouvelle annonce.
          </p>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Détail de l'annonce</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Rentrez ici les détails de votre annonce.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >Titre</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autocomplete="title"
                  v-model="formData.title"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900"
                >Description</label
              >
              <div class="mt-2">
                <textarea
                  id="description"
                  name="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Ecrivez la description de votre annonce ici.
              </p>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label for="price" class="block text-sm font-medium leading-6 text-gray-900"
                >Prix (Euros)</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  v-model="formData.price"
                  autocomplete="annonce-price"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="kilometrage" class="block text-sm font-medium leading-6 text-gray-900"
                >Kilométrage</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="kilometrage"
                  id="kilometrage"
                  v-model="formData.kilometrage"
                  autocomplete="annonce-kilometrage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="yearofcirculation"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Année</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="yearofcirculation"
                  id="yearofcirculation"
                  v-model="formData.yearofcirculation"
                  autocomplete="yearofcirculation"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="brand" class="block text-sm font-medium leading-6 text-gray-900"
                >Marque</label
              >
              <div class="mt-2">
                <select
                  id="brand"
                  name="brand"
                  autocomplete="brand-name"
                  v-model="formData.brand"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Choisissez une marque</option>
                  <option>Toyota</option>
                  <option>Opel</option>
                  <option>Renault</option>
                  <option>Peugeot</option>
                  <option>Citroën</option>
                  <option>Volkswagen</option>
                  <option>Mercedes</option>
                  <option>Hyundai</option>
                  <option>BMW</option>
                  <option>MG</option>
                  <option>Fiat</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <UploadImages :index="index" @galleryImagesUpdated="updateGalleryImages" />
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-1">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Publication</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Ici vous définissez la publication et la mise en avant d'une annonce sur le site.
          </p>

          <div class="mt-5 space-y-10">
            <fieldset>
              <div class="mt-6 space-y-6">
                <div class="relative flex gap-x-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="published"
                      name="published"
                      type="checkbox"
                      v-model="formData.published"
                      class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="published" class="font-medium text-gray-900">Publier</label>
                    <p class="text-gray-500">
                      Publier l'annonce sur le site, sinon elle reste en brouillon.
                    </p>
                  </div>
                </div>
                <div class="relative flex gap-x-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      v-model="formData.featured"
                      class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="featured" class="font-medium text-gray-900">Mettre en avant</label>
                    <p class="text-gray-500">
                      Mettre l'annonce en avant sur le site avec le filtre "nos coups de coeur".
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <p class="mt-4 text-center" v-if="confirmationMessage" :class="confirmationMessageClass">
        {{ confirmationMessage }}
      </p>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink to="/dashboard/annonces"
          ><button type="button" class="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button></RouterLink
        >
        <button type="submit" @click="addAnnonce" class="buttonPrimary">Ajouter</button>
      </div>
    </form>
  </div>
</template>
../stores/useImagesStore
