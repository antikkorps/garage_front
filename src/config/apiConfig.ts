const apiConfig = {
  development: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      signup: '/auth/signup',
      login: '/auth/signin',
      profile: '/users/me',
      annoncesAll: '/annonces/all',
      annoncesQuery: '/annonces/search',
      annnonceDetails: '/annnonces/:id',
      contactsAll: '/contacts/all',
      contactDetails: '/contacts/:id',
      contactNew: '/contacts/new',
      horairesAll: '/horaires/all',
      horaireDetails: '/horaires/:id',
      horaireNew: '/horaires/new'
    }
  },
  production: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      signup: '/auth/signup',
      login: '/auth/signin',
      validate: '/auth/validate',
      profile: '/users/me',
      annoncesAll: '/annonces/all',
      annoncesQuery: '/annonces/search',
      annnonceDetails: '/annnonces/:id',
      contactsAll: '/contacts/all',
      contactDetails: '/contacts',
      contactNew: '/contacts/new',
      horairesAll: '/horaires/all',
      horaireDetails: '/horaires/:id',
      horaireNew: '/horaires/new'
    }
  }
}

export default apiConfig
