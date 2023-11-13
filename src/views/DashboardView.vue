<script setup lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { state } from '@/stores/state'

const dashboardItems = [
  {
    title: 'Annonces',
    src: 'https://picsum.photos/id/24/200/300',
    description: 'Gérer les annonces',
    link: '/dashboard/annonces'
  },
  {
    title: 'Horaires',
    src: 'https://picsum.photos/id/250/200/300',
    description: 'Gérer les horaires',
    link: '/dashboard/horaires'
  },
  {
    title: 'Utilisateurs',
    src: 'https://picsum.photos/id/252/200/300',
    description: 'Gérer les utilisateurs',
    link: '/dashboard/users'
  },
  {
    title: 'Contacts',
    src: 'https://picsum.photos/id/253/200/300',
    description: 'Gérer les contacts',
    link: '/dashboard/contacts'
  }
]
</script>

<template>
  <div>
    <SidebarAdmin />
    <div :class="['main_content relative', { 'ml-64': state.showSidebar }]">
      <main class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Bienvenue sur le Dashboard du garage Parrot</h1>
        <p>Ici vous pouvez gérer les annonces, les photos, les utilisateurs et les rôles.</p>
        <div class="flex flex-col sm:flex-row w-full justify-center mx-auto">
          <div
            v-for="dashboardItem in dashboardItems"
            class="img_container mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-gray-900 sm:shrink-0 sm:grow sm:basis-0"
            :key="dashboardItem.title"
          >
            <RouterLink :to="`${dashboardItem.link}`">
              <img
                class="rounded-t-lg"
                src="https://picsum.photos/id/24/200/300"
                alt="Illustration_card"
              />
            </RouterLink>
            <div class="p-6">
              <h5
                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 line-clamp-1"
              >
                {{ dashboardItem.title }}
              </h5>
              <!-- <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200 line-clamp-2">
        {{ annonce.description }}
      </p> -->
              <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {{ dashboardItem.description }}
              </p>

              <RouterLink :to="`${dashboardItem.link}`">
                <button
                  class="mx-auto mt-4 w-auto transform rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-500 focus:bg-red-600 focus:outline-none lg:w-auto"
                >
                  Aller à la page
                </button>
              </RouterLink>
            </div>
          </div>
        </div>
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
  margin-left: 64px; /* Adjust to the sidebar width */
}
</style>
