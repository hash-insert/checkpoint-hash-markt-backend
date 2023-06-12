import { IdentificationIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthContext'
import styles from './styles.module.css'
import validations from './validations'

const Signup = () => {
  const {
    currentUser,
    setCurrentUser,
    users,
    loggedIn,
    errors,
    setErrors,
    setIsSubmitting,
    signup,
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    loggedIn && navigate('/')
  }, [loggedIn])

  const handleSignUpFormChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value })
    setErrors({});
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    const errors = validations(currentUser)
    if (Object.keys(errors).length === 0) {
      try {
        await signup(currentUser.name, currentUser.email, currentUser.password)
      } catch (error) {
        console.error('Signup error:', error.message)
      }
    }
  }

  return (
    <div className={styles.formGroupContainer}>
      <div className={styles.formGroup}>
        <div>
          <h2 className={styles.title}>Sign Up</h2>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSignUpSubmit}
          className={styles.signUpForm}
        >
          <div className={styles.inputGroup}>
            <div>
              {errors.name && <span className={styles.error}>{errors.name}</span>}
              <label className="sr-only">Name</label>
              {currentUser && (
                <input
                  type="text"
                  className={styles.input}
                  onChange={handleSignUpFormChange}
                  value={currentUser.name}
                  name="name"
                  placeholder="Name"
                />
              )}


            </div>
            <div>
              {errors.email && <span className={styles.error}>{errors.email}</span>}
              <label className="sr-only">Email</label>
              {currentUser && (
              <input
                type="email"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.email}
                name="email"
                placeholder="Email Address"
              />
              )}

            </div>
            <div>
              {errors.password && <span className={styles.error}>{errors.password}</span>}
              <label className="sr-only">Password</label>
              {currentUser && (
              <input
                type="Password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.password}
                name="password"
                placeholder="Password"
              />
              )}

            </div>
            <div>
              {errors.passwordConfirm && <span className={styles.error}>{errors.passwordConfirm}</span>}
              <label className="sr-only">Password Confirm</label>
              {currentUser && (
              <input
                type="Password"
                className={styles.input}
                onChange={handleSignUpFormChange}
                value={currentUser.passwordConfirm}
                name="passwordConfirm"
                placeholder="Password Confirm"
              />
              )}

            </div>
            <div className={styles.linkBox}>
              <div className={styles.linkDiv}>
                <span>
                  Already have an account? Login{" "}
                  <Link to="/signin" className="text-yellow-400 hover:underline">
                    {" "}
                    here.
                  </Link>
                </span>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className={styles.button}>
                <IdentificationIcon
                  className="my-auto h-5 w-6"
                  aria1-hidden="true"
                />
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
