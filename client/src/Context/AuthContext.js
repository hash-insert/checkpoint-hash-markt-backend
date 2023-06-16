import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as Login,
  logout as Logout,
  signup as Signup,
} from "../services/authService";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const login = async (email, password) => {
    try {
      const response = await Login(email, password);
      const user = response.data;
      setCurrentUser(user);
      setLoggedIn(true);
      setIsSubmitting(false);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ login: error.message });
    }
  };

  
  

  const logout = async () => {
    try {
      await Logout();
      setCurrentUser(null);
      setLoggedIn(false);
      navigate("/signin");
    } catch (error) {
      setErrors({ logout: error.message });
    }
  };

  const contextsignup = async (name, email, password) => {
    try {
      const response = await Signup(name, email, password);
      console.log(response);
      const user = response.data;
      const updatedUsers = [...users, user];
      setLoggedIn(true);
      setCurrentUser(response);
      console.log(user);
      setUsers(updatedUsers);
      console.log(user);
    } catch (error) {
      setErrors({ signup: error.message });
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    users,
    setUsers,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting,
    logout,
    login,
    contextsignup,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };