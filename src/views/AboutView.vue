<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'about'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div class="about">
    <div class="sm:w-1/2 flex flex-col justify-center mx-auto">
      <h1 class="title_page">A propos du garage</h1>
      <div class="presentation my-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, quibusdam,
          quia, quae voluptatem voluptatum quos voluptates quod doloribus quas natus. Quisquam
          voluptatibus, quibusdam, quia, quae voluptatem voluptatum quos voluptates quod doloribus
          quas natus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus, quibusdam,
          quia, quae voluptatem voluptatum quos voluptates quod doloribus quas natus. Quisquam
          voluptatibus, quibusdam, quia, quae voluptatem voluptatum quos voluptates quod doloribus
          quas natus.
        </p>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped></style>
