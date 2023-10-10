import { Link, useNavigate } from "react-router-dom";
import AuthComponent from "../components/AuthComponent"
import styles from '../styles/loginpage.module.css'
import { Helmet } from 'react-helmet';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userSignIn } from "../services/UserAuth";

const UserDetails=z.object({
  email: z.string().email(),
  password: z.string()
})

function LoginPage() {
  const {register,handleSubmit,formState,reset}=useForm({resolver: zodResolver(UserDetails)})
  const {errors}=formState
  const navigate=useNavigate()
  const login=async (formValues:Record<string,any>)=>{
    const {result,token,userId,message} = await userSignIn({email: formValues.email,password: formValues.password})
    if(!result)
    alert(message)
    else
    {
      sessionStorage.setItem('jwtToken',token!)
      sessionStorage.setItem('userId',userId!)
      reset()
      navigate('/',{replace: true})
    }
  }
  return (
    <AuthComponent>
      <Helmet>
        <title>Blip | Login</title>
      </Helmet>
      <form className={styles.loginform} onSubmit={handleSubmit(login)}>
        <h1>Login</h1>
        <label>Email id</label>
        <input placeholder="Enter your email address" {...register('email')}/>
        {errors.email && <p className={styles.error}>{errors.email.message?.toString()}</p>}
        <label>Password</label>
        <input placeholder="Enter your password" {...register('password')} type="password"/>
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to='/signup' className={styles.signuplink}>Signup</Link></p>
      </form>
    </AuthComponent>
  )
}

export default LoginPage
