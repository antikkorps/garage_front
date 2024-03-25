<script setup lang="ts">
import { defineProps } from 'vue'

const { annonce } = defineProps(['annonce'])
</script>
<template>
  <div
    class="relative overflow-hidden img_container mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-900 sm:shrink-0 sm:grow sm:basis-0"
  >
    <div
      v-if="annonce.featured"
      class="absolute top-0 left-0 transform bg-yellow-400 p-2 rounded-md shadow-md"
    >
      <p class="text-sm font-semibold text-gray-800">📢 Annonce à l'affiche</p>
    </div>
    <RouterLink :to="`/annonces/${annonce.id}`">
      <img
        v-if="annonce.imageCover"
        class="rounded-t-lg"
        :src="annonce.imageCover"
        alt="cover_image"
      />
      <img
        v-else
        class="rounded-t-lg"
        src="/src/assets/images/image_fallback.png"
        alt="cover_image"
      />
    </RouterLink>
    <div class="p-6">
      <h5
        class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 line-clamp-1"
      >
        {{ annonce.title }}
      </h5>
      <!-- <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200 line-clamp-2">
        {{ annonce.description }}
      </p> -->
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">{{ annonce.price }} €</p>

      <RouterLink :to="`/annonces/${annonce.id}`">
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
