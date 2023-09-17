export default function requireAuth(to, from, next) {
  const token = localStorage.getItem('jwt_token') // Récupérez le token JWT stocké

  console.log(token)
  if (!token) {
    next('/login')
  } else {
    next()
  }
}
