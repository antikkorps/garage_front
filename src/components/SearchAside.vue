<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, computed } from 'vue'
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
import { useSearchQueriesStore } from '@/stores/useSearchQueriesStore'

interface Annonce {
  id: number
  title: string
  description: string
  brand: string
  price: number
  kilometrage: number
  yearofcirculation: number
  image: string
  published: boolean
  author: object
}

const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annoncesQuery
const allAnnonces = apiConfig.production.endpoints.annoncesAll
const annonces = ref<Annonce[]>([])
const availableYearsOfCirculation = ref<number[]>([])

const searchStore = useSearchQueriesStore()
const searchQuery = ref('')
const price = ref<number[]>([])
const selectedBrands = ref<string[]>([])
const availableBrands = ref<string[]>([])
const selectedKilometerRange = ref('')
const selectedYears = ref<number[]>([])
const searchResults = ref<Annonce[]>([])
const emit = defineEmits()
const filters = {
  price: [
    { value: '0-14999', label: '€1.000 - €14.999', checked: false },
    { value: '15000-19999', label: '€15.000 - €19.999', checked: false },
    { value: '20000-24999', label: '€20.000 - €24.999', checked: false },
    { value: '25000-', label: '€25.000+', checked: false }
  ]
}

const performSearch = async () => {
  try {
    let searchUrl = `${baseUrl}${endpoint}/?`

    if (searchQuery.value) {
      searchUrl += `q=${searchQuery.value}&`
    }

    if (price.value.length > 0) {
      const [priceMin, priceMax] = price.value
      searchUrl += `priceMin=${priceMin}&priceMax=${priceMax}&`
    }

    if (selectedBrands.value.length > 0) {
      for (let brand of selectedBrands.value) {
        searchUrl += `brand=${encodeURIComponent(brand)}&`
      }
    }

    if (selectedKilometerRange.value) {
      searchUrl += `kilometerRange=${selectedKilometerRange.value}&`
    }

    if (selectedYears.value.length > 0) {
      for (let year of selectedYears.value) {
        searchUrl += `yearofcirculation=${encodeURIComponent(year)}&`
      }
    }

    if (searchUrl.endsWith('&')) {
      searchUrl = searchUrl.slice(0, -1)
    }

    const response = await axios.get(searchUrl)
    console.log('url de la recherche', searchUrl)
    if (searchQuery.value) {
      annonces.value = response.data.filter((annonce: Annonce) =>
        annonce.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    } else {
      annonces.value = response.data
    }

    searchResults.value = annonces.value
    console.log('searchResults', searchResults.value)
    emit('update:searchResults', searchResults.value)
  } catch (error) {
    console.error('Erreur lors de la recherche :', error)
  }
}

watch([searchQuery, selectedBrands, selectedKilometerRange, selectedYears], () => {
  // Execute the search using filter's actual values
  performSearch()
  console.log('searching for ' + searchQuery.value)
})

// Function to update the brand checkbox in filters
const toggleBrandFilter = (value: string) => {
  if (Array.isArray(selectedBrands.value)) {
    if (selectedBrands.value.includes(value)) {
      selectedBrands.value = selectedBrands.value.filter((brand) => brand !== value)
    } else {
      selectedBrands.value.push(value)
    }
  }
}
const fetchBrands = async () => {
  try {
    const response = await axios.get(`${baseUrl}${allAnnonces}`)
    const annonces: Annonce[] = response.data
    const brands = Array.from(new Set(annonces.map((annonce) => annonce.brand)))

    brands.sort((a, b) => a.localeCompare(b))

    availableBrands.value = brands
  } catch (error) {
    console.error('Erreur lors de la récupération des marques :', error)
  }
}

const fetchYearsOfCirculation = async () => {
  try {
    const response = await axios.get(`${baseUrl}${allAnnonces}`)
    const annonces: Annonce[] = response.data
    const yearsOfCirculation = Array.from(
      new Set(annonces.map((annonce) => annonce.yearofcirculation))
    )

    yearsOfCirculation.sort((a, b) => b - a)

    availableYearsOfCirculation.value = yearsOfCirculation
  } catch (error) {
    console.error('Erreur lors de la récupération des années de circulation :', error)
  }
}
const toggleYearFilter = (year: number) => {
  if (Array.isArray(selectedBrands.value)) {
    if (selectedYears.value.includes(year)) {
      selectedYears.value = selectedYears.value.filter((year) => year !== year)
    } else {
      selectedYears.value.push(year)
    }
  }
}

const updatePriceFilter = (value: string) => {
  const [priceMin, priceMax] = value.split('-').map(Number)
  console.log(priceMin, priceMax)

  const numericValue = priceMax !== undefined ? priceMax : Infinity

  price.value = [priceMin, numericValue]
  performSearch()
}

const isPriceFilterChecked = (value: string) => {
  const [priceMin, priceMax] = value.split('-').map(Number)
  const [currentPriceMin, currentPriceMax] = price.value

  if (priceMax !== undefined) {
    return priceMin === currentPriceMin && priceMax === currentPriceMax
  }

  return priceMin === currentPriceMin
}

const isFilterSelected = () => {
  return (
    searchQuery.value ||
    price.value.length > 0 ||
    selectedBrands.value.length > 0 ||
    selectedKilometerRange.value ||
    selectedYears.value.length > 0
  )
}

const clearFilters = () => {
  price.value = []
  selectedBrands.value = []
  selectedKilometerRange.value = ''
  selectedYears.value = []

  performSearch()
}

const activeFilterCount = computed(() => {
  // Count the number of active filters
  let count = 0

  if (searchQuery.value) {
    count++
  }

  if (price.value.length > 0) {
    count++
  }

  if (selectedBrands.value.length > 0) {
    count++
  }

  if (selectedKilometerRange.value) {
    count++
  }

  if (selectedYears.value.length > 0) {
    count += selectedYears.value.length
  }

  return count
})

onMounted(() => {
  clearFilters()
  fetchBrands()
  fetchYearsOfCirculation()
  watchEffect(() => {
    performSearch()
  })
})
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
              {{
                activeFilterCount === 0
                  ? 'Filtrez votre recherche'
                  : `${activeFilterCount} filtre${activeFilterCount > 1 ? 's' : ''}`
              }}
            </DisclosureButton>
          </div>
          <div class="pl-6">
            <button
              type="button"
              class="text-gray-500"
              v-if="isFilterSelected()"
              @click="clearFilters"
            >
              Supprimer les filtres
            </button>
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
                    :checked="isPriceFilterChecked(option.value)"
                    @change="updatePriceFilter(option.value)"
                  />
                  <label :for="`price-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    option.label
                  }}</label>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="block font-medium">Marques</legend>
              <div class="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                <div
                  v-for="(brand, brandIdx) in availableBrands"
                  :key="brandIdx"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :value="brand"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="selectedBrands.includes(brand)"
                    @change="toggleBrandFilter(brand)"
                  />
                  <label :for="`brand-${brandIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    brand
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
                  v-for="(year, yearIdx) in availableYearsOfCirculation"
                  :key="yearIdx"
                  class="flex items-center text-base sm:text-sm"
                >
                  <input
                    :id="`year-${yearIdx}`"
                    name="year[]"
                    :value="year"
                    type="checkbox"
                    class="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="selectedYears.includes(year)"
                    @change="toggleYearFilter(year)"
                  />
                  <label :for="`year-${yearIdx}`" class="ml-3 min-w-0 flex-1 text-gray-600">{{
                    year
                  }}</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
