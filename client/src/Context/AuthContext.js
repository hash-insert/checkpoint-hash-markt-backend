import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

const defaultUser = JSON.parse(localStorage.getItem("user")) || {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  address: "",
}
const defaultUsers = JSON.parse(localStorage.getItem("users")) || []

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultUsers)
  const [currentUser, setCurrentUser] = useState(defaultUser)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) || false
  );
  const [errors, setErrors] = useState({})

  const login = (email, password) => {
    const userData = Object.values(users);
    const indexOfUser = users.map((item) => item.email).indexOf(email)
    if (indexOfUser >= 0 && userData[indexOfUser].password === password) {
      const finalUser = userData[indexOfUser]
      setCurrentUser(finalUser)
      setLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(finalUser))
      localStorage.setItem("loggedIn", JSON.stringify(true));
    }
  }

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
    })
    setLoggedIn(false);
    localStorage.setItem("loggedIn", JSON.stringify(false));
  }

  useEffect(() => {
    const isEmpty = Object.values(currentUser).every(value => value ? true : false)
    if(Object.keys(errors).length > 0) {
      setLoggedIn(false)
    } else if (!isEmpty) {
      setLoggedIn(false)
    } else {
      const userData = [...users, currentUser]
      setUsers(userData)
      localStorage.setItem("users", JSON.stringify(userData))
      localStorage.setItem("user", JSON.stringify(currentUser))
      setLoggedIn(true)
    }
  }, [errors])

  const value = {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    loggedIn,
    setErrors,
    setIsSubmitting,
    logout,
    login,
    setLoggedIn
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }