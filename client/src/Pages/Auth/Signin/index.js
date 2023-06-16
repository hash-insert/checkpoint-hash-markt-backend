import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from './styles.module.css'
import { LoginIcon } from '@heroicons/react/outline'
import { signin } from "../../../Pages/Services/authService";

const Signin = () => {

  const { currentUser, login, setCurrentUser, setIsSubmitting, loggedIn, setLoggedIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
      const data = await signin(email, password);
      console.log(data);
      if (data.token) {
        setEmail("");
        setPassword("");
        login(data.token);
        console.log("Log In successful");
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      } else {
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error while signing in:", error.message);
      // Handle the error condition (e.g., display an error message to the user)
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn, navigate])

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Login</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignIn}
          className={styles.signInForm}
        >
          <div className={styles.inputGroup}>
            <div>
              <label className="sr-only">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                className={styles.input}
                placeholder="Email Address"
                required
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                className={styles.input}
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Don't have an account? Sign up{" "}
                  <Link to="/signup" className="text-yellow-400 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <LoginIcon className="my-auto h-5 w-6" aria1-hidden="true" />
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin