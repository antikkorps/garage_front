<script setup lang="ts">
import { ref, computed } from 'vue'
import { state } from '@/stores/state'
import apiConfig from '@/config/apiConfig'
import axios from 'axios'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.signup
const signupQuery = `${baseUrl}${endpoint}`

const email = ref('')
const emailError = ref('')

const password = ref('')
const passwordConfirmation = ref('')
const passwordError = ref('')
const confirmationMessage = ref('')

const validateEmail = () => {
  const regex = /\S+@\S+\.\S+/
  if (!regex.test(email.value)) {
    emailError.value = "l'email doit être un email valide"
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!regex.test(password.value)) {
    passwordError.value =
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'
  } else {
    passwordError.value = ''
  }
}

const addUser = () => {
  if (password.value !== passwordConfirmation.value) {
    confirmationMessage.value = 'Erreur: les mots de passe ne correspondent pas'
    return
  } else {
    //axios request
    const data = {
      email: email.value,
      password: password.value
    }

    axios
      .post(signupQuery, data)
      .then((response) => {
        console.log(response)
        email.value = ''
        password.value = ''
        passwordConfirmation.value = ''
        confirmationMessage.value = 'Utilisateur ajouté avec succès'
        setTimeout(() => {
          confirmationMessage.value = ''
        }, 4000)
      })
      .catch((error) => {
        console.error(error)
        confirmationMessage.value = "Erreur: impossible d'ajouter l'utilisateur"
        setTimeout(() => {
          confirmationMessage.value = ''
        }, 4000)
      })
  }
}

const confirmationMessageClass = computed(() => {
  return confirmationMessage.value.startsWith('Erreur') ? 'text-red-600' : 'text-green-600'
})
</script>
<template>
  <div :class="['main_content relative', { 'lg:ml-64': state.showSidebar }]">
    <form @submit.prevent="addUser">
      <div class="space-y-12 mt-5">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Créer Utilisateur</h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
                >Email</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="john.doe@gmail.com"
                    v-model="email"
                    @input="validateEmail"
                  />
                </div>
              </div>

              <p v-if="emailError" class="text-red-600 text-xs">
                {{ emailError }}
              </p>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >Mot de passe</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="password"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Saisissez le mot de passe"
                    v-model="password"
                    @input="validatePassword"
                  />
                </div>
              </div>
              <div class="grid-cols-1 gap-x-6">
                <p v-if="passwordError" class="text-red-600 text-xs text-justify">
                  {{ passwordError }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="passwordConfirmation"
                class="block text-sm font-medium leading-6 text-gray-900"
                >confirmer Mot de passe</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    type="password"
                    name="passwordConfirmation"
                    id="passwordConfirmation"
                    autocomplete="passwordConfirmation"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Saisissez à nouveau le mot de passe"
                    v-model="passwordConfirmation"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="buttonPrimary">Ajouter</button>
      <p class="mt-4 text-center" v-if="confirmationMessage" :class="confirmationMessageClass">
        {{ confirmationMessage }}
      </p>
    </form>
  </div>
</template>
