<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import OurServices from '@/components/OurServices.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'services'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div class="title_page">Nos services</div>
  <div class="main_content">
    <OurServices :current-page="currentPage" />
  </div>
  <FooterSection />
</template>
