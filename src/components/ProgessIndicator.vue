<template>
  <div class="progress-indicator-wrapper">
    <div class="progress-indicator" :style="{ width: progress }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue'

const progress = ref('0%')

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

watchEffect(() => {
  updateProgressIndicator()
})
</script>

<style scoped lang="scss">
// SCSS variables
$progress-indicator-height: 0.5vh;
$progress-indicator-height-mobile: 0.8vh;
$vue-red: rgb(185 28 28);

// Progress Indicator

.progress-indicator-wrapper {
  background-color: rgb(17 24 39);
  width: 100%;

  z-index: 60;
  .progress-indicator {
    height: $progress-indicator-height-mobile;
    background: $vue-red;
  }
}

@media screen and (min-width: 422px) {
  .progress-indicator-wrapper {
    background-color: rgb(17 24 39);
    width: 100%;

    .progress-indicator {
      height: $progress-indicator-height-mobile;
      background: $vue-red;
    }
  }
}

@media screen and (min-width: 825px) {
  .progress-indicator-wrapper {
    background-color: rgb(17 24 39);
    width: 100%;

    .progress-indicator {
      height: $progress-indicator-height;
      background: $vue-red;
    }
  }
}
</style>
