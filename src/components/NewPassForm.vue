<script setup lang="ts"></script>
<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-3 mx-auto md:h-screen lg:py-0">
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
            Nouveau mot de passe
          </h1>
          <form class="space-y-4 md:space-y-6">
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Votre mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="passwordConfirm"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirmez votre mot de passe
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <RouterLink
                to="/"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-white"
              >
                Retour sur le site
              </RouterLink>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-red-700 hover:bg-red-800 transition-colors duration-300 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Soumettre
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
