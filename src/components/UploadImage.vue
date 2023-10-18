<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const imageUploadEndpoint = apiConfig.production.imageUploadEndpoint

const uploadImageUrl = `${baseUrl}${imageUploadEndpoint}`
const image = ref(null)

const onImageChange = (event: Event) => {
  const files = event.target.files

  if (!files || !Array.isArray(files) || files.length === 0) {
    return
  }

  const file = files[0]
  image.value = file
}

const handleSubmit = async () => {
  try {
    const token = await localStorage.getItem('jwt_token')
    const postedImage = image.value

    await axios.post(uploadImageUrl, postedImage, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        image: postedImage
      }
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <input type="file" name="image" v-on:change="onImageChange" />
    <button class="buttonPrimary" type="submit" @click="handleSubmit">Envoyer</button>
  </div>
</template>
