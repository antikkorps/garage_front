<script setup lang="ts">
import NavbarMain from '@/components/NavbarMain.vue'
import FooterSection from '@/components/FooterSection.vue'

const currentPage = 'privacy'
</script>
<template>
  <NavbarMain :current-page="currentPage" />
  <div class="about dark:bg-gray-900 dark:text-white pb-5">
    <div class="sm:w-1/2 flex flex-col justify-center mx-3 px-3 sm:mx-auto">
      <h1 class="title_page">Mentions légales</h1>
      <div class="presentation my-10">
        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en
          l’économie numérique, il est précisé aux utilisateurs du site nd2d.fr l’identité des
          différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>
        <h2 class="text-2xl my-4">Edition du site</h2>
        <p>
          Le site garageparrot.fr est édité par la société Garage Parrot, société par actions
          simplifiée au capital de 50 000 euros, dont le siège social est situé au 108 rue ici 00000
          Quelque part, immatriculée au registre du commerce et des sociétés sous le numéro
          d’identification unique xxx xxx xxx RCS Nanterre.
        </p>
        <h2 class="text-2xl my-4">Hébergeur</h2>
        <p>
          Le site nd2d.fr est hébergé par la société OVH Adresse : 2 rue Kellermann – 59100 Roubaix
          – France
        </p>
        <h2 class="text-2xl my-4">Nous contacter</h2>
        <a href="mailto:contact@garageparrot.fr">contact@garageparrot.fr</a>
      </div>
    </div>
  </div>
  <FooterSection />
</template>

<style scoped></style>
