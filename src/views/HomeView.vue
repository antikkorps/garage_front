<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import OurServices from '@/components/OurServices.vue'
import SearchBar from '@/components/SearchBar.vue'
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <main>
    <NavbarMain :current-page="home" />
    <HeroSection />
    <OurServices />
    <SearchBar />
  </main>
  <FooterSection />
</template>
