<script setup lang="ts">
import ContactForm from '@/components/ContactForm.vue'
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>
<template>
  <NavbarMain :current-page="contact" />
  <main class="bg-white dark:bg-gray-900 flex justify-center">
    <div class="sm:w-1/2 justify-center">
      <ContactForm class="Contact_form" />
    </div>
  </main>
  <FooterSection />
</template>

<style scoped>
.contact_form {
  padding: 10vh 0 10vh 0;
}
</style>
