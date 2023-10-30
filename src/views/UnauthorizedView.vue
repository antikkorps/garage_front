<template>
  <div>
    <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-red-600">Access Denied</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Accés refusé
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          Désolé, Vous n'êtes pas autorisé à voir cette page
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <RouterLink
            to="/"
            class="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >Retour à l'accueil</RouterLink
          >
          <RouterLink to="/contact" class="text-sm font-semibold text-gray-900"
            >Contacter le support <span aria-hidden="true">&rarr;</span></RouterLink
          >
        </div>
      </div>
    </main>
  </div>
</template>
