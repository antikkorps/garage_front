import axios from 'axios'
import apiConfig from '@/config/apiConfig'

export default function roleGuard(allowedRoles) {
  return (to, from, next) => {
    const token = localStorage.getItem('jwt_token')
    const signinBackend = `${apiConfig.production.baseUrl}${apiConfig.production.endpoints.validate}/${token}`

    if (!token) {
      return next('/login')
    }

    axios
      .get(signinBackend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const user = response.data
        console.log('role', user.role)

        if (!user || !user.role || !allowedRoles.includes(user.role)) {
          return next('/unauthorized')
        }

        next()
      })
      .catch((error) => {
        console.error("Erreur de vérification de l'authentification :", error)
        next('/login')
      })
  }
}
