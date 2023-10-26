<script setup lang="ts">
import UploadImagesGallery from './UploadImagesGallery.vue'

import { ref, onMounted, defineEmits } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'

import axios from 'axios'

const uploadFileStackUrl = import.meta.env.VITE_FILESTACK_URL
const fileStackApiKey = import.meta.env.VITE_FILESTACK_API_KEY

interface GalleryImage {
  url: string | null
}

const emits = defineEmits(['galleryImagesUpdated'])
const coverImage = ref<string | null>(null)
const coverInput = ref<HTMLInputElement | null>(null)
const galleryImages = ref<GalleryImage[]>([{ url: null }, { url: null }, { url: null }])
const galleryIndex = ref<number | undefined>(undefined)

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('fileUpload', file)
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    const response = await axios.post(`${uploadFileStackUrl}?key=${fileStackApiKey}`, formData, {
      headers
    })

    const imageUrl = response.data.url

    if (galleryIndex.value !== undefined) {
      if (galleryIndex.value < galleryImages.value.length) {
        galleryImages.value[galleryIndex.value] = { url: imageUrl }
      }
    } else {
      coverImage.value = imageUrl
    }
    emits(
      'galleryImagesUpdated',
      galleryImages.value.map((image) => image.url)
    )
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

const resetImage = () => {
  coverImage.value = null
  if (coverInput.value) {
    coverInput.value.value = ''
  }
}

onMounted(() => {
  galleryImages
})
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
        v-if="!coverImage"
        ref="coverInput"
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
      <button v-if="coverImage" @click="resetImage">Modifier</button>

      <h3 class="block text-sm font-medium leading-6">Images de la galerie</h3>

      <UploadImagesGallery
        v-for="(image, index) in galleryImages"
        :key="index"
        :imageData="image"
        :index="index"
      />
    </div>
  </div>
</template>
