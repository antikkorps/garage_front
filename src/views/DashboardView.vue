<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { state } from '@/stores/state'
</script>

<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'ml-64': state.showSidebar }]">
      <main class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Bienvenue sur le Dashboard du garage Parrot</h1>
        <p>Ici vous pouvez gérer les annonces, les photos, les utilisateurs et les rôles.</p>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main_content {
  transition: all 0.4s ease;
  float: left;
}
.relative {
  position: relative;
}
.ml-64 {
  margin-left: 64px; /* Ajustez cette valeur en fonction de la largeur de votre sidebar */
}
</style>
