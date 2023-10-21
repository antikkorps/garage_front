<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'

import axios from 'axios'

const uploadFileStackUrl = import.meta.env.VITE_FILESTACK_URL
const fileStackApiKey = import.meta.env.VITE_FILESTACK_API_KEY

const imageUrls: Ref<string[]> = ref([])
const featuredImage = ref<number | null>(null)

const uploadImage = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('fileUpload', file)
    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    await axios
      .post(`${uploadFileStackUrl}?key=${fileStackApiKey}`, formData, {
        headers
      })
      .then((response) => {
        if (imageUrls.value.length === 0) {
          featuredImage.value = 0
        }
        imageUrls.value.push(response.data.url)
        console.log('Images Urls :', imageUrls)
      })
  } catch (error) {
    console.error("Erreur lors de l'upload :", error)
  }
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    uploadImage(file)
  }
}

const setFeaturedImage = (index: number) => {
  featuredImage.value = index
}
</script>

<template>
  <div>
    <div class="col-span-full">
      <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
        >Charger Image</label
      >
      <div
        class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
        <div class="text-center">
          <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
          <div class="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              for="file-upload"
              class="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                class="sr-only"
                @change="handleFileUpload"
              />
            </label>
            <p class="pl-1">or drag and drop</p>
          </div>
          <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
    <div class="grid-cols-1 sm:grid md:grid-cols-4 w-full sm:w-3/4 place-content-evenly">
      <div class="mx-3 mt-3" v-for="(imageUrl, index) in imageUrls" :key="index">
        <div
          @click="setFeaturedImage(index)"
          :class="{ 'featured-image': index === featuredImage }"
        >
          <img class="w-full" :src="imageUrl" :alt="'Image ' + (index + 1)" />
        </div>
      </div>
    </div>
  </div>
</template>
