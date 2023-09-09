<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'services'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div>Service du garage</div>
  <FooterSection />
</template>
