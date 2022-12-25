import axios from "axios"

let API = "http://localhost:5002/api/users/register"

const register = async (userData) => {
  const response = await axios.post(API, userData)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(
    "http://localhost:5002/api/users/login",
    userData
  )
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

const logout = () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  logout,
  login,
}

export default authService
