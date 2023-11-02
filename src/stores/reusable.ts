import { ref } from 'vue'

const loggedIn = ref(false)

const checkLoggedIn = () => {
  if (localStorage.getItem('jwt_token')) {
    loggedIn.value = true
  } else {
    loggedIn.value = false
  }
}

const logOutUser = () => {
  localStorage.removeItem('jwt_token')
  loggedIn.value = false
}

const formatDate = (date: Date) => {
  const d = new Date(date)
  const year = d.getFullYear().toString()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${day}/${month}/${year}`
}

export { loggedIn, checkLoggedIn, logOutUser, formatDate }
