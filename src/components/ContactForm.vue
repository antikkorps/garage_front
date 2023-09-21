<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import apiConfig from '../../src/config/apiConfig'

const apiUrl = apiConfig.production.baseUrl
const contact = apiConfig.production.endpoints.contactNew

const postUrl = `${apiUrl}${contact}`

const isFormSubmitted = ref(false)
const formData = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})
const showThankYouMessage = ref(false)

const submitForm = async () => {
  try {
    const dataToSend = JSON.stringify({ ...formData.value })
    console.log('dataToSend', dataToSend)
    await axios.post(postUrl, dataToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    isFormSubmitted.value = true
    formData.value = {
      name: '',
      phone: '',
      email: '',
      message: ''
    }
    showThankYouMessage.value = true
    setTimeout(() => {
      showThankYouMessage.value = false
    }, 4000)
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire :', error)
  }
}
</script>

<template>
  <div class="contact_form dark:bg-gray-900 px-10 flex justify-center my-25 rounded-xl bg-gray-50">
    <div class="container w-full sm:w-1/2 py-30">
      <h2 class="dark:text-gray-500 text-center text-2xl sm:text-4xl">Formulaire de Contact</h2>
      <h4 class="dark:text-gray-500 text-center my-3">
        Nous reprendrons rapidement contact avec vous
      </h4>

      <form class="dark:bg-gray-900 px-10 py-6 m-auto w-90 sm:w-50" @submit.prevent="submitForm">
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="name"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            required
            v-model="formData.name"
          />
          <label
            for="name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Nom</label
          >
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            required
            v-model="formData.phone"
          />
          <label
            for="phone"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Téléphone</label
          >
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            id="email"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            required
            v-model="formData.email"
          />
          <label
            for="email"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email address</label
          >
        </div>

        <div class="relative z-0 w-full mb-6 group">
          <textarea
            rows="4"
            type="textarea"
            name="message"
            id="message"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
            required
            v-model="formData.message"
          />
          <label
            for="message"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Votre message</label
          >
        </div>

        <button
          type="submit"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Submit
        </button>
      </form>
      <div v-if="showThankYouMessage" class="text-center text-green-600 dark:text-green-400">
        Merci pour votre demande de contact !
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact_form {
  height: full;
}
</style>
../config/config.js
