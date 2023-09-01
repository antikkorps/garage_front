<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarMain from './components/NavbarMain.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <header>
    <NavbarMain />
  </header>

  <RouterView />
  <FooterSection />
</template>

<style scoped></style>
