<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarMain from './components/NavbarMain.vue'
</script>

<template>
  <header>
    <NavbarMain />
  </header>

  <RouterView />
</template>

<style scoped></style>
