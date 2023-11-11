import { defineStore } from 'pinia'

interface ImagesState {
  imageCover: string | null
  imageOne: string | null
  imageTwo: string | null
  imageThree: string | null
}

export const useImagesStore = defineStore({
  id: 'images',
  state: (): ImagesState => ({
    imageCover: null,
    imageOne: null,
    imageTwo: null,
    imageThree: null
  }),
  actions: {
    setImageCover(image: string) {
      this.imageCover = image
    },
    setImageOne(image: string) {
      this.imageOne = image
    },
    setImageTwo(image: string) {
      this.imageTwo = image
    },
    setImageThree(image: string) {
      this.imageThree = image
    }
  }
})

console.log('imagesStore', useImagesStore())
export const imagesStore = useImagesStore()
