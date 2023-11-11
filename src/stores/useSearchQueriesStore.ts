import { defineStore } from 'pinia'

interface SearchQueriesState {
  searchQuery: string
  selectedBrands: string[]
  selectedKilometerRange: number[]
  selectedPriceRange: number[]
  selectedYears: number[]
  searchResults: any[]
}

export const useSearchQueriesStore = defineStore({
  id: 'searchQueries',
  state: (): SearchQueriesState => ({
    searchQuery: '',
    selectedBrands: [],
    selectedKilometerRange: [],
    selectedPriceRange: [],
    selectedYears: [],
    searchResults: []
  }),
  getters: {
    getSearchQuery(): string {
      return this.searchQuery
    },
    getSelectedBrands(): string[] {
      return this.selectedBrands
    },
    getSelectedKilometerRange(): number[] {
      return this.selectedKilometerRange
    },
    getSelectedPriceRange(): number[] {
      return this.selectedPriceRange
    },
    getSelectedYears(): number[] {
      return this.selectedYears
    },
    getSearchResults(): any[] {
      return this.searchResults
    }
  },
  actions: {
    setSearchQuery(query: string): void {
      this.searchQuery = query
    },
    setSelectedBrands(brands: string[]): void {
      this.selectedBrands = brands
    },
    setSelectedKilometerRange(range: number[]): void {
      this.selectedKilometerRange = range
    },
    setSelectedPriceRange(range: number[]): void {
      this.selectedPriceRange = range
    },
    setSelectedYears(years: number[]): void {
      this.selectedYears = years
    },
    setSearchResults(results: any[]): void {
      this.searchResults = results
    }
  }
})
