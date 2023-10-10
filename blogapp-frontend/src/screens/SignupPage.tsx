import { Link } from "react-router-dom";
import AuthComponent from "../components/AuthComponent"
import styles from '../styles/loginpage.module.css'
import { Helmet } from 'react-helmet';


function SignupPage() {
  return (
    <AuthComponent>
      <Helmet>
        <title>Blip | Signup</title>
      </Helmet>
      <form className={styles.loginform}>
        <h1>Create an account</h1>
        <label>Email id</label>
        <input placeholder="Enter your email address" />
        <label>Password</label>
        <input placeholder="Enter your password" />
        <label>Confirm Password</label>
        <input placeholder="Enter your password again" />
        <button type="submit">Create account</button>
        <p>Already have an account? <Link to='/login' className={styles.signuplink}>Signin</Link></p>
      </form>
    </AuthComponent>
  )
}

export default SignupPage

