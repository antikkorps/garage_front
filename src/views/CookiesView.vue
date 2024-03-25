<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'privacy'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div class="about dark:bg-gray-900 dark:text-white pb-5">
    <div class="sm:w-1/2 flex flex-col justify-center mx-3 px-3 sm:mx-auto">
      <h1 class="title_page">Politique de Cookie</h1>
      <div class="presentation my-10">
        <p>
          Le site web du garage Parrot utilise des cookies pour améliorer l'expérience de navigation
          de ses utilisateurs. En continuant à utiliser ce site, vous acceptez notre utilisation des
          cookies conformément à notre politique de confidentialité. Vous pouvez désactiver les
          cookies dans les paramètres de votre navigateur, mais cela pourrait limiter certaines
          fonctionnalités du site.
        </p>
        <h2 class="text-2xl my-4">Cookies utilisés</h2>
        <p>Uniquement des cookies de session utilisés pour personnaliser votre navigation</p>
        <h2 class="text-2xl my-4">Utilité</h2>
        <p>Personnalisation de la navigation</p>
        <h2 class="text-2xl my-4">Nous contacter</h2>
        <a href="mailto:contact@garageparrot.fr">contact@garageparrot.fr</a>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped></style>
