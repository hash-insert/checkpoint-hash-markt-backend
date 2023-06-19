import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signup, signin, logout } from "../services/authServices";

const AuthContext = createContext();

const defaultUser = JSON.parse(localStorage.getItem("user")) || {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
  address: "",
};
const defaultUsers = JSON.parse(localStorage.getItem("users")) || [];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(defaultUsers);
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = async (firstName, lastName, email, password) => {
    try {
      const response = await signup(firstName, lastName, email, password);
      const user = response.user;
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      function setCookie(name, value, days) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
      
        const cookieValue = encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
        document.cookie = name + '=' + cookieValue;
      }
      
      // Set the token as a cookie
      setCookie('access_token', user.token, 7);
      // setCurrentUser({ user });
      navigate("/signin");
    } catch (error) {
      if (error.message === "Email already exists") {
        setErrors({
          email: "User already exists. Please choose a different email.",
        });
      } else {
        setErrors({ signup: error.message });
      }
    }
  };
  const handleLogin = async (email, password) => {
    try {
      setIsSubmitting(true);
      const response = await signin(email, password);
      const userData = response.user;
      setIsSubmitting(false);
      setLoggedIn(true);
      setCurrentUser(userData);
      navigate("/");
    } catch (error) {
      console.log("error in handling login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLoggedIn(false);
      setCurrentUser(null);
      navigate("/signin");
    } catch (error) {
      console.log("error in handling logout:", error);
    }
  };

  useEffect(() => {
    const isEmpty = Object.values(currentUser).every((value) =>
      value ? true : false
    );
    if (Object.keys(errors).length > 0) {
      setLoggedIn(false);
    } else if (!isEmpty) {
      setLoggedIn(false);
    } else {
      const userData = [...users, currentUser];
      setUsers(userData);
      localStorage.setItem("users", JSON.stringify(userData));
      localStorage.setItem("user", JSON.stringify(currentUser));
      setLoggedIn(true);
    }
  }, [errors]);

  const value = {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleSignup,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
