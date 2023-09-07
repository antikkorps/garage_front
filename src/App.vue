<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarMain from './components/NavbarMain.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<script lang="ts">
export default {
  data() {
    return {
      currentPage: 'home'
    }
  }
}
</script>

<template>
  <header>
    <NavbarMain :current-page="currentPage" />
  </header>

  <RouterView />
  <FooterSection />
</template>

<style scoped></style>
