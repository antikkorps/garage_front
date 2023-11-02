const apiConfig = {
  production: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      signup: '/auth/signup',
      login: '/auth/signin',
      validate: '/auth/validate',
      forgottenPassForm: '/auth/reset-password-request',
      profile: '/users/me',
      annoncesNew: '/annonces/new',
      annoncesAll: '/annonces/all',
      annoncesQuery: '/annonces/search',
      annonceDetails: '/annonces/',
      imageUploadEndpoint: '/images/upload',
      contactsAll: '/contacts/all',
      contactDetails: '/contacts',
      contactNew: '/contacts/new',
      horairesAll: '/horaires/all',
      horairesDetails: '/horaires/',
      horaireNew: '/horaires/new',
      userAll: '/users/all',
      userDetails: '/users/',
      userProfile: '/users/me'
    }
  }
}

export default apiConfig
