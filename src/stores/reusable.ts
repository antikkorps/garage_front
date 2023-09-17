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

export { loggedIn, checkLoggedIn, logOutUser }
