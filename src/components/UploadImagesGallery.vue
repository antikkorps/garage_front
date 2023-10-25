<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'

import axios from 'axios'

const uploadFileStackUrl = import.meta.env.VITE_FILESTACK_URL
const fileStackApiKey = import.meta.env.VITE_FILESTACK_API_KEY

const galleryImages = ref<GalleryImage[]>([])
const galleryIndex = ref<number | undefined>(undefined)
const imageUrlRef = ref<string | null>(null)

interface GalleryImage {
  url: string | null
}

const { imageData, index } = defineProps(['imageData', 'index'])

const handleUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    uploadImageForGallery(file)
  }
}

const resetImage = () => {
  if (index.value !== undefined) {
    galleryIndex.value = index.value
  }
  imageUrlRef.value = null
}

const uploadImageForGallery = async (file: File) => {
  const formData = new FormData()
  formData.append('fileUpload', file)
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  const response = await axios.post(`${uploadFileStackUrl}?key=${fileStackApiKey}`, formData, {
    headers
  })
  const imageUrl = response.data.url
  imageUrlRef.value = imageUrl
  console.log(imageUrl)
  if (galleryIndex.value !== undefined) {
    if (galleryIndex.value < galleryImages.value.length) {
      galleryImages.value[galleryIndex.value] = { url: imageUrl }
    }
  }
}
</script>

<template>
  <div>
    <div
      v-if="!imageUrlRef"
      class="mt-2 mb-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    >
      <div class="text-center">
        <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
        <div class="mt-4 flex text-sm leading-6 text-gray-600">
          <label
            :for="'gallery-upload-' + index"
            class="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
          >
            <span>Ajouter une image à la galerie {{ index + 1 }}</span>
            <input
              :id="'gallery-upload-' + index"
              :name="'gallery-upload-' + index"
              type="file"
              class="sr-only"
              @change="handleUpload"
            />
          </label>
          <p class="pl-1">ou glissez le fichier ici</p>
        </div>
        <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
      </div>
    </div>
    <div v-else>
      <img :src="imageUrlRef!" alt="Image de la galerie" />
      <button v-if="imageUrlRef!" @click="resetImage">Modifier</button>
    </div>
  </div>
</template>
