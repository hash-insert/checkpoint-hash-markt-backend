import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, signup } from "../services/authServices";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    // name: "",
    // email: "",
    // password: "",
    // passwordConfirm: "",
    // userId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setIsSubmitting(true);
      const {user} = await login(email, password);
      console.log(user.name);
      setIsSubmitting(false);
      setLoggedIn(true);
      setCurrentUser(user);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ login: error.message });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedIn(false);
      setCurrentUser(null);
      navigate("/login");
    } catch (error) {
      setErrors({ logout: error.message });
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const {user} = await signup(name, email, password);
      setLoggedIn(true);
      setCurrentUser({ user });
      navigate("/dashboard");
    } catch (error) {
      if (error.message === "Email already exists") {
        setErrors({ email: "User already exists. Please choose a different email." });
      } else {
        setErrors({ signup: error.message });
      }
    }
  };

  const value = {
    currentUser,
    loggedIn,
    errors,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
    setIsSubmitting,
    setCurrentUser,
    setErrors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
