<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import OurServices from '@/components/OurServices.vue'
import SearchBar from '@/components/SearchBar.vue'
import NavbarMain from '@/components/NavbarMain.vue'
import KeyIndicators from '@/components/KeyIndicators.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'home'
</script>

<template>
  <main>
    <NavbarMain :current-page="currentPage" />
    <HeroSection />
    <OurServices />
    <SearchBar />
    <KeyIndicators />
  </main>
  <FooterSection />
</template>
