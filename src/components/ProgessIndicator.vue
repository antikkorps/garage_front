<template>
  <div class="progress-indicator-wrapper">
    <div class="progress-indicator" :style="{ width: progress }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const progress = ref('0%')
const route = useRoute() // Accéder à la route avec useRoute()

const updateProgressIndicator = () => {
  const { documentElement, body } = document
  const windowScroll = body.scrollTop || documentElement.scrollTop
  const height = documentElement.scrollHeight - documentElement.clientHeight
  progress.value = (windowScroll / height) * 100 + '%'
}

onMounted(() => {
  window.addEventListener('scroll', updateProgressIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgressIndicator)
})

// Utilisation de route pour surveiller les changements de route
watchEffect(() => {
  updateProgressIndicator()
})
</script>

<style scoped lang="scss">
// SCSS variables
$header-height: 7.5vh;
$progress-indicator-height: 0.5vh;
$vue-red: rgb(185 28 28);

// Progress Indicator
.progress-indicator-wrapper {
  position: fixed;
  height: $progress-indicator-height;
  background-color: rgb(17 24 39);
  width: 100%;
  top: $header-height;
  .progress-indicator {
    height: $progress-indicator-height;
    background: $vue-red;
  }
}
</style>
