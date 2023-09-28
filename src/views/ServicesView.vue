<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'services'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div>
    <h2 class="title_page">Service du garage</h2>
  </div>
  <FooterSection />
</template>
