<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const loginEndpoint = apiConfig.production.endpoints.login
const loginUrl = baseUrl + loginEndpoint

const email = ref('')
const password = ref('')
const remember = ref(false)
const loginError = ref(false)
const loginErrorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await axios.post(`${loginUrl}`, {
      email: email.value,
      password: password.value
    })

    console.log(response)

    if (response.status === 200) {
      window.location.href = '/'
      const token = response.data.access_token
      localStorage.setItem('jwt_token', token)
    } else {
      console.error('Les informations de connexion sont erronées.')
      loginError.value = true
      loginErrorMessage.value = 'Les informations de connexion sont erronées.'
      setTimeout(() => {
        loginError.value = false
        loginErrorMessage.value = ''
      }, 3000)
    }
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    loginError.value = true
    loginErrorMessage.value = 'Erreur lors de la connexion.'
    setTimeout(() => {
      loginError.value = false
      loginErrorMessage.value = ''
    }, 3000)
  }
}
</script>
<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-3 mx-auto h-screen lg:py-0">
      <RouterLink
        to="/"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        />
        Garage Parrot
      </RouterLink>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="w-full text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Se connecter à votre compte
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Votre email</label
              >
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
                v-model="email"
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mot de passe</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                v-model="password"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                    v-model="remember"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Se souvenir</label>
                </div>
              </div>
              <RouterLink
                to="/forgotten-pass"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-white"
                >Mot de passe oublié?</RouterLink
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Se connecter
            </button>
            <!-- <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</a
              >
            </p> -->
            <p class="text-red-600" v-if="loginError">{{ loginErrorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
