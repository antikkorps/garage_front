<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <RouterLink :to="to">
    <button class="custom-button">
      <slot></slot>
    </button>
  </RouterLink>
</template>

<style scoped lang="scss"></style>
