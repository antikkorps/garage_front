import axios from 'axios'
import apiConfig from '@/config/apiConfig'

export default async function requireAuth(to, from, next) {
  const token = localStorage.getItem('jwt_token') // Récupérez le token JWT stocké
  const signinBackend = `${apiConfig.production.baseUrl}${apiConfig.production.endpoints.validate}/${token}`

  if (!token) {
    next('/login')
  } else {
    try {
      await axios.get(signinBackend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      next()
    } catch (error) {
      console.error("Erreur de vérification de l'authentification :", error)

      next('/login')
    }
  }
}
