<script setup lang="ts">
import { ref, computed } from 'vue'
import { state } from '@/stores/state'

//TODO: POST USER TO API

const confirmationMessage = ref('')

const addUser = () => {
  console.log('addUser')
}

const confirmationMessageClass = computed(() => {
  return confirmationMessage.value.startsWith('Erreur') ? 'text-red-600' : 'text-green-600'
})
</script>
<template>
  <div :class="['main_content relative', { 'lg:ml-64': state.showSidebar }]">
    <form>
      <div class="space-y-12 mt-5">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Créer Utilisateur</h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
                >Username</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autocomplete="username"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="john.doe@gmail.com"
                  />
                </div>
              </div>
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
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
                >confirmer Mot de passe</label
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
                    placeholder="Saisissez à nouveau le mot de passe"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" @click="addUser" class="buttonPrimary">Ajouter</button>
      <p class="mt-4 text-center" v-if="confirmationMessage" :class="confirmationMessageClass">
        {{ confirmationMessage }}
      </p>
    </form>
  </div>
</template>
