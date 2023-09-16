<script setup lang="ts">
import { defineProps } from 'vue'

const { annonce } = defineProps(['annonce'])
</script>
<template>
  <div
    class="img_container mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-900 sm:shrink-0 sm:grow sm:basis-0"
  >
    <RouterLink to="/services">
      <img
        class="rounded-t-lg"
        src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
        alt="Hollywood Sign on The Hill"
      />
    </RouterLink>
    <div class="p-6">
      <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {{ annonce.title }}
      </h5>
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {{ annonce.description }}
      </p>
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">{{ annonce.price }} €</p>
      <RouterLink to="/annonces/{{ annonce.id }}">
        <button
          class="mx-auto mt-4 w-auto transform rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-500 focus:bg-red-600 focus:outline-none lg:w-auto"
        >
          Voir l'annonce
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<style scoped>
.img_container {
  overflow: hidden;
}
img:hover {
  scale: 1.2;
  overflow: hidden;
  translate: 0% -10%;
  transition: all 0.2s ease-in-out;
}
img {
  transition: all 0.2s ease-in-out;
}
</style>
