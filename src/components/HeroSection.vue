<template>
  <div className="h-screen w-full bg-cover bg-center car_hero">
    <div className="flex h-full w-full items-center justify-center bg-gray-900/40">
      <div
        className="heroText relative top-32 sm:top-52 text-center w-full py-5 flex flex-col justify-center"
      >
        <h1 className="text-3xl font-semibold text-white lg:text-4xl">
          Trouvez votre nouvelle
          <span className="text-red-500"> voiture</span> qui vous correspond
        </h1>
        <RouterLink to="/annonces/all">
          <button
            className="mx-auto mt-4 w-auto transform rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-red-500 focus:bg-red-600 focus:outline-none lg:w-auto"
          >
            C'est ici pour la trouver
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.car_hero {
  background-image: url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1966&q=80');
}

.heroText {
  backdrop-filter: blur(8px);
}
</style>
