import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Backsignup , backLogin } from "../services/authService"
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
  const [users, setUsers] = useState(defaultUsers);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(async () => {
    const status =await  JSON.parse(localStorage.getItem("loggedIn"));
    const userData = await JSON.parse(localStorage.getItem("user"))
    console.log(status)
    console.log(userData)
    if (status) {
     setLoggedIn(true)
     setCurrentUser(userData)
    }
  }, []);

  const login = async (email, password) => {
    try {
      const logIn = await backLogin(email, password);
      console.log(logIn[0]);
      setCurrentUser(logIn[0]);
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user",JSON.stringify(logIn[0]));
    } catch (error) {
      if (error.message === "Invalid Credentials") {
        setErrors({ email: "The entered credentials are wrong please check" });
      } else {
        setErrors({ signup: error.message });
      }
    }
  };
  const signup = async (name, email, password) => {
    try {
      const user = await Backsignup(name, email, password);
      console.log(user);
      if (user === "Email already exists") {
        setErrors({
          email: "User already exists. Please choose a different email.",
        });
      }
      else{
      setLoggedIn(true);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("user",JSON.stringify(user));
      setCurrentUser(user);
      console.log("user data saved");
      }
    } catch (error) {
      {
        setErrors({ signup: error.message });
      }
    }
  };
  

  const logout = () => {
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("user")
    setCurrentUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      address: "",
    })
    setLoggedIn(false)
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
    signup
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }