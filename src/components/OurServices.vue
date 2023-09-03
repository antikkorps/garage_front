<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="flex justify-center my-10">
    <div class="grid-cols-1 sm:grid md:grid-cols-4 w-full sm:w-3/4 place-content-evenly mx-auto">
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
            Un service de qualité
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Depuis de nombreuses années, nous vous accompagnons dans l'entretien de vos véhicules.
          </p>
        </div>
      </div>
      <div
        class="img_container mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-900 sm:shrink-0 sm:grow sm:basis-0"
      >
        <RouterLink to="/contact">
          <img
            class="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/city/042.webp"
            alt="Palm Springs Road"
          />
        </RouterLink>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Dédié à votre satisfaction
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Nous faisons tout notre possible pour vous apporter satisfaction sur l'ensemble de vos
            demandes
          </p>
        </div>
      </div>
      <div
        class="img_container mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-900 sm:shrink-0 sm:grow sm:basis-0"
      >
        <a href="#!">
          <img
            class="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/city/044.webp"
            alt="Skyscrapers"
          />
        </a>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Card title
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            This is a longer card with supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
      </div>
      <div
        class="img_container mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-900 sm:shrink-0 sm:grow sm:basis-0"
      >
        <a href="#!">
          <img
            class="rounded-t-lg"
            src="https://tecdn.b-cdn.net/img/new/standard/city/043.webp"
            alt="Los Angeles Skyscrapers"
          />
        </a>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Card title
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            This is a longer card with supporting text below as a natural lead-in to additional
            content. This content is a little bit longer.
          </p>
        </div>
      </div>
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
