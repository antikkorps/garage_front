<template>
  <div
    class="lg:flex-shrink-0 grid-cols-1 sm:grid md:grid-cols-2 w-full sm:w-3/4 place-content-evenly"
  >
    <!-- Champs de recherche -->
    <div class="mb-4">
      <input
        type="text"
        class="w-full mx-auto px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 inline-flex items-center"
        placeholder="Recherche rapide..."
      />
    </div>

    <!-- Filtres -->
    <div class="bg-gray-100 p-4 rounded-md">
      <h3 class="text-lg font-semibold mb-2">Filtres</h3>

      <!-- Marques -->
      <div class="mb-4">
        <h4 class="text-sm font-medium">Marques</h4>
        <!-- Exemple de filtres de marques -->
        <label class="inline-flex items-center mt-2">
          <input type="checkbox" class="text-blue-500 rounded" />
          <span class="ml-2">Marque 1</span>
        </label>
        <label class="inline-flex items-center mt-2">
          <input type="checkbox" class="text-blue-500 rounded" />
          <span class="ml-2">Marque 2</span>
        </label>
        <!-- Ajoutez d'autres marques ici -->
      </div>

      <!-- Kilométrage -->
      <div class="mb-4">
        <h4 class="text-sm font-medium">Kilométrage</h4>
        <!-- Exemple de filtres de kilométrage -->
        <label class="block mt-2">
          <select
            class="w-full px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="0-5000">0-5000 km</option>
            <option value="5000-10000">5000-10000 km</option>
            <option value="10000-20000">10000-20000 km</option>
            <!-- Ajoutez d'autres options de kilométrage ici -->
          </select>
        </label>
      </div>

      <!-- Année -->
      <div>
        <h4 class="text-sm font-medium">Année</h4>
        <!-- Exemple de filtres d'année -->
        <label class="block mt-2">
          <select
            class="w-full px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <!-- Ajoutez d'autres options d'année ici -->
          </select>
        </label>
      </div>
    </div>
  </div>
</template>
