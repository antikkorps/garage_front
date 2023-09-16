<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'annonces'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div>
    <h1 class="my-20 text-2xl text-center">Here will be displayed all the annonces</h1>
  </div>
  <FooterSection />
</template>
