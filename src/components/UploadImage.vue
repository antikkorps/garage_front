<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const uploadFileStackUrl = import.meta.env.VITE_FILESTACK_URL
const fileStackApiKey = import.meta.env.VITE_FILESTACK_API_KEY

const imageUrl = ref('')

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

    console.log('Réponse :', response.data)
    imageUrl.value = response.data.url
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
    <div>
      <img :src="imageUrl" alt="Image Téléchargée" class="w-1/4 radIded-lg" />
    </div>
  </div>
</template>
