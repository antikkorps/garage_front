<script setup lang="ts">
// @ts-nocheck
import SidebarAdmin from '@/components/SidebarAdmin.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import apiConfig from '@/config/apiConfig'
import { useImagesStore } from '@/stores/useImagesStore'

const uploadFileStackUrl = import.meta.env.VITE_FILESTACK_URL
const fileStackApiKey = import.meta.env.VITE_FILESTACK_API_KEY
const imagesStore = useImagesStore()
const baseUrl = apiConfig.production.baseUrl
const endpoint = apiConfig.production.endpoints.annonceDetails
const annoncebyIdQuery = `${baseUrl}${endpoint}`
const route = useRoute()
const router = useRouter()
const annonce = ref<Annonce | null>(null)
const confirmationMessage = ref<string | null>(null)
const confirmationMessageClass = ref<string | null>(null)

interface Annonce extends ImageFields {
  id: number
  title: string
  description: string
  brand: string
  price: number
  kilometrage: number
  yearofcirculation: number
  published: boolean
  featured: boolean
}

interface ImageFields {
  imageCover?: string
  imageOne?: string
  imageTwo?: string
  imageThree?: string
}

const formData = ref<Annonce>({
  id: 0,
  title: '',
  description: '',
  brand: '',
  price: 0,
  kilometrage: 0,
  yearofcirculation: 0,
  imageCover: '',
  imageOne: '',
  imageTwo: '',
  imageThree: '',
  published: false,
  featured: false
})
const id = route.params.id
console.log("id de l'annonce : ", id)

const getAnnonceById = async () => {
  if (!id) {
    console.error("ID introuvable dans l'URL.")
    return
  }

  try {
    const response = await axios.get(`${annoncebyIdQuery}${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    formData.value = response.data
    console.log(formData.value)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'annonce :", error)
  }
}

const deleteAnnonce = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }
  if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce?')) {
    try {
      await axios.delete(`${annoncebyIdQuery}${id}`, config)
      router.push('/dashboard/annonces')
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error)
    }
  }
}

const updateAnnonce = async () => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
    }
  }
  const payload = {
    title: formData.value.title,
    description: formData.value.description,
    brand: formData.value.brand,
    price: formData.value.price,
    kilometrage: formData.value.kilometrage,
    yearofcirculation: formData.value.yearofcirculation,
    imageCover: formData.value.imageCover,
    imageOne: formData.value.imageOne,
    imageTwo: formData.value.imageTwo,
    imageThree: formData.value.imageThree,
    published: formData.value.published,
    featured: formData.value.featured
  }
  try {
    await axios.patch(`${annoncebyIdQuery}${id}`, payload, config)
    console.log('payload : ', payload)
    confirmationMessage.value = 'Annonce mise à jour avec succès.'
    confirmationMessageClass.value = 'text-green-600'
    setTimeout(() => {
      confirmationMessage.value = null
    }, 3000)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'annonce :", error)
    confirmationMessage.value = "Erreur lors de la mise à jour de l'annonce."
  }
}

const handleFileChange = async (index: number, event: Event) => {
  console.log('handleFileChange start with index : ', index)

  if (!event) {
    console.error('Event is undefined or null.')
    return
  }

  const input = event.target as HTMLInputElement
  console.log('input : ', input)
  console.log('file : ', input.files?.[0])
  const file = input.files?.[0]
  console.log('file : ', file)

  if (input.files && input.files.length > 0) {
    // Upload to filestack to get the URL
    const filestackUrl = await uploadFileToFilestack(file)

    switch (index) {
      case 0:
        formData.value.imageCover = filestackUrl
        break
      case 1:
        formData.value.imageOne = filestackUrl
        break
      case 2:
        formData.value.imageTwo = filestackUrl
        break
      case 3:
        formData.value.imageThree = filestackUrl
        break
      default:
        break
    }
  }
}

const uploadFileToFilestack = async (file: File): Promise<string> => {
  try {
    console.log('uploadFileToFilestack start')
    const formData = new FormData()
    formData.append('fileUpload', file)

    const response = await axios.post(`${uploadFileStackUrl}?key=${fileStackApiKey}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    console.log('uploadFileToFilestack response', response.data)

    return response.data.url
  } catch (error) {
    console.error("Erreur lors de l'upload :", error)
    throw error
  }
}

onMounted(() => {
  getAnnonceById()
})
</script>

<template>
  <SidebarAdmin />
  <div class="grid my-15">
    <form class="w-full sm:w-1/3 justify-self-center" @submit.prevent>
      <div class="space-y-5">
        <div class="border-b border-gray-900/10 pb-5">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Ajouter une annonce</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Merci de remplir ce formulaire pour poster une nouvelle annonce.
          </p>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Détail de l'annonce</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Rentrez ici les détails de votre annonce.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="col-span-full">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                >Titre</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autocomplete="title"
                  v-model="formData.title"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900"
                >Description</label
              >
              <div class="mt-2">
                <textarea
                  id="description"
                  name="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Ecrivez la description de votre annonce ici.
              </p>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label for="price" class="block text-sm font-medium leading-6 text-gray-900"
                >Prix (Euros)</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  v-model="formData.price"
                  autocomplete="annonce-price"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="kilometrage" class="block text-sm font-medium leading-6 text-gray-900"
                >Kilométrage</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="kilometrage"
                  id="kilometrage"
                  v-model="formData.kilometrage"
                  autocomplete="annonce-kilometrage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="yearofcirculation"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Année</label
              >
              <div class="mt-2">
                <input
                  type="number"
                  name="yearofcirculation"
                  id="yearofcirculation"
                  v-model="formData.yearofcirculation"
                  autocomplete="yearofcirculation"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="brand" class="block text-sm font-medium leading-6 text-gray-900"
                >Marque</label
              >
              <div class="mt-2">
                <select
                  id="brand"
                  name="brand"
                  autocomplete="brand-name"
                  v-model="formData.brand"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Choisissez une marque</option>
                  <option>Toyota</option>
                  <option>Opel</option>
                  <option>Renault</option>
                  <option>Peugeot</option>
                  <option>Citroën</option>
                  <option>Volkswagen</option>
                  <option>Mercedes</option>
                  <option>Hyundai</option>
                  <option>BMW</option>
                  <option>MG</option>
                  <option>Fiat</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Images</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">Gérez les images de votre annonce.</p>

          <div class="mt-6">
            <div
              v-for="(imageField, index) in ['imageCover', 'imageOne', 'imageTwo', 'imageThree']"
              :key="imageField"
            >
              <div class="relative flex">
                <img
                  :src="formData[imageField]"
                  alt="Image"
                  class="w-full h-40 object-cover rounded-md"
                />
              </div>
              <div class="flex flex-col">
                <label
                  :for="imageField"
                  class="relative text-gray-900 mt-4 text-base font-semibold leading-8"
                  ><template v-if="imageField === 'imageCover'"> Image de couverture </template>
                  <template v-else-if="imageField === 'imageOne'"> Image 1 </template>
                  <template v-else-if="imageField === 'imageTwo'"> Image 2 </template>
                  <template v-else> Image 3 </template></label
                >
                <input
                  type="file"
                  :id="imageField"
                  @change="handleFileChange(index, $event)"
                  class="my-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-1">
          <h2 class="text-base font-semibold leading-7 text-gray-900">Publication</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Ici vous définissez la publication et la mise en avant d'une annonce sur le site.
          </p>

          <div class="mt-5 space-y-10">
            <fieldset>
              <div class="mt-6 space-y-6">
                <div class="relative flex gap-x-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="published"
                      name="published"
                      type="checkbox"
                      v-model="formData.published"
                      class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="published" class="font-medium text-gray-900">Publier</label>
                    <p class="text-gray-500">
                      Publier l'annonce sur le site, sinon elle reste en brouillon.
                    </p>
                  </div>
                </div>
                <div class="relative flex gap-x-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      v-model="formData.featured"
                      class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="featured" class="font-medium text-gray-900">Mettre en avant</label>
                    <p class="text-gray-500">
                      Mettre l'annonce en avant sur le site avec le filtre "nos coups de coeur".
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <p class="mt-4 text-center" v-if="confirmationMessage" :class="confirmationMessageClass">
        {{ confirmationMessage }}
      </p>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink to="/dashboard/annonces"
          ><button type="button" class="text-sm font-semibold leading-6 text-gray-900">
            Revenir à la liste
          </button></RouterLink
        >

        <button type="submit" @click="updateAnnonce" class="buttonPrimary">Mettre à jour</button>
      </div>
    </form>
    <button
      type="submit"
      @click="deleteAnnonce()"
      class="text-sm font-semibold leading-6 text-red-600 mt-10 mb-28"
    >
      Supprimer cette annonce
    </button>
  </div>
</template>
