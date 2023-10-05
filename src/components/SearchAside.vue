<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesQuery
const annonces = ref<{ id: number; title: string }[]>([])

const searchQuery = ref('')
const selectedBrands = ref([])
const selectedKilometerRange = ref('')
const selectedYear = ref('')
const searchResults = ref([])
const emit = defineEmits()

const performSearch = async () => {
  try {
    let searchUrl = `${baseUrl}${endpoint}/?`

    if (searchQuery.value) {
      searchUrl += `q=${searchQuery.value}&`
    }
    if (selectedBrands.value.length > 0) {
      searchUrl += `brands=${selectedBrands.value.join(',')}&`
    }
    if (selectedKilometerRange.value) {
      searchUrl += `kilometerRange=${selectedKilometerRange.value}&`
    }
    if (selectedYear.value) {
      searchUrl += `year=${selectedYear.value}&`
    }

    if (searchUrl.endsWith('&')) {
      searchUrl = searchUrl.slice(0, -1)
    }

    const response = await axios.get(searchUrl)

    // Update annonces in search results
    annonces.value = response.data
    searchResults.value = response.data
    console.log('searchResults', searchResults.value)
    emit('update:searchResults', response.data)
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
  }
}

watch([searchQuery, selectedBrands, selectedKilometerRange, selectedYear], () => {
  // Execute the search using filter's actual values
  performSearch()
  console.log('searching for ' + searchQuery.value)
})
const filters = {
  price: [
    { value: '0', label: '€1.000 - €15.000', checked: false },
    { value: '15.000', label: '€15.000 - €20.000', checked: false },
    { value: '20.000', label: '€20.000 - €25.000', checked: false },
    { value: '25.000', label: '€25.000+', checked: false }
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false }
  ],
  size: [
    { value: '2018', label: '2018', checked: false },
    { value: '2019', label: '2019', checked: true },
    { value: '2020', label: '2020', checked: false },
    { value: '2021', label: '2021', checked: false },
    { value: '2022', label: '2022', checked: false },
    { value: '2023', label: '2023', checked: false }
  ],
  category: [
    { value: 'bmw', label: 'BMW', checked: false },
    { value: 'ford', label: 'Ford', checked: false },
    { value: 'renault', label: 'Renault', checked: false },
    { value: 'mg', label: 'MG', checked: false },
    { value: 'fiat', label: 'Fiat', checked: false }
  ]
}
const sortOptions = [
  { name: 'Les plus populaires', href: '#', current: true },
  { name: 'Nos coups de coeur', href: '#', current: false },
  { name: 'Les plus récentes', href: '#', current: false }
]
</script>

<template>
  <div class="bg-white">
    <div class="px-4 py-2 text-center sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">Rechercher</h1>
      <!-- Champs de recherche -->

      <input
        type="text"
        class="w-3/4 mx-auto px-4 py-2 mt-8 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 inline-flex items-center justify-center"
        placeholder="Recherche rapide..."
        v-model="searchQuery"
      />
    </div>

    <!-- Filters -->
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      class="grid items-center border-b border-t border-gray-200"
    >
      <h2 id="filter-heading" class="sr-only">Filters</h2>
      <div class="relative col-start-1 row-start-1 py-4">
        <div
          class="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8"
        >
          <div>
            <DisclosureButton class="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                class="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              2 Filters
            </DisclosureButton>
          </div>
          <div class="pl-6">
            <button type="button" class="text-gray-500">Supprimer les filtres</button>
          </div>
        </div>
      </div>
      <DisclosurePanel class="border-t border-gray-200 py-10">
        <div
          class="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8"
        >
          <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend class="block font-medium">Prix</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in filters.price"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`price-${optionIdx}`"
                    name="price[]"
                    :value="option.value"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="option.checked"
                    v-model="price"
                  />
                  <label :for="`price-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">kilometrage</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in filters.color"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`color-${optionIdx}`"
                    name="color[]"
                    :value="option.value"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="option.checked"
                    v-model="selectedKilometerRange"
                  />
                  <label :for="`color-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend class="block font-medium">Année</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in filters.size"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`size-${optionIdx}`"
                    name="size[]"
                    :value="option.value"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="option.checked"
                    v-model="selectedYear"
                  />
                  <label :for="`size-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">Marques</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(option, optionIdx) in filters.category"
                  :key="option.value"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`category-${optionIdx}`"
                    name="category[]"
                    :value="option.value"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="option.checked"
                    v-model="selectedBrands"
                  />
                  <label :for="`category-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </DisclosurePanel>
      <div class="col-start-1 row-start-1 py-4">
        <div class="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
          <Menu as="div" class="relative inline-block">
            <div class="flex">
              <MenuButton
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                classer
                <ChevronDownIcon
                  class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                    <a
                      :href="option.href"
                      :class="[
                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm'
                      ]"
                      >{{ option.name }}</a
                    >
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </Disclosure>
  </div>
</template>
