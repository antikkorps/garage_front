<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'

import axios from 'axios'

const uploadFileStackUrl = import.meta.env.VITE_FILESTACK_URL
const fileStackApiKey = import.meta.env.VITE_FILESTACK_API_KEY

const imageUrls: Ref<string[]> = ref([])
const coverImage = ref<string | null>(null)
const galleryImages = ref<Array<{ url: string | null; status: string }>>([])

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('fileUpload', file)
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    await axios.post(`${uploadFileStackUrl}?key=${fileStackApiKey}`, formData, {
      headers
    })
  } catch (error) {
    console.error("Erreur lors de l'upload :", error)
  }
}

const handleCoverUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    uploadImage(file)
  }
}

const editCoverImage = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    uploadImage(file)
  }
}

const handleGalleryUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    uploadImage(file)
  }
}
</script>

<template>
  <div>
    <div class="col-span-full">
      <label for="cover-photo" class="text-base font-semibold leading-7 text-gray-900"
        >Charger vos images</label
      >
      <h3 class="block text-sm font-medium leading-6">Image de l'annonce</h3>
      <div
        class="mt-2 mb-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
        <div class="text-center">
          <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div class="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              for="cover-upload"
              class="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
            >
              <span>Image de couverture</span>
              <input
                id="cover-upload"
                name="cover-upload"
                type="file"
                class="sr-only"
                @change="handleCoverUpload"
              />
            </label>
            <p class="pl-1">ou glissez le fichier ici</p>
          </div>
          <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
        </div>
      </div>
      <img v-if="coverImage" :src="coverImage" alt="Image de couverture" />
      <button v-if="coverImage" @click="editCoverImage">Modifier</button>

      <h3 class="block text-sm font-medium leading-6">Images de la galerie</h3>

      <div
        class="mt-2 mb-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        v-for="(galleryImage, index) in galleryImages"
        :key="index"
      >
        <div class="text-center">
          <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div class="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              :for="'gallery-upload-' + index"
              class="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
            >
              <span>Image de la galerie {{ index + 1 }}</span>
              <input
                :id="'gallery-upload-' + index"
                :name="'gallery-upload-' + index"
                type="file"
                class="sr-only"
                @change="handleGalleryUpload"
              />
            </label>
            <p class="pl-1">ou glissez le fichier ici</p>
          </div>
          <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
        </div>
        <button
          v-if="galleryImage.status === 'uploading'"
          type="button"
          class="bg-indigo-500 text-white rounded-lg px-2 py-1"
          disabled
        >
          <svg class="animate-spin h-5 w-5 mr-3"></svg>
          En cours de traitement...
        </button>
        <!-- Afficher l'image téléchargée pour la galerie -->
        <img v-else-if="galleryImage.url" :src="galleryImage.url" alt="Image de la galerie" />
      </div>
    </div>

    <div class="grid-cols-1 sm:grid md:grid-cols-4 w-full sm:w-3/4 place-content-evenly">
      <div class="mx-3 mt-3" v-for="(imageUrl, index) in imageUrls" :key="index">
        <img class="w-full" :src="imageUrl" :alt="'Image ' + (index + 1)" />
      </div>
    </div>
  </div>
</template>
